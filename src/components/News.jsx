import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const News = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px", once: true }); // Added once: true

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
      category: ["Technology", "Featured"],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYor3RNcHUFaAZY8Mnke7GOMtHnHxPbG-ldQ&s",
      publisher: {
        name: "TechCrunch",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
      },
      date: "Mar 15",
      readingTime: "5 min",
      title: "Next-Generation AI Models Break New Ground in Natural Language Understanding",
      description:
        "Revolutionary developments in artificial intelligence are pushing the boundaries of what's possible in natural language processing, with new models achieving unprecedented accuracy in understanding context and generating human-like responses.",
      tags: ["#AI", "#Tech"],
    },
    {
            id: 2,
            category: ["Technology", "Featured"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYor3RNcHUFaAZY8Mnke7GOMtHnHxPbG-ldQ&s",
            publisher: {
              name: "TechCrunch",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
            },
            date: "Mar 15",
            readingTime: "5 min",
            title: "Next-Generation AI Models Break New Ground in Natural Language Understanding",
            description:
              "Revolutionary developments in artificial intelligence are pushing the boundaries of what's possible in natural language processing, with new models achieving unprecedented accuracy in understanding context and generating human-like responses.",
            tags: ["#AI", "#Tech"],
          },
          {
            id: 3,
            category: ["Technology", "Featured"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYor3RNcHUFaAZY8Mnke7GOMtHnHxPbG-ldQ&s",
            publisher: {
              name: "TechCrunch",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
            },
            date: "Mar 15",
            readingTime: "5 min",
            title: "Next-Generation AI Models Break New Ground in Natural Language Understanding",
            description:
              "Revolutionary developments in artificial intelligence are pushing the boundaries of what's possible in natural language processing, with new models achieving unprecedented accuracy in understanding context and generating human-like responses.",
            tags: ["#AI", "#Tech"],
          },
          {
            id: 4,
            category: ["Technology", "Featured"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYor3RNcHUFaAZY8Mnke7GOMtHnHxPbG-ldQ&s",
            publisher: {
              name: "TechCrunch",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
            },
            date: "Mar 15",
            readingTime: "5 min",
            title: "Next-Generation AI Models Break New Ground in Natural Language Understanding",
            description:
              "Revolutionary developments in artificial intelligence are pushing the boundaries of what's possible in natural language processing, with new models achieving unprecedented accuracy in understanding context and generating human-like responses.",
            tags: ["#AI", "#Tech"],
          },
          {
            id: 5,
            category: ["Technology", "Featured"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYor3RNcHUFaAZY8Mnke7GOMtHnHxPbG-ldQ&s",
            publisher: {
              name: "TechCrunch",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
            },
            date: "Mar 15",
            readingTime: "5 min",
            title: "Next-Generation AI Models Break New Ground in Natural Language Understanding",
            description:
              "Revolutionary developments in artificial intelligence are pushing the boundaries of what's possible in natural language processing, with new models achieving unprecedented accuracy in understanding context and generating human-like responses.",
            tags: ["#AI", "#Tech"],
          },
          {
            id: 6,
            category: ["Technology", "Featured"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYor3RNcHUFaAZY8Mnke7GOMtHnHxPbG-ldQ&s",
            publisher: {
              name: "TechCrunch",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
            },
            date: "Mar 15",
            readingTime: "5 min",
            title: "Next-Generation AI Models Break New Ground in Natural Language Understanding",
            description:
              "Revolutionary developments in artificial intelligence are pushing the boundaries of what's possible in natural language processing, with new models achieving unprecedented accuracy in understanding context and generating human-like responses.",
            tags: ["#AI", "#Tech"],
          },
          {
            id: 7,
            category: ["Technology", "Featured"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYor3RNcHUFaAZY8Mnke7GOMtHnHxPbG-ldQ&s",
            publisher: {
              name: "TechCrunch",
              logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy9a-nU9zRp5vKTM4twXb_xbyNoZkidVM3Qw&s",
            },
            date: "Mar 15",
            readingTime: "5 min",
            title: "Next-Generation AI Models Break New Ground in Natural Language Understanding",
            description:
              "Revolutionary developments in artificial intelligence are pushing the boundaries of what's possible in natural language processing, with new models achieving unprecedented accuracy in understanding context and generating human-like responses.",
            tags: ["#AI", "#Tech"],
          },
  ];


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
              autoplay={{ delay: 5000 }}
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
                      <img
                        src={item.image}
                        alt="Article thumbnail"
                        className="w-full h-[250px] object-cover transform group-hover:scale-105 transition-transform duration-500"
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
                          Read More
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