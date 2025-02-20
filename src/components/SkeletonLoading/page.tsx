import { motion } from "framer-motion";

const SkeletonLoading = () => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          {/* Thumbnail Skeleton */}
          <motion.div
            className="relative aspect-video rounded-xl overflow-hidden bg-gray-800 mb-4"
            whileHover={{ scale: 1.03 }}
          >
            <motion.div
              className="w-full h-full bg-gray-700 animate-pulse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Title Skeleton */}
          <motion.div
            className="h-6 bg-gray-800 rounded-lg mb-2 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* Description Skeleton */}
          <motion.div
            className="h-4 bg-gray-800 rounded-lg mb-1 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="h-4 bg-gray-800 rounded-lg animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SkeletonLoading;
