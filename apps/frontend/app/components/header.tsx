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
            <Link to="/exhibitions" className="text-white hover:text-gray-300 transition">
              Exhibitions
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
