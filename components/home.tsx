"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useTheme } from "next-themes";

import TechStackAnimation from "./techstackanimation"; // Import the new component

// Subtle background animation
const AnimatedBackground = (): JSX.Element => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-indigo-950/30" />

      {/* Animated grain texture */}
      <motion.div
        animate={{ opacity: [0.2, 0.25, 0.2] }}
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating gradient blobs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 dark:opacity-10 bg-gradient-to-r from-purple-400 to-blue-400 blur-3xl"
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        className="absolute top-1/2 -right-40 w-80 h-80 rounded-full opacity-20 dark:opacity-10 bg-gradient-to-r from-blue-400 to-teal-400 blur-3xl"
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <motion.div
        animate={{
          x: [0, 20, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        className="absolute -bottom-40 left-1/3 w-72 h-72 rounded-full opacity-20 dark:opacity-10 bg-gradient-to-r from-pink-400 to-purple-400 blur-3xl"
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Animated text component with simpler animation
interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const AnimatedText = ({
  text,
  delay = 0,
  className = "",
}: AnimatedTextProps): JSX.Element => {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      transition={{
        delay: delay,
        duration: 0.6,
      }}
    >
      {text}
    </motion.div>
  );
};

// Resume Modal Component
interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({
  isOpen,
  onClose,
}: ResumeModalProps): JSX.Element | null => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0">
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full h-full max-w-none max-h-none flex flex-col"
        exit={{ opacity: 0, scale: 0.9 }}
        initial={{ opacity: 0, scale: 0.9 }}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Resume Preview
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={onClose}
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
          </button>
        </div>

        <div className="flex-1 overflow-auto p-0">
          <iframe
            className="w-full h-full min-h-[calc(100vh-120px)] border-0"
            src="/images/Suryakumar-Resume.pdf#view=FitH"
            title="Resume Preview"
          />
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <motion.a
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium text-base shadow-lg shadow-purple-500/20 flex items-center"
            download="suryakumar-resume.pdf"
            href="/images/Suryakumar-Resume.pdf"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            Download Resume
            <svg
              className="h-5 w-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

// Main HomePage Component
export default function HomePage(): JSX.Element | null {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const { scrollY } = useScroll();

  // Simple parallax effect
  const contentOpacity: MotionValue<number> = useTransform(
    scrollY,
    [0, 300],
    [1, 0],
  );
  const contentY: MotionValue<number> = useTransform(
    scrollY,
    [0, 300],
    [0, 100],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Main content section */}
      <motion.section
        className="min-h-screen flex flex-col md:flex-row items-center justify-center py-10 px-4 md:px-8 lg:px-12"
        style={{
          opacity: contentOpacity,
          y: contentY,
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left side content */}
          <div className="w-full md:w-1/2 flex flex-col space-y-8">
            <div className="space-y-4">
              <AnimatedText
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
                delay={0.2}
                text="Crafting Digital"
              />
              <AnimatedText
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500 leading-tight"
                delay={0.4}
                text="Experiences"
              />
            </div>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-lg text-gray-600 dark:text-gray-300 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              I create immersive web experiences that blend cutting-edge
              technology with thoughtful design, delivering full-stack solutions
              from database to user interface.
            </motion.p>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.button
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium text-base shadow-lg shadow-purple-500/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                View My Work
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  className="ml-2 inline-block"
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  →
                </motion.span>
              </motion.button>

              <motion.button
                className="px-6 py-3 rounded-lg border border-purple-500/30 dark:border-purple-400/30 text-gray-900 dark:text-white font-medium text-base flex items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsResumeModalOpen(true)}
              >
                <span>Resume</span>
                <svg
                  className="h-5 w-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </motion.button>
            </motion.div>

            {/* Tech stack indicators */}
            <motion.div
              animate={{ opacity: 1 }}
              className="flex flex-wrap gap-3 pt-6"
              initial={{ opacity: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              {[
                "React",
                "Node.js",
                "MongoDB",
                "Express",
                "MySQL",
                "Cypress",
              ].map((tech, i) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-sm bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right side tech stack animation - replaced with the new component */}
          <div style={{ padding: "12px" }}>
            <TechStackAnimation />
          </div>
        </div>
      </motion.section>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30"
        initial={{ opacity: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400"
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          Scroll to explore
        </motion.span>
        <motion.div className="w-5 h-9 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [0, 1, 0],
            }}
            className="w-1 h-2 bg-purple-500 rounded-full mt-1"
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
