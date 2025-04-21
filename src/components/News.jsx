
import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const News = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true });
  const [expandedIframe, setExpandedIframe] = useState(null);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const slideVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const newsItems = [
    {
      id: 1,
      category: ["Startup", "AI", "Featured"],
      image: "https://ph-files.imgix.net/9390b14e-494b-4787-a466-a47f697b71e2.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=528&h=220&fit=max&frame=1&dpr=2",
      publisher: {
        name: "Product Hunt",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
      },
      date: "April 21",
      readingTime: "3 min",
      title: "Aurjobs Launches on Product Hunt: AI-Driven Recruitment Platform",
      description:
        "Aurjobs has officially launched on Product Hunt, offering an AI-Agent-driven recruitment platform that automates sourcing, screening, and interviews to help companies hire faster, smarter, and bias-free. The platform aims to streamline recruitment processes for startups, recruiters, and HR leaders.",
      tags: ["#AIRecruitment", "#HRTech", "#StartupLaunch"],
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7305148200149995520/",
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7305148200149995520/"
    },
    {
      id: 2,
      category: ["Event", "Startup"],
      image: "https://media.licdn.com/dms/image/v2/D5622AQEX5L1PZBKvwQ/feedshare-shrink_2048_1536/B56ZYZ2BprH0Ao-/0/1744190323634?e=1747872000&v=beta&t=dh3FG6g3TI7bCG2oLO-HW09kqOorern4AiVxTEL46Eo",
      publisher: {
        name: "Startup India",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
      },
      date: "April 18",
      readingTime: "5 min",
      title: "Aurjobs Showcased at Startup Mahakumbh 2025",
      description:
        "Keshav Agarwal presented Aurjobs, an AI-powered recruitment platform, at Startup Mahakumbh 2025, one of India's biggest startup events. The team had notable interactions with InfoEdge founder Sanjeev Bikhchandani and apna COO Karna Chokshi, gaining valuable insights on AI's role in transforming recruitment.",
      tags: ["#StartupMahakumbh", "#AI", "#Recruitment"],
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7315664459694256128/",
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7315664459694256128"
    },
    {
      id: 3,
      category: ["Event", "Google"],
      image: "https://media.licdn.com/dms/image/v2/D5622AQGkTHCZ_I_Mrg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1730103286779?e=1747872000&v=beta&t=DDXFmP8GF8QNMq0CfsEgRDPOYF7XQ_W81DdYor3q0ec",
      publisher: {
        name: "Google for Startups",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s", // Replace with Google logo
      },
      date: "April 20",
      readingTime: "4 min",
      title: "Aurjobs Represents at Google for Startups Meetup",
      description:
        "Aurjobs team attended Google for Startups Meetup at Google's office. The interactive sessions on AI and the Startup School by Google provided valuable insights on innovation and future technologies that will guide Aurjobs' growth and evolution.",
      tags: ["#GoogleForStartups", "#AI", "#Startup"],
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7256579235585089536/", // Replace with actual post URL when available
      embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7256579235585089536/" // Replace with actual embed URL when available
    }
  ];

  const toggleIframeExpansion = (id) => {
    if (expandedIframe === id) {
      setExpandedIframe(null);
    } else {
      setExpandedIframe(id);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div 
        ref={ref}
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
        >
          <h1 className="text-4xl lg:text-4xl font-bold">
            Aurjobs In <span className="text-blue-600">News</span>
          </h1>
        </motion.div>

        <div className="">
          <div className="w-full ml-0 md:ml-0 mx-auto py-10 md:px-5">
            <Swiper
              style={{
                "--swiper-pagination-color": "#EF4444",
                "--swiper-pagination-bullet-inactive-color": "#999999",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bullet-size": "10px",
                "--swiper-pagination-bullet-horizontal-gap": "6px"
              }}
              modules={[Pagination, Autoplay]}
              loop={true}
              speed={600}
              autoplay={{ delay: 5000, disableOnInteraction: true }}
              slidesPerView={3}
              spaceBetween={30}
              breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              pagination={{
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true
              }}
              className="mySwiper"
            >
              {newsItems.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <motion.div
                    variants={slideVariants}
                    className="max-w-md bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden">
                      <div className="absolute top-4 left-4 z-10 flex gap-2">
                        {item.category.map((cat, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 text-xs font-medium ${
                              idx === 0 ? 'bg-blue-600' : 'bg-purple-600'
                            } text-white rounded-full`}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      {/* <img
                        src={item.image}
                        alt="Article thumbnail"
                        className="w-full h-[250px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                      /> */}
                      <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                        <img
                            src={item.publisher.logo}
                            alt="Publisher logo"
                            className="w-8 h-8 rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-700">{item.publisher.name}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{item.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{item.readingTime}</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>

                      {/* Embedded iframe section */}
                      {/* {item.embedUrl && (
                        <div className={`relative mb-4 iframe-container ${expandedIframe === item.id ? 'h-96' : 'h-60'}`}>
                          <iframe 
                            src={item.embedUrl} 
                            className="absolute top-0 left-0 w-full h-full border-0 rounded-lg overflow-hidden"
                            title={item.title}
                            allowFullScreen
                          ></iframe>
                          <button 
                            onClick={() => toggleIframeExpansion(item.id)}
                            className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md"
                          >
                            {expandedIframe === item.id ? (
                              <Minimize2 className="w-5 h-5 text-gray-700" />
                            ) : (
                              <Maximize2 className="w-5 h-5 text-gray-700" />
                            )}
                          </button>
                        </div>
                      )} */}

                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {item.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 group/btn">
                          <a target='_blank' href={item.link} rel="noopener noreferrer">Read More</a>
                          <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default News;


// import React, { useRef, useState } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { Calendar, Clock, ArrowUpRight, ExternalLink, Maximize2, Minimize2 } from 'lucide-react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import { Autoplay, Pagination } from 'swiper/modules';

// const News = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { margin: "-100px", once: true });
//   const [expandedIframe, setExpandedIframe] = useState(null);

//   const containerVariants = {
//     hidden: {
//       opacity: 0,
//       y: 50
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         when: "beforeChildren",
//         staggerChildren: 0.2
//       }
//     }
//   };

//   const headerVariants = {
//     hidden: {
//       opacity: 0,
//       y: 30
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         ease: "easeOut"
//       }
//     }
//   };

//   const slideVariants = {
//     hidden: {
//       opacity: 0,
//       y: 20
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut"
//       }
//     }
//   };

//   const newsItems = [
//     {
//       id: 1,
//       category: ["Startup", "AI", "Featured"],
//       image: "https://ph-files.imgix.net/9390b14e-494b-4787-a466-a47f697b71e2.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=528&h=220&fit=max&frame=1&dpr=2",
//       publisher: {
//         name: "Product Hunt",
//         logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
//       },
//       date: "April 21",
//       readingTime: "3 min",
//       title: "Aurjobs Launches on Product Hunt: AI-Driven Recruitment Platform",
//       description:
//         "Aurjobs has officially launched on Product Hunt, offering an AI-Agent-driven recruitment platform that automates sourcing, screening, and interviews to help companies hire faster, smarter, and bias-free. The platform aims to streamline recruitment processes for startups, recruiters, and HR leaders.",
//       tags: ["#AIRecruitment", "#HRTech", "#StartupLaunch"],
//       link: "https://www.linkedin.com/feed/update/urn:li:activity:7305148200149995520/",
//       embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7305148200149995520/"
//     },
//     {
//       id: 2,
//       category: ["Event", "Startup"],
//       image: "https://media.licdn.com/dms/image/v2/D5622AQEX5L1PZBKvwQ/feedshare-shrink_2048_1536/B56ZYZ2BprH0Ao-/0/1744190323634?e=1747872000&v=beta&t=dh3FG6g3TI7bCG2oLO-HW09kqOorern4AiVxTEL46Eo",
//       publisher: {
//         name: "Startup India",
//         logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
//       },
//       date: "April 18",
//       readingTime: "5 min",
//       title: "Aurjobs Showcased at Startup Mahakumbh 2025",
//       description:
//         "Keshav Agarwal presented Aurjobs, an AI-powered recruitment platform, at Startup Mahakumbh 2025, one of India's biggest startup events. The team had notable interactions with InfoEdge founder Sanjeev Bikhchandani and apna COO Karna Chokshi, gaining valuable insights on AI's role in transforming recruitment.",
//       tags: ["#StartupMahakumbh", "#AI", "#Recruitment"],
//       link: "https://www.linkedin.com/feed/update/urn:li:activity:7315664459694256128/",
//       embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7315664459694256128"
//     },
//     {
//       id: 3,
//       category: ["Event", "Google"],
//       image: "https://media.licdn.com/dms/image/D5622AQH2vJ3WxgRVPQ/feedshare-shrink_800/0/1714123468755?e=1717027200&v=beta&t=5-l5qnYrS5LdK8UG9xXOBrXBzqEbK1aMg2deYQJfNbQ", 
//       publisher: {
//         name: "Google for Startups",
//         logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMNWFWwCBytFvmRYs0Z5G-3qz2npMhgYop7g&s",
//       },
//       date: "April 20",
//       readingTime: "4 min",
//       title: "Aurjobs Represents at Google for Startups Meetup",
//       description:
//         "Aurjobs team attended Google for Startups Meetup at Google's office. The interactive sessions on AI and the Startup School by Google provided valuable insights on innovation and future technologies that will guide Aurjobs' growth and evolution.",
//       tags: ["#GoogleForStartups", "#AI", "#Startup"],
//       link: "https://www.linkedin.com/feed/update/urn:li:activity:7256579235585089536/",
//       embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:activity:7256579235585089536/"
//     }
//   ];

//   const toggleIframeExpansion = (id) => {
//     if (expandedIframe === id) {
//       setExpandedIframe(null);
//     } else {
//       setExpandedIframe(id);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center bg-gray-50">
//       <motion.div 
//         ref={ref}
//         className="container mx-auto px-4 py-20"
//         variants={containerVariants}
//         initial="hidden"
//         animate={isInView ? "visible" : "hidden"}
//       >
//         <motion.div 
//           className="text-center mb-16"
//           variants={headerVariants}
//         >
//           <h1 className="text-4xl lg:text-5xl font-bold">
//             Aurjobs In <span className="text-blue-600">News</span>
//           </h1>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             Check out our latest highlights and updates from across the industry
//           </p>
//         </motion.div>

//         <div className="w-full mx-auto">
//           <Swiper
//             style={{
//               "--swiper-pagination-color": "#2563EB",
//               "--swiper-pagination-bullet-inactive-color": "#CBD5E1",
//               "--swiper-pagination-bullet-inactive-opacity": "1",
//               "--swiper-pagination-bullet-size": "10px",
//               "--swiper-pagination-bullet-horizontal-gap": "6px"
//             }}
//             modules={[Pagination, Autoplay]}
//             loop={true}
//             speed={600}
//             autoplay={{ delay: 5000, disableOnInteraction: true }}
//             slidesPerView={3}
//             spaceBetween={30}
//             breakpoints={{
//               320: { slidesPerView: 1 },
//               480: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               1024: { slidesPerView: 3 }
//             }}
//             pagination={{
//               clickable: true
//             }}
//             className="pb-12"
//           >
//             {newsItems.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <motion.div
//                   variants={slideVariants}
//                   className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group h-full flex flex-col"
//                 >
//                   <div className="relative overflow-hidden">
//                     <div className="absolute top-4 left-4 z-10 flex gap-2">
//                       {item.category.map((cat, idx) => (
//                         <span
//                           key={idx}
//                           className={`px-3 py-1 text-xs font-medium ${
//                             cat === 'Featured' ? 'bg-yellow-500' : 
//                             cat === 'AI' ? 'bg-blue-600' : 
//                             cat === 'Startup' ? 'bg-purple-600' : 
//                             cat === 'Event' ? 'bg-green-600' : 
//                             cat === 'Google' ? 'bg-red-500' : 'bg-gray-600'
//                           } text-white rounded-full shadow-md`}
//                         >
//                           {cat}
//                         </span>
//                       ))}
//                     </div>
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
//                     />
//                   </div>

//                   <div className="p-6 flex-grow flex flex-col">
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center gap-2">
//                         <img
//                           src={item.publisher.logo}
//                           alt={`${item.publisher.name} logo`}
//                           className="w-8 h-8 rounded-full shadow-sm"
//                         />
//                         <span className="text-sm font-medium text-gray-700">{item.publisher.name}</span>
//                       </div>
//                       <div className="flex items-center gap-4 text-sm text-gray-500">
//                         <div className="flex items-center gap-1">
//                           <Calendar className="w-4 h-4" />
//                           <span>{item.date}</span>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Clock className="w-4 h-4" />
//                           <span>{item.readingTime}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
//                       {item.title}
//                     </h3>

//                     <p className="text-gray-600 mb-4">{item.description}</p>

//                     {/* Embedded iframe section with better responsiveness */}
//                     {item.embedUrl && (
//                       <div className={`relative mb-4 ${expandedIframe === item.id ? 'h-96' : 'h-64'} transition-all duration-300 rounded-lg shadow-md overflow-hidden`}>
//                         <iframe 
//                           src={item.embedUrl} 
//                           className="absolute top-0 left-0 w-full h-full border-0"
//                           title={item.title}
//                           allowFullScreen
//                         ></iframe>
//                         <button 
//                           onClick={() => toggleIframeExpansion(item.id)}
//                           className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
//                           aria-label={expandedIframe === item.id ? "Minimize" : "Maximize"}
//                         >
//                           {expandedIframe === item.id ? (
//                             <Minimize2 className="w-4 h-4 text-gray-700" />
//                           ) : (
//                             <Maximize2 className="w-4 h-4 text-gray-700" />
//                           )}
//                         </button>
//                       </div>
//                     )}

//                     <div className="mt-auto pt-4">
//                       <div className="flex flex-wrap gap-2 mb-4">
//                         {item.tags.map((tag, idx) => (
//                           <span
//                             key={idx}
//                             className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                       <a 
//                         href={item.link} 
//                         target="_blank" 
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group/btn"
//                       >
//                         Read More
//                         <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
//                       </a>
//                     </div>
//                   </div>
//                 </motion.div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default News;