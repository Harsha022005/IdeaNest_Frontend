import React from "react";

// Simple SVG icon components
const Lightbulb = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const Users = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const Rocket = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const Github = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const Twitter = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const Linkedin = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ArrowRight = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const Code = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

function Home() {
  const projects = [
    {
      title: "AI Code Assistant",
      description: "Smart coding companion that helps developers write better code with AI suggestions and error detection.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      tags: ["AI", "Development"]
    },
    {
      title: "Smart City Dashboard",
      description: "Real-time monitoring platform for urban infrastructure and environmental data visualization.",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=250&fit=crop",
      tags: ["IoT", "Analytics"]
    },
    {
      title: "Learning Platform",
      description: "Interactive educational platform with personalized learning paths and progress tracking.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&h=250&fit=crop",
      tags: ["Education", "Web"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Simple background gradient */}
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
              <a href="" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="/explore" className="hover:text-blue-400 transition-colors">Explore</a>
             <a href="/signup" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">Register</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700">
            <div className="mb-6">
              <div className="inline-flex p-3 bg-blue-600/20 rounded-xl border border-blue-500/30">
                <Rocket className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold mb-6">
              Where Ideas Meet
              <span className="text-blue-400 block">Innovation</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with developers, share project ideas, and build the next big thing together. Turn your vision into reality with our collaborative platform.
            </p>
            
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center space-x-2">
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                Explore Ideas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: Users, value: "2,400+", label: "Active Users" },
              { icon: Lightbulb, value: "5,600+", label: "Ideas Shared" },
              { icon: Rocket, value: "320+", label: "Projects Built" },
              { icon: Code, value: "80+", label: "Open Source" }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700">
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Featured <span className="text-blue-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover innovative projects from our community and get inspired
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              How It <span className="text-blue-400">Works</span>
            </h2>
            <p className="text-xl text-gray-300">Get started in three simple steps</p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Share Your Idea",
                description: "Post your project idea with details about what you want to build and the skills you need.",
                icon: Lightbulb
              },
              {
                step: "2", 
                title: "Find Collaborators",
                description: "Connect with developers, designers, and other creators who want to work on your project.",
                icon: Users
              },
              {
                step: "3",
                title: "Build Together",
                description: "Use our tools and community support to turn your idea into a working project.",
                icon: Rocket
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-6">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center">
                        <item.icon className="w-8 h-8 text-blue-400" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-blue-500/30">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of innovators and turn your ideas into reality. It's free to get started.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">
                Join IdeaNest
              </button>
              <button className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">IdeaNest</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                A platform where developers and creators collaborate to build innovative projects and turn ideas into reality.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <div className="space-y-2">
                <a href="/explore" className="block text-gray-400 hover:text-white transition-colors">Explore</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Submit Idea</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Find Team</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Resources</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Discord</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Forum</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Events</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Support</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 IdeaNest. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;