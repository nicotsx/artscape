import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { exhibitions } from '~/data/mocks';
import { ExhibitionCard } from '~/components/exhibition-card';
import { Link } from 'react-router';
import type { Route } from './+types/exhibitions';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Exhibitions - Artscape" },
    { name: "description", content: "Discover Art Exhibitions" },
  ];
}

export default () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Contemporary', 'Digital Art', 'Abstract', 'Photography', 'Sculpture'];

  const filteredExhibitions = exhibitions.filter(exhibition => {
    const matchesSearch = exhibition.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exhibition.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || exhibition.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-4xl font-bold">All Exhibitions</h1>
          <p className="text-gray-400 mt-2">Explore our curated collection of ongoing exhibitions</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search exhibitions or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-white/20 transition"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-400" />
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-white/5 hover:bg-white/10'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredExhibitions.map((exhibition) => (
            <Link to={`/exhibitions/${exhibition.id}`} key={exhibition.id} className="group">
              <ExhibitionCard exhibition={exhibition} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
