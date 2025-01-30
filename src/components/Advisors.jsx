import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Deepith from '../assets/DeepithPatil.png';
import Shubham from '../assets/shubham.png';

const Advisors = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const testimonials = [
    {
      name: "Deepit Patil",
      position: "Founder & CTO",
      company: "Craze (YC S22)",
      image: Deepith,
      rating: 5,
      text: "Craze's AI-driven hiring platform has streamlined our recruitment process. The precision and efficiency of the system have significantly reduced our time-to-hire while ensuring we find the best talent.",
      linkedin: "https://www.linkedin.com/in/deepitpatil/" // LinkedIn URL
    },
    {
      name: "Shubham Srivastava",
      position: "Co-Founder",
      company: "ElecTorq Technologies",
      image: Shubham,
      rating: 5,
      text: "ElecTorq Technologies has benefited immensely from the AI-powered hiring solutions. The ability to quickly assess candidates based on both technical and behavioral skills has helped us build a stronger team.",
      linkedin: "https://www.linkedin.com/in/shubham-srivastava-4ab945128/?originalSubdomain=in" // LinkedIn URL
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    // <div className="w-full flex justify-center items-center min-h-auto bg-gray-600 m-0 p-0">
    //   <div className="w-[90%] p-6 bg-gray-600 rounded-md">
    //     <div className="flex flex-col md:flex-row gap-8">
    //       {/* Image Section */}
    //       <div className="w-full md:w-1/2 flex items-center justify-center">
    //         <div className="relative flex justify-center items-center w-full h-full md:h-auto">
    //           <img
    //             src={testimonials[currentSlide].image}
    //             alt={testimonials[currentSlide].name}
    //             className="w-[50%] h-auto rounded-2xl object-contain transition-transform duration-500"
    //           />
    //         </div>
    //       </div>


    //       {/* Content Section */}
    //       <div className="w-full md:w-1/2 flex flex-col items-start justify-center text-white space-y-6">
    //         {/* Star Rating */}
    //         <div className="flex gap-1">
    //           {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
    //             <svg
    //               key={i}
    //               className="w-10 h-10 text-start text-cyan-400"
    //               fill="currentColor"
    //               viewBox="0 0 20 20"
    //             >
    //               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    //             </svg>
    //           ))}
    //         </div>

    //         {/* Testimonial Text */}
    //         <p className="text-3xl leading-relaxed">
    //           "{testimonials[currentSlide].text}"
    //         </p>

    //         {/* Author Info */}
    //         <div>
    //           <h3 className="text-xl font-semibold">
    //             <a
    //               href={testimonials[currentSlide].linkedin}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="text-cyan-400 hover:underline"
    //             >
    //               {testimonials[currentSlide].name}
    //             </a>
    //           </h3>
    //           <p className="text-gray-600">{testimonials[currentSlide].company}</p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="flex flex-row justify-between m-4">
    //       {/* Dots Indicator */}
    //       <div className="flex gap-4 mt-6">
    //         {testimonials.map((_, index) => (
    //           <button
    //             key={index}
    //             onClick={() => setCurrentSlide(index)}
    //             className={`w-3 hover:cursor-pointer h-3 rounded-full transition-colors ${currentSlide === index ? "bg-cyan-400" : "bg-white"}`}
    //           />
    //         ))}
    //       </div>
    //       <div className="flex gap-4 items-center">
    //         <button
    //           onClick={prevSlide}
    //           className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:cursor-pointer"
    //         >
    //           <ChevronLeft className="w-6 h-6 text-white" />
    //         </button>
    //         <button
    //           onClick={nextSlide}
    //           className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:cursor-pointer"
    //         >
    //           <ChevronRight className="w-6 h-6 text-white" />
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="w-full flex justify-center items-center bg-gray-600 m-0 p-0">
      <div className="w-[95%] md:w-[90%] p-4 md:p-6 bg-gray-600 rounded-md">

        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6 md:mb-8">Our Advisors</h2>


        <div className="flex flex-col md:flex-row gap-4 md:gap-8 min-h-[400px] md:h-[500px]">

          <div className="w-full md:w-1/2 flex items-center justify-center h-[250px] md:h-full">
            <div className="relative flex justify-center items-center w-full h-full">
              <img
                src={testimonials[currentSlide].image}
                alt={testimonials[currentSlide].name}
                className="max-h-full max-w-[80%] md:max-w-full w-auto rounded-2xl object-contain transition-transform duration-500"
              />
            </div>
          </div>


          <div className="w-full md:w-1/2 flex flex-col items-start justify-start md:justify-center text-white space-y-4 md:space-y-6 h-full overflow-y-auto px-2">

            <div className="flex gap-1">
              {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 md:w-10 md:h-10 text-start text-cyan-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>


            <p className="text-xl md:text-3xl leading-relaxed">
              "{testimonials[currentSlide].text}"
            </p>


            <div className="mt-2 md:mt-4">
              <h3 className="text-lg md:text-xl font-semibold">
                <a
                  href={testimonials[currentSlide].linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:underline"
                >
                  {testimonials[currentSlide].name}
                </a>
              </h3>
              <p className="text-sm md:text-base text-gray-400">{testimonials[currentSlide].company}</p>
            </div>
          </div>
        </div>


        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 md:m-4">

          <div className="flex gap-3 md:gap-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2.5 md:w-3 h-2.5 md:h-3 hover:cursor-pointer rounded-full transition-colors ${currentSlide === index ? "bg-cyan-400" : "bg-white"
                  }`}
              />
            ))}
          </div>


          <div className="flex gap-3 md:gap-4 items-center">
            <button
              onClick={prevSlide}
              className="p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 md:p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors hover:cursor-pointer"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Advisors;
