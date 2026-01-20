import React from 'react';
import { motion } from 'framer-motion';

const teamMembers = [
    {
        id: 1,
        name: 'Sarah Chen',
        role: 'Lead Software Engineer',
        image: '/avatars/avatar_member_1.png'
    },
    {
        id: 2,
        name: 'Michael Ross',
        role: 'Product Manager',
        image: '/avatars/avatar_member_2.png'
    },
    {
        id: 3,
        name: 'David Kim',
        role: 'UI/UX Designer',
        image: '/avatars/avatar_member_3.png'
    },
    {
        id: 4,
        name: 'Emily Watson',
        role: 'Marketing Specialist',
        image: '/avatars/avatar_member_4.png'
    },
    {
        id: 5,
        name: 'James Wilson',
        role: 'Data Scientist',
        image: '/avatars/avatar_member_5.png'
    },
    {
        id: 6,
        name: 'Lisa Patel',
        role: 'Content Strategist',
        image: '/avatars/avatar_member_6.png'
    }
];

export const TeamSection: React.FC = () => {
    return (
        <div className="py-16 px-4 w-full">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
                    <p className="text-indigo-100 max-w-2xl mx-auto">
                        The talented people behind PortoX helping you build your career.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
                        >
                            <div className="aspect-square w-32 mx-auto mb-4 relative rounded-full overflow-hidden border-4 border-white/20">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                                <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
