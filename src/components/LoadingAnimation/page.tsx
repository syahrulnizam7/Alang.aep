import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        {/* Large pulsing circle */}
        <motion.div
          className="absolute w-32 h-32 rounded-full bg-purple-600/20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Medium pulsing circle */}
        <motion.div
          className="absolute w-24 h-24 rounded-full bg-purple-600/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />

        {/* Small pulsing circle */}
        <motion.div
          className="absolute w-16 h-16 rounded-full bg-purple-600/40"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />

        {/* Center static circle */}
        <motion.div
          className="relative w-12 h-12 rounded-full bg-purple-600"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          {/* Spinning dots */}
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{ top: "10%", left: "50%", marginLeft: "-4px" }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full opacity-75"
            style={{ top: "50%", right: "10%", marginTop: "-4px" }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
              delay: 0.25,
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full opacity-50"
            style={{ bottom: "10%", left: "50%", marginLeft: "-4px" }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
          />
          <motion.div
            className="absolute w-2 h-2 bg-white rounded-full opacity-25"
            style={{ top: "50%", left: "10%", marginTop: "-4px" }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
              delay: 0.75,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
