"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import Image from "next/image";

// Custom icons
const MenuIcon = () => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M3 12h18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <motion.path
      d="M3 6h18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <motion.path
      d="M3 18h18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    fill="none"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <motion.path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

// Custom icons for profile details
const EmailIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      animate={{ pathLength: 1 }}
      d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8 }}
    />
    <motion.path
      animate={{ pathLength: 1 }}
      d="M22 6L12 13L2 6"
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8, delay: 0.2 }}
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      animate={{ pathLength: 1 }}
      d="M22 16.92V19.92C22 20.4704 21.7893 20.9996 21.4142 21.3747C21.0391 21.7498 20.5099 21.9605 19.96 21.96C16.4267 21.6358 13.0423 20.4803 10.07 18.59C7.32759 16.8811 5.05078 14.6043 3.34195 11.8619C1.44953 8.87841 0.293876 5.48331 0 1.93996C0.00692353 1.39109 0.215896 0.862957 0.589212 0.487703C0.962529 0.112449 1.49008 -0.0982539 2.04 0.039957H5.04C5.51115 0.0378545 5.96511 0.195705 6.3213 0.486125C6.67749 0.776545 6.91388 1.18031 6.99 1.63996C7.13818 2.5564 7.37675 3.45751 7.7 4.32996C7.85875 4.74909 7.89251 5.2076 7.79456 5.64427C7.69661 6.08094 7.47281 6.47379 7.15 6.76996L5.89 8.02996C7.46214 10.89 9.79493 13.2228 12.66 14.7999L13.92 13.5399C14.2162 13.2171 14.609 12.9933 15.0457 12.8954C15.4824 12.7974 15.9409 12.8312 16.36 12.9899C17.2325 13.3132 18.1336 13.5518 19.05 13.6999C19.5149 13.7769 19.9232 14.0173 20.2123 14.3799C20.5015 14.7424 20.6541 15.204 20.65 15.6799L22 16.92Z"
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8 }}
    />
  </svg>
);

const EducationIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      animate={{ pathLength: 1 }}
      d="M22 10V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V8C2 6.9 2.9 6 4 6H20C21.1 6 22 6.9 22 8V10Z"
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8 }}
    />
    <motion.path
      animate={{ pathLength: 1 }}
      d="M6 14H8M12 14H18"
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8, delay: 0.3 }}
    />
    <motion.path
      animate={{ pathLength: 1 }}
      d="M12 10H6M18 10H16"
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8, delay: 0.5 }}
    />
  </svg>
);

const WorkIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      animate={{ pathLength: 1 }}
      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8 }}
    />
    <motion.path
      animate={{ pathLength: 1 }}
      d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  </svg>
);

const CalendarIcon = () => (
  <svg
    fill="none"
    height="20"
    viewBox="0 0 24 24"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.rect
      animate={{ pathLength: 1 }}
      height="18"
      initial={{ pathLength: 0 }}
      rx="2"
      ry="2"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8 }}
      width="18"
      x="3"
      y="4"
    />
    <motion.line
      animate={{ pathLength: 1 }}
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8, delay: 0.2 }}
      x1="16"
      x2="16"
      y1="2"
      y2="6"
    />
    <motion.line
      animate={{ pathLength: 1 }}
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8, delay: 0.3 }}
      x1="8"
      x2="8"
      y1="2"
      y2="6"
    />
    <motion.line
      animate={{ pathLength: 1 }}
      initial={{ pathLength: 0 }}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      transition={{ duration: 0.8, delay: 0.4 }}
      x1="3"
      x2="21"
      y1="10"
      y2="10"
    />
  </svg>
);

const Logo = () => (
  <motion.div
    className="flex items-center"
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
    whileHover={{ scale: 1.05 }}
  >
    <motion.div
      animate={{ rotateY: 360 }}
      className="relative w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg flex items-center justify-center overflow-hidden"
      initial={{ rotateY: 0 }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatDelay: 5,
        ease: "easeInOut",
      }}
    >
      <motion.div
        animate={{ x: "100%" }}
        className="absolute w-full h-full bg-gradient-to-tr from-purple-600 to-blue-500 opacity-70"
        initial={{ x: "-100%" }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />
      <span className="text-white font-bold text-xl z-10">D</span>
    </motion.div>
    <motion.span
      animate={{ opacity: 1, y: 0 }}
      className="ml-2 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
      initial={{ opacity: 0, y: 5 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      DevFolio
    </motion.span>
  </motion.div>
);

type ProfileInfoProps = {
  closeProfile: () => void;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({ closeProfile }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={closeProfile}
    >
      <motion.div
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden w-full max-w-md shadow-2xl"
        exit={{ scale: 0.8, opacity: 0 }}
        initial={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with larger image */}
        <div className="relative h-36 bg-gradient-to-r from-purple-600 to-blue-500">
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
            initial={{ y: 20, opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 overflow-hidden">
              <Image
                alt="Suryakumar"
                className="object-cover"
                height={128}
                src="/images/skprofile.jpg"
                width={128}
              />
              <motion.div
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/30"
                initial={{ opacity: 0 }}
                transition={{ delay: 0.5 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Profile content */}
        <motion.div
          animate="visible"
          className="pt-20 pb-6 px-6"
          initial="hidden"
          variants={containerVariants}
        >
          <motion.h2
            className="text-center text-2xl font-bold text-gray-800 dark:text-white mb-1"
            variants={itemVariants}
          >
            Suryakumar
          </motion.h2>

          <motion.p
            className="text-center text-purple-600 dark:text-purple-400 font-medium mb-6"
            variants={itemVariants}
          >
            Full Stack Developer
          </motion.p>

          <div className="space-y-4">
            {/* Date of Birth */}
            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="mr-3 text-purple-600 dark:text-purple-400">
                <CalendarIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Date of Birth
                </p>
                <p className="font-medium text-gray-800 dark:text-white">
                  18/03/2001
                </p>
              </div>
            </motion.div>

            {/* Education */}
            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="mr-3 text-purple-600 dark:text-purple-400 mt-1">
                <EducationIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Education
                </p>
                <p className="font-medium text-gray-800 dark:text-white">
                  BE Mechatronics Engineering
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Dr. Mahalingam College of Engineering and Technology
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Graduated 2022
                </p>
              </div>
            </motion.div>

            {/* Work */}
            <motion.div className="flex items-start" variants={itemVariants}>
              <div className="mr-3 text-purple-600 dark:text-purple-400 mt-1">
                <WorkIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Currently Working At
                </p>
                <p className="font-medium text-gray-800 dark:text-white">
                  Smartcliff Learning Solutions
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Full Stack Developer
                </p>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="mr-3 text-purple-600 dark:text-purple-400">
                <PhoneIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p className="font-medium text-gray-800 dark:text-white">
                  +91 8610659547
                </p>
              </div>
            </motion.div>

            <motion.div className="flex items-center" variants={itemVariants}>
              <div className="mr-3 text-purple-600 dark:text-purple-400">
                <EmailIcon />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="font-medium text-gray-800 dark:text-white break-all">
                  suryakumar242464@gmail.com
                </p>
              </div>
            </motion.div>
          </div>

          {/* Close button */}
          <motion.button
            className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-lg shadow-purple-500/20"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={closeProfile}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showProfile, setShowProfile] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  // Navigation items
  const navItems = [
    { label: "Home", href: "/#home", sectionId: "home" },
    { label: "Projects", href: "/#projects", sectionId: "projects" },
    { label: "Skills", href: "/#skills", sectionId: "skills" },
    { label: "Experience", href: "/#experience", sectionId: "experience" },
    {
      label: "Certifications",
      href: "/#certifications",
      sectionId: "certifications",
    },
    { label: "Contact", href: "/#contact", sectionId: "contact" },
  ];

  useEffect(() => {
    // Scroll spy functionality to highlight the current section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for the navbar height

      // Find all section elements
      const sections = document.querySelectorAll("div[id]");

      // Determine which section is currently in view
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        const sectionHeight = (section as HTMLElement).offsetHeight || 0;
        const sectionBottom = sectionTop + sectionHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  // Handle section navigation
  const handleNavigation = (sectionId: string) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
    setIsOpen(false); // Close mobile menu if open
  };

  // Handle key events for profile button
  const handleProfileKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleProfile();
    }
  };

  // Animation variants for nav items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  // Animation for profile button
  const profileButtonVariants = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 0 rgba(124, 58, 237, 0)",
        "0 0 0 8px rgba(124, 58, 237, 0.2)",
        "0 0 0 0 rgba(124, 58, 237, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
      },
    },
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - fixed accessibility */}
            <motion.button
              aria-label="Go to home"
              className="cursor-pointer bg-transparent border-none p-0"
              onClick={() => handleNavigation("home")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleNavigation("home");
                }
              }}
            >
              <Logo />
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.sectionId;

                return (
                  <motion.div
                    key={item.label}
                    animate="visible"
                    custom={i}
                    initial="hidden"
                    variants={itemVariants}
                  >
                    <motion.a
                      aria-label={`Go to ${item.label}`}
                      className={`relative px-2 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer flex items-center ${
                        isActive
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                      }`}
                      role="button"
                      tabIndex={0}
                      whileHover={{
                        scale: 1.1,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        },
                      }}
                      onClick={() => handleNavigation(item.sectionId)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          handleNavigation(item.sectionId);
                        }
                      }}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-500"
                          layoutId="navbar-indicator"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 30,
                          }}
                        />
                      )}
                    </motion.a>
                  </motion.div>
                );
              })}
            </div>

            {/* Right side items */}
            <div className="flex items-center">
              {/* Profile Picture Button */}
              <motion.button
                ref={profileButtonRef}
                animate="pulse"
                aria-label="View profile"
                className="relative p-1 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg shadow-purple-500/20 cursor-pointer"
                initial="initial"
                variants={profileButtonVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleProfile}
                onKeyDown={handleProfileKeyDown}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
                  <Image
                    alt="Suryakumar"
                    className="object-cover"
                    height={32}
                    src="/images/skprofile.jpg"
                    width={32}
                  />
                </div>
                <motion.div
                  animate={{
                    borderWidth: [4, 0, 4],
                    borderColor: [
                      "rgba(124, 58, 237, 0)",
                      "rgba(124, 58, 237, 0.5)",
                      "rgba(124, 58, 237, 0)",
                    ],
                  }}
                  className="absolute inset-0 rounded-full"
                  initial={{
                    borderWidth: 4,
                    borderColor: "rgba(124, 58, 237, 0)",
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
              </motion.button>

              {/* Connect Button */}
              <motion.button
                aria-label="Let&apos;s connect"
                className="ml-4 hidden sm:flex px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium text-sm shadow-lg shadow-purple-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation("contact")}
              >
                <span>Let&apos;s Connect</span>
                <motion.span
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                >
                  →
                </motion.span>
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                aria-label="Toggle menu"
                className="md:hidden ml-4 p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleMenu}
              >
                {isOpen ? <CloseIcon /> : <MenuIcon />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              animate={{ opacity: 1, height: "auto" }}
              className="md:hidden"
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.sectionId;

                  return (
                    <motion.div
                      key={item.label}
                      animate="visible"
                      custom={i}
                      initial="hidden"
                      variants={itemVariants}
                    >
                      <motion.button
                        aria-label={`Go to ${item.label}`}
                        className={`flex items-center px-3 py-2 rounded-md text-base font-medium cursor-pointer w-full text-left ${
                          isActive
                            ? "text-purple-600 dark:text-purple-400 bg-gray-100 dark:bg-gray-800"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                        whileHover={{ x: 5 }}
                        onClick={() => handleNavigation(item.sectionId)}
                      >
                        {item.label}
                      </motion.button>
                    </motion.div>
                  );
                })}
                <motion.div
                  animate="visible"
                  custom={navItems.length}
                  initial="hidden"
                  variants={itemVariants}
                >
                  <motion.button
                    aria-label="Let&apos;s connect"
                    className="w-full mt-3 px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium text-sm shadow-lg shadow-purple-500/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigation("contact")}
                  >
                    <span>Let&apos;s Connect</span>
                    <motion.span
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Profile Info Modal */}
      <AnimatePresence>
        {showProfile && <ProfileInfo closeProfile={toggleProfile} />}
      </AnimatePresence>

      {/* Accessibility: Skip to main content link */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white dark:focus:bg-gray-900 focus:text-purple-600 dark:focus:text-purple-400"
        href="#main-content"
      >
        Skip to main content
      </a>
    </>
  );
}
