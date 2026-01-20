import React from 'react';
import { Search, Globe, Award, FileDown, CheckSquare, ArrowRight } from 'lucide-react';

const tools = [
    {
        id: 'analyzer',
        title: 'Resume Analyzer',
        description: 'Check grammar, keywords, ATS compatibility.',
        icon: Search,
        status: 'Ready'
    },
    {
        id: 'generator',
        title: 'Portfolio Generator',
        description: 'Auto-create HTML/CSS website from resume info.',
        icon: Globe,
        status: 'Active'
    },
    {
        id: 'matcher',
        title: 'Skills Matcher',
        description: 'Suggest certifications or skills to add based on resume.',
        icon: Award,
        status: 'Beta'
    },
    {
        id: 'pdf',
        title: 'PDF Export',
        description: 'Export portfolio as PDF for easy sharing.',
        icon: FileDown,
        status: 'Ready'
    },
    {
        id: 'tracker',
        title: 'Job Tracker',
        description: 'Save jobs, track applications, deadlines.',
        icon: CheckSquare,
        status: 'Early Access'
    }
];

export const Tools: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Career Tools</h2>
                <p className="text-slate-500 mt-2">A suite of powerful tools to optimize your career readiness.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                    <div key={tool.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:border-indigo-300 hover:shadow-lg transition-all group">
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-indigo-50 p-3 rounded-xl">
                                    <tool.icon className="w-6 h-6 text-indigo-600" />
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${tool.status === 'Active' ? 'bg-green-100 text-green-600' :
                                        tool.status === 'Beta' || tool.status === 'Early Access' ? 'bg-amber-100 text-amber-600' :
                                            'bg-slate-100 text-slate-500'
                                    }`}>
                                    {tool.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.title}</h3>
                            <p className="text-slate-500 text-sm">{tool.description}</p>
                        </div>

                        <button className="mt-6 w-full py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-semibold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-transparent transition-all flex items-center justify-center">
                            Launch Tool <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
