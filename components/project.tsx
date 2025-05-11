"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";

// Project Type Definition
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  category: string;
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
}

// Project Data
const projects: Project[] = [
  {
    id: 1,
    title: "Employee Management System",
    description:
      "A comprehensive employee management system for printing press businesses. Tracks check-in/out times, manages daily work assignments, monitors printing stock levels, and generates performance reports.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Material UI"],
    image: "/images/employee.jpg",
    category: "Full Stack",
    demoUrl: "#",
    codeUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Business Website",
    description:
      "A dynamic business website with modern UI/UX design, responsive across all devices, featuring custom animations and integrated contact forms with backend processing.",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    image: "/images/buisness.jpg",
    category: "Frontend",
    demoUrl: "https://mrlaundry.shop",
    codeUrl: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Vidh.ai LMS Portal Enhancements",
    description:
      "Added new features to an existing Learning Management System including advanced HTML, CSS, and JavaScript compilers, interactive code playgrounds, and improved user dashboard analytics.",
    technologies: ["React", "TypeScript", "Redux", "Node.js", "MongoDB"],
    image: "/images/lms.jpg",
    category: "Feature Development",
    demoUrl: "https://platform.vidh.ai/login",
    featured: false,
  },
  {
    id: 4,
    title: "Cypress Testing Framework",
    description:
      "Implemented comprehensive testing suite using Cypress with Cucumber for BDD. Created reusable test components, automated regression tests, and integrated with CI/CD pipeline.",
    technologies: ["Cypress", "Cucumber", "JavaScript", "GitLab CI"],
    image: "/images/testing.jpg",
    category: "Testing",
    codeUrl: "#",
    featured: false,
  },
];

// Filter categories
const categories = [
  "All",
  "Full Stack",
  "Frontend",
  "Feature Development",
  "Testing",
];

// Animated project card component
const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className="flex flex-col h-full overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
      initial="hidden"
      variants={cardVariants}
    >
      <div className="relative h-52 sm:h-64 overflow-hidden group">
        <Image
          alt={project.title}
          className="transition-transform duration-500 group-hover:scale-110"
          layout="fill"
          objectFit="cover"
          src={project.image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full flex justify-between items-center">
            {project.demoUrl && (
              <motion.a
                className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-medium"
                href={project.demoUrl}
                rel="noopener noreferrer"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Live Demo
              </motion.a>
            )}
            {project.codeUrl && (
              <motion.a
                className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm font-medium dark:bg-gray-700"
                href={project.codeUrl}
                rel="noopener noreferrer"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Code
              </motion.a>
            )}
          </div>
        </div>
        {project.featured && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
            Featured
          </div>
        )}
      </div>

      <div className="flex flex-col p-5 flex-grow">
        <div className="mb-2">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
            {project.category}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700/70 rounded text-gray-700 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700/70 rounded text-gray-700 dark:text-gray-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Projects section component
export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [mounted, setMounted] = useState(false);
  const controls = useAnimation();
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  useEffect(() => {
    setMounted(true);
    if (isHeaderInView) {
      controls.start("visible");
    }
  }, [isHeaderInView, controls]);

  // Filtered projects based on selected category
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const filterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const filterItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <section
      className="py-20 bg-gray-50 dark:bg-gray-900/50 relative"
      id="projects"
    >
      {/* Subtle background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-50/20 to-blue-50/10 dark:from-purple-900/5 dark:to-blue-900/5 pointer-events-none" />

      {/* Animated background grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-5 dark:opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          animate={controls}
          className="text-center mb-16"
          initial="hidden"
          variants={headerVariants}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </motion.h2>
          <motion.div className="h-1 w-20 bg-gradient-to-r from-purple-600 to-blue-500 mx-auto mb-6" />
          <motion.p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Showcasing my journey through web development with a collection of
            full-stack applications, frontend designs, and technical
            integrations.
          </motion.p>
        </motion.div>

        {/* Filter categories */}
        <motion.div
          animate="visible"
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial="hidden"
          variants={filterVariants}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-md"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
              variants={filterItemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(category)}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} index={index} project={project} />
          ))}
        </div>

        {/* More projects button */}
        {mounted && filteredProjects.length >= 3 && (
          <motion.div
            animate={{ opacity: 1 }}
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              className="px-6 py-3 rounded-lg bg-white dark:bg-gray-800 border border-purple-500/30 dark:border-purple-400/30 text-gray-900 dark:text-white font-medium text-base shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <motion.span
                animate={{ x: [0, 5, 0] }}
                className="ml-2 inline-block"
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
