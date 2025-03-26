
import { ArrowLeft, MapPin, Calendar, Share2, Heart, Ticket } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';
import { exhibitions } from '~/data/mocks';

export default function ExhibitionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const exhibition = exhibitions.find(e => e.id === Number(id));

  if (!exhibition) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Exhibition not found</h1>
          <button
            onClick={() => navigate('/exhibitions')}
            className="mt-4 text-gray-400 hover:text-white transition flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Exhibitions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-[70vh] relative">
        <img
          src={exhibition.image}
          alt={exhibition.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
          <div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
            <button
              onClick={() => navigate('/exhibitions')}
              className="mb-8 text-gray-400 hover:text-white transition flex items-center gap-2 w-fit"
            >
              <ArrowLeft size={20} />
              Back to Exhibitions
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p className="text-sm font-medium text-gray-300 mb-4">{exhibition.category}</p>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{exhibition.title}</h1>
                <p className="text-xl text-gray-300">{exhibition.artist}</p>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition flex items-center gap-2 cursor-pointer text-nowrap">
                  <Ticket size={20} />
                  Get Tickets
                </button>
                <button className="p-4 bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer h-16 w-16">
                  <Heart size={20} className="m-auto" />
                </button>
                <button className="p-4 h-16 w-16 bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer">
                  <Share2 size={20} className="m-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">About the Exhibition</h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              {exhibition.shortDescription}
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              {exhibition.description}
            </p>
            <div className="aspect-video rounded-xl overflow-hidden mb-8">
              <img
                src={`https://images.unsplash.com/photo-${exhibition.id === 1 ? '1561214115-f2f134cc4912' : '1545989253-02cc26577f88'}?auto=format&fit=crop&q=80&w=2940`}
                alt="Exhibition Space"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">Exhibition Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium">{exhibition.location}</p>
                    <p className="text-sm text-gray-400">123 Art Street, City</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium">{exhibition.date}</p>
                    <p className="text-sm text-gray-400">10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-medium mb-2">Section</h4>
                <div className="space-y-2 text-gray-300">
                  <p>Something else?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
