import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

// TypeScript interfaces
interface UseInViewOptions {
  triggerOnce?: boolean;
  threshold?: number;
  rootMargin?: string;
}

interface CertificateProps {
  id: number;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string;
  skills: string[];
  color: string;
  description?: string;
}

interface CertificateBadgeProps {
  image: string;
  color: string;
  size?: string;
}

interface CertificateModalProps {
  certificate: CertificateProps | null;
  isOpen: boolean;
  onClose: () => void;
}

interface CertificateCardProps extends CertificateProps {
  onClick: (certificate: CertificateProps) => void;
}

// Custom hook to replace react-intersection-observer
const useInView = (options: UseInViewOptions = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (options.triggerOnce && entry.isIntersecting) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || "0px",
      },
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);

  return [ref, inView] as const;
};

// Custom Badge component for certifications
const CertificateBadge = ({
  image,
  color,
  size = "w-16 h-16",
}: CertificateBadgeProps) => {
  return (
    <motion.div
      className={`relative ${size} rounded-full flex items-center justify-center ${color} shadow-lg`}
      transition={{ type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
      <motion.div
        animate={{
          boxShadow: [
            "0px 0px 0px rgba(255,255,255,0.2)",
            "0px 0px 8px rgba(255,255,255,0.5)",
            "0px 0px 0px rgba(255,255,255,0.2)",
          ],
        }}
        className={`${size === "w-16 h-16" ? "w-14 h-14" : "w-20 h-20"} relative z-10 p-2 bg-white rounded-full flex items-center justify-center`}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <img
          alt="Certificate logo"
          className="w-full h-full object-contain"
          src={image}
        />
      </motion.div>
    </motion.div>
  );
};

// Modal component for displaying full-size certificate and details
const CertificateModal = ({
  certificate,
  isOpen,
  onClose,
}: CertificateModalProps) => {
  // Close modal when clicking outside content
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close on ESC key press
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);

    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  // Handle certificate download
  const handleDownload = () => {
    if (!certificate) return;

    const link = document.createElement("a");

    link.href = certificate.image;
    link.download = `${certificate.title.replace(/\s+/g, "_")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get background colors based on certificate color
  const getBackgroundColors = (color: string) => {
    const bgClasses: Record<string, string> = {
      blue: "from-blue-500 to-blue-800",
      green: "from-green-500 to-green-800",
      purple: "from-purple-500 to-purple-800",
      orange: "from-orange-400 to-orange-700",
      red: "from-red-500 to-red-800",
      teal: "from-teal-400 to-teal-700",
    };

    return bgClasses[color] || "from-blue-500 to-blue-800";
  };

  if (!certificate) return null;

  const bgClass = getBackgroundColors(certificate.color);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden relative"
            exit={{ scale: 0.9, opacity: 0 }}
            initial={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header with certificate color gradient */}
            <div className={`bg-gradient-to-r ${bgClass} p-6 pb-12 relative`}>
              <div className="absolute top-4 right-4 z-10">
                <motion.button
                  className="bg-white/20 backdrop-blur-sm text-white rounded-full p-2 hover:bg-white/30 transition-colors"
                  transition={{ duration: 0.2 }}
                  whileHover={{ rotate: 90 }}
                  onClick={onClose}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.button>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {certificate.title}
              </h2>
              <div className="flex items-center text-white/80 mt-2">
                <span>{certificate.issuer}</span>
                <span className="mx-2">•</span>
                <span>{certificate.date}</span>
              </div>
            </div>

            {/* Certificate content area */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Left column - Certificate image */}
                <div className="md:w-1/2 flex flex-col items-center">
                  <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl relative mb-4 w-full">
                    {/* Certificate badge floating above image */}
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
                      <CertificateBadge
                        color={certificate.color}
                        image={certificate.image}
                        size="w-24 h-24"
                      />
                    </div>

                    {/* Certificate preview image */}
                    <motion.div
                      animate={{ y: 0, opacity: 1 }}
                      className="mt-10 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-lg aspect-[4/3] flex items-center justify-center relative overflow-hidden"
                      initial={{ y: 20, opacity: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <img
                        alt={certificate.title}
                        className="w-full h-full object-contain"
                        src={certificate.image}
                      />

                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2" />
                    </motion.div>

                    {/* Download button */}
                    <motion.button
                      className={`mt-6 py-3 px-6 rounded-full bg-gradient-to-r ${bgClass} text-white font-medium w-full flex items-center justify-center`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleDownload}
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Download Certificate
                    </motion.button>
                  </div>
                </div>

                {/* Right column - Certificate details */}
                <div className="md:w-1/2">
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Description */}
                    {certificate.description && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                          Description
                        </h3>
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                          <p className="text-gray-700 dark:text-gray-300">
                            {certificate.description}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Skills */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Skills Certified
                      </h3>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                        <div className="flex flex-wrap gap-2">
                          {certificate.skills.map((skill, index) => (
                            <motion.span
                              key={index}
                              animate={{ opacity: 1, scale: 1 }}
                              className={`px-3 py-1.5 text-sm font-medium rounded-full text-white bg-gradient-to-r ${bgClass}`}
                              initial={{ opacity: 0, scale: 0.8 }}
                              transition={{ delay: 0.4 + index * 0.05 }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Certificate details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Certificate Details
                      </h3>
                      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-3">
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Issuing Organization
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 font-medium">
                            {certificate.issuer}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Issue Date
                          </span>
                          <span className="text-gray-800 dark:text-gray-200 font-medium">
                            {certificate.date}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Credential ID
                          </span>
                          <div className="flex items-center">
                            <span className="text-gray-800 dark:text-gray-200 font-medium mr-2">
                              {certificate.credentialId}
                            </span>
                            <motion.button
                              className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
                              title="Copy credential ID"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Share certificate */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                        Share Certificate
                      </h3>
                      <div className="flex gap-3">
                        {["LinkedIn", "Twitter", "Email"].map(
                          (platform, index) => (
                            <motion.button
                              key={platform}
                              animate={{ opacity: 1, y: 0 }}
                              className="py-2 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 flex items-center transition-colors"
                              initial={{ opacity: 0, y: 10 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {platform === "LinkedIn" && (
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                              )}
                              {platform === "Twitter" && (
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                              )}
                              {platform === "Email" && (
                                <svg
                                  className="w-5 h-5 mr-2"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                  />
                                </svg>
                              )}
                              {platform}
                            </motion.button>
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Custom Certificate Card component with 3D effect
const CertificateCard = ({
  id,
  title,
  issuer,
  date,
  credentialId,
  image,
  skills,
  color,
  description,
  onClick,
}: CertificateCardProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // 3D rotation effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateY = (x - 0.5) * 15; // -7.5 to 7.5 degrees
    const rotateX = (0.5 - y) * 15; // -7.5 to 7.5 degrees

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
  };

  const bgClasses: Record<string, string> = {
    blue: "from-blue-600 to-blue-900",
    green: "from-green-600 to-green-900",
    purple: "from-purple-600 to-purple-900",
    orange: "from-orange-500 to-orange-800",
    red: "from-red-600 to-red-900",
    teal: "from-teal-500 to-teal-800",
  };

  const bgClass = bgClasses[color] || "from-blue-600 to-blue-900";

  const handleClick = () => {
    onClick({
      id,
      title,
      issuer,
      date,
      credentialId,
      image,
      skills,
      color,
      description,
    });
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      className="w-full"
      initial="hidden"
      variants={cardVariants}
    >
      <div
        className="relative h-full cursor-pointer group perspective"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={(e) => {
          setIsHovered(false);
          handleMouseLeave(e);
        }}
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className={`p-6 rounded-xl shadow-xl h-full preserve-3d backdrop-blur-sm bg-gradient-to-br ${bgClass}`}
          style={{
            transformStyle: "preserve-3d",
          }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5 }}
        >
          <div className="relative z-10">
            <div className="flex justify-between mb-4">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <div className="flex items-center text-white/80 text-sm mt-1">
                  <span>{issuer}</span>
                  <span className="mx-2">•</span>
                  <span>{date}</span>
                </div>
              </div>

              <motion.div
                className="text-white"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>

            <div className="flex items-center justify-center my-6">
              <CertificateBadge color={color} image={image} />
            </div>

            {description && (
              <div className="my-4 text-white/90 text-sm line-clamp-2">
                <p>{description}</p>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {skills.slice(0, 3).map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-2 py-1 text-xs font-medium rounded-full text-white bg-white/20"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {skill}
                </motion.span>
              ))}
              {skills.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium rounded-full text-white bg-white/20">
                  +{skills.length - 3} more
                </span>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
              <div className="text-xs text-white/70">
                <span>ID: {credentialId.substring(0, 8)}...</span>
              </div>
              <motion.div
                className="bg-white/20 rounded-full p-1"
                style={{ transformStyle: "preserve-3d", translateZ: "20px" }}
                whileHover={{ scale: 1.1, rotate: 90 }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* 3D effect elements */}
          <div
            className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 60%)`,
              transformStyle: "preserve-3d",
              transform: "translateZ(-10px)",
            }}
          />

          {/* Decorative elements */}
          <div
            className="absolute top-0 left-0 w-40 h-40 rounded-full bg-white/5"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(5px) translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-60 h-60 rounded-full bg-black/10"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(5px) translate(30%, 30%)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Main Certificates Grid component
export default function CertificatesGrid() {
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateProps | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const certificatesData: CertificateProps[] = [
    {
      id: 1,
      title: "Full Stack Web Development",
      issuer: "ITVedant Education Private Limited",
      date: "June 2023",
      credentialId: "FSWD20230619",
      image: "/images/masterinfullstackwebdevelopment_38_1694695557.jpg",
      skills: [
        "React.js",
        "Node.js",
        "MongoDB",
        "Express",
        "JavaScript",
        "HTML5",
        "CSS3",
      ],
      color: "blue",
      description:
        "Comprehensive full stack web development program covering front-end and back-end technologies.",
    },
    {
      id: 2,
      title: "Microsoft Python Certification",
      issuer: "ITVedant Education Private Limited",
      date: "March 2023",
      credentialId: "MSP20230315",
      image: "/images/microsoftcertificationforpythonmsp_149_1694695557.jpg",
      skills: [
        "Python",
        "Data Structures",
        "Algorithms",
        "Object-Oriented Programming",
      ],
      color: "purple",
      description:
        "Microsoft certified program covering advanced Python programming concepts and applications.",
    },
    {
      id: 3,
      title: "MongoDB Database Management",
      issuer: "ITVedant Education Private Limited",
      date: "April 2023",
      credentialId: "MDBM20230410",
      image: "/images/mongodbmd_113_1694695554.jpg",
      skills: [
        "MongoDB",
        "NoSQL",
        "Database Design",
        "CRUD Operations",
        "Aggregation Framework",
      ],
      color: "green",
      description:
        "Specialized course on MongoDB database architecture, design patterns, and advanced querying.",
    },
    {
      id: 4,
      title: "Node.js & Express.js",
      issuer: "ITVedant Education Private Limited",
      date: "May 2023",
      credentialId: "NEJE20230505",
      image: "/images/nodejsexpressjsne_118_1694695554.jpg",
      skills: [
        "Node.js",
        "Express.js",
        "RESTful APIs",
        "Middleware",
        "Authentication",
      ],
      color: "teal",
      description:
        "Advanced backend development with Node.js and Express.js framework and RESTful API design.",
    },
    {
      id: 5,
      title: "Python Programming",
      issuer: "ITVedant Education Private Limited",
      date: "February 2023",
      credentialId: "PYP20230220",
      image: "/images/pythonprogrammingpp_97_1694695550.jpg",
      skills: [
        "Python",
        "Data Analysis",
        "Web Scraping",
        "Automation",
        "File Handling",
      ],
      color: "orange",
      description:
        "Comprehensive Python programming course covering core concepts and practical applications.",
    },
    {
      id: 6,
      title: "SQL Database Management",
      issuer: "ITVedant Education Private Limited",
      date: "January 2023",
      credentialId: "SQLDM20230125",
      image: "/images/sqlsql_100_1694695551.jpg",
      skills: [
        "SQL",
        "Database Design",
        "Queries",
        "Stored Procedures",
        "Performance Optimization",
      ],
      color: "red",
      description:
        "SQL database management covering relational database concepts, advanced queries, and optimization.",
    },
  ];

  const handleOpenModal = (certificate: CertificateProps) => {
    setSelectedCertificate(certificate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div
      className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      id="certifications"
    >
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
          Professional Certifications
        </h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Credentials validating expertise across various technologies and
          domains. Click on any certificate to view more details.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificatesData.map((certificate) => (
          <CertificateCard
            key={certificate.id}
            {...certificate}
            onClick={handleOpenModal}
          />
        ))}
      </div>

      <CertificateModal
        certificate={selectedCertificate}
        isOpen={modalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
