import { useEffect } from 'react';
import AOS from 'aos';

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden bg-gradient-to-b from-neutral-50/90 to-white py-24 sm:py-32">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501854140801-50d01698950b')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2
          }}
        />
        
        <div 
          className="absolute inset-0 z-1 bg-gradient-to-b from-white/80 to-white"
          aria-hidden="true"
        />

        <div className="absolute inset-0 z-0 opacity-[0.15]">
          <svg className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 lg:-translate-x-3/4" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-neutral-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
          </svg>
          <svg className="absolute right-full bottom-0 transform translate-x-1/4 translate-y-3/4 sm:translate-x-1/2 lg:translate-x-3/4" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
            <defs>
              <pattern id="85737c0e-0916-41d7-917f-596dc7edfa28" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" className="text-neutral-300" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa28)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center" data-aos="fade-up">
            <span className="inline-block mb-4 px-4 py-1.5 bg-white/80 backdrop-blur-sm text-neutral-600 text-sm font-medium rounded-full">
              Vision & Mission
            </span>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
              Shaping the Future of Innovation
            </h1>
            <div className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
              Building tomorrow's technological landscape through research, collaboration, and excellence.
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <div 
            className="group relative bg-white p-8 rounded-2xl hover-card"
            data-aos="fade-right"
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-neutral-100 text-neutral-600 rounded-full">
                Vision
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              Global Leadership in Innovation
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              To be a globally recognized society fostering innovation and excellence in intelligent systems, 
              driving technological advancement and societal progress through collaborative research and knowledge exchange.
            </p>
          </div>

          <div 
            className="group relative bg-white p-8 rounded-2xl hover-card"
            data-aos="fade-left"
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium bg-neutral-100 text-neutral-600 rounded-full">
                Mission
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              Advancing Technology Together
            </h2>
            <ul className="space-y-4 text-neutral-600">
              {[
                'Promote research and development in intelligent systems',
                'Foster collaboration between academia and industry',
                'Facilitate knowledge exchange through conferences',
                'Support emerging researchers and professionals'
              ].map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="inline-block w-1.5 h-1.5 mt-2 rounded-full bg-neutral-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-24" data-aos="fade-up">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-neutral-100 text-neutral-600 text-sm font-medium rounded-full">
              Our Values
            </span>
            <h2 className="mt-4 text-3xl font-semibold text-neutral-900">
              Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'Pursuing the highest standards in research and innovation',
                iconBg: 'bg-amber-50',
                icon: '◆'
              },
              {
                title: 'Collaboration',
                description: 'Working together to achieve common goals and drive progress',
                iconBg: 'bg-emerald-50',
                icon: '◆'
              },
              {
                title: 'Innovation',
                description: 'Pushing boundaries and creating transformative solutions',
                iconBg: 'bg-rose-50',
                icon: '◆'
              }
            ].map((value, index) => (
              <div 
                key={index}
                className="group relative bg-white p-8 rounded-2xl hover-card text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="inline-flex items-center justify-center mb-6">
                  <div className={`w-12 h-12 ${value.iconBg} rounded-xl flex items-center justify-center`}>
                    <span className="text-lg opacity-75">{value.icon}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;