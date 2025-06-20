import React, { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegShareSquare } from "react-icons/fa";
import { CiBookmarkPlus } from "react-icons/ci";
import { User } from "lucide-react";
import axios from 'axios';

function Dashboard() {
  const [showfollowing, setshowfollowing] = useState(false);
  const [showfollowers, setshowfollowers] = useState(false);
  const [posts, setposts] = useState([]);
  const [error, seterror] = useState('');
  const [profile, setprofile] = useState('');

  // Profile info
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [bio, setbio] = useState('');
  const [isediting, setisediting] = useState(false);

  const following = ['Harsha', 'Surya', 'Jaswanth', 'Charan'];
  const followers = ['Balaji', 'Naveel', 'Jayanth', 'Yuvaraju'];

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
  const savedEmail = localStorage.getItem('userEmail');
  if (savedEmail) {
    setemail(savedEmail);
  }
}, []);

  useEffect(()=>{
    fetchuserbio();
  },[email])
const handleEmailChange = (e) => {
  setemail(e.target.value);
  localStorage.setItem('userEmail', e.target.value);
};
  const handlesave = (e) => {
    e.preventDefault();
    if (!name || !email || !bio) {
      alert('All fields are required to save info');
      return;
    }
    setisediting(false);
  };

  const updateuserbio = async () => {
    try {
      const response = await axios.post('http://localhost:5000/profile/update', {
  name,
  email,
  bio
});
    //   console.log(response)
      if (response.status === 201) {
        setname('');
        setemail(email)
        setbio('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchuserbio = async () => {
    if (!email) return;
    console.log(email)
    try {
      const response = await axios.get(`http://localhost:5000/profile/fetch?email=${email}`);
      console.log(response)
     if (response.data) {
  const user = response.data;
  setname(user.name);
  setemail(user.email);
  setbio(user.bio);
  setprofile(user.bio);
}
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/posts');
      setposts(response.data);
      seterror('');
    } catch (error) {
      console.error("Failed to fetch posts:", error);
      seterror('Failed to fetch posts. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <div className="bg-gray-800 p-4 sticky top-0 z-50 flex items-center justify-between shadow-lg border-b border-gray-700">
        <a href="/userexplore" className="text-4xl font-extrabold text-white tracking-wide hover:text-blue-400 transition-colors duration-300">
          IdeaNest
        </a>

        <div className="flex items-center gap-6">
          <a href="/userexplore" className="flex items-center gap-2 bg-blue-700 hover:bg-blue-600 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
            <IoIosAddCircleOutline className="text-2xl" />
            <span className="text-lg font-medium">Explore</span>
          </a>
          <a href="/userpost" className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
            <User className="w-5 h-5" />
            <span className="text-lg font-medium">Post</span>
          </a>
          <a href="/Chat" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105">
            <FiMessageCircle className="w-5 h-5" />
            <span className="text-lg font-medium">Message</span>
          </a>
        </div>
      </div>

      {/* Profile Section */}
      <div className="ml-10 p-8 bg-gray-900 text-white">
        <div className="bg-gray-800 rounded-3xl p-8 w-full max-w-3xl shadow-xl border border-gray-700">
          <div className="flex items-center gap-6">
            <img
              src="https://source.unsplash.com/150x150/?portrait,man"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-5 border-blue-500 shadow-lg"
            />
            <div>
              <h2 className="text-3xl font-bold mb-2">{name}</h2>
              <p className="text-gray-300 text-base leading-relaxed">{profile}</p>
            </div>
          </div>

          <div className="flex gap-8 mt-8 justify-center">
            <div className="relative">
              <button onClick={() => { setshowfollowers(!showfollowers); setshowfollowing(false); }} className="bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-700 text-lg font-medium shadow-md transition-all duration-300 transform hover:scale-105">
                Followers <span className="ml-2 font-semibold text-blue-100">({followers.length})</span>
              </button>
              {showfollowers && (
                <ul className="absolute top-14 left-1/2 -translate-x-1/2 bg-gray-700 rounded-xl shadow-xl w-56 border border-gray-600 z-10 animate-fade-in-up">
                  {followers.map((follower, index) => (
                    <li key={index} className="px-5 py-3 hover:bg-gray-600 border-b border-gray-600 last:border-b-0 cursor-pointer text-base transition-colors duration-200">
                      {follower}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="relative">
              <button onClick={() => { setshowfollowing(!showfollowing); setshowfollowers(false); }} className="bg-green-600 px-6 py-3 rounded-full hover:bg-green-700 text-lg font-medium shadow-md transition-all duration-300 transform hover:scale-105">
                Following <span className="ml-2 font-semibold text-green-100">({following.length})</span>
              </button>
              {showfollowing && (
                <ul className="absolute top-14 left-1/2 -translate-x-1/2 bg-gray-700 rounded-xl shadow-xl w-56 border border-gray-600 z-10 animate-fade-in-up">
                  {following.map((follow, index) => (
                    <li key={index} className="px-5 py-3 hover:bg-gray-600 border-b border-gray-600 last:border-b-0 cursor-pointer text-base transition-colors duration-200">
                      {follow}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="p-8 bg-gray-900">
        <h2 className="text-4xl font-extrabold text-white mb-8 text-center">My Posts</h2>
        {error && <p className="text-red-500 text-center text-lg mt-4">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mx-auto max-w-7xl">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform hover:scale-102 transition-transform duration-300 border border-gray-700 flex flex-col">
                <img src={post.img} alt={post.title} className="w-full h-52 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight">{post.title}</h3>
                  <p className="text-gray-300 text-base mb-4 flex-grow line-clamp-3">{post.description}</p>
                  <a href={`/userexplore/${encodeURIComponent(post.title)}`} className="inline-block px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 text-sm font-medium self-start mt-auto">
                    Read More
                  </a>
                  <div className="flex items-center justify-between mt-6 text-gray-400">
                    <div className="flex gap-4">
                      <AiOutlineLike className="text-3xl hover:text-blue-400 cursor-pointer transition-colors duration-200" />
                      <FiMessageCircle className="text-3xl hover:text-blue-400 cursor-pointer transition-colors duration-200" />
                    </div>
                    <div className="flex gap-4">
                      <FaRegShareSquare className="text-3xl hover:text-blue-400 cursor-pointer transition-colors duration-200" />
                      <CiBookmarkPlus className="text-3xl hover:text-blue-400 cursor-pointer transition-colors duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 text-xl py-10">No posts available. Start sharing your ideas!</p>
          )}
        </div>
      </div>

      {/* Edit Profile Section */}
      <div className="Profile-Edit bg-gray-800 p-6 rounded-xl max-w-xl mx-auto shadow-lg text-white mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Edit Profile</h2>
          <button onClick={() => setisediting(!isediting)} className="text-sm bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-full transition">
            {isediting ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {isediting ? (
          <form onSubmit={(e) => { e.preventDefault(); updateuserbio(); handlesave(e); }} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-1">Name</label>
              <input type="text" value={name} onChange={(e) => setname(e.target.value)} className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none" />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
         <input
          type="email"
         value={email}
          onChange={handleEmailChange}
           className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none"
/>            </div>
            <div>
              <label className="block text-gray-300 mb-1">Bio</label>
              <textarea value={bio} onChange={(e) => setbio(e.target.value)} rows={4} className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:outline-none" />
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full text-sm">
              Save Info
            </button>
          </form>
        ) : (
          <div>
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-300">{bio}</p>
          </div>
        )}
      </div>
 
      {/* Fade-in animation style */}
      {/* <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px) translateX(-50%);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(-50%);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
        */}
    </div>
  );
}

export default Dashboard;