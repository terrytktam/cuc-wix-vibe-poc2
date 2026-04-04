import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ExcoStaffs } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';

export default function StaffPage() {
  const [staff, setStaff] = useState<ExcoStaffs[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = async () => {
    try {
      const { items } = await BaseCrudService.getAll<ExcoStaffs>('excostaffs');
      setStaff(items);
    } catch (error) {
      console.error('Error loading staff:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedStaff = staff.reduce((acc, member) => {
    const role = language === 'en' ? (member.roleEn || 'Other') : (member.roleZh || member.roleEn || 'Other');
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(member);
    return acc;
  }, {} as Record<string, ExcoStaffs[]>);

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      
      <main className="pt-32 pb-32">
        <div className="max-w-[100rem] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl mb-8 text-foreground">
              {language === 'en' ? 'Staff & Administration' : '職員及行政'}
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {language === 'en' ? 'Meet the dedicated team that supports our mission' : '認識支持我們使命的專業團隊'}
            </p>
          </motion.div>

          <div className="min-h-[40vh]">
            {isLoading ? (
              null
            ) : staff.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl">
                  {language === 'en' ? 'No staff members available' : '沒有可用的職員'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {Object.entries(groupedStaff).map(([role, members], index) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="border border-muted-grey p-8"
                  >
                    <h2 className="font-heading text-3xl mb-6 text-primary">
                      {role}
                    </h2>
                    <div className="space-y-4">
                      {members.map((member) => (
                        <div key={member._id} className="pb-4 border-b border-muted-grey last:border-b-0">
                          <h3 className="text-lg font-medium mb-1">
                            {language === 'en' ? member.nameEn : member.nameZh || member.nameEn}
                          </h3>
                          {member.email && (
                            <a
                              href={`mailto:${member.email}`}
                              className="text-sm text-foreground opacity-70 hover:text-primary transition-colors duration-300"
                            >
                              {member.email}
                            </a>
                          )}
                          {member.year && (
                            <p className="text-sm text-foreground opacity-70 mt-1">
                              {language === 'en' ? 'Year' : '年份'}: {member.year}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
