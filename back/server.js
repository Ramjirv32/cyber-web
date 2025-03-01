import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const secret = process.env.JWT_SECRET;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully to database 'cyber'");
    })
    .catch(err => {
        console.error("MongoDB Connection Error Details:", {
            message: err.message,
            code: err.code,
            name: err.name,
            stack: err.stack
        });
        process.exit(1);
    });

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    resetOTP: String,
    resetOTPExpires: Date
});

const User = mongoose.model("User", userSchema);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendVerificationEmail = async (email, token) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        html: `
            <h2>Thank you for registering!</h2>
            <p>Please verify your email by clicking on the link below:</p>
            <a href="${process.env.FRONTEND_URL}/login?token=${token}">Verify Email</a>
            <p>This link will expire in 24 hours.</p>
        `
    };

    return transporter.sendMail(mailOptions);
};

const sendOTPEmail = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        html: `
            <h2>Password Reset Request</h2>
            <p>Your OTP for password reset is: <strong>${otp}</strong></p>
            <p>This OTP will expire in 10 minutes.</p>
            <p>If you didn't request this, please ignore this email.</p>
        `
    };
    return transporter.sendMail(mailOptions);
};

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(403).json({ success: false, message: "A token is required for authentication" });
    }
    
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
            return res.status(200).json({ success: true, token });
        }
        return res.status(400).json({ success: false, message: "Incorrect password" });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred during login",
            error: error.message 
        });
    }
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);
        const verificationToken = crypto.randomBytes(20).toString('hex');
        
        const newUser = new User({
            email,
            password: hash,
            isVerified: false,
            verificationToken
        });
        
        await newUser.save();
        await sendVerificationEmail(email, verificationToken);
        
        const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
        return res.status(201).json({
            success: true,
            token,
            message: "Account created. Please check your email to verify your account."
        });
    } catch (error) {
        console.error("Signin error:", error);
        return res.status(500).json({ 
            success: false, 
            message: "An error occurred during registration",
            error: error.message 
        });
    }
});

app.get('/verify-email', async (req, res) => {
    const token = req.query.token;
    if (!token) {
        return res.status(400).json({ success: false, message: "Invalid token" });
    }
    try {
        const user = await mongoose.connection.db.collection("users").findOne({ verificationToken: token });
        if (user) {
            await mongoose.connection.db.collection("users").updateOne(
                { _id: user._id },
                { $set: { isVerified: true, verificationToken: "" } }
            );
            return res.json({ success: true, message: "Email verified successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

   
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOTP = otp;
        user.resetOTPExpires = Date.now() + 600000; 
        await user.save();

        await sendOTPEmail(email, otp);
        res.json({ success: true, message: "OTP sent to email" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error sending OTP" });
    }
});

app.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({
            email,
            resetOTP: otp,
            resetOTPExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
        }

        res.json({ success: true, message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error verifying OTP" });
    }
});

app.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;
    
    console.log('Reset password request received:', { email, otp }); // Debug log

    try {
        
        const user = await User.findOne({ email });
        
        if (!user) {
            console.log('User not found:', email);
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

      
        if (!user.resetOTP || user.resetOTP !== otp) {
            console.log('Invalid OTP:', { 
                provided: otp, 
                stored: user.resetOTP 
            });
            return res.status(400).json({ 
                success: false, 
                message: "Invalid OTP" 
            });
        }

        if (user.resetOTPExpires < Date.now()) {
            console.log('OTP expired:', user.resetOTPExpires);
            return res.status(400).json({ 
                success: false, 
                message: "OTP has expired" 
            });
        }

      
        const hash = await bcrypt.hash(newPassword, 10);
        
      
        user.password = hash;
        // user.resetOTP = undefined;
        // user.resetOTPExpires = undefined;
        await user.save();

        console.log('Password reset successful for:', email);

        res.json({ 
            success: true, 
            message: "Password reset successful" 
        });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Error resetting password",
            error: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});