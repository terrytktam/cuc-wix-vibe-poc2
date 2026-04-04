import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { useLanguageStore } from '@/lib/languageStore';

export default function Footer() {
  const { language } = useLanguageStore();

  const contactTitle = language === 'en' ? 'Contact Us' : '聯絡我們';
  const pressRoomTitle = language === 'en' ? 'Press Room' : '新聞室';
  const pressRoomDesc = language === 'en' 
    ? 'Access our press materials, media kits, and latest news releases'
    : '查閱我們的新聞資料、媒體工具包和最新新聞稿';
  const visitPressRoom = language === 'en' ? 'Visit Press Room' : '訪問新聞室';
  const copyrightText = language === 'en'
    ? `© ${new Date().getFullYear()} The Chinese University of Hong Kong Chorus. All rights reserved.`
    : `© ${new Date().getFullYear()} 香港中文大學合唱團。版權所有。`;

  return (
    <footer className="bg-secondary border-t border-muted-grey py-16">
      <div className="max-w-[100rem] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Contact Information */}
          <div>
            <h3 className="font-heading text-3xl mb-6 text-foreground">{contactTitle}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <p className="text-base leading-relaxed">
                  {language === 'en' ? (
                    <>
                      The Chinese University of Hong Kong
                      <br />
                      Shatin, New Territories
                      <br />
                      Hong Kong SAR
                    </>
                  ) : (
                    <>
                      香港中文大學
                      <br />
                      沙田，新界
                      <br />
                      香港特別行政區
                    </>
                  )}
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
            <h3 className="font-heading text-3xl mb-6 text-foreground">{pressRoomTitle}</h3>
            <p className="text-base leading-relaxed mb-4">
              {pressRoomDesc}
            </p>
            <a
              href="https://www.cuhk.edu.hk/english/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base text-primary hover:text-foreground transition-colors duration-300"
            >
              {visitPressRoom}
              <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-muted-grey text-center">
          <p className="text-sm opacity-80">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
}
