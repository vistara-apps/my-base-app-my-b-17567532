'use client';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Social</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-900 hover:text-primary font-medium">Home</a>
            <a href="#" className="text-gray-500 hover:text-primary font-medium">Explore</a>
            <a href="#" className="text-gray-500 hover:text-primary font-medium">Notifications</a>
            <a href="#" className="text-gray-500 hover:text-primary font-medium">Messages</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-blue-600 transition-colors duration-200">
              Post
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
