"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

// Social media icon component
const SocialIcon = ({
  icon,
  href,
  delay = 0,
}: {
  icon: React.ReactNode;
  href: string;
  delay?: number;
}): JSX.Element => {
  return (
    <motion.a
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 dark:bg-gray-800/30 hover:bg-purple-500/20 dark:hover:bg-purple-500/20 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border border-gray-200 dark:border-gray-700"
      href={href}
      initial={{ opacity: 0, y: 20 }}
      rel="noopener noreferrer"
      target="_blank"
      transition={{ delay, duration: 0.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
};

// Footer link component
const FooterLink = ({
  text,
  href,
  delay = 0,
  onClick,
}: {
  text: string;
  href: string;
  delay?: number;
  onClick?: () => void;
}): JSX.Element => {
  return (
    <motion.a
      animate={{ opacity: 1, y: 0 }}
      className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
      href={href}
      initial={{ opacity: 0, y: 10 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ x: 3 }}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {text}
    </motion.a>
  );
};

export default function Footer({
  onNavigate,
}: {
  onNavigate?: (sectionId: string) => void;
}): JSX.Element | null {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 mt-20 overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{ opacity: 1 }}
        className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
        initial={{ opacity: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        animate={{
          x: [0, -10, 0],
          y: [0, 5, 0],
        }}
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-20 dark:opacity-10 bg-gradient-to-r from-purple-400 to-blue-400 blur-3xl"
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.div
        animate={{
          x: [0, 10, 0],
          y: [0, -5, 0],
        }}
        className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full opacity-20 dark:opacity-10 bg-gradient-to-r from-blue-400 to-teal-400 blur-3xl"
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      {/* Footer content */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* About section */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1 md:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h3
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              About
            </motion.h3>
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-600 dark:text-gray-400 mb-6"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Full-stack developer passionate about creating immersive web
              experiences with cutting-edge technology and thoughtful design.
            </motion.p>

            {/* Social links */}
            <div className="flex space-x-3">
              <SocialIcon
                delay={0.2}
                href="https://github.com"
                icon={
                  <svg
                    fill="currentColor"
                    height="20"
                    viewBox="0 0 16 16"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                }
              />
              <SocialIcon
                delay={0.3}
                href="https://linkedin.com"
                icon={
                  <svg
                    fill="currentColor"
                    height="20"
                    viewBox="0 0 16 16"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                }
              />
              <SocialIcon
                delay={0.4}
                href="https://twitter.com"
                icon={
                  <svg
                    fill="currentColor"
                    height="20"
                    viewBox="0 0 16 16"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                  </svg>
                }
              />
              <SocialIcon
                delay={0.5}
                href="https://dribbble.com"
                icon={
                  <svg
                    fill="currentColor"
                    height="20"
                    viewBox="0 0 16 16"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 0C3.584 0 0 3.584 0 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.668-.451-.99 2.516-1.023 3.662-2.498 3.81-2.69zM8 1.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A6.95 6.95 0 0 1 8 1.18zm-2.907.642A43.123 43.123 0 0 1 7.627 5.77c-3.193.85-6.013.833-6.317.833a6.865 6.865 0 0 1 3.783-4.78zM1.163 8.01V7.8c.295.01 3.61.053 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.817 6.817 0 0 1-1.762-4.564zM8 14.837a6.785 6.785 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.246 28.246 0 0 1 1.457 5.18A6.722 6.722 0 0 1 8 14.837zm3.81-1.171c-.07-.417-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.774 6.774 0 0 1-2.924 4.573z"
                      fillRule="evenodd"
                    />
                  </svg>
                }
              />
            </div>
          </motion.div>

          {/* Navigation links */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h3
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Navigation
            </motion.h3>
            <nav className="flex flex-col space-y-3">
              <FooterLink
                delay={0.3}
                href="#home"
                text="Home"
                onClick={() => onNavigate && onNavigate("home")}
              />
              <FooterLink
                delay={0.35}
                href="#projects"
                text="Projects"
                onClick={() => onNavigate && onNavigate("projects")}
              />
              <FooterLink
                delay={0.4}
                href="#skills"
                text="Skills"
                onClick={() => onNavigate && onNavigate("skills")}
              />
              <FooterLink
                delay={0.45}
                href="#experience"
                text="Experience"
                onClick={() => onNavigate && onNavigate("experience")}
              />
              <FooterLink
                delay={0.5}
                href="#certification"
                text="Certifications"
                onClick={() => onNavigate && onNavigate("certification")}
              />
            </nav>
          </motion.div>

          {/* Projects section */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.h3
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Recent Projects
            </motion.h3>
            <nav className="flex flex-col space-y-3">
              <FooterLink
                delay={0.4}
                href="#projects"
                text="Attendance Management"
                onClick={() => onNavigate && onNavigate("projects")}
              />
              <FooterLink
                delay={0.45}
                href="#projects"
                text="Dashboard Analytics"
                onClick={() => onNavigate && onNavigate("projects")}
              />
              <FooterLink
                delay={0.5}
                href="#projects"
                text="Buisness Websites"
                onClick={() => onNavigate && onNavigate("projects")}
              />
              <FooterLink
                delay={0.55}
                href="#projects"
                text="API Development"
                onClick={() => onNavigate && onNavigate("projects")}
              />
            </nav>
          </motion.div>

          {/* Contact section */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="col-span-1"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.h3
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Contact
            </motion.h3>

            <motion.div
              animate={{ opacity: 1 }}
              className="space-y-4"
              initial={{ opacity: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -10 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <svg
                    fill="currentColor"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg>
                </div>
                <a
                  className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  href="mailto:hello@example.com"
                >
                  suryakumar242464@gmail.com
                </a>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -10 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <svg
                    fill="currentColor"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  +91 8610659547
                </span>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center space-x-3"
                initial={{ opacity: 0, x: -10 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <svg
                    fill="currentColor"
                    height="16"
                    viewBox="0 0 16 16"
                    width="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  5/181,City-Pollachi,Coimboture-642005
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom section with copyright and back to top */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <motion.div
            animate={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            © {currentYear} Your Name. All rights reserved.
          </motion.div>

          <motion.div
            animate={{ opacity: 1 }}
            className="mt-4 md:mt-0 flex items-center space-x-4"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Made with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                className="inline-block text-red-500 mx-1"
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  repeatDelay: 1,
                }}
              >
                ♥
              </motion.span>
              and React
            </span>

            <motion.button
              className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-purple-100 dark:hover:bg-purple-900/20 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <svg
                fill="currentColor"
                height="16"
                viewBox="0 0 16 16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                  fillRule="evenodd"
                />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
