import React from 'react';
import Logo from "../assets/Aurjobs_Logo1.png";


const AboutUsPage = () => {

  const handleEmailClick = () => {
    // Option 1: Directly open default email client
    window.location.href = 'mailto:Info@Aurjobs.com';

    
  };
  // Sample company data
  const companyInfo = {
    name: "Aurjobs",
    tagline: "Building tomorrow's solutions today",
    description: "Founded in 2024, Aurjobs is an AI-driven recruitment platform that automates and enhances the hiring process. Our mission is to eliminate hiring inefficiencies and create a bias-free, scalable, and precise recruitment experience for businesses .\
We leverage cutting-edge AI and automation to power our candidate sourcing, interview scheduling, and hiring processes, ensuring that employers can find the best talent effortlessly. With a growing database of over 2 million professionals, Aurjobs is transforming the way companies hire, manage, and engage with candidates",
    mission: "To empower businesses through technology that is both powerful and accessible, creating lasting positive impact for our clients and their customers.",
    values: [
      { title: "Innovation", description: "Redefining hiring with AI and automation." },
      { title: "Excellence", description: "Delivering top-tier recruitment solutions." },
      { title: "Collaboration", description: "Bridging talent and opportunity seamlessly" },
      { title: "Integrity", description: "Ensuring fair and transparent hiring" }
    ]
  };

  // Sample team members data
  const teamMembers = [
    {
      name: "Sameer Srivastava",
      position: "CTO",
      bio: "Technical genius with expertise in AI, cloud architecture, and system design.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Sameer Srivastava",
      position: "Design Director",
      bio: "Award-winning designer focused on creating intuitive and beautiful interfaces.",
      image: "/api/placeholder/400/400"
    },
    {
      name: "Sameer Srivastava",
      position: "Head of Product",
      bio: "Product strategist who translates customer needs into innovative solutions.",
      image: "/api/placeholder/400/400"
    }
  ];

  // Founder's detailed profile
  const founder = {
    name: "Keshav Agarwal",
    position: "CEO & Founder",
    bio: "Keshav Agarwal is a visionary entrepreneur and software developer with expertise in AI-driven recruitment solutions. As the founder of Aurjobs, he is revolutionizing the hiring industry by automating the entire recruitment process through AI-powered candidate sourcing, resume parsing, and intelligent job matching.",
    longBio: "Keshav started Aurjobs during his third year of college, initially focusing on automated job postings. Over time, he evolved it into a fully integrated, AI-driven hiring platform. Under his leadership, Aurjobs is set to become the world's largest job board with AI-powered features, connecting employers with the right talent efficiently and bias-free.\
Keshav has worked with top research institutions, including IIT Delhi and DRDO, and has extensive experience in software development, AI, and recruitment technology.",
    achievements: [
      "Founder & CEO of Aurjobs, an AI-powered recruitment platform",
      "Developed AI-driven solutions for candidate sourcing and hiring automation",
      "Expertise in AI, machine learning, and software engineering",
      "Extensive research experience with IIT Delhi and DRDO",
      "Speaker on AI in hiring and HR automation"
    ],
    quote: "Technology should eliminate barriers, not create them. At Aurjobs, we're building bridges between talent and opportunity.",
    image: "https://media.licdn.com/dms/image/v2/D4D35AQHAhLSfFJ_uuQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1673469233987?e=1743440400&v=beta&t=hsmX8CIdf7uy5VPTZnZe02Ma7cblnQzjhoVtp6SP9cQ"
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen mt-20">
      {/* Hero Section with Logo */}
      {/* <section className="relative overflow-hidden bg-indigo-600 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/600')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto px-6 py-24 relative z-10">
          <div className="flex flex-col items-center">
           
            <div className="mb-8 p-4">
              <img src={Logo} alt="Aurjobs Logo" className="h-16" />
            </div>
            <p className="text-xl mb-8 text-center max-w-2xl">{companyInfo.tagline}</p>
          </div>
        </div>
      </section> */}

<section className="relative overflow-hidden">
        {/* SVG Banner Background */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300" className="w-full">
          {/* Background gradient */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
            
            {/* Abstract shape gradient */}
            <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            
            {/* Particle effects */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Background */}
          <rect width="1200" height="300" fill="url(#bgGradient)" />
          
          {/* Abstract decorative elements */}
          <circle cx="1000" cy="150" r="250" fill="url(#shapeGradient)" opacity="0.3" />
          <circle cx="900" cy="50" r="120" fill="#4f46e5" opacity="0.2" />
          <circle cx="100" cy="250" r="180" fill="#4f46e5" opacity="0.2" />
          
          {/* Abstract flowing line */}
          <path d="M0,200 C300,120 500,280 800,150 S1100,220 1200,150" stroke="white" strokeWidth="2" fill="none" opacity="0.3" />
          <path d="M0,170 C200,250 600,100 900,200 S1100,120 1200,180" stroke="white" strokeWidth="3" fill="none" opacity="0.2" />
          
          {/* Particles/dots */}
          <g filter="url(#glow)">
            <circle cx="200" cy="80" r="3" fill="white" opacity="0.7" />
            <circle cx="350" cy="150" r="2" fill="white" opacity="0.7" />
            <circle cx="480" cy="90" r="4" fill="white" opacity="0.7" />
            <circle cx="600" cy="200" r="3" fill="white" opacity="0.7" />
            <circle cx="750" cy="80" r="2" fill="white" opacity="0.7" />
            <circle cx="850" cy="180" r="4" fill="white" opacity="0.7" />
            <circle cx="950" cy="120" r="3" fill="white" opacity="0.7" />
            <circle cx="1100" cy="90" r="2" fill="white" opacity="0.7" />
          </g>
          
          {/* Abstract connected nodes visual */}
          <g opacity="0.4">
            <line x1="180" y1="250" x2="280" y2="210" stroke="white" strokeWidth="1" />
            <line x1="280" y1="210" x2="350" y2="240" stroke="white" strokeWidth="1" />
            <line x1="350" y1="240" x2="420" y2="200" stroke="white" strokeWidth="1" />
            <line x1="420" y1="200" x2="500" y2="230" stroke="white" strokeWidth="1" />
            <line x1="500" y1="230" x2="580" y2="200" stroke="white" strokeWidth="1" />
            <line x1="580" y1="200" x2="650" y2="230" stroke="white" strokeWidth="1" />
            <line x1="650" y1="230" x2="720" y2="210" stroke="white" strokeWidth="1" />
            <line x1="720" y1="210" x2="780" y2="240" stroke="white" strokeWidth="1" />
            <line x1="780" y1="240" x2="850" y2="220" stroke="white" strokeWidth="1" />
            
            <circle cx="180" cy="250" r="4" fill="white" />
            <circle cx="280" cy="210" r="4" fill="white" />
            <circle cx="350" cy="240" r="4" fill="white" />
            <circle cx="420" cy="200" r="4" fill="white" />
            <circle cx="500" cy="230" r="4" fill="white" />
            <circle cx="580" cy="200" r="4" fill="white" />
            <circle cx="650" cy="230" r="4" fill="white" />
            <circle cx="720" cy="210" r="4" fill="white" />
            <circle cx="780" cy="240" r="4" fill="white" />
            <circle cx="850" cy="220" r="4" fill="white" />
          </g>
        </svg>

        {/* Overlay for Logo and Tagline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl mb-6 shadow-xl">
            <img src={Logo} alt="Aurjobs Logo" className="h-24 md:h-32" />
          </div>
          <p className="text-xl md:text-2xl text-white font-light tracking-wide text-center max-w-2xl px-4">{companyInfo.tagline}</p>
        </div>
      </section>
      {/* Company Overview */}
      <section className="py-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-indigo-900">Our Story</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{companyInfo.description}</p>
            <p className="text-gray-700 mb-6 leading-relaxed">{companyInfo.mission}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {companyInfo.values.map((value, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2 text-indigo-700">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <img src="/api/placeholder/500/300" alt="Company office" className="rounded-lg shadow-lg" />
            <img src="/api/placeholder/500/300" alt="Team collaboration" className="rounded-lg shadow-lg" />
            <img src="/api/placeholder/500/300" alt="Product development" className="rounded-lg shadow-lg" />
            <img src="/api/placeholder/500/300" alt="Client meeting" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20 bg-gradient-to-r from-indigo-900 to-indigo-700 text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Founder</h2>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-2/5">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-indigo-500 rounded-lg"></div>
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  className="relative z-10 rounded-lg shadow-2xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-white text-indigo-900 p-4 rounded-lg shadow-lg max-w-sm z-20">
                  <p className="font-serif italic text-lg">"{founder.quote}"</p>
                </div>
              </div>
            </div>
            <div className="lg:w-3/5">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg">
                <h3 className="text-3xl font-bold mb-2">{founder.name}</h3>
                <p className="text-xl text-indigo-200 mb-6">{founder.position}</p>
                <p className="mb-6 leading-relaxed">{founder.bio}</p>
                <p className="mb-8 leading-relaxed">{founder.longBio}</p>
                <h4 className="text-xl font-semibold mb-4 border-b border-indigo-400 pb-2">Achievements</h4>
                <ul className="space-y-2">
                  {founder.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-indigo-300">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center text-indigo-900">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-indigo-800">{member.name}</h3>
                  <p className="text-indigo-600 mb-3 font-medium">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-16 bg-indigo-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals to join our team and help us build amazing solutions.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-indigo-800 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              <a href="https://jobs.aurjobs.com/" target='_blank'>View Careers</a>
            </button>
            <button onClick={handleEmailClick} className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-800 px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;