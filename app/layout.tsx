"use client";

import "@/styles/globals.css";
import { useRef, useEffect } from "react";

import Navbar from "../components/navbar";
import Home from "../components/home";
import Project from "../components/project";
import ExperienceSection from "../components/exeperience";
import CertificationSection from "../components/certification";

import { Providers } from "./providers";

import SkillsSection from "@/components/skillsection";
import ContactSection from "@/components/contact";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create refs for each section
  const homeRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const certificationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Create a map of section IDs to their refs
  const sectionRefs = {
    home: homeRef,
    projects: projectsRef,
    skills: skillsRef,
    experience: experienceRef,
    certifications: certificationRef, // Changed from 'certification' to 'certifications'
    contact: contactRef,
  };

  // Handle scroll events from the navbar
  const handleScroll = (sectionId: string) => {
    const sectionRef = sectionRefs[sectionId as keyof typeof sectionRefs];

    if (sectionRef?.current) {
      // Add a small timeout to ensure the element is properly rendered before scrolling
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  // Set up event listeners for navigation
  useEffect(() => {
    // Function to handle hash changes for direct URL navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");

      if (hash && sectionRefs[hash as keyof typeof sectionRefs]) {
        handleScroll(hash);
      }
    };

    // Check for hash on initial load
    if (window.location.hash) {
      // Small delay to ensure the DOM is fully loaded
      setTimeout(handleHashChange, 300);
    }

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Define sections to map through instead of writing them individually
  const sections = [
    { id: "home", ref: homeRef, component: <Home /> },
    { id: "projects", ref: projectsRef, component: <Project /> },
    { id: "skills", ref: skillsRef, component: <SkillsSection /> },
    { id: "experience", ref: experienceRef, component: <ExperienceSection /> },
    {
      id: "certification",
      ref: certificationRef,
      component: <CertificationSection />,
    },
    { id: "contact", ref: contactRef, component: <ContactSection /> },
  ];

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className="bg-white dark:bg-gray-900 overflow-x-hidden">
        <Providers>
          {/* Pass the handleScroll function to Navbar */}
          <Navbar onNavigate={handleScroll} />

          {/* Main content with ref-connected sections */}
          <main className="w-full overflow-x-hidden">
            {/* Map through sections array to render each section with a key */}
            {sections.map((section) => (
              <div key={section.id} ref={section.ref} id={section.id}>
                {section.component}
              </div>
            ))}

            <div key="footer">
              {/* Pass the handleScroll function to Footer */}
              <Footer onNavigate={handleScroll} />
            </div>

            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
