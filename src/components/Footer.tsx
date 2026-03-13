import { Mail } from "lucide-react";
import logo from "@/assets/grape-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="GRAPE-Malta logo" className="h-10 w-10 object-contain" />
              <span className="font-heading font-bold text-lg">
                GRAPE<span className="text-accent">-Malta</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 max-w-sm leading-relaxed text-sm">
              Groups of Regional Anaesthesia and Pain Management Enthusiasts – Malta.
              A non-profit organisation dedicated to advancing anaesthesia education.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Get in Touch</h3>
            <a
              href="mailto:info@grapemalta.org"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              info@grapemalta.org
            </a>
            <p className="text-primary-foreground/50 text-xs mt-8">
              © {new Date().getFullYear()} GRAPE-Malta. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
