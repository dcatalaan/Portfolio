import { motion } from 'framer-motion';
import Timeline from '../components/Timeline';

const Experience = () => {
  return (
    <section className="py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Timeline />
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
