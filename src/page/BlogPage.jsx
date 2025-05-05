


import { useState } from 'react';
import { Search, Heart, MessageCircle, Share2, Bookmark, ChevronRight, Sun } from 'lucide-react';
import BlogDetailPage from './BlogDetailPage';

export default function BlogPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  // const [posts, setPosts] = useState({
  //   featured: {
  //     id: 1,
  //     title: "The Future of Web Development: What to Expect in 2025",
  //     excerpt: "Explore emerging trends, tools, and technologies that are reshaping how we build and experience the web. From AI-assisted coding to immersive experiences, we dive into what's next.",
  //     category: "FEATURED",
  //     image: "/api/placeholder/800/500",
  //     author: {
  //       name: "Alex Morgan",
  //       avatar: "/api/placeholder/100/100"
  //     },
  //     date: "May 1, 2025",
  //     readTime: "10 min read",
  //     likes: 235,
  //     comments: 42
  //   },
  //   latest: [
  //     {
  //       id: 2,
  //       title: "10 Tailwind CSS Tips Every Developer Should Know",
  //       excerpt: "Level up your Tailwind skills with these essential tips and tricks for more efficient development.",
  //       category: "CSS",
  //       image: "/api/placeholder/600/400",
  //       author: {
  //         name: "Jesse Zhang",
  //         avatar: "/api/placeholder/100/100"
  //       },
  //       date: "Apr 28, 2025",
  //       readTime: "8 min read",
  //       likes: 142,
  //       comments: 24
  //     },
  //     {
  //       id: 3,
  //       title: "Building Accessible Components with React",
  //       excerpt: "Learn how to create inclusive React components that everyone can use, regardless of their abilities.",
  //       category: "Accessibility",
  //       image: "/api/placeholder/600/410",
  //       author: {
  //         name: "Priya Patel",
  //         avatar: "/api/placeholder/100/101"
  //       },
  //       date: "Apr 25, 2025",
  //       readTime: "12 min read",
  //       likes: 98,
  //       comments: 31
  //     },
  //     {
  //       id: 4,
  //       title: "State Management in 2025: Beyond Redux",
  //       excerpt: "Explore modern state management solutions that are changing how we handle complex application state.",
  //       category: "JavaScript",
  //       image: "/api/placeholder/600/420",
  //       author: {
  //         name: "Marcus Johnson",
  //         avatar: "/api/placeholder/100/102"
  //       },
  //       date: "Apr 22, 2025",
  //       readTime: "15 min read",
  //       likes: 217,
  //       comments: 48
  //     }
  //   ]
  // });
  const [posts, setPosts] = useState({
    featured: {
      id: 1,
      title: "The Future of Web Development: What to Expect in 2025",
      excerpt: `In the ever-evolving world of web development, we are seeing new tools, frameworks, and technologies shaping the way we build and experience the web. As we move into 2025, trends like AI-assisted coding, the rise of JAMstack, and the growing importance of accessibility will continue to transform the landscape. Developers will need to stay ahead of the curve by embracing these innovations to remain competitive in a fast-paced industry.
  
      One of the most significant shifts in web development is the increasing use of artificial intelligence to assist developers in writing code. AI-driven tools, such as GitHub Copilot, are already helping developers streamline their coding processes, offering real-time suggestions and automating repetitive tasks. As AI continues to improve, we can expect even more intelligent code generation, error detection, and optimization features.
  
      Another trend gaining traction is the JAMstack (JavaScript, APIs, and Markup) architecture. By decoupling the front-end from the back-end, JAMstack allows developers to build faster, more secure websites with improved scalability. This architecture leverages modern tools like static site generators and serverless functions, making it easier to build high-performance websites without complex server setups.
  
      In addition to these advancements, the focus on web accessibility will continue to grow. With an increasing demand for inclusive design, web developers will need to prioritize creating websites and applications that are accessible to all users, regardless of their abilities. This includes implementing WCAG (Web Content Accessibility Guidelines) and incorporating assistive technologies like screen readers.
  
      As we move forward, the tools and technologies shaping the future of web development will become more integrated and intelligent. Developers will need to adapt to new trends and continuously learn to leverage the power of emerging technologies. By doing so, they can create more innovative, efficient, and inclusive web experiences for users around the world.`,
      category: "FEATURED",
      image: "/api/placeholder/800/500",
      author: {
        name: "Alex Morgan",
        avatar: "/api/placeholder/100/100"
      },
      date: "May 1, 2025",
      readTime: "10 min read"
    },
    latest: [
      {
        id: 2,
        title: "Quantum Computing: A Glimpse into the Future of Technology",
        excerpt: `Quantum computing is no longer a concept confined to science fiction. With major advancements in recent years, we are on the cusp of entering a new era where quantum computers will be able to solve problems that classical computers simply cannot. These quantum machines, based on the principles of quantum mechanics, have the potential to revolutionize industries like cryptography, artificial intelligence, and materials science.
  
      Unlike classical computers, which use bits to process information as either 0 or 1, quantum computers use quantum bits, or qubits, that can exist in multiple states simultaneously. This enables them to perform complex calculations much faster than traditional computers. As a result, quantum computing holds promise for solving previously unsolvable problems, such as optimizing supply chains, simulating molecular structures, and breaking encryption algorithms.
  
      However, despite the tremendous potential of quantum computing, there are still significant challenges to overcome. One of the biggest hurdles is error correction. Qubits are highly susceptible to interference from their environment, leading to errors in computations. Researchers are working on developing better error-correction techniques to ensure that quantum computers can operate reliably.
  
      The race for quantum supremacy is on, with companies like Google, IBM, and Microsoft leading the charge. Google recently claimed to have achieved quantum supremacy, meaning that their quantum computer solved a problem faster than the world’s most powerful supercomputers. While this is a significant milestone, there is still much work to be done before quantum computers can be widely used in practical applications.
  
      The future of quantum computing is incredibly exciting, and its potential applications are vast. From improving machine learning models to designing new drugs and materials, quantum computers could help solve some of the world’s most pressing problems. As the technology matures and becomes more accessible, we can expect to see quantum computing play a major role in shaping the future of technology.`,
        category: "Quantum Computing",
        image: "/api/placeholder/600/400",
        author: {
          name: "Dr. Emily Hughes",
          avatar: "/api/placeholder/100/100"
        },
        date: "May 3, 2025",
        readTime: "12 min read",
        likes: 150,
        comments: 18
      },
      {
        id: 3,
        title: "Google's Next-Gen AI: What's New in 2025",
        excerpt: `Google has long been at the forefront of artificial intelligence, and in 2025, the company is unveiling some exciting new advancements in the field. With a focus on enhancing natural language processing, automating complex tasks, and improving accessibility, Google’s new AI developments are set to push the boundaries of what’s possible.
  
      One of the most notable innovations is Google’s next-gen AI, which features enhanced conversational abilities. Leveraging large language models, this AI can engage in more natural, human-like conversations and offer tailored responses based on context. This will have a profound impact on customer service, virtual assistants, and even personal productivity.
  
      Google is also doubling down on automating complex tasks. For example, their AI-driven tools are becoming increasingly adept at automating workflows, helping businesses streamline operations and reduce manual labor. Whether it’s automating content creation or managing data, Google’s AI tools are designed to improve efficiency and productivity.
  
      Accessibility is another area where Google is making significant strides. The company’s AI is now better equipped to assist people with disabilities by offering real-time translation, voice-to-text capabilities, and personalized user experiences. This focus on inclusivity reflects Google’s commitment to making technology more accessible to everyone, regardless of their abilities.
  
      With these advancements, Google is setting a new standard for AI innovation. As the company continues to refine and expand its AI capabilities, we can expect to see even more groundbreaking developments that will shape the future of technology and society. From enhancing user experiences to solving complex problems, Google’s next-gen AI is poised to make a lasting impact on the world.`,
        category: "Google & AI",
        image: "/api/placeholder/600/410",
        author: {
          name: "John Lee",
          avatar: "/api/placeholder/100/101"
        },
        date: "May 5, 2025",
        readTime: "15 min read",
        likes: 220,
        comments: 35
      },
      {
        id: 4,
        title: "The Rise of AI-Driven Healthcare: Transforming the Medical Industry",
        excerpt: `Artificial intelligence (AI) is poised to revolutionize healthcare, from diagnosis to treatment and beyond. In 2025, we are seeing AI-driven technologies that can analyze medical data faster and more accurately than ever before, improving outcomes for patients worldwide. But how exactly is AI transforming the healthcare industry, and what does the future hold?
  
      One of the most promising applications of AI in healthcare is in diagnostics. AI algorithms are now able to analyze medical images, such as X-rays and MRIs, to identify signs of disease with a level of precision that rivals that of human doctors. For example, AI can detect early-stage cancers or identify abnormalities in heart scans, providing doctors with valuable insights that can lead to earlier and more effective treatments.
  
      AI is also helping to improve personalized medicine. By analyzing vast amounts of patient data, including genetics, lifestyle, and medical history, AI can predict which treatments are likely to be most effective for a particular individual. This level of personalized care has the potential to improve patient outcomes while reducing the risk of adverse reactions to treatments.
  
      Beyond diagnostics, AI is playing a crucial role in drug discovery. Traditional drug development is a lengthy and expensive process, but AI can help accelerate this process by analyzing vast datasets to identify potential drug candidates. In fact, several pharmaceutical companies are already using AI to design drugs that target specific proteins associated with diseases, such as cancer and Alzheimer’s.
  
      The integration of AI in healthcare is not without its challenges. Concerns about data privacy, regulatory hurdles, and the need for proper training remain. However, the benefits of AI-driven healthcare are undeniable. As the technology continues to evolve, we can expect to see AI becoming an integral part of medical practice, improving both the quality of care and the efficiency of healthcare systems worldwide.`,
        category: "AI & Healthcare",
        image: "/api/placeholder/600/420",
        author: {
          name: "Jessica Ortiz",
          avatar: "/api/placeholder/100/102"
        },
        date: "May 7, 2025",
        readTime: "14 min read",
        likes: 180,
        comments: 28
      },
      {
        id: 5,
        title: "5G Technology: How It Will Change the Internet Experience",
        excerpt: `5G is the next generation of mobile internet connectivity, offering faster speeds, lower latency, and greater capacity compared to previous generations. As we move into 2025, 5G is set to revolutionize industries by enabling new technologies, improving user experiences, and creating new opportunities for innovation.
  
      One of the key benefits of 5G is its speed. With download speeds up to 100 times faster than 4G, 5G enables instantaneous data transfer, allowing users to stream ultra-high-definition videos, play latency-free games, and download large files in seconds. This will have a profound impact on sectors such as entertainment, gaming, and media, as content creators and consumers can experience seamless streaming and high-quality content delivery.
  
      Another major advantage of 5G is its low latency. This is particularly important for applications that require real-time communication, such as remote surgery, autonomous vehicles, and virtual reality. With 5G, these technologies can operate with minimal delay, opening up new possibilities for industries that rely on instant data transmission and decision-making.
  
      Additionally, 5G’s increased capacity will allow for more devices to be connected to the internet simultaneously. This is essential for the growth of the Internet of Things (IoT), as billions of devices will be able to communicate and share data with minimal interference. From smart homes to connected factories, 5G will enable a fully connected world.
  
      As 5G networks continue to roll out globally, we can expect the technology to drive innovation across numerous industries. Whether it's enhancing our everyday internet experience or powering the next wave of technological advancements, 5G is set to transform the way we live and work in the years to come.`,
        category: "5G Technology",
        image: "/api/placeholder/600/430",
        author: {
          name: "Michael Davis",
          avatar: "/api/placeholder/100/103"
        },
        date: "May 9, 2025",
        readTime: "13 min read",
        likes: 200,
        comments: 45
      }
    ]
  });
  
  // Popular topics
  const [popularTopics, setPopularTopics] = useState([
    'React', 'JavaScript', 'Web Design', 'Tailwind CSS', 
    'Accessibility', 'Performance', 'UI/UX', 'Frontend', 
    'CSS', 'Career', 'TypeScript', 'Next.js'
  ]);
  
  // Function to navigate to post detail
  const navigateToPost = (postId) => {
    setSelectedPostId(postId);
    window.scrollTo(0, 0);
  };
  
  // Function to go back to main blog page
  const goBackToMain = () => {
    setSelectedPostId(null);
    window.scrollTo(0, 0);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // If a post is selected, show the detail page
  if (selectedPostId) {
    return (
      <BlogDetailPage 
        postId={selectedPostId} 
        onBack={goBackToMain} 
        allPosts={posts}
      />
    );
  }
  
  // Otherwise show the main blog page
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Navigation */}
      <header className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dev Blog</h1>
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
          >
            <Sun size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Featured Post */}
        <div 
          className={`mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden cursor-pointer`}
          onClick={() => navigateToPost(posts.featured.id)}
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={posts.featured.image} 
                alt={posts.featured.title} 
                className="h-64 md:h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2 md:p-8 flex flex-col justify-center">
              <div className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>{posts.featured.category}</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">{posts.featured.title}</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 line-clamp-3`}>
                {posts.featured.excerpt}
              </p>
              <div className="flex items-center mb-6">
                <img 
                  src={posts.featured.author.avatar} 
                  alt={posts.featured.author.name} 
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-medium">{posts.featured.author.name}</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{posts.featured.date} · {posts.featured.readTime}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  className={`flex items-center ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent the parent div's onClick from firing
                    navigateToPost(posts.featured.id);
                  }}
                >
                  Read full article <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Posts */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <div className="flex items-center space-x-3">
              <a href="#" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium flex items-center`}>
                View all <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.latest.map((post) => (
              <div 
                key={post.id} 
                className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer`}
                onClick={() => navigateToPost(post.id)}
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <div className={`inline-block px-3 py-1 text-xs font-medium ${isDarkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-600'} rounded-full mb-3`}>
                    {post.category}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 flex-1`}>
                    {post.excerpt.slice(0,80)}...
                  </p>
                  <div className="flex items-center mb-4">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-8 h-8 rounded-full object-cover mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{post.date} · {post.readTime}</p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <button 
                        className={`flex items-center mr-4 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}
                        onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking on like
                      >
                        <Heart size={18} className="mr-1" /> {post.likes}
                      </button>
                      <button 
                        className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}
                        onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking on comments
                      >
                        <MessageCircle size={18} className="mr-1" /> {post.comments}
                      </button>
                    </div>
                    <div className="flex items-center">
                      <button 
                        className={`mr-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}
                        onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking on share
                      >
                        <Share2 size={18} />
                      </button>
                      <button 
                        className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}
                        onClick={(e) => e.stopPropagation()} // Prevent navigation when clicking on bookmark
                      >
                        <Bookmark size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Topics</h2>
            <button 
              onClick={() => setPopularTopics([...popularTopics, 'New Topic'])}
              className={`text-sm px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              Add Topic
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {popularTopics.map((topic, index) => (
              <a 
                key={index}
                href="#" 
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {topic}
              </a>
            ))}
          </div>
        </div>

                 <div className={`rounded-xl p-8 ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-50 to-indigo-100'}`}>
           <div className="md:flex items-center justify-between">
             <div className="md:w-3/5 mb-6 md:mb-0">
               <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Stay updated with our newsletter</h2>
               <p className={`mb-0 ${isDarkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                 Get the latest articles, tutorials, and updates delivered straight to your inbox. No spam, we promise!
               </p>
             </div>
             <div className="md:w-2/5">
               <div className="flex">
                 <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className={`flex-1 px-4 py-3 rounded-l-lg focus:outline-none ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
                      : 'bg-white border border-gray-200'
                  }`}
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

   
    </div>
  );
}