import { Filter, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { getApiExhibitions } from '~/api-client';
import { ExhibitionCard } from '~/components/exhibition-card';
import type { Route } from './+types/exhibitions';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 15, mass: 1 } },
};

export async function loader() {
  const { data } = await getApiExhibitions();
  return data;
}

export function meta() {
  return [{ title: 'Exhibitions - Artscape' }, { name: 'description', content: 'Discover Art Exhibitions' }];
}

export default function Exhibitions({ loaderData }: Route.ComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Contemporary', 'Digital Art', 'Abstract', 'Photography', 'Sculpture'];

  const filteredExhibitions = loaderData?.exhibitions.filter((exhibition) => {
    const matchesSearch =
      exhibition.title.toLowerCase().includes(searchQuery.toLowerCase()) || exhibition.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h1 className="text-4xl font-bold">All Exhibitions</h1>
          <p className="text-gray-400 mt-2">Explore our curated collection of ongoing exhibitions</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
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
                  type="button"
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                    selectedCategory === category ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {filteredExhibitions?.map((exhibition) => (
            <motion.div key={exhibition.id} variants={cardVariants} className="h-full">
              <Link
                to={`/exhibitions/${exhibition.id}`}
                className="group block h-full transform transition-transform duration-300 hover:scale-[1.02]"
              >
                <ExhibitionCard exhibition={exhibition} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
