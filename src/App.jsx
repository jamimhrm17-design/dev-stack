import React from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechCard from "./components/TechCard";
import StackSidebar from "./components/StackSidebar";
import Footer from "./components/Footer";

export default function App() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stack, setStack] = useState({});

  useEffect(() => {
    fetch("/technologies.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load technologies.json");
        return res.json();
      })
      .then((data) => {
        setTechnologies(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleAdd = (tech) => {
    if (stack[tech.id]) {
      toast.warn(`${tech.name} is already in your stack.`);
      return;
    }
    setStack((prev) => ({ ...prev, [tech.id]: tech }));
    toast.success(`${tech.name} added to your stack.`);
  };

  const handleRemove = (tech) => {
    setStack((prev) => {
      const next = { ...prev };
      delete next[tech.id];
      return next;
    });
    toast.info(`${tech.name} removed from your stack.`);
  };

  const handleRemoveAll = () => {
    if (Object.keys(stack).length === 0) return;
    setStack({});
    toast.info("Your stack has been cleared.");
  };

  const isSelected = (tech) => Boolean(stack[tech.id]);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />

      <section id="technologies" className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-extrabold mb-1">
          Explore the <span className="gradient-brand-text">Technologies</span>
        </h2>
        <p className="text-gray-500 mb-8">
          Pick the technologies you want and build your ideal stack.
        </p>

        {loading && (
          <div className="flex items-center justify-center py-24 text-gray-400 gap-3">
            <span className="w-6 h-6 border-2 border-gray-300 border-t-brand-pink rounded-full animate-spin" />
            Loading technologies...
          </div>
        )}

        {error && !loading && (
          <p className="text-center text-red-500 py-24">
            Something went wrong loading the technologies: {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {technologies.map((tech) => (
                <TechCard
                  key={tech.id}
                  tech={tech}
                  isSelected={isSelected(tech)}
                  onAdd={handleAdd}
                />
              ))}
            </div>

            <StackSidebar
              stack={stack}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
            />
          </div>
        )}
      </section>

      <Footer />

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        theme="light"
        newestOnTop
      />
    </div>
  );
}