import React, { useState } from 'react';
import { Search, Bell, User, Home, PlusCircle, Bookmark, MessageCircle, Hash, Globe, Camera } from 'lucide-react';
import axios from 'axios';
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";

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
      const result = await axios.post(`${process.env.BACKEND_URL}/userpost`, {
        title, description, tags, image, email,
      });

      if (result.status === 201) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setFormData({ title: '', description: '', tags: '', image: '' });
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
      <div className="bg-gray-800 p-4 sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
        <a href="/userexplore" className="text-3xl font-bold text-white hover:text-gray-300">IdeaNest</a>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a href="/userexplore" className="bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 transition">Explore</a>
          <a href="/Dashboard" className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition flex items-center gap-1">
            <User className="w-5 h-5" /> Dashboard
          </a>
          <a href="/Chat" className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition flex items-center gap-1">
            <FiMessageCircle className="w-5 h-5" /> Message
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border p-6">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-xl mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <PlusCircle className="w-6 h-6" /> Create a New Post
                </h2>
                <p className="text-blue-100 mt-1">Share your thoughts with the community</p>
              </div>
              {error && <div className="text-red-600 mb-4">{error}</div>}
              {success && <div className="text-green-600 mb-4">{success}</div>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-1 text-sm font-medium">Post Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500" placeholder="Title..." />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500" placeholder="Write something..."></textarea>
                  <p className="text-right text-xs text-gray-500">{formData.description.length} characters</p>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Image URL</label>
                  <input type="text" value={formData.image} onChange={handleImageChange} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500" placeholder="https://..." />
                  {imagePreview && <img src={imagePreview} alt="preview" className="mt-3 w-full h-48 object-cover rounded-lg border" onError={() => setImagePreview('')} />}
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Tags</label>
                  <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full p-3 rounded-lg border border-gray-300 focus:ring-blue-500" placeholder="AI, ML..." />
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  {["AI", "ML", "technology", "design", "lifestyle", "photography", "travel", "coding", "IOT"].map(tag => (
                    <button key={tag} type="button" className="px-3 py-1 bg-gray-100 hover:bg-blue-100 rounded-full" onClick={() => setFormData({ ...formData, tags: formData.tags ? `${formData.tags}, ${tag}` : tag })}>
                      #{tag}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-4">
                  <span className="text-sm text-gray-600 flex items-center gap-1"><Globe className="w-4 h-4" /> Public</span>
                  <div className="flex gap-2">
                    <button type="button" className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100">Save Draft</button>
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Post</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-4 shadow border">
              <h3 className="text-lg font-semibold mb-3">Writing Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                <li>Engaging titles attract more attention</li>
                <li>Use high-quality images</li>
                <li>Add relevant tags</li>
                <li>Write clear, concise descriptions</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow border">
              <h3 className="text-lg font-semibold mb-3">Your Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span>Total Posts</span><span className="font-semibold">24</span></div>
                <div className="flex justify-between"><span>This Month</span><span className="font-semibold">8</span></div>
                <div className="flex justify-between"><span>Avg. Engagement</span><span className="font-semibold">92%</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Posts;
