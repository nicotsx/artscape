import type { Route } from './+types/home';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ExhibitionCard } from '~/components/exhibition-card';
import { exhibitions } from '~/data/mocks';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Artscape' }, { name: 'description', content: 'Discover Art Exhibitions' }];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-screen">
        <img
          src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&q=80&w=2940"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
          <div className="max-w-7xl mx-auto px-6 h-full flex items-center">
            <div className="mt-20">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Discover Contemporary
                <br />
                Art Exhibitions
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                Explore the most compelling art exhibitions happening right now in your city and around the world.
              </p>
              <Link
                to="/exhibitions"
                className="mt-8 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition flex items-center space-x-2 w-fit"
              >
                <span>Explore Now</span>
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold">Current Exhibitions</h2>
            <p className="text-gray-400 mt-2">Discover what's on display right now</p>
          </div>
          <Link to="/exhibitions" className="text-sm flex items-center space-x-2 hover:text-gray-300 transition">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exhibitions.slice(0, 3).map((exhibition) => (
            <Link to={`/exhibitions/${exhibition.id}`} key={exhibition.id} className="group">
              <ExhibitionCard exhibition={exhibition} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
