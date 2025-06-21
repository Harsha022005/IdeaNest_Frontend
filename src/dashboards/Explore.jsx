import React, { useState, useEffect } from "react";
import Signup from '../authorisation/Signup.jsx'
// Simple SVG icon components
const Lightbulb = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const Search = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Filter = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
  </svg>
);

const ExternalLink = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const Eye = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

function Explore() {
    // Add missing state and data
    const [projects, setProjects] = useState([]);
    const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
    
    // Dummy data to prevent errors
    const dummyProjects = [
        {
            id: 1,
            title: "AI-Powered Task Manager",
            description: "A smart task management application that uses AI to prioritize and categorize your daily tasks automatically.",
            category: "AI/ML",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
        },
        {
            id: 2,
            title: "Real-time Chat Application",
            description: "A modern chat application built with React and Socket.io featuring real-time messaging and file sharing.",
            category: "Web Development",
            image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop"
        },
        {
            id: 3,
            title: "Mobile E-commerce App",
            description: "A full-featured e-commerce mobile application with payment integration and order tracking.",
            category: "Mobile Development",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop"
        }
    ];

    // Set projects to dummy data if not loaded
    React.useEffect(() => {
        if (projects.length === 0) {
            setProjects(dummyProjects);
        }
    }, []);

    // Add missing functions
    const fetchPosts = async () => {
        try {
            // Your API call logic here
            console.log("Fetching posts...");
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const fetchBookmarkedPosts = async () => {
        try {
            // Your API call logic here
            console.log("Fetching bookmarked posts...");
        } catch (error) {
            console.error("Error fetching bookmarked posts:", error);
        }
    };

    function isTokenValid(token) {
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch (e) {
            return false;
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const email = localStorage.getItem('userEmail');
        if (!token || !email) {
            window.location.href = '/login';
            return;
        }
        fetchPosts();
        fetchBookmarkedPosts();
    }, []);

    const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = projects.filter(project => {
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Background gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 -z-10"></div>

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <Lightbulb className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold">IdeaNest</span>
                        </div>
                        
                        <div className="flex items-center space-x-6">
                            <a href="/" className="hover:text-blue-400 transition-colors">Home</a>
                            <a href="/explore" className="text-blue-400">Explore</a>
                            <a href="/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Register</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Header Section */}
            <section className="pt-24 pb-8 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl font-bold mb-4">
                        Project <span className="text-blue-400">Showcase</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Explore our collection of innovative projects across different technologies. 
                        Get inspired and discover what's possible with modern development.
                    </p>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="pb-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
                        <div className="flex items-center space-x-4 mb-6">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            
                            {/* Category Dropdown */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="pl-10 pr-8 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer"
                                >
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Category Tags */}
                        <div className="flex flex-wrap gap-3 mb-4">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Results Counter */}
                        <div className="text-center">
                            <span className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                                {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} found
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-16 px-4">
                <div className="max-w-6xl mx-auto">
                    {filteredProjects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProjects.map(project => (
                                <div 
                                    key={project.id} 
                                    className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:transform hover:-translate-y-1"
                                >
                                    {/* Project Image */}
                                    <div className="relative overflow-hidden">
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-blue-600/80 text-white text-xs rounded-full">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Project Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold mb-3 text-white">
                                            {project.title}
                                        </h3>
                                        
                                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                                            {project.description}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3">
                                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                                                <Eye className="w-4 h-4" />
                                                <span>View Details</span>
                                            </button>
                                            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
                                                <ExternalLink className="w-4 h-4" />
                                                <span>Live Demo</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="max-w-md mx-auto">
                                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
                                <p className="text-gray-400">Try adjusting your search terms or filters to find more projects.</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-8 border border-blue-500/30 text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Start Building?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Join our community of innovators and turn your ideas into reality. 
                            Share your project and connect with fellow developers.
                        </p>
                        
                        <div className="flex justify-center gap-4">
                            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                                Submit Project
                            </button>
                            <button className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                                Join Community
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 border-t border-gray-800">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold">IdeaNest</span>
                    </div>
                    <p className="text-gray-400 mb-6">
                        A platform where developers and creators collaborate to build innovative projects.
                    </p>
                    <div className="flex justify-center space-x-6 text-sm text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Support</a>
                    </div>
                    <div className="mt-6 pt-6 border-t border-gray-800">
                        <p className="text-gray-400 text-sm">© 2025 IdeaNest. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Explore;