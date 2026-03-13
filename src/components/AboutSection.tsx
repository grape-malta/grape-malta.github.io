import { motion } from "framer-motion";
import { BookOpen, Users, Award } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Education",
    description:
      "Delivering high-quality courses and workshops in regional anaesthesia techniques and pain management.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a network of passionate clinicians dedicated to advancing patient care across Malta.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Promoting evidence-based practice and international standards in anaesthesia education.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 surface-warm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Mission
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            GRAPE-Malta is a non-profit organisation committed to fostering education and
            professional development in regional anaesthesia and pain management for
            healthcare professionals in Malta.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-card rounded-xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
