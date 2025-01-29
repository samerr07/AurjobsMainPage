import React from 'react';
// import subscription from '../assets/sourcing-portal.png';
import sourcing from '../assets/sourcing-portal.png';
import interview from '../assets/interview-portal.png';
import test from '../assets/test-portal.png';
import screening from '../assets/screening-portal.png';

const Services = () => {
  const services = [
    {
      title: "Talent Pool Network",
      description:
        "Find and Connect with Top Talent. Access a pool of millions of professionals and filter candidates based on skills, experience, and preferences. Our Sourcing Portal ensures that you always have the best talent at your fingertips.",
      keyPoints: [
        "Access to millions of professionals globally.",
        "Advanced search filters for skills, experience, and location.",
        "AI-driven recommendations for the best-fit candidates.",
        "Real-time updates on candidate availability and profiles.",
      ],
      image: sourcing,
      bgColor: "bg-blue-50",
      link: "https://Sourcing.Aurjobs.com"
    },
    {
      title: "AI Resume Screening Portal",
      description:
        "Smart, automated resume filtering to identify top candidates. Eliminate the hassle of manual resume screening. Our AI Resume Screener instantly reviews and shortlists resumes based on your job criteria, saving time and ensuring precision.",
      keyPoints: [
        "AI-powered resume parsing and keyword matching.",
        "Automated shortlisting based on qualifications and skills.",
        "Scoring and ranking of candidates for better decision-making.",
        "Bias-free screening to promote diversity and inclusion.",
      ],
      image: screening,
      bgColor: "bg-purple-50",
      link: "https://Screening.Aurjobs.com"
    },
    {
      title: "Skill Assessment Platform",
      description:
        "Evaluate candidates with research-backed, AI-driven and completely proctored skill assessments. Test candidates' abilities with tailored assessments designed to evaluate their skills, knowledge, and potential.",
      keyPoints: [
        "AI-driven assessments for technical, analytical, and behavioral skills.",
        "Customizable tests tailored to your hiring needs.",
        "Instant scoring and detailed performance reports.",
        "Ensures a data-driven, fair evaluation process.",
      ],
      image: test,
      bgColor: "bg-indigo-50",
      link: "https://Test.Aurjobs.com"
    },
    {
      title: "AI Interviewer Platform",
      description:
        "Automated scheduling, conducting, and analyzing with an efficient AI interviewer. Transform the interview process with AI automation, ensuring seamless, unbiased, and efficient interviews.",
      keyPoints: [
        "Automated interview scheduling and reminders.",
        "AI-powered video interviews with real-time analysis.",
        "Soft skills evaluation through AI algorithms.",
        "Post-interview performance reports and recommendations.",
      ],
      image: interview,
      bgColor: "bg-pink-50",
      link: "https://Interview.Aurjobs.com"
    },
    {
      title: "Job Portal",
      description:
        "An intuitive platform to post jobs and attract the right talent. Post jobs and reach a targeted audience of qualified professionals. Our Job Marketplace simplifies the hiring process by connecting you directly with top talent.",
      keyPoints: [
        "Easy-to-use job posting interface.",
        "Wide reach to candidates across industries and regions.",
        "AI-driven job promotion to attract the right audience.",
        "Insights on job performance and applicant engagement.",
      ],
      image: sourcing,
      bgColor: "bg-teal-50",
      link: "https://Sourcing.Aurjobs.com"
    },
  ];

  return (
    <div className="w-full">
      <div className="w-[90%] mx-auto py-16">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Unlock the Full Potential of Recruitment with Our Services
          </h1>
          <p className="text-lg text-gray-600">
            At Aurjobs, we've built a suite of specialized portals designed to streamline every stage of recruitment. From sourcing talent to conducting AI-powered interviews, our portals work together to deliver an effortless hiring experience.
          </p>
        </div>

        {/* Services Section */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div key={index} className={`${service.bgColor} rounded-2xl p-8 transition-all duration-300 hover:shadow-lg`}>
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
                {/* Content Side */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-4">
                    {service.keyPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <svg className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href={service.link}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-6 py-3 bg-indigo-500 text-white font-medium rounded-lg 
                      hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Learn more
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>

                {/* Image Side */}
                <div className="w-full lg:w-1/2">
                  <div className="relative">
                    <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;