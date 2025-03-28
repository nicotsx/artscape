import { MapPin } from 'lucide-react';
import type { Exhibition } from '~/types/api.types';
import { getOptimizedImageUrl } from '~/utils/cloudinary';

export const ExhibitionCard = ({ exhibition }: { exhibition: Exhibition }) => {
  return (
    <div className="relative overflow-hidden rounded-xl aspect-[4/5]">
      <img
        src={getOptimizedImageUrl(exhibition.image, 1920)}
        alt={exhibition.title}
        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-6">
          <p className="text-sm font-medium text-gray-300">{exhibition.title}</p>
          <h3 className="text-xl font-bold mt-2">{exhibition.title}</h3>
          <p className="text-gray-300 mt-1">{exhibition.venue.fullname}</p>
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span className="text-sm">{exhibition.venue.fullname}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
