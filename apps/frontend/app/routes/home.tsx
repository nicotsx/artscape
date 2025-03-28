import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router';
import { getApiExhibitions } from '~/api-client';
import { ExhibitionCard } from '~/components/exhibition-card';
import type { Route } from './+types/home';

export function meta() {
  return [{ title: 'Artscape' }, { name: 'description', content: 'Discover Art Exhibitions' }];
}

export async function loader() {
  const { data } = await getApiExhibitions();
  return data;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { scrollY } = useScroll();

  const heroImageScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, 150]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="relative h-screen w-full">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ scale: heroImageScale }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1577720580479-7d839d829c73?auto=format&fit=crop&q=80&w=2940"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
        >
          <motion.div style={{ y: heroTextY }} className="max-w-7xl mx-auto px-6 h-full flex items-center relative">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="mt-20">
              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold leading-tight">
                Discover Contemporary
                <br />
                Art Exhibitions
              </motion.h1>
              <motion.p variants={fadeInUp} className="mt-6 text-xl text-gray-300 max-w-2xl">
                Explore the most compelling art exhibitions happening right now in your city and around the world.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link
                  to="/exhibitions"
                  className="mt-8 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition flex items-center space-x-2 w-fit group"
                >
                  <span>Explore Now</span>
                  <motion.div whileHover={{ x: 5 }} transition={springTransition}>
                    <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex justify-between items-end mb-12"
        >
          <motion.div variants={fadeInUp}>
            <h2 className="text-3xl font-bold">Current Exhibitions</h2>
            <p className="text-gray-400 mt-2">Discover what's on display right now</p>
          </motion.div>
          <motion.div variants={fadeInUp} whileHover={{ x: 5 }} transition={springTransition}>
            <Link to="/exhibitions" className="text-sm flex items-center space-x-2 hover:text-gray-300 transition">
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loaderData?.exhibitions.slice(0, 3).map((exhibition, index) => (
            <motion.div
              key={exhibition.id}
              variants={{
                initial: { opacity: 0, y: 50 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    type: 'spring',
                    damping: 25,
                    stiffness: 100,
                    delay: index * 0.1,
                  },
                },
              }}
            >
              <Link to={`/exhibitions/${exhibition.id}`} className="group block transform transition-transform duration-300 hover:scale-[1.02]">
                <ExhibitionCard exhibition={exhibition} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
