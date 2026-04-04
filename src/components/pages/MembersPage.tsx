import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ChorusMembers, VocalTypes } from '@/entities';

export default function MembersPage() {
  const [members, setMembers] = useState<ChorusMembers[]>([]);
  const [vocalTypes, setVocalTypes] = useState<VocalTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [membersResult, vocalTypesResult] = await Promise.all([
        BaseCrudService.getAll<ChorusMembers>('members'),
        BaseCrudService.getAll<VocalTypes>('vocaltypes')
      ]);
      setMembers(membersResult.items);
      setVocalTypes(vocalTypesResult.items);
    } catch (error) {
      console.error('Error loading members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupedMembers = vocalTypes.map(vocalType => ({
    type: vocalType.typeEn || vocalType.title || 'Other',
    members: members.filter(member => member.vocalType === vocalType.title)
  }));

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
              Chorus Members
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
              The talented voices that bring our music to life
            </p>
          </motion.div>

          <div className="min-h-[40vh]">
            {isLoading ? (
              null
            ) : members.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl">No members available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                              {member.nameEn}
                              {member.isLeader && (
                                <span className="text-sm text-primary ml-2">(Leader)</span>
                              )}
                            </h3>
                            {member.yearJoined && (
                              <p className="text-sm text-foreground opacity-70">
                                Joined: {member.yearJoined}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
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
