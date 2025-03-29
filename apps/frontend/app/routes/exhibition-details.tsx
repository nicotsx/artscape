import { ArrowLeft, Calendar, Heart, MapPin, Share2, Ticket } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useNavigate } from 'react-router';
import { getApiExhibitionsById } from '~/api-client';
import { getOptimizedImageUrl } from '~/utils/cloudinary';
import type { Route } from './+types/exhibition-details';

export async function clientLoader({ params }: Route.LoaderArgs) {
  const { data } = await getApiExhibitionsById({ path: { id: params.id } });
  return data;
}

export default function ExhibitionDetails({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const imageScale = useTransform(scrollY, [0, 600], [1, 1.1]);

  if (!loaderData?.exhibition) {
    return (
      <motion.div className="min-h-screen bg-black text-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Exhibition not found</h1>
          <motion.button onClick={() => navigate('/exhibitions')} className="mt-4 text-gray-400 hover:text-white transition flex items-center gap-2">
            <ArrowLeft size={20} />
            Back to Exhibitions
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const { exhibition } = loaderData;

  const address = [exhibition.venue.city, exhibition.venue.state, exhibition.venue.country, exhibition.venue.address1].filter(Boolean).join(', ');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="h-[70vh] relative overflow-hidden">
        <motion.img
          style={{ scale: imageScale }}
          src={getOptimizedImageUrl(exhibition.image, 1920)}
          alt={exhibition.title}
          className="w-full h-full object-cover"
        />
        <motion.div style={{ opacity: 1 }} className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
          <motion.div className="max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              onClick={() => navigate('/exhibitions')}
              className="mb-8 text-gray-400 hover:text-white transition flex items-center gap-2 w-fit cursor-pointer"
            >
              <ArrowLeft size={20} />
              Back to Exhibitions
            </motion.button>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="flex flex-col md:flex-row md:items-end justify-between gap-8"
            >
              <div>
                <motion.p variants={fadeInUp} className="text-sm font-medium text-gray-300 mb-4">
                  {exhibition.venue.fullname}
                </motion.p>
                <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold mb-4">
                  {exhibition.title}
                </motion.h1>
                <motion.p variants={fadeInUp} className="text-xl text-gray-300">
                  {exhibition.shortDescription}
                </motion.p>
              </div>
              <motion.div variants={fadeInUp} className="flex gap-4">
                <motion.button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition flex items-center gap-2 cursor-pointer text-nowrap">
                  <Ticket size={20} />
                  Get Tickets
                </motion.button>
                <motion.button className="p-4 bg-white/10 rounded-full transition cursor-pointer h-16 w-16">
                  <Heart size={20} className="m-auto" />
                </motion.button>
                <motion.button className="p-4 h-16 w-16 bg-white/10 rounded-full transition cursor-pointer">
                  <Share2 size={20} className="m-auto" />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <motion.div variants={fadeInUp} className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">About the Exhibition</h2>
            <p className="text-gray-300 leading-relaxed mb-8">{exhibition.description}</p>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="aspect-video rounded-xl overflow-hidden mb-8"
            >
              <img src={getOptimizedImageUrl(exhibition.image, 1920)} alt="Exhibition Space" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
          <motion.div variants={fadeInUp} className="md:col-span-1">
            <motion.div whileHover={{ scale: 1.02 }} className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-6">Exhibition Details</h3>
              <div className="space-y-4">
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                  <MapPin size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium">{exhibition.venue.fullname}</p>
                    <p className="text-sm text-gray-400">{address}</p>
                  </div>
                </motion.div>
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-3">
                  <Calendar size={20} className="text-gray-400" />
                  <div>
                    <p className="font-medium">
                      {new Date(exhibition.startDate).toLocaleDateString()} - {new Date(exhibition.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">10:00 AM - 6:00 PM</p>
                  </div>
                </motion.div>
              </div>
              <div className="mt-8">
                <h4 className="font-medium mb-2">Section</h4>
                <div className="space-y-2 text-gray-300">
                  <p>Something else?</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
