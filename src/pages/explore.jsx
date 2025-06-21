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


function Explore() {
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

  //  Fetch all posts
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch posts. Please try again later.");
    }
  };

  //  Fetch user's bookmarked post IDs
  const fetchBookmarkedPosts = async () => {
    const email = localStorage.getItem("userEmail");
    if (!email){
      return null
    }

    try {
      const res = await axios.get(`http://localhost:5000/bookmarks?email=${email}`);
      setBookmarkedPosts(res.data || []);
    } catch (err) {
      setBookmarkedPosts([]);
    }
  };

  //  Like a post
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

  // Bookmark or unbookmark a post
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

  //  Filter posts
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
      {/*  Navbar */}
      <div className="bg-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between shadow-md">
        <a href="/userexplore" className="text-3xl font-bold text-white px-4 py-2 hover:text-gray-300">IdeaNest</a>
        <div className="flex items-center gap-4">
          <a href="/userpost" className="flex items-center gap-2 bg-blue-900 hover:bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md">
            <IoIosAddCircleOutline className="text-2xl" />
            <span className="text-lg font-medium">Post</span>
          </a>
          <a href="/Dashboard" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md">
            <User className="w-5 h-5" />
            <span className="text-lg font-medium">Dashboard</span>
          </a>
  <Link
  to="/chatinbox"
  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md"
>
  <FiMessageCircle className="w-5 h-5" />
  <span className="text-lg font-medium">Message</span>
</Link>

        </div>
      </div>

      {/*  Search & Filter */}
      <div className="flex flex-col p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="search"
            placeholder="Search projects..."
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setSelectedTag("all")}
              className={`px-4 py-2 rounded-lg ${selectedTag === "all" ? "bg-blue-600" : "bg-gray-800 text-gray-300"}`}
            >
              All
            </button>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg ${selectedTag === tag ? "bg-blue-600" : "bg-gray-800 text-gray-300"}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

     
        {error && (
          <div className="bg-red-800 text-white px-4 py-3 rounded mb-4">{error}</div>
        )}

        {/*Posts-gridd */}
        <div className="relative mt-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredPosts.map((post, index) => (
              <div key={post._id} className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg w-80 flex-shrink-0 hover:shadow-xl transition-shadow duration-300">
                <img
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => { e.target.src = "/placeholder.jpg"; }}
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-white mb-2 line-clamp-1">{post.title}</h2>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.description}</p>
                  <p className="text-blue-300 text-xs mb-1">By: {post.name || "Unknown"}</p>
                  <a
                    href={`/userexplore/${encodeURIComponent(post.title)}`}
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200 text-sm font-medium"
                  >
                    Read More
                  </a>
                  <div className="flex items-center justify-between mt-5 text-blue-300">
                    <div onClick={() => handleLike(post._id, index)} className="flex items-center gap-2 cursor-pointer">
                      <AiOutlineLike className="text-2xl hover:text-blue-500 transition" />
                      <span className="text-white text-sm">{post.likes || 0}</span>
                    </div>
                    <Link
                    to={`/chat?sender=${localStorage.getItem("userEmail")}&receiver=${encodeURIComponent(post.email)}`} >  <FaFacebookMessenger className="text-2xl hover:text-blue-500 cursor-pointer transition" />
                   </Link>
                    <button onClick={() => handleBookmark(post._id)}>
                      {bookmarkedPosts.includes(post._id) ? (
                        <FcBookmark className="text-2xl cursor-pointer transition" />
                      ) : (
                        <CiBookmarkPlus className="text-2xl hover:text-blue-500 cursor-pointer transition" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center text-gray-400 mt-10">No posts match your search criteria.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;
