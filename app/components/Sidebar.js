'use client';

export function Sidebar() {
  const menuItems = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🔍', label: 'Explore', active: false },
    { icon: '🔔', label: 'Notifications', active: false },
    { icon: '💬', label: 'Messages', active: false },
    { icon: '📝', label: 'Lists', active: false },
    { icon: '🔖', label: 'Bookmarks', active: false },
    { icon: '👤', label: 'Profile', active: false },
  ];

  return (
    <aside className="w-64 p-4 hidden lg:block">
      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center space-x-3 px-4 py-3 rounded-full transition-colors duration-200 ${
              item.active
                ? 'bg-primary bg-opacity-10 text-primary font-bold'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-lg">{item.label}</span>
          </a>
        ))}
      </nav>
      
      <button className="w-full bg-primary text-white py-3 rounded-full font-bold text-lg mt-8 hover:bg-blue-600 transition-colors duration-200">
        Post
      </button>
    </aside>
  );
}
