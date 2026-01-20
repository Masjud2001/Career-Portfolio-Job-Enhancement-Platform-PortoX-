import React from 'react';
import { ExternalLink, Github, Database, Shield, PenTool, BarChart } from 'lucide-react';

const examples = [
    {
        id: 'dev',
        title: 'Software Developer',
        description: 'Includes GitHub projects, coding skills, achievements.',
        icon: Github,
        color: 'text-slate-900 bg-slate-100'
    },
    {
        id: 'security',
        title: 'Network Security',
        description: 'Shows labs, CCNA/CompTIA certifications, projects.',
        icon: Shield,
        color: 'text-red-600 bg-red-100'
    },
    {
        id: 'data',
        title: 'Data Analyst',
        description: 'Data visualization examples, Excel/Python projects.',
        icon: Database,
        color: 'text-green-600 bg-green-100'
    },
    {
        id: 'analyst',
        title: 'Business/IT Analyst',
        description: 'Case studies, dashboards, internships.',
        icon: BarChart,
        color: 'text-blue-600 bg-blue-100'
    },
    {
        id: 'creative',
        title: 'Creative/Designer',
        description: 'Mockups, graphics, interactive components.',
        icon: PenTool,
        color: 'text-purple-600 bg-purple-100'
    }
];

export const PortfolioExamples: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Portfolio Examples</h2>
                <p className="text-slate-500 mt-2">Get inspired by these sample portfolios tailored for different career paths.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {examples.map((example) => (
                    <div key={example.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col hover:border-indigo-200 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${example.color}`}>
                                <example.icon className="w-6 h-6" />
                            </div>
                            <button className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors">
                                View Live Demo
                            </button>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{example.title}</h3>
                        <p className="text-slate-500 text-sm">{example.description}</p>

                        <div className="mt-6 pt-6 border-t border-slate-100 flex gap-4 text-sm text-indigo-600 font-medium cursor-pointer">
                            <span className="flex items-center hover:underline">
                                See Case Study <ExternalLink className="w-3 h-3 ml-1" />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
