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

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));


const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },,
    resetPasswordToken: String, resetPasswordToken: { type: String },
    resetPasswordExpires: Date    resetPasswordExpires: { type: Date }
});

const User = mongoose.model("User", userSchema);const User = mongoose.model("User", userSchema);


const transporter = nodemailer.createTransport({porter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,   user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS     pass: process.env.EMAIL_PASS
    }    }
});});


const sendVerificationEmail = async (email, token) => {email, token) => {
    const mailOptions = {ons = {
        from: process.env.EMAIL_USER,
        to: email,il,
        subject: "Email Verification",
        html: `
            <h2>Thank you for registering!</h2>
            <p>Please verify your email by clicking on the link below:</p>n the link below:</p>
            <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">Verify Email</a>   <a href="${process.env.FRONTEND_URL}/verify-email?token=${token}">Verify Email</a>
            <p>This link will expire in 24 hours.</p>      <p>This link will expire in 24 hours.</p>
        `        `
    };

    return transporter.sendMail(mailOptions);    return transporter.sendMail(mailOptions);
};

const verifyJWT = (req, res, next) => {dResetEmail = async (email, token) => {
    const token = req.headers["authorization"];
    if (!token) {   from: process.env.EMAIL_USER,
        return res.status(403).json({ success: false, message: "A token is required for authentication" });    to: email,
    }ubject: "Password Reset Request",
    
    try {Password</h2>
        const decoded = jwt.verify(token, secret);Click the link below to reset your password. This link will expire in 1 hour.</p>
        req.user = decoded;${process.env.FRONTEND_URL}/reset-password?token=${token}">Reset Password</a>
        next();
    } catch (error) {   `
        return res.status(401).json({ success: false, message: "Invalid token" });  };
    return transporter.sendMail(mailOptions);    }
};};

const verifyJWT = (req, res, next) => {
    const token = req.headers["authorization"];"/login", async (req, res) => {
    if (!token) {
        return res.status(403).json({ success: false, message: "A token is required for authentication" });
    }One({ email });
    
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;t token = jwt.sign({ email }, secret, { expiresIn: '1h' });
        next();
    } catch (error) { else {
        return res.status(401).json({ success: false, message: "Invalid token" });return res.status(400).json({ success: false, message: "Incorrect password" });
    }
}; else {
s.status(400).json({ success: false, message: "User does not exist" });

app.post("/login", async (req, res) => { catch (error) {
    const { email, password } = req.body;     return res.status(500).json({ success: false, message: "An error occurred" });
    try {    }
        const user = await mongoose.connection.db.collection("users").findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);'/signin', async (req, res) => {
            if (isMatch) {
                const token = jwt.sign({ email }, secret, { expiresIn: '1h' });
                return res.status(200).json({ success: true, token });
            } else {) {
                return res.status(400).json({ success: false, message: "Incorrect password" }); message: "User already exists" });
            }
        } else {
            return res.status(400).json({ success: false, message: "User does not exist" });
        }ex');
    } catch (error) {w user with verificationToken and isVerified false
        return res.status(500).json({ success: false, message: "An error occurred" });ection.db.collection("users").insertOne({
    }
});
 isVerified: false,
app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {// Send verification email
        const user = await mongoose.connection.db.collection("users").findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });sign({ email }, secret, { expiresIn: '1h' });
        } else {.status(201).json({
            const hash = await bcrypt.hash(password, 10);
            // Generate a verification token token,
            const verificationToken = crypto.randomBytes(20).toString('hex');       message: "Account created. Please check your email to verify your account."
            // Save new user with verificationToken and isVerified false
            await mongoose.connection.db.collection("users").insertOne({
                email, catch (error) {
                password: hash,     return res.status(500).json({ success: false, message: "An error occurred" });
                isVerified: false,    }
                verificationToken
            });
            // Send verification emailtion; redirects to login page once verified
            await sendVerificationEmail(email, verificationToken);email', async (req, res) => {
            
            const token = jwt.sign({ email }, secret, { expiresIn: '1h' });f (!token) {
            return res.status(201).json({eturn res.status(400).json({ success: false, message: "Invalid token" });
                success: true,
                token,
                message: "Account created. Please check your email to verify your account."indOne({ verificationToken: token });
            });
        }e(
    } catch (error) {  { _id: user._id },
        return res.status(500).json({ success: false, message: "An error occurred" });
    }
});;
 else {
// New endpoint for email verification; redirects to login page once verifieds.status(400).json({ success: false, message: "Invalid token" });
app.get('/verify-email', async (req, res) => {
    const token = req.query.token; catch (error) {
    if (!token) {     return res.status(500).json({ success: false, message: "An error occurred" });
        return res.status(400).json({ success: false, message: "Invalid token" });    }
    }
    try {
        const user = await mongoose.connection.db.collection("users").findOne({ verificationToken: token });.listen(PORT, () => {





























































});    console.log(`Server is running on http://localhost:${PORT}`);app.listen(PORT, () => {});    }        res.status(500).json({ success: false, message: "Error resetting password" });    } catch (error) {        res.json({ success: true, message: "Password reset successful" });        await user.save();        user.resetPasswordExpires = undefined;        user.resetPasswordToken = undefined;        user.password = hash;        const hash = await bcrypt.hash(newPassword, 10);        }            return res.status(400).json({ success: false, message: "Invalid or expired reset token" });        if (!user) {        });            resetPasswordExpires: { $gt: Date.now() }            resetPasswordToken: token,        const user = await User.findOne({    try {    const { token, newPassword } = req.body;app.post('/reset-password', async (req, res) => {});    }        res.status(500).json({ success: false, message: "Error sending reset email" });    } catch (error) {        res.json({ success: true, message: "Password reset email sent" });        await sendPasswordResetEmail(email, resetToken);        await user.save();        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour        user.resetPasswordToken = resetToken;        const resetToken = crypto.randomBytes(20).toString('hex');        }            return res.status(404).json({ success: false, message: "User not found" });        if (!user) {        const user = await User.findOne({ email });    try {    const { email } = req.body;app.post('/forgot-password', async (req, res) => {});    }        return res.status(500).json({ success: false, message: "An error occurred" });    } catch (error) {        }            return res.status(400).json({ success: false, message: "Invalid token" });        } else {            return res.json({ success: true, message: "Email verified successfully" });            );                { $set: { isVerified: true, verificationToken: "" } }                { _id: user._id },            await mongoose.connection.db.collection("users").updateOne(        if (user) {    console.log(`Server is running on http://localhost:${PORT}`);
});