import { useState, useEffect } from 'react';
import { ChevronLeft, Heart, MessageCircle, Share2, Bookmark, Sun } from 'lucide-react';

export default function BlogDetailPage({ postId, onBack, allPosts }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    // Find the post with the matching ID from all posts
    let currentPost = null;
    
    // Check featured post
    if (allPosts.featured && allPosts.featured.id === postId) {
      currentPost = allPosts.featured;
    } 
    // Check latest posts
    else if (allPosts.latest) {
      currentPost = allPosts.latest.find(p => p.id === postId);
    }
    
    setPost(currentPost);
    
    // Find related posts (excluding current post)
    if (currentPost && allPosts.latest) {
      // For simplicity, we'll just show other posts as related
      // In a real app, you might filter by category or tag
      const related = allPosts.latest
        .filter(p => p.id !== postId)
        .slice(0, 2); // Show up to 2 related posts
      
      setRelatedPosts(related);
    }
  }, [postId, allPosts]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!post) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
        <p>Loading article...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen mt-20 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={onBack}
            className={`flex items-center ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} font-medium`}
          >
            <ChevronLeft size={20} className="mr-1" /> Back to blogs
          </button>
          
          <button 
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'}`}
          >
            <Sun size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="mb-8">
          <div className={`inline-block px-3 py-1 text-sm font-medium ${isDarkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-600'} rounded-full mb-4`}>
            {post.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>
          
          <div className="flex items-center mb-6">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-12 h-12 rounded-full object-cover mr-4"
            />
            <div>
              <p className="font-medium text-lg">{post.author.name}</p>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {post.date} · {post.readTime}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-8">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-64 md:h-96 object-cover rounded-xl"
          />
        </div>

        {/* Article Content */}
        <article className={`prose lg:prose-xl max-w-none ${isDarkMode ? 'prose-invert' : ''} mb-12`}>
          <p>
            {post.excerpt}
          </p>
          
        </article>

        {/* Article Actions */}
        <div className={`flex justify-between items-center py-6 border-t border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} mb-8`}>
          <div className="flex items-center">
            <button className={`flex items-center mr-6 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-600 hover:text-red-500'}`}>
              <Heart size={20} className="mr-2" /> 
              {post.likes || 0} Likes
            </button>
            <button className={`flex items-center ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}>
              <MessageCircle size={20} className="mr-2" /> 
              {post.comments || 0} Comments
            </button>
          </div>
          <div className="flex items-center">
            <button className={`mr-4 ${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}>
              <Share2 size={20} />
            </button>
            <button className={`${isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-600 hover:text-blue-500'}`}>
              <Bookmark size={20} />
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-xl p-6 mb-12`}>
          <div className="flex items-start">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-xl font-bold mb-2">About {post.author.name}</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Professional web developer and writer with over 10 years of experience in building modern web applications. Passionate about sharing knowledge and helping others grow in their tech careers.
              </p>
              <div className="flex space-x-3">
                <a href="#" className={`px-4 py-2 text-sm rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-200'}`}>
                  Follow
                </a>
                <a href="#" className={`px-4 py-2 text-sm rounded-full ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                  See all posts
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((rPost) => (
                <div 
                  key={rPost.id} 
                  className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md overflow-hidden cursor-pointer`}
                  onClick={() => {
                    setPost(rPost);
                    window.scrollTo(0, 0);
                  }}
                >
                  <img 
                    src={rPost.image} 
                    alt={rPost.title} 
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5">
                    <div className={`inline-block px-3 py-1 text-xs font-medium ${isDarkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-600'} rounded-full mb-3`}>
                      {rPost.category}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{rPost.title}</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 line-clamp-2`}>
                      {rPost.excerpt}
                    </p>
                    <div className="flex items-center">
                      <img 
                        src={rPost.author.avatar} 
                        alt={rPost.author.name} 
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium">{rPost.author.name}</p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{rPost.date} · {rPost.readTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comment Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Comments ({post.comments || 0})</h2>
          
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6 mb-8`}>
            <h3 className="text-lg font-bold mb-4">Leave a comment</h3>
            <textarea 
              className={`w-full p-4 rounded-lg mb-4 ${
                isDarkMode 
                  ? 'bg-gray-700 text-white border-gray-600' 
                  : 'bg-gray-50 border border-gray-200'
              }`}
              placeholder="Share your thoughts..."
              rows={4}
            ></textarea>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Post Comment
            </button>
          </div>

          {/* Sample comments */}
          {post.comments && post.comments > 0 && (
            <div className="space-y-6">
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
                <div className="flex items-start mb-4">
                  <img 
                    src="/api/placeholder/100/104" 
                    alt="User" 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium">Sarah Williams</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>3 days ago</p>
                  </div>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Great article! I've been looking for information on this topic for a while. Your insights are really helpful.
                </p>
              </div>
              
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-6`}>
                <div className="flex items-start mb-4">
                  <img 
                    src="/api/placeholder/100/105" 
                    alt="User" 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="font-medium">David Chen</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>1 day ago</p>
                  </div>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  I have a question about one of the points you made. Could you clarify more about the implementation details? I'm trying to apply this to my current project.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* <footer className={`py-8 ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2025 Dev Blog. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
}