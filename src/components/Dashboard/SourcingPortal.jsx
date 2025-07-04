import React from 'react';
import { Globe, Network, Zap, Target, ExternalLink } from 'lucide-react';

const SourcingPortal = () => {
  const sourcingFeatures = [
    {
      icon: <Network className="w-10 h-10 text-purple-600" />,
      title: "Expanded Talent Network",
      description: "Access a vast pool of qualified candidates beyond traditional recruitment channels."
    },
    {
      icon: <Zap className="w-10 h-10 text-blue-600" />,
      title: "AI-Powered Matching",
      description: "Advanced algorithms match your job requirements with the most suitable candidates."
    },
    {
      icon: <Target className="w-10 h-10 text-green-600" />,
      title: "Precision Targeting",
      description: "Pinpoint candidates with exact skills, experience, and cultural fit."
    }
  ];

  const handleExternalRedirect = () => {
    window.open('https://sourcing.aurjobs.com/search', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white  rounded-xl overflow-hidden max-w-6xl mx-auto mt-8">
      {/* Header */}
      <div className="bg-indigo-700 text-white p-6">
        <div className="flex items-center">
          <Globe className="w-12 h-12 mr-4" />
          <div>
            <h2 className="text-3xl font-bold">Sourcing Portal</h2>
            <p className="text-purple-100">Revolutionize Your Talent Acquisition Strategy</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-8">
        <div className="grid md:grid-cols-3 gap-6">
          {sourcingFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* External Sourcing Option */}
        <div className="mt-8 text-center">
          <button 
            onClick={handleExternalRedirect}
            className="
              flex items-center justify-center 
              mx-auto 
              bg-gradient-to-r from-blue-600 to-purple-700 
              text-white 
              py-3 px-6 
              rounded-full 
              shadow-lg 
              hover:shadow-xl 
              transition-all 
              duration-300 
              transform 
              hover:scale-105
            "
          >
            <ExternalLink className="mr-2" />
            Explore Global Talent Network
          </button>
          <p className="mt-3 text-sm text-gray-500">
            Discover top talent across multiple platforms
          </p>
        </div>
      </div>

      {/* Footer */}
      {/* <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        Powered by Aurjobs AI Sourcing Technology
      </div> */}
    </div>
  );
};

export default SourcingPortal;