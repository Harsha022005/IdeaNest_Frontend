import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { FaFacebookMessenger } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { User } from "lucide-react";
import axios from 'axios';

function Explore() {
 const [posts,setposts]=useState('')
 const [error,setError]=useState('');

 useEffect(()=>{
  fetchposts();
 },[]);

const fetchposts=async()=>{
  try{
    const response=await axios.get('http://localhost:5000/api/posts')
    setposts(response);
    setError(null)
  }
  catch(error){
    console.log(error)
    setError('Failed to fetch posts')
  }
}
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedTag, setSelectedTag] = React.useState("all");

    // Add tags to your posts data
    const tags = ["Technology", "Education", "Health", "Environment", "Social", "Business"];

    // Filter posts based on search term and selected tag
    const filteredPosts = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                 post.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag === "all" || post.tag === selectedTag;
      return matchesSearch && matchesTag;
    });

    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between shadow-md">
          {/* Existing header code */}
          <a href="/userexplore" className="text-3xl font-bold text-white px-4 py-2 hover:text-gray-300">
            IdeaNest
          </a>

          <div className="flex items-center gap-4">
            <a href="/userpost" className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200">
              <IoIosAddCircleOutline className="text-2xl" />
              <span className="text-lg font-medium">Post</span>
            </a>
            <a href="/Dashboard" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200">
              <User className="w-5 h-5" />
              <span className="text-lg font-medium">Dashboard</span>
            </a>
            <a href="/Chat" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200">
              <FiMessageCircle className="w-5 h-5" />
              <span className="text-lg font-medium">Message</span>
            </a>
          </div>
        </div>
        <div className="flex flex-col p-4">
          {/* Search and filter section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="search"
                placeholder="Search projects..."
                className="w-full p-2 rounded-lg bg-gray-800 text-white border border-gray-700"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <button
                onClick={() => setSelectedTag("all")}
                className={`px-4 py-2 rounded-lg ${
                  selectedTag === "all" ? "bg-blue-600" : "bg-gray-800"
                }`}
              >
                All
              </button>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedTag === tag ? "bg-blue-600" : "bg-gray-800"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Posts grid */}
<div className="relative mt-10 px-4">
  <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none z-10 rounded-r-2xl" />

  <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-300 pr-4">
    <div className="flex flex-row gap-6 min-w-full max-w-[1000px]">
      {filteredPosts.map((post, index) => (
        <div
          key={index}
          className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg w-80 flex-shrink-0 hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-5">
            <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{post.title}</h2>
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.description}</p>

            <a
              href={`/userexplore/${encodeURIComponent(post.title)}`}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 text-sm font-medium"
            >
              Read More
            </a>

            <div className="flex items-center justify-between mt-5 text-blue-300">
              <AiOutlineLike className="text-2xl hover:text-blue-500 cursor-pointer transition" />
              <FaFacebookMessenger className="text-2xl hover:text-blue-500 cursor-pointer transition" />
              <FaRegShareSquare className="text-2xl hover:text-blue-500 cursor-pointer transition" />
              <CiBookmarkPlus className="text-2xl hover:text-blue-500 cursor-pointer transition" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

        </div>
      </div>
    );
}
export default Explore;