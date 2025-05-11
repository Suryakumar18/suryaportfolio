"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<null | "success" | "error">(
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace with your actual form submission logic
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (_error) {
      setFormStatus("error");
    } finally {
      setIsSubmitting(false);
      // Reset form status after 3 seconds
      setTimeout(() => setFormStatus(null), 3000);
    }
  };

  // Reset form status when component unmounts
  useEffect(() => {
    return () => {
      setFormStatus(null);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="py-16 md:py-24 px-4 md:px-8 lg:px-12 relative"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-slate-50/30 dark:to-gray-900/30" />

        <motion.div
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-20 dark:opacity-10 bg-gradient-to-r from-blue-400 to-purple-400 blur-3xl"
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <motion.div
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          className="absolute bottom-20 left-20 w-72 h-72 rounded-full opacity-20 dark:opacity-10 bg-gradient-to-r from-purple-400 to-pink-400 blur-3xl"
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl">
        <motion.div
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
          initial="hidden"
          variants={containerVariants}
        >
          {/* Left Column - Contact Info */}
          <motion.div className="w-full lg:w-2/5" variants={itemVariants}>
            <motion.div className="mb-8" variants={itemVariants}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Get in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                  Touch
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                I&apos;m always open to new opportunities, collaborations, and
                interesting projects. Feel free to reach out!
              </p>
            </motion.div>

            <motion.div className="space-y-6" variants={itemVariants}>
              <div className="flex items-start space-x-4">
                <div className="mt-1 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-md">
                  <svg
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    suryakumar242464@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-md">
                  <svg
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                    <path
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    5/181,Pollachi(City),Coimboture-642005
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div className="mt-10" variants={itemVariants}>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Connect with me
              </h3>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                {["github", "linkedin", "twitter", "dribbble"].map((social) => (
                  <motion.a
                    key={social}
                    className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow"
                    href={`https://${social}.com`}
                    rel="noopener noreferrer"
                    target="_blank"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 text-gray-700 dark:text-gray-300"
                      focusable="false"
                      role="img"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Dynamic paths based on social media platform */}
                      {social === "github" && (
                        <path
                          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                          fill="currentColor"
                        />
                      )}
                      {social === "linkedin" && (
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                          fill="currentColor"
                        />
                      )}
                      {social === "twitter" && (
                        <path
                          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                          fill="currentColor"
                        />
                      )}
                      {social === "dribbble" && (
                        <path
                          d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z"
                          fill="currentColor"
                        />
                      )}
                    </svg>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div className="w-full lg:w-3/5" variants={itemVariants}>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 md:p-8"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Send a Message
              </h3>

              <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <motion.div variants={itemVariants}>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      htmlFor="name"
                    >
                      Your Name
                    </label>
                    <input
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      htmlFor="email"
                    >
                      Email Address
                    </label>
                    <input
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      id="email"
                      name="email"
                      placeholder="john@example.com"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants}>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="subject"
                  >
                    Subject
                  </label>
                  <input
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div className="pt-2" variants={itemVariants}>
                  <button
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium text-base shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 relative overflow-hidden disabled:opacity-70"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        Send Message
                        <svg
                          className="ml-2 h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                          />
                        </svg>
                      </span>
                    )}
                  </button>

                  {/* Form Status Message */}
                  {formStatus && (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-4 p-3 rounded-lg ${
                        formStatus === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                          : "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400"
                      }`}
                      exit={{ opacity: 0 }}
                      initial={{ opacity: 0, y: 10 }}
                    >
                      {formStatus === "success" ? (
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              fillRule="evenodd"
                            />
                          </svg>
                          Your message has been sent successfully!
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <svg
                            className="h-5 w-5 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              clipRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              fillRule="evenodd"
                            />
                          </svg>
                          An error occurred. Please try again later.
                        </div>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
