import { Mail } from "lucide-react";
import logo from "@/assets/grape-logo.jpg";

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
            <p className="text-primary-foreground/60 text-xs mt-3 flex items-center gap-2">
              <span>In affiliation with</span>
              <a href="https://esraeurope.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center hover:opacity-80 transition-opacity">
                <img src={esraLogo} alt="ESRA Europe logo" className="h-6 w-auto" />
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Get in Touch</h3>
            <a

              className="flex items-center gap-2 text-primary-foreground/70 hover:text-accent transition-colors text-sm" href="mailto:grape-malta@outlook.com">
              
              <Mail className="w-4 h-4" />
              grape-malta@outlook.com
            </a>
            <div className="flex items-center gap-4 text-primary-foreground/50 text-xs mt-8">
              <p>© {new Date().getFullYear()} GRAPE-Malta. All rights reserved.</p>
              <a href="/admin" className="hover:text-accent transition-colors">Admin</a>
            </div>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;