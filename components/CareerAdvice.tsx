import React from 'react';
import { Briefcase, UserCheck, Search, Award, TrendingUp, ChevronRight } from 'lucide-react';

const topics = [
    {
        id: 'resume',
        title: 'Resume Tips',
        content: 'Use keywords, highlight achievements, concise descriptions.',
        icon: FileText,
        color: 'bg-orange-100 text-orange-600'
    },
    {
        id: 'interview',
        title: 'Interview Prep',
        content: 'Common questions, behavioral questions, technical questions.',
        icon: UserCheck,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        id: 'search',
        title: 'Job Search Strategies',
        content: 'Networking, LinkedIn, international student work permits.',
        icon: Search,
        color: 'bg-green-100 text-green-600'
    },
    {
        id: 'portfolio',
        title: 'Portfolio Enhancement',
        content: 'Add projects, certifications, volunteer experience.',
        icon: Award,
        color: 'bg-purple-100 text-purple-600'
    },
    {
        id: 'skill',
        title: 'Skill Development',
        content: 'Online courses, certifications (CompTIA, CCNA, CySA+, etc.).',
        icon: TrendingUp,
        color: 'bg-rose-100 text-rose-600'
    }
];

import { FileText } from 'lucide-react';

export const CareerAdvice: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Career Advice</h2>
                <p className="text-slate-500 mt-2">Expert guidance to help you navigate your professional journey.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {topics.map((topic) => (
                    <div key={topic.id} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all cursor-pointer group flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${topic.color}`}>
                            <topic.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900 mb-1 flex items-center justify-between">
                                {topic.title}
                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors" />
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{topic.content}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-2">Need Personalized Advice?</h3>
                    <p className="text-indigo-100 max-w-xl mb-6">Our AI career coach can analyze your profile and suggest the best next steps for your career.</p>
                    <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-indigo-50 transition-colors">
                        Ask AI Coach
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            </div>
        </div>
    );
};
