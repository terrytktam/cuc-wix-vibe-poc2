import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-muted-grey py-16">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-heading text-3xl mb-6 text-foreground">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-base leading-relaxed">
                  The Chinese University of Hong Kong
                  <br />
                  Shatin, New Territories
                  <br />
                  Hong Kong SAR
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:info@cuchorus.org"
                  className="text-base hover:text-primary transition-colors duration-300"
                >
                  info@cuchorus.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+85239437000"
                  className="text-base hover:text-primary transition-colors duration-300"
                >
                  +852 3943 7000
                </a>
              </div>
            </div>
          </div>

          {/* Press Room */}
          <div>
            <h3 className="font-heading text-3xl mb-6 text-foreground">Press Room</h3>
            <p className="text-base leading-relaxed mb-4">
              Access our press materials, media kits, and latest news releases
            </p>
            <a
              href="https://www.cuhk.edu.hk/english/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base text-primary hover:text-foreground transition-colors duration-300"
            >
              Visit Press Room
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-muted-grey text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} The Chinese University of Hong Kong Chorus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
