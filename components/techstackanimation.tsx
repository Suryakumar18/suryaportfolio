import { useState } from "react";
import { motion } from "framer-motion";

// Tech Stack Animation Component
const TechStackAnimation = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Tech stack data with icons and colors
  const techStack = [
    {
      name: "React",
      icon: "⚛️",
      color: "#61DAFB",
      description: "Frontend library for building user interfaces",
    },
    {
      name: "Node.js",
      icon: "🟢",
      color: "#339933",
      description: "JavaScript runtime built on Chrome's V8 engine",
    },
    {
      name: "MongoDB",
      icon: "🍃",
      color: "#47A248",
      description: "NoSQL document database",
    },
    {
      name: "Express",
      icon: "⚡",
      color: "#000000",
      description: "Web application framework for Node.js",
    },
    {
      name: "MySQL",
      icon: "🐬",
      color: "#4479A1",
      description: "Relational database management system",
    },
    {
      name: "Cypress",
      icon: "🧪",
      color: "#17202C",
      description: "End-to-end testing framework",
    },
  ];

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className="w-full md:w-1/2 flex justify-center items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Outer rotating orbital system */}
        <motion.div
          animate={{ rotate: 360 }}
          className="relative w-80 h-80"
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {/* Central hub */}
          <motion.div
            animate={{
              scale: [0.8, 1, 0.8],
              boxShadow: [
                "0 0 15px rgba(124, 58, 237, 0.5)",
                "0 0 30px rgba(124, 58, 237, 0.8)",
                "0 0 15px rgba(124, 58, 237, 0.5)",
              ],
            }}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full flex items-center justify-center shadow-xl z-20"
            initial={{ scale: 0.8 }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-3xl font-bold text-white">MERN</span>
          </motion.div>

          {/* Tech nodes */}
          {techStack.map((tech, index) => {
            const angle = index * (360 / techStack.length) * (Math.PI / 180);
            const orbitRadius = 140;
            const x = Math.cos(angle) * orbitRadius;
            const y = Math.sin(angle) * orbitRadius;

            return (
              <motion.div
                key={tech.name}
                className="absolute left-1/2 top-1/2"
                style={{
                  x: x,
                  y: y,
                }}
                whileHover={{ scale: 1.2 }}
                onHoverEnd={() => setHoveredTech(null)}
                onHoverStart={() => setHoveredTech(tech.name)}
              >
                <motion.div
                  animate={{ rotate: -360 }} // Counter-rotate to keep icons upright
                  className="flex flex-col items-center"
                  initial={{ rotate: 0 }}
                  transition={{
                    duration: 50,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    animate={{
                      boxShadow:
                        hoveredTech === tech.name
                          ? `0 0 20px ${tech.color}`
                          : "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                    className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-lg border-2"
                    style={{ borderColor: tech.color }}
                  >
                    <div className="text-2xl">{tech.icon}</div>
                  </motion.div>
                  <motion.div
                    animate={{
                      opacity: hoveredTech === tech.name ? 1 : 0.8,
                    }}
                    className="mt-2 text-center"
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {tech.name}
                    </div>
                    {hoveredTech === tech.name && (
                      <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-gray-600 dark:text-gray-300 max-w-[120px]"
                        initial={{ opacity: 0, y: -5 }}
                      >
                        {tech.description}
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Connecting lines between central hub and tech nodes */}
        <svg className="absolute inset-0 w-full h-full z-10 opacity-40">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {techStack.map((tech, index) => {
              const angle = index * (360 / techStack.length) * (Math.PI / 180);
              const orbitRadius = 140;
              const x = Math.cos(angle) * orbitRadius + 160; // Adjust based on container size
              const y = Math.sin(angle) * orbitRadius + 160;

              return (
                <motion.line
                  key={`line-${tech.name}`}
                  animate={{
                    pathLength: [0, 1, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  stroke={tech.color}
                  strokeDasharray="5,5"
                  strokeWidth="2"
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                  x1="160"
                  x2={x}
                  y1="160"
                  y2={y}
                />
              );
            })}
          </motion.g>
        </svg>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => {
          const size = Math.random() * 6 + 2;
          const radius = Math.random() * 180 + 30;
          const angle = Math.random() * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={`particle-${i}`}
              animate={{
                x: [x, x + (Math.random() * 30 - 15)],
                y: [y, y + (Math.random() * 30 - 15)],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
              }}
              className="absolute left-1/2 top-1/2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              style={{
                width: size,
                height: size,
                x: x,
                y: y,
                opacity: 0.7,
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          );
        })}

        {/* Background glow */}
        <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl" />
      </div>

      {/* Floating badges */}
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="absolute -top-10 -right-6 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700"
        initial={{ y: 20, opacity: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-purple-500 text-lg">🚀</span>
        Full Stack Developer
      </motion.div>

      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="absolute -bottom-6 -left-6 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700"
        initial={{ y: 20, opacity: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-blue-500 text-lg">🧪</span>
        Testing Expert
      </motion.div>
    </motion.div>
  );
};

export default TechStackAnimation;
