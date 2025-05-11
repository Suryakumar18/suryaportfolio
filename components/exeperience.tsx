"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
  logo: string;
  color: string;
}

export default function ExperienceSection() {
  const [mounted, setMounted] = useState(false);
  const [activeExperience, setActiveExperience] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Experience data
  const experiences: Experience[] = [
    {
      id: "smartcliff",
      company: "SmartCliff",
      role: "Software Developer",
      period: "2023 - Present",
      description: [
        "Building attendance management system with modern React components and TypeScript",
        "Developing hall booking system with interactive calendar and real-time availability",
        "Creating leave management functionality with approval workflows and notifications",
        "Working on a Learning Management System (LMS) for internal company training",
        "Implementing responsive designs that work across all device sizes",
      ],
      skills: [
        "React",
        "TypeScript",
        "Next.js",
        "Node.js",
        "Tailwind CSS",
        "MongoDB",
      ],
      logo: "🏢",
      color: "#4F46E5", // Indigo
    },
    {
      id: "vidhai",
      company: "Vidhai Innovation Technologies",
      role: "Frontend Developer",
      period: "2022 - 2023",
      description: [
        "Developed features for Learning Management System (LMS) platform",
        "Implemented UI components using React and styled-components",
        "Created interactive quizzes and assessment modules",
        "Performed testing and debugging of frontend functionality",
        "Collaborated with design team to implement pixel-perfect interfaces",
      ],
      skills: ["React", "JavaScript", "CSS3", "HTML5", "REST API", "Git"],
      logo: "🎓",
      color: "#10B981", // Emerald
    },
    {
      id: "freelance",
      company: "Freelance Projects",
      role: "Web Developer",
      period: "2021 - 2022",
      description: [
        "Designed and developed a complete e-commerce platform for a laundry service business",
        "Built online booking system with payment integration for laundry pickup and delivery",
        "Created customer account management system with order tracking functionality",
        "Implemented responsive design for mobile-first user experience",
        "Integrated inventory management system for tracking laundry items and services",
      ],
      skills: [
        "React",
        "Next.js",
        "Firebase",
        "Stripe",
        "Bootstrap",
        "Figma",
        "Responsive Design",
      ],
      logo: "💼",
      color: "#3B82F6", // Blue
    },
  ];

  useEffect(() => {
    setMounted(true);
    setActiveExperience(experiences[0].id);
  }, []);

  const handleExperienceClick = (id: string) => {
    setActiveExperience(id);
  };

  if (!mounted) return null;

  return (
    <section
      ref={containerRef}
      className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
      id="experience"
    >
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Flowing particles with enhanced animation */}
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight - 1000,
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth - 200 + 400 * Math.random(),
              ],
              opacity: [0, 1, 1, 0],
              scale: [1, Math.random() * 0.5 + 0.8, 1], // Added scale animation
            }}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 12 + 2,
              height: Math.random() * 12 + 2,
              background: [
                "rgba(99, 102, 241, 0.2)",
                "rgba(139, 92, 246, 0.2)",
                "rgba(16, 185, 129, 0.2)",
                "rgba(59, 130, 246, 0.2)",
                "rgba(236, 72, 153, 0.2)", // Added pink color
              ][Math.floor(Math.random() * 5)],
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 40 + 30,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20,
            }}
          />
        ))}

        {/* Large gradient circles with enhanced animation */}
        {[1, 2, 3, 4].map((_, i) => (
          <motion.div
            key={`blob-${i}`}
            animate={{
              x: [0, 50, -30, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            className="absolute rounded-full blur-3xl opacity-10 dark:opacity-5"
            style={{
              background: [
                "radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)", // Added pink gradient
              ][i % 4],
              width: 800 + i * 50,
              height: 800 + i * 50,
              left: `${15 + i * 20}%`,
              top: `${25 + i * 15}%`,
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: i * 4,
            }}
          />
        ))}
      </div>

      {/* Removed opacity transform animations from container div */}
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header with enhanced animated underline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [0, 5, -5, 0], // Added rotation animation
            }}
            className="inline-block mb-3"
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-4xl">💼</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-2 relative inline-block">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-emerald-500 to-blue-500">
              Experience
            </span>
          </h2>

          <motion.div
            className="h-1 bg-gradient-to-r from-indigo-500 via-emerald-500 to-blue-500 rounded-full mx-auto mt-3 mb-5"
            initial={{ width: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            whileInView={{ width: "150px" }}
          />

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-4"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            My professional journey in web development
          </motion.p>
        </motion.div>

        {/* Experience timeline */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left panel: Company list */}
          <motion.div
            className="md:w-1/3"
            initial={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all">
              <h3 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Work History
              </h3>

              <div className="space-y-2">
                {experiences.map((exp, index) => (
                  <CompanyCard
                    key={exp.id}
                    experience={exp}
                    index={index}
                    isActive={activeExperience === exp.id}
                    onClick={() => handleExperienceClick(exp.id)}
                  />
                ))}
              </div>

              {/* Experience indicator with enhanced animation */}
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex items-center justify-center p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl shadow-md text-white overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.03 }}
              >
                {/* Added animated background elements */}
                <motion.div
                  animate={{ x: [-100, 300] }}
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.5) 0%, transparent 10%, transparent 100%)",
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                <motion.div
                  animate={{
                    rotate: [0, 20, -20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  className="text-3xl mr-3 relative z-10"
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ⏳
                </motion.div>
                <div className="text-center relative z-10">
                  <span className="font-bold text-xl">3</span>
                  <span className="ml-1">Years Experience</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right panel: Experience details */}
          <motion.div
            className="md:w-2/3"
            initial={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-8">
              {experiences
                .filter(
                  (exp) => !activeExperience || exp.id === activeExperience,
                )
                .map((exp, index) => (
                  <ExperienceCard key={exp.id} experience={exp} index={index} />
                ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Company card component with enhanced animations
function CompanyCard({
  experience,
  isActive,
  onClick,
  index,
}: {
  experience: Experience;
  isActive: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className={`relative cursor-pointer rounded-xl transition-all duration-300 overflow-hidden ${
        isActive
          ? "bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-800 shadow-md"
          : "hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
      initial={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {/* Enhanced active indicator with animation */}
      {isActive && (
        <>
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
            layoutId="activeCompanyIndicator"
            style={{ backgroundColor: experience.color }}
            transition={{ type: "spring", damping: 25 }}
          />
          <motion.div
            animate={{ width: "25%" }}
            className="absolute right-0 top-0 h-1 w-1/4 rounded-b-xl"
            initial={{ width: "0%" }}
            style={{ backgroundColor: experience.color }}
            transition={{ delay: 0.2, duration: 0.5 }}
          />
        </>
      )}

      <div className="p-4 flex items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3 text-xl relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${experience.color}20, ${experience.color}10)`,
            color: experience.color,
          }}
        >
          {/* Added background pulse effect for active item */}
          {isActive && (
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: experience.color }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          <motion.span
            animate={{
              y: isActive ? [0, -3, 0] : [0, 0, 0],
              scale: isActive ? [1, 1.1, 1] : 1,
              rotateY: isActive ? [0, 0, 0] : [0, 0, 0],
            }}
            className="relative z-10"
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {experience.logo}
          </motion.span>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 dark:text-gray-100">
            {experience.company}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {experience.period}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Experience card component with enhanced animations
function ExperienceCard({
  experience,
  index,
}: {
  experience: Experience;
  index: number;
}) {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
      }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {/* Header with custom color and enhanced animation */}
      <div
        className="p-6 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${experience.color}, ${experience.color}cc)`,
        }}
      >
        {/* Added animated floating particles */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={`exp-particle-${i}`}
            animate={{
              y: [Math.random() * 100, Math.random() * 100 - 50],
              x: [Math.random() * 300, Math.random() * 300 - 50],
              opacity: [0.1, 0.3, 0.1],
            }}
            className="absolute rounded-full bg-white opacity-30"
            initial={{
              x: Math.random() * 300,
              y: Math.random() * 100,
            }}
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="flex items-center relative z-10">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.05, 0.95, 1],
            }}
            className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl mr-4"
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {experience.logo}
          </motion.div>

          <div>
            <h3 className="text-xl font-bold">{experience.role}</h3>
            <div className="flex items-center mt-1">
              <span>{experience.company}</span>
              <span className="mx-2">•</span>
              <span>{experience.period}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content with enhanced animations */}
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-sm uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-3">
            Responsibilities
          </h4>
          <ul className="space-y-3">
            {experience.description.map((item, i) => (
              <motion.li
                key={i}
                className="flex items-start"
                initial={{ opacity: 0, x: -10 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ x: 3 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  className="text-lg mr-3 mt-0.5"
                  style={{ color: experience.color }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut",
                  }}
                >
                  •
                </motion.span>
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400 mb-3">
            Technologies Used
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.skills.map((skill, i) => (
              <motion.span
                key={i}
                className="px-3 py-1 text-sm rounded-full relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                style={{
                  backgroundColor: `${experience.color}15`,
                  color: experience.color,
                }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: `${experience.color}30`,
                }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                {/* Added subtle background animation for skills */}
                <motion.div
                  animate={{ x: [-100, 100] }}
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${experience.color}00 0%, ${experience.color}20 50%, ${experience.color}00 100%)`,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.1,
                  }}
                />
                <span className="relative z-10">{skill}</span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
