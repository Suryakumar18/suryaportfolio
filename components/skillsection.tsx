"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define skill types for TypeScript
interface Skill {
  category: string;
  name: string;
  emoji: string;
  icon: string;
  color: string;
  description: string;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  emoji: string;
  color: string;
  darkColor: string;
  skills: Skill[];
}

// Define props for child components
interface CategoryButtonProps {
  children: ReactNode;
  active: boolean;
  onClick: () => void;
  icon: string;
  emoji: string;
}

interface SkillCardProps {
  skill: Skill & { category?: string };
  index: number;
  onClick: () => void;
  categoryColor?: string;
  categoryDarkColor?: string;
}

export default function SkillsSection() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Updated skill categories with emojis
  const skillCategories: SkillCategory[] = [
    {
      id: "frontend",
      name: "Frontend",
      icon: "fa-code",
      emoji: "🎨",
      color: "from-rose-400 to-orange-500",
      darkColor: "dark:from-rose-500 dark:to-orange-600",
      skills: [
        {
          name: "HTML5",
          emoji: "📄",
          icon: "fa-html5",
          color: "text-orange-500",
          description:
            "Expert in semantic HTML5 markup, accessibility standards, and modern web structure.",
          category: "",
        },
        {
          name: "CSS3",
          emoji: "🎭",
          icon: "fa-css3-alt",
          color: "text-blue-500",
          description:
            "Advanced CSS3 styling including animations, transitions, and custom properties.",
          category: "",
        },
        {
          name: "JavaScript",
          emoji: "⚡",
          icon: "fa-js-square",
          color: "text-yellow-500",
          description:
            "Extensive experience with ES6+, async programming, and DOM manipulation.",
          category: "",
        },
        {
          name: "React",
          emoji: "⚛️",
          icon: "fa-react",
          color: "text-cyan-400",
          description:
            "Component architecture, hooks, context API, and state management with Redux.",
          category: "",
        },
        {
          name: "Next.js",
          emoji: "▲",
          icon: "fa-n",
          color: "text-black dark:text-white",
          description:
            "Server-side rendering, static site generation, and full-stack React applications.",
          category: "",
        },
        {
          name: "Vue.js",
          emoji: "🟢",
          icon: "fa-vuejs",
          color: "text-green-500",
          description:
            "Component-based architecture with Vue CLI, Vuex for state management.",
          category: "",
        },
        {
          name: "Angular",
          emoji: "🅰️",
          icon: "fa-angular",
          color: "text-red-600",
          description:
            "Building robust applications with TypeScript, RxJS, and Angular Material.",
          category: "",
        },
        {
          name: "TypeScript",
          emoji: "🔷",
          icon: "fa-code",
          color: "text-blue-600",
          description:
            "Static typing, interfaces, and advanced type features for safer code.",
          category: "",
        },
        {
          name: "Tailwind",
          emoji: "🌊",
          icon: "fa-wind",
          color: "text-cyan-500",
          description:
            "Utility-first CSS framework for rapid UI development with responsive design.",
          category: "",
        },
        {
          name: "SASS",
          emoji: "💅",
          icon: "fa-sass",
          color: "text-pink-500",
          description:
            "Advanced styling with variables, mixins, and nested rules for maintainable CSS.",
          category: "",
        },
      ],
    },
    {
      id: "backend",
      name: "Backend",
      icon: "fa-server",
      emoji: "🔧",
      color: "from-violet-500 to-fuchsia-500",
      darkColor: "dark:from-violet-600 dark:to-fuchsia-600",
      skills: [
        {
          name: "Node.js",
          emoji: "🟢",
          icon: "fa-node-js",
          color: "text-green-500",
          description:
            "Server-side JavaScript with Express, authentication, and RESTful API design.",
          category: "",
        },
        {
          name: "Express",
          emoji: "🚂",
          icon: "fa-node",
          color: "text-gray-700 dark:text-gray-300",
          description:
            "Middleware, routing, and API development with Express.js framework.",
          category: "",
        },
        {
          name: "MongoDB",
          emoji: "🍃",
          icon: "fa-database",
          color: "text-green-600",
          description:
            "NoSQL database design, aggregation pipeline, and Mongoose ODM integration.",
          category: "",
        },
        {
          name: "PostgreSQL",
          emoji: "🐘",
          icon: "fa-database",
          color: "text-blue-800",
          description:
            "Relational database design, complex queries, and integration with ORMs.",
          category: "",
        },
        {
          name: "Python",
          emoji: "🐍",
          icon: "fa-python",
          color: "text-yellow-500",
          description:
            "Backend development with Django/Flask, data processing, and automation.",
          category: "",
        },
        {
          name: "GraphQL",
          emoji: "📊",
          icon: "fa-project-diagram",
          color: "text-pink-600",
          description:
            "Schema design, resolvers, and integration with Apollo Client/Server.",
          category: "",
        },
        {
          name: "REST API",
          emoji: "🔄",
          icon: "fa-exchange-alt",
          color: "text-teal-500",
          description:
            "API design principles, endpoint architecture, and robust error handling.",
          category: "",
        },
        {
          name: "Firebase",
          emoji: "🔥",
          icon: "fa-fire",
          color: "text-yellow-600",
          description:
            "Realtime database, authentication, cloud functions, and hosting.",
          category: "",
        },
      ],
    },
    {
      id: "tools",
      name: "Tools & DevOps",
      icon: "fa-tools",
      emoji: "🛠️",
      color: "from-emerald-500 to-teal-500",
      darkColor: "dark:from-emerald-600 dark:to-teal-600",
      skills: [
        {
          name: "Git",
          emoji: "🔄",
          icon: "fa-git-alt",
          color: "text-orange-600",
          description:
            "Version control, branching strategies, and collaborative workflow management.",
          category: "",
        },
        {
          name: "GitHub",
          emoji: "🐙",
          icon: "fa-github",
          color: "text-gray-800 dark:text-gray-200",
          description:
            "Pull requests, actions, project management, and continuous integration.",
          category: "",
        },
        {
          name: "Bitbucket",
          emoji: "🪣",
          icon: "fa-bitbucket",
          color: "text-blue-500",
          description:
            "Team collaboration, pipelines, and repository management solutions.",
          category: "",
        },
        {
          name: "Docker",
          emoji: "🐳",
          icon: "fa-docker",
          color: "text-blue-500",
          description:
            "Container creation, orchestration, and deployment with Docker Compose.",
          category: "",
        },
        {
          name: "AWS",
          emoji: "☁️",
          icon: "fa-aws",
          color: "text-yellow-600",
          description:
            "Cloud infrastructure including EC2, S3, Lambda, and CloudFormation.",
          category: "",
        },
        {
          name: "CI/CD",
          emoji: "🔄",
          icon: "fa-sync-alt",
          color: "text-green-500",
          description:
            "Automated testing, building, and deployment with GitHub Actions and Jenkins.",
          category: "",
        },
        {
          name: "Jest",
          emoji: "🧪",
          icon: "fa-vial",
          color: "text-red-600",
          description:
            "JavaScript testing framework for unit and integration tests with code coverage.",
          category: "",
        },
        {
          name: "Webpack",
          emoji: "📦",
          icon: "fa-cube",
          color: "text-blue-400",
          description:
            "Module bundling, code splitting, and optimization for production builds.",
          category: "",
        },
      ],
    },
  ];

  // Get all skills for "all" category
  const allSkills = skillCategories.reduce<(Skill & { category: string })[]>(
    (acc, category) => {
      return [
        ...acc,
        ...category.skills.map((skill) => ({
          ...skill,
          category: category.id,
        })),
      ];
    },
    [],
  );

  const closeSkillDetails = () => {
    setSelectedSkill(null);
  };

  if (!mounted) return null;

  return (
    <section className="py-20 px-4 relative overflow-hidden" id="skills">
      {/* Background with gradient mesh */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-950" />

        {/* Mesh gradient background */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient
                id="meshGradient"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <filter height="200%" id="glow" width="200%" x="-50%" y="-50%">
                <feGaussianBlur result="blur" stdDeviation="20" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect
              fill="url(#meshGradient)"
              filter="url(#glow)"
              height="100%"
              width="100%"
            />
          </svg>
        </div>

        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            className="absolute rounded-full bg-white dark:bg-gray-200 opacity-30 dark:opacity-20 blur-sm"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section header with animated text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="inline-block relative">
            <motion.h2
              animate={{ opacity: 1 }}
              className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
              initial={{ opacity: 0 }}
              style={{ textShadow: "0 2px 10px rgba(79, 70, 229, 0.2)" }}
              transition={{ duration: 1 }}
            >
              Tech Stack
            </motion.h2>

            {/* Animated underline */}
            <motion.div
              className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-full w-0 mx-auto"
              initial={{ width: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileInView={{ width: "60%" }}
            />
          </div>

          <motion.p
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-6"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1 }}
          >
            My toolkit for building elegant, high-performance web applications
          </motion.p>
        </motion.div>

        {/* Category filters with emojis */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-5 mb-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <CategoryButton
            active={activeCategory === "all"}
            emoji="✨"
            icon="fa-layer-group"
            onClick={() => setActiveCategory("all")}
          >
            All Skills
          </CategoryButton>

          {skillCategories.map((category) => (
            <CategoryButton
              key={category.id}
              active={activeCategory === category.id}
              emoji={category.emoji}
              icon={category.icon}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </CategoryButton>
          ))}
        </motion.div>

        {/* Skills Grid with modern glass-morphism cards */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.05 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <AnimatePresence>
            {(activeCategory === "all"
              ? allSkills
              : skillCategories.find((c) => c.id === activeCategory)?.skills ||
                []
            ).map((skill, index) => (
              <SkillCard
                key={`${activeCategory}-${skill.name}`}
                categoryColor={
                  activeCategory === "all"
                    ? skillCategories.find((c) => c.id === skill.category)
                        ?.color
                    : skillCategories.find((c) => c.id === activeCategory)
                        ?.color
                }
                categoryDarkColor={
                  activeCategory === "all"
                    ? skillCategories.find((c) => c.id === skill.category)
                        ?.darkColor
                    : skillCategories.find((c) => c.id === activeCategory)
                        ?.darkColor
                }
                index={index}
                skill={skill}
                onClick={() => setSelectedSkill(skill)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Full Stack Developer highlight section */}
        <motion.div
          className="mt-24 relative"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700">
            {/* Decorative background elements */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20 blur-xl" />
            <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full opacity-20 blur-xl" />

            <div className="relative p-8 md:p-12 z-10">
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl mb-6 shadow-lg shadow-indigo-500/30"
                  transition={{ duration: 0.6 }}
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.05 }}
                >
                  <span className="text-3xl">🚀</span>
                </motion.div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-900 dark:text-white">
                  Full Stack Developer
                </h3>

                <motion.p
                  className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl"
                  initial={{ opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1 }}
                >
                  Specialized in the MERN stack for building complete web
                  applications from frontend to backend
                </motion.p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mx-auto">
                  {[
                    {
                      name: "MongoDB",
                      emoji: "🍃",
                      color: "from-green-400 to-emerald-500",
                      delay: 0,
                    },
                    {
                      name: "Express",
                      emoji: "🚂",
                      color: "from-gray-500 to-gray-600",
                      delay: 0.1,
                    },
                    {
                      name: "React",
                      emoji: "⚛️",
                      color: "from-blue-400 to-cyan-500",
                      delay: 0.2,
                    },
                    {
                      name: "Node.js",
                      emoji: "🟢",
                      color: "from-green-500 to-teal-600",
                      delay: 0.3,
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="flex flex-col items-center"
                      initial={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: item.delay }}
                      viewport={{ once: true }}
                      whileInView={{ opacity: 1, y: 0 }}
                    >
                      <motion.div
                        className="flex items-center justify-center w-20 h-20 md:w-24 md:h-24 mb-4 rounded-2xl relative overflow-hidden group"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.3 },
                        }}
                      >
                        {/* Background gradient */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity duration-300`}
                        />

                        {/* Glass effect */}
                        <div className="absolute inset-0 bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-70 backdrop-blur-sm group-hover:bg-opacity-70 transition-all duration-300" />

                        {/* Border glow on hover */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10`}
                        />

                        {/* Emoji with scale animation */}
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          className="relative z-10 text-5xl md:text-6xl"
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror",
                          }}
                        >
                          {item.emoji}
                        </motion.div>
                      </motion.div>

                      <motion.span
                        className="text-base md:text-lg font-medium text-gray-800 dark:text-gray-200"
                        initial={{ opacity: 0 }}
                        transition={{ delay: 0.3 + item.delay }}
                        viewport={{ once: true }}
                        whileInView={{ opacity: 1 }}
                      >
                        {item.name}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal for skill details */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={closeSkillDetails}
          >
            <motion.div
              animate={{ scale: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden max-w-md w-full shadow-2xl relative"
              exit={{ scale: 0.9, y: 20 }}
              initial={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative header */}
              <div
                className={`h-24 relative flex items-center justify-center bg-gradient-to-r ${
                  selectedSkill.color === "text-orange-500"
                    ? "from-orange-400 to-red-500"
                    : selectedSkill.color === "text-blue-500"
                      ? "from-blue-400 to-indigo-500"
                      : selectedSkill.color === "text-yellow-500"
                        ? "from-yellow-400 to-amber-500"
                        : selectedSkill.color === "text-cyan-400"
                          ? "from-cyan-400 to-sky-500"
                          : selectedSkill.color === "text-black dark:text-white"
                            ? "from-gray-700 to-gray-900"
                            : selectedSkill.color === "text-green-500"
                              ? "from-green-400 to-emerald-500"
                              : selectedSkill.color === "text-red-600"
                                ? "from-red-500 to-rose-600"
                                : selectedSkill.color === "text-blue-600"
                                  ? "from-blue-500 to-indigo-600"
                                  : selectedSkill.color === "text-pink-500"
                                    ? "from-pink-400 to-rose-500"
                                    : "from-indigo-500 to-purple-600"
                }`}
              >
                <div className="absolute inset-0 opacity-30">
                  <svg
                    height="100%"
                    viewBox="0 0 800 800"
                    width="100%"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      fill="url(#skillGradient)"
                      height="100%"
                      width="100%"
                    />
                    <defs>
                      <linearGradient
                        id="skillGradient"
                        x1="0%"
                        x2="100%"
                        y1="0%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#ffffff"
                          stopOpacity="0.1"
                        />
                        <stop
                          offset="100%"
                          stopColor="#ffffff"
                          stopOpacity="0.4"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="text-5xl z-10">{selectedSkill.emoji}</div>

                <motion.button
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeSkillDetails}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </motion.button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className={selectedSkill.color}>
                    <i className={`fas ${selectedSkill.icon}`} />
                  </span>
                  {selectedSkill.name}
                </h3>

                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 mb-6">
                  <p className="text-gray-700 dark:text-gray-300">
                    {selectedSkill.description}
                  </p>
                </div>

                {/* Skill proficiency meter */}
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      Proficiency
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Advanced
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: "85%" }}
                      className={`h-full ${
                        selectedSkill.color === "text-orange-500"
                          ? "bg-orange-500"
                          : selectedSkill.color === "text-blue-500"
                            ? "bg-blue-500"
                            : selectedSkill.color === "text-yellow-500"
                              ? "bg-yellow-500"
                              : selectedSkill.color === "text-cyan-400"
                                ? "bg-cyan-500"
                                : selectedSkill.color ===
                                    "text-black dark:text-white"
                                  ? "bg-gray-800"
                                  : selectedSkill.color === "text-green-500"
                                    ? "bg-green-500"
                                    : selectedSkill.color === "text-red-600"
                                      ? "bg-red-600"
                                      : selectedSkill.color === "text-blue-600"
                                        ? "bg-blue-600"
                                        : selectedSkill.color ===
                                            "text-pink-500"
                                          ? "bg-pink-500"
                                          : "bg-indigo-500"
                      }`}
                      initial={{ width: "0%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Experience info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Experience
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                      <span className="mr-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </span>
                      5+ years
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Last used
                    </p>
                    <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
                      <span className="mr-2">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </span>
                      Current
                    </p>
                  </div>
                </div>

                <motion.button
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={closeSkillDetails}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Category button component with emoji
const CategoryButton: React.FC<CategoryButtonProps> = ({
  children,
  active,
  onClick,
  icon,
  emoji,
}) => {
  return (
    <motion.button
      className={`px-5 py-2.5 rounded-full font-medium text-sm md:text-base flex items-center gap-2 transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25"
          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:shadow-md"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <span className="text-lg">{emoji}</span>
      {children}
    </motion.button>
  );
};

// Skill card component
const SkillCard: React.FC<SkillCardProps> = ({
  skill,
  index,
  onClick,
  categoryColor = "from-indigo-500 to-purple-600",
  categoryDarkColor = "dark:from-indigo-600 dark:to-purple-700",
}) => {
  return (
    <motion.div
      layout
      animate={{ opacity: 1, y: 0 }}
      className="relative group"
      exit={{ opacity: 0, scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br rounded-2xl opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity duration-300"
        style={{
          background: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
        }}
      />

      <motion.button
        className={`w-full aspect-square overflow-hidden relative rounded-2xl text-center flex flex-col items-center justify-center p-4 space-y-3
          bg-white dark:bg-gray-800 shadow-md hover:shadow-xl dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700
          transition-all duration-300 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80
          hover:bg-gradient-to-br hover:border-transparent ${categoryColor} ${categoryDarkColor}
          hover:text-white dark:hover:text-white`}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      >
        {/* Floating emoji */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          className="text-4xl mb-2"
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        >
          {skill.emoji}
        </motion.div>

        <span
          className={`text-lg font-medium text-gray-800 dark:text-gray-200 group-hover:text-white transition-colors duration-300`}
        >
          {skill.name}
        </span>
      </motion.button>
    </motion.div>
  );
};
