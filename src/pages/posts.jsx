import React, { useState } from 'react';
import { Search, Bell, User, Home, PlusCircle, Bookmark, MessageCircle, Hash, Globe, Camera } from 'lucide-react';
 import axios from 'axios'; 
 import { IoIosAddCircleOutline } from "react-icons/io";
 import { FiMessageCircle } from "react-icons/fi";
 import { FaFacebookMessenger } from "react-icons/fa";
 import { AiOutlineLike } from "react-icons/ai";
 import { FaRegShareSquare } from "react-icons/fa";
 import { CiBookmarkPlus } from "react-icons/ci";
//  import { User } from "lucide-react";


function Posts() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    image: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');


async function handleSubmit(e) {
  e.preventDefault();
  setError('');
  setSuccess('');

  const { title, description, tags, image } = formData;
  const email = localStorage.getItem("userEmail"); 

  if (!title || !description || !tags || !image || !email) {
    setError('All fields including email are required');
    return;
  }

  try {
    const result = await axios.post('http://localhost:5000/userpost', {
      title,
      description,
      tags,
      image,
      email, 
    });

    if (result.status === 201) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData({
        title: '',
        description: '',
        tags: '',
        image: '',
      });
      setImagePreview('');
      setSuccess('Post created successfully!');
    } else {
      setError('Unexpected response from server');
    }
  } catch (error) {
    if (error.response) {
      setError(error.response.data?.message || 'Failed to create post');
    } else if (error.request) {
      setError('No response from server. Please try again later.');
    } else {
      setError('An error occurred. Please try again.');
    }
  }
}


  const handleImageChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
   <div className="bg-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between shadow-md">
  {/* Logo / Title */}
  <a
    href="/userexplore"
    className="text-3xl font-bold text-white px-4 py-2 hover:text-gray-300"
  >
    IdeaNest
  </a>

  {/* Action Buttons */}
  <div className="flex items-center gap-4">
    {/* Post Button */}
    <a
      href="/userexplore"
      className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
    >
      {/* <IoIosAddCircleOutline className="text-2xl" /> */}
      <span className="text-lg font-medium">Explore</span>
    </a>

    {/* Dashboard Button */}
    <a
      href="/Dashboard"
      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
    >
      <User className="w-5 h-5" />
      <span className="text-lg font-medium">Dashboard</span>
    </a>

    {/* Message Button */}
    <a
      href="/Chat"
      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200"
    >
      <FiMessageCircle className="w-5 h-5" />
      <span className="text-lg font-medium">Message</span>
    </a>
  </div>
</div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-6 h-6" />
                  Create a New Post
                </h2>
                <p className="text-blue-100 mt-1">Share your thoughts with the community</p>
              </div>

              <div className="p-6">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg">
                    <div className="flex items-center">
                      <span className="font-medium">{error}</span>
                    </div>
                  </div>
                )}
                
                {success && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-r-lg">
                    <div className="flex items-center">
                      <span className="font-medium">{success}</span>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                      <Hash className="w-4 h-4" />
                      Post Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="What's the title of your post?"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                      <MessageCircle className="w-4 h-4" />
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white resize-y"
                      rows="5"
                      placeholder="What do you want to talk about?"
                    ></textarea>
                    <p className="text-xs text-gray-500 flex justify-end">
                      {formData.description.length} characters
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="image" className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                      <Camera className="w-4 h-4" />
                      Image URL
                    </label>
                    <input
                      type="text"
                      id="image"
                      value={formData.image}
                      onChange={handleImageChange}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="https://example.com/image.jpg"
                    />
                    {imagePreview && (
                      <div className="mt-3 rounded-xl overflow-hidden border border-gray-200">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover"
                          onError={() => setImagePreview('')}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="tags" className="flex items-center text-sm font-semibold text-gray-700 gap-2">
                      <Hash className="w-4 h-4" />
                      Tags
                    </label>
                    <input
                      type="text"
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                      placeholder="Add tags (e.g., AI, ML)"
                    />
                    <p className="text-xs text-gray-500">Separate tags with commas</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        Public
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                      >
                        Save Draft
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Writing Tips */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Writing Tips</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Keep your title clear and engaging to attract readers</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Use high-quality images to make your post visually appealing</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Add relevant tags to help others discover your content</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Write compelling descriptions that tell a story</p>
                </div>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {['AI', 'ML', 'technology', 'design', 'lifestyle', 'photography', 'travel', 'coding','IOT'].map((tag) => (
                  <button
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    onClick={() => {
                      const currentTags = formData.tags;
                      const newTag = currentTags ? `, ${tag}` : tag;
                      setFormData({ ...formData, tags: currentTags + newTag });
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Post Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Posts</span>
                  <span className="font-semibold text-blue-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-semibold text-purple-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Engagement</span>
                  <span className="font-semibold text-green-600">92%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;