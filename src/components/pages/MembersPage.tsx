import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ChorusMembers, VocalTypes } from '@/entities';
import { useLanguageStore } from '@/lib/languageStore';
import { useSEO } from '@/hooks/useSEO';
import { filterByLatestYear } from '@/lib/yearFilter';

export default function MembersPage() {
  const [members, setMembers] = useState<ChorusMembers[]>([]);
  const [vocalTypes, setVocalTypes] = useState<VocalTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguageStore();
  useSEO('members');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Fetch all members with pagination
      let allMembers: ChorusMembers[] = [];
      let skip = 0;
      let hasMore = true;

      while (hasMore) {
        const membersResult = await BaseCrudService.getAll<ChorusMembers>('members', [], { skip, limit: 100 });
        allMembers = [...allMembers, ...membersResult.items];
        hasMore = membersResult.hasNext ?? false;
        skip = membersResult.nextSkip ?? skip + 100;
      }

      const vocalTypesResult = await BaseCrudService.getAll<VocalTypes>('vocaltypes');
      
      // Filter members to only show the latest year
      const filteredMembers = filterByLatestYear(allMembers, 'year');
      setMembers(filteredMembers);
      setVocalTypes(vocalTypesResult.items);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Define assistant roles in order
  const assistantRoles = ['Music Director', 'Conductor', 'Vocal Coach', 'Pianist', 'Assistant Conductors'];
  
  // Separate regular members from assistant roles
  const regularVocalTypes = vocalTypes.filter(vt => !assistantRoles.includes(vt.title || ''));
  const assistantVocalTypes = vocalTypes.filter(vt => assistantRoles.includes(vt.title || ''));

  // Group regular members (first 4 columns)
  const groupedMembers = regularVocalTypes.map(vocalType => ({
    type: language === 'en' ? (vocalType.typeEn || vocalType.title || 'Other') : (vocalType.typeZh || vocalType.typeEn || vocalType.title || 'Other'),
    members: members.filter(member => member.vocalType === vocalType.title)
  }));

  // Group assistant members by role (5th column with subsections)
  const groupedAssistantMembers = assistantRoles
    .map(role => {
      const vocalType = assistantVocalTypes.find(vt => vt.title === role);
      if (!vocalType) return null;
      
      return {
        title: language === 'en' ? (vocalType.typeEn || vocalType.title || role) : (vocalType.typeZh || vocalType.typeEn || vocalType.title || role),
        members: members.filter(member => member.vocalType === role)
      };
    })
    .filter(group => group && group.members.length > 0);

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
              {language === 'en' ? 'Chorus Members' : '合唱團成員'}
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              {language === 'en' ? 'The talented voices that bring our music to life' : '為我們的音樂帶來生命的聲音'}
            </p>
          </motion.div>

          <div className="min-h-[40vh]">
            {isLoading ? (
              null
            ) : members.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl">
                  {language === 'en' ? 'No members available' : '沒有可用的成員'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                {/* First 4 columns: Regular vocal types */}
                {groupedMembers.map((group, index) => (
                  group.members.length > 0 && (
                    <motion.div
                      key={group.type}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="border border-muted-grey p-8"
                    >
                      <h2 className="font-heading text-3xl mb-6 text-primary">
                        {group.type}
                      </h2>
                      <div className="space-y-4">
                        {group.members.map((member) => (
                          <div key={member._id} className="pb-4 border-b border-muted-grey last:border-b-0">
                            <h3 className="text-lg font-medium mb-1">
                              {language === 'en' ? member.nameEn : member.nameZh || member.nameEn}
                              {member.isLeader && (
                                <span className="text-sm text-primary ml-2">
                                  ({language === 'en' ? 'Part leader' : '聲部長'})
                                </span>
                              )}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}

                {/* 5th column: Assistant roles with subsections */}
                {groupedAssistantMembers.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: groupedMembers.length * 0.1 }}
                    className="border border-muted-grey p-8"
                  >
                    <h2 className="font-heading text-3xl mb-8 text-primary">
                      {language === 'en' ? 'Assistants' : '助理'}
                    </h2>
                    <div className="space-y-8">
                      {groupedAssistantMembers.map((group) => (
                        <div key={group.title} className="pb-6 border-b border-muted-grey last:border-b-0 last:pb-0">
                          <h3 className="font-heading text-xl mb-4 text-primary">
                            {group.title}
                          </h3>
                          <div className="space-y-3 pl-2">
                            {group.members.map((member) => (
                              <div key={member._id}>
                                <p className="text-base font-medium">
                                  {language === 'en' ? member.nameEn : member.nameZh || member.nameEn}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
