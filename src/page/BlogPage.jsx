// import { useState } from 'react';
// import { Search, Heart, MessageCircle, Share2, Bookmark, ChevronRight, Sun } from 'lucide-react';

// export default function BlogPage() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [posts, setPosts] = useState({
//     featured: {
//       id: 1,
//       title: "The Future of Web Development: What to Expect in 2025",
//       excerpt: "Explore emerging trends, tools, and technologies that are reshaping how we build and experience the web. From AI-assisted coding to immersive experiences, we dive into what's next.",
//       category: "FEATURED",
//       image: "/api/placeholder/800/500",
//       author: {
//         name: "Alex Morgan",
//         avatar: "/api/placeholder/100/100"
//       },
//       date: "May 1, 2025",
//       readTime: "10 min read"
//     },
//     latest: [
//       {
//         id: 2,
//         title: "10 Tailwind CSS Tips Every Developer Should Know",
//         excerpt: "Level up your Tailwind skills with these essential tips and tricks for more efficient development.",
//         category: "CSS",
//         image: "/api/placeholder/600/400",
//         author: {
//           name: "Jesse Zhang",
//           avatar: "/api/placeholder/100/100"
//         },
//         date: "Apr 28, 2025",
//         readTime: "8 min read",
//         likes: 142,
//         comments: 24
//       },
//       {
//         id: 3,
//         title: "Building Accessible Components with React",
//         excerpt: "Learn how to create inclusive React components that everyone can use, regardless of their abilities.",
//         category: "Accessibility",
//         image: "/api/placeholder/600/410",
//         author: {
//           name: "Priya Patel",
//           avatar: "/api/placeholder/100/101"
//         },
//         date: "Apr 25, 2025",
//         readTime: "12 min read",
//         likes: 98,
//         comments: 31
//       },
//       {
//         id: 4,
//         title: "State Management in 2025: Beyond Redux",
//         excerpt: "Explore modern state management solutions that are changing how we handle complex application state.",
//         category: "JavaScript",
//         image: "/api/placeholder/600/420",
//         author: {
//           name: "Marcus Johnson",
//           avatar: "/api/placeholder/100/102"
//         },
//         date: "Apr 22, 2025",
//         readTime: "15 min read",
//         likes: 217,
//         comments: 48
//       }
//     ]
//   });
  
//   // Popular topics
//   const [popularTopics, setPopularTopics] = useState([
//     'React', 'JavaScript', 'Web Design', 'Tailwind CSS', 
//     'Accessibility', 'Performance', 'UI/UX', 'Frontend', 
//     'CSS', 'Career', 'TypeScript', 'Next.js'
//   ]);
  
//   // For demonstration: add a new post function
//   const addNewPost = () => {
//     const newPost = {
//       id: posts.latest.length + 5,
//       title: "New Post Title",
//       excerpt: "This is a new post that was dynamically added to demonstrate the array functionality.",
//       category: "New",
//       image: "/api/placeholder/600/430",
//       author: {
//         name: "Jane Doe",
//         avatar: "/api/placeholder/100/103"
//       },
//       date: "May 3, 2025",
//       readTime: "5 min read",
//       likes: 0,
//       comments: 0
//     };
    
//     setPosts(prev => ({
//       ...prev,
//       latest: [...prev.latest, newPost]
//     }));
//   };
  
//   // Function to update featured post
//   const updateFeaturedPost = () => {
//     setPosts(prev => ({
//       ...prev,
//       featured: {
//         ...prev.featured,
//         title: "Updated: The Revolutionary Changes in Web Development",
//         excerpt: "This featured post has been updated to demonstrate how we can modify content dynamically using React state.",
//       }
//     }));
//   };
  
//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };
  
//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} mt-16`}>
//       {/* Navigation */}
//       <button 
//               onClick={toggleDarkMode}
//               className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
//             >
//               <Sun size={20} />
//             </button>

//       <main className="max-w-6xl mx-auto px-4 py-8">
//         {/* Featured Post */}
//         <div className={`mb-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden`}>
//           <div className="md:flex">
//             <div className="md:w-1/2">
//               <img 
//                 src={posts.featured.image} 
//                 alt={posts.featured.title} 
//                 className="h-64 md:h-full w-full object-cover"
//               />
//             </div>
//             <div className="p-6 md:w-1/2 md:p-8 flex flex-col justify-center">
//               <div className={`text-sm font-medium ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} mb-2`}>{posts.featured.category}</div>
//               <h2 className="text-2xl md:text-3xl font-bold mb-3">{posts.featured.title}</h2>
//               <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 line-clamp-3`}>
//                 {posts.featured.excerpt}
//               </p>
//                               <div className="flex items-center mb-6">
//                 <img 
//                   src={posts.featured.author.avatar} 
//                   alt={posts.featured.author.name} 
//                   className="w-10 h-10 rounded-full object-cover mr-3"
//                 />
//                 <div>
//                   <p className="font-medium">{posts.featured.author.name}</p>
//                   <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{posts.featured.date} · {posts.featured.readTime}</p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <button className={`flex items-center ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}>
//                   Read full article <ChevronRight size={16} className="ml-1" />
//                 </button>
//                 {/* <button 
//                   onClick={updateFeaturedPost}
//                   className={`px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} text-sm`}
//                 >
//                   Update Featured Post
//                 </button> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Latest Posts */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Latest Articles</h2>
//             <div className="flex items-center space-x-3">
//               {/* <button 
//                 onClick={addNewPost}
//                 className={`px-3 py-1 text-sm rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
//               >
//                 Add New Post
//               </button> */}
//               <a href="#" className={`${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium flex items-center`}>
//                 View all <ChevronRight size={16} className="ml-1" />
//               </a>
//             </div>
//           </div>
          
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {posts.latest.map((post) => (
//               <div 
//                 key={post.id} 
//                 className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden flex flex-col`}
//               >
//                 <img 
//                   src={post.image} 
//                   alt={post.title} 
//                   className="h-48 w-full object-cover"
//                 />
//                 <div className="p-5 flex-1 flex flex-col">
//                   <div className={`inline-block px-3 py-1 text-xs font-medium ${isDarkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-600'} rounded-full mb-3`}>
//                     {post.category}
//                   </div>
//                   <h3 className="font-bold text-lg mb-2">{post.title}</h3>
//                   <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 flex-1`}>
//                     {post.excerpt}
//                   </p>
//                   <div className="flex items-center mb-4">
//                     <img 
//                       src={post.author.avatar} 
//                       alt={post.author.name} 
//                       className="w-8 h-8 rounded-full object-cover mr-2"
//                     />
//                     <div>
//                       <p className="text-sm font-medium">{post.author.name}</p>
//                       <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{post.date} · {post.readTime}</p>
//                     </div>
//                   </div>
//                   <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center">
//                       <button className={`flex items-center mr-4 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-500 hover:text-red-500'}`}>
//                         <Heart size={18} className="mr-1" /> {post.likes}
//                       </button>
//                       <button className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}>
//                         <MessageCircle size={18} className="mr-1" /> {post.comments}
//                       </button>
//                     </div>
//                     <div className="flex items-center">
//                       <button className={`mr-2 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}>
//                         <Share2 size={18} />
//                       </button>
//                       <button className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-500 hover:text-blue-500'}`}>
//                         <Bookmark size={18} />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Popular Topics */}
//         <div className="mb-12">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold">Popular Topics</h2>
//             <button 
//               onClick={() => setPopularTopics([...popularTopics, 'New Topic'])}
//               className={`text-sm px-3 py-1 rounded ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
//             >
//               Add Topic
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-3">
//             {popularTopics.map((topic, index) => (
//               <a 
//                 key={index}
//                 href="#" 
//                 className={`px-4 py-2 rounded-full text-sm transition-colors ${
//                   isDarkMode 
//                     ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
//                     : 'bg-gray-100 hover:bg-gray-200'
//                 }`}
//               >
//                 {topic}
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Newsletter */}
//         <div className={`rounded-xl p-8 ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-50 to-indigo-100'}`}>
//           <div className="md:flex items-center justify-between">
//             <div className="md:w-3/5 mb-6 md:mb-0">
//               <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Stay updated with our newsletter</h2>
//               <p className={`mb-0 ${isDarkMode ? 'text-blue-100' : 'text-gray-600'}`}>
//                 Get the latest articles, tutorials, and updates delivered straight to your inbox. No spam, we promise!
//               </p>
//             </div>
//             <div className="md:w-2/5">
//               <div className="flex">
//                 <input 
//                   type="email" 
//                   placeholder="Enter your email" 
//                   className={`flex-1 px-4 py-3 rounded-l-lg focus:outline-none ${
//                     isDarkMode 
//                       ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700' 
//                       : 'bg-white border border-gray-200'
//                   }`}
//                 />
//                 <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg font-medium transition">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

   
//     </div>
//   );
// }


import { useState } from 'react';
import { Search, Heart, MessageCircle, Share2, Bookmark, ChevronRight, Sun } from 'lucide-react';
import BlogDetailPage from './BlogDetailPage';

export default function BlogPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [posts, setPosts] = useState({
    featured: {
      id: 1,
      title: "The Future of Web Development: What to Expect in 2025",
      excerpt: "Explore emerging trends, tools, and technologies that are reshaping how we build and experience the web. From AI-assisted coding to immersive experiences, we dive into what's next.",
      category: "FEATURED",
      image: "/api/placeholder/800/500",
      author: {
        name: "Alex Morgan",
        avatar: "/api/placeholder/100/100"
      },
      date: "May 1, 2025",
      readTime: "10 min read",
      likes: 235,
      comments: 42
    },
    latest: [
      {
        id: 2,
        title: "10 Tailwind CSS Tips Every Developer Should Know",
        excerpt: "Level up your Tailwind skills with these essential tips and tricks for more efficient development.",
        category: "CSS",
        image: "/api/placeholder/600/400",
        author: {
          name: "Jesse Zhang",
          avatar: "/api/placeholder/100/100"
        },
        date: "Apr 28, 2025",
        readTime: "8 min read",
        likes: 142,
        comments: 24
      },
      {
        id: 3,
        title: "Building Accessible Components with React",
        excerpt: "Learn how to create inclusive React components that everyone can use, regardless of their abilities.",
        category: "Accessibility",
        image: "/api/placeholder/600/410",
        author: {
          name: "Priya Patel",
          avatar: "/api/placeholder/100/101"
        },
        date: "Apr 25, 2025",
        readTime: "12 min read",
        likes: 98,
        comments: 31
      },
      {
        id: 4,
        title: "State Management in 2025: Beyond Redux",
        excerpt: "Explore modern state management solutions that are changing how we handle complex application state.",
        category: "JavaScript",
        image: "/api/placeholder/600/420",
        author: {
          name: "Marcus Johnson",
          avatar: "/api/placeholder/100/102"
        },
        date: "Apr 22, 2025",
        readTime: "15 min read",
        likes: 217,
        comments: 48
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
                    {post.excerpt}
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