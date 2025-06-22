import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { FaFacebookMessenger } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { FcBookmark } from "react-icons/fc";
import { User } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Explore() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  const tags = ["Technology", "Education", "Health", "Environment", "Social", "Business", "AI", "ML", "CLOUD", "IOT"];

  useEffect(() => {
    fetchPosts();
    fetchBookmarkedPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch posts. Please try again later.");
    }
  };

  const fetchBookmarkedPosts = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      return null;
    }

    try {
        const res = await axios.get(`http://localhost:5000/bookmark/fetch?email=${email}`);
      setBookmarkedPosts(res.data || []);
    } catch (err) {
      setBookmarkedPosts([]);
    }
  };

  const handleLike = async (postId, index) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Login required to like posts");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/posts/like/${postId}`, { email });
      const updatedPost = response.data;
      const updatedPosts = [...posts];
      updatedPosts[index] = updatedPost;
      setPosts(updatedPosts);
    } catch (error) {
      alert(error?.response?.data?.error || "Failed to like post");
    }
  };

  const handleBookmark = async (postId) => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      alert("Login required to bookmark posts");
      return;
    }

    let updatedBookmarks;
    if (bookmarkedPosts.includes(postId)) {
      try {
        await axios.post("http://localhost:5000/bookmark/remove", { email, postId });
        updatedBookmarks = bookmarkedPosts.filter((id) => id !== postId);
        setBookmarkedPosts(updatedBookmarks);
      } catch (err) {
        alert("Failed to remove bookmark");
      }
    } else {
      try {
        await axios.post("http://localhost:5000/bookmark/add", { email, postId });
        updatedBookmarks = [...bookmarkedPosts, postId];
        setBookmarkedPosts(updatedBookmarks);
      } catch (err) {
        alert("Failed to bookmark");
      }
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag =
      selectedTag === "all" ||
      (post.tags &&
        post.tags
          .split(",")
          .map((t) => t.trim().toLowerCase())
          .includes(selectedTag.toLowerCase()));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navbar */}
      <div className="bg-gray-800 p-4 sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between shadow-md">
        <a href="/userexplore" className="text-2xl sm:text-3xl font-bold text-white px-4 py-2 hover:text-gray-300 mb-4 sm:mb-0">
          IdeaNest
        </a>
        <div className="flex flex-wrap items-center gap-4">
          <a href="/userpost" className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-lg">
            <IoIosAddCircleOutline className="text-xl sm:text-2xl" />
            <span className="font-medium">Post</span>
          </a>
          <a href="/Dashboard" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-lg">
            <User className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Dashboard</span>
          </a>
          <Link
            to="/chatinbox"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md text-sm sm:text-lg"
          >
            <FiMessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium">Message</span>
          </Link>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col p-4 sm:p-6">
        <div className="flex flex-col xl:flex-col gap-4 mb-6">
          <input
            type="search"
            placeholder="Search projects..."
            className="w-full p-2 sm:p-3 rounded-lg bg-gray-800 text-white border border-gray-700 text-sm sm:text-base"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm ${selectedTag === "all" ? "bg-blue-600" : "bg-gray-800 text-gray-300"} whitespace-nowrap`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm ${selectedTag === tag ? "bg-blue-600" : "bg-gray-800 text-gray-300"} whitespace-nowrap`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-800 text-white px-4 py-3 rounded mb-4 text-sm sm:text-base">{error}</div>
        )}

        {/* Posts Grid */}
        <div className="relative mt-6 sm:mt-10 px-2 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredPosts.map((post, index) => (
              <div key={post._id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg w-full sm:w-80 flex-shrink-0 hover:shadow-xl transition-shadow duration-300">
                <img
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  className="w-full h-36 sm:h-48 object-cover"
                  onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                />
                <div className="p-4 sm:p-5">
                  <h2 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">{post.title}</h2>
                  <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-3">{post.description}</p>
                  <p className="text-blue-300 text-xs mb-2 sm:mb-3">By: {post.name || "Unknown"}</p>
                  <a
                    href={`/userexplore/${encodeURIComponent(post.title)}`}
                    className="inline-block px-3 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 text-xs sm:text-sm font-medium"
                  >
                    Read More
                  </a>
                  <div className="flex items-center justify-between mt-4 sm:mt-5 text-blue-300">
                    <div onClick={() => handleLike(post._id, index)} className="flex items-center gap-2 cursor-pointer">
                      <AiOutlineLike className="text-xl sm:text-2xl hover:text-blue-500 transition" />
                      <span className="text-white text-xs sm:text-sm">{post.likes || 0}</span>
                    </div>
                    <Link
                      to={`/chat?sender=${localStorage.getItem("userEmail")}&receiver=${encodeURIComponent(post.email)}`}
                    >
                      <FaFacebookMessenger className="text-xl sm:text-2xl hover:text-blue-500 cursor-pointer transition" />
                    </Link>
                    <button onClick={() => handleBookmark(post._id)}>
                      {bookmarkedPosts.includes(post._id) ? (
                        <FcBookmark className="text-xl sm:text-2xl cursor-pointer transition" />
                      ) : (
                        <CiBookmarkPlus className="text-xl sm:text-2xl hover:text-blue-500 cursor-pointer transition" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center text-gray-400 mt-10 text-sm sm:text-base">No posts match your search criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// export default Explore;