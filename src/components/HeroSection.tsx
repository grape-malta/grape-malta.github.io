import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-accent font-heading font-semibold text-sm tracking-[0.2em] uppercase mb-4"
        >
          Groups of Regional Anaesthesia &amp; Pain Management Enthusiasts
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
        >
          GRAPE<span className="text-accent">-Malta</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body"
        >
          Advancing regional anaesthesia education and pain management excellence
          across Malta through hands-on workshops, courses, and collaborative learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#courses"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-accent-foreground font-heading font-semibold text-sm hover:brightness-110 transition-all"
          >
            View Upcoming Courses
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-primary-foreground/30 text-primary-foreground font-heading font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
