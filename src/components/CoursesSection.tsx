import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import RegistrationDialog from "@/components/RegistrationDialog";
import { supabase } from "@/integrations/supabase/client";

interface Course {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  spots: string;
}

const typeColors: Record<string, string> = {
  Workshop: "bg-accent/15 text-accent-foreground",
  Course: "bg-primary/10 text-primary",
  Symposium: "bg-accent/15 text-accent-foreground",
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
};

const CoursesSection = () => {
  const [registerCourse, setRegisterCourse] = useState<string | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("date", { ascending: true });

      if (!error && data) {
        setCourses(data);
      }
      setLoading(false);
    };
    fetchCourses();
  }, []);

  if (!loading && courses.length === 0) return null;

  return (
    <section id="courses" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upcoming Courses &amp; Workshops
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Join our upcoming educational events and advance your skills in regional anaesthesia and pain management.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading courses…</div>
        ) : (
          <div className="grid gap-6 max-w-3xl mx-auto">
            {courses.map((course, i) => (
              <motion.article
                key={course.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="bg-card rounded-xl border border-border p-6 md:p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[course.type] ?? "bg-muted text-muted-foreground"}`}>
                    {course.type}
                  </span>
                  <span className="text-xs text-muted-foreground">{course.spots}</span>
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                  {course.title}
                </h3>

                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-5">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-accent" />
                    {formatDate(course.date)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-accent" />
                    {course.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-accent" />
                    {course.location}
                  </span>
                </div>

                <Button
                  onClick={() => setRegisterCourse(course.title)}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Register Now
                </Button>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <RegistrationDialog
        open={!!registerCourse}
        onOpenChange={(open) => !open && setRegisterCourse(null)}
        courseTitle={registerCourse ?? ""}
      />
    </section>
  );
};

export default CoursesSection;
