import { Search, Menu } from 'lucide-react';
import { Link } from 'react-router';

export function Header() {
  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          artscape
        </Link>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex space-x-6">
            <Link to="/exhibitions" className="hover:text-gray-300 transition">
              Exhibitions
            </Link>
            <Link to="/venues" className="hover:text-gray-300 transition">
              Venues
            </Link>
            <Link to="/about" className="hover:text-gray-300 transition">
              About
            </Link>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition">
            <Search size={20} />
          </button>
          <button className="md:hidden p-2 hover:bg-white/10 rounded-full transition">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
