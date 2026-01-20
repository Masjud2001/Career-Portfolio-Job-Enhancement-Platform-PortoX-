import React from 'react';
import { Layout, Palette, Code, PenTool, FileText, CheckCircle2 } from 'lucide-react';

const templates = [
    {
        id: 'classic',
        name: 'Classic Professional',
        description: 'Clean layout, single-page scroll, top navbar, neutral colors.',
        icon: Layout,
        color: 'bg-slate-100 text-slate-600'
    },
    {
        id: 'minimal',
        name: 'Modern Minimalist',
        description: 'Grid-based sections, bright accents, minimal text.',
        icon: Palette,
        color: 'bg-rose-100 text-rose-600'
    },
    {
        id: 'tech',
        name: 'Tech-Focused',
        description: 'Showcases projects, skills, GitHub links, code snippets.',
        icon: Code,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        id: 'creative',
        name: 'Creative / Designer',
        description: 'Visual-heavy layout for designers or creative students.',
        icon: PenTool,
        color: 'bg-purple-100 text-purple-600'
    },
    {
        id: 'ats',
        name: 'ATS-Friendly Resume',
        description: 'Simple, printable style suitable for recruiters.',
        icon: FileText,
        color: 'bg-emerald-100 text-emerald-600'
    }
];

export const PortfolioTemplates: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Portfolio Templates</h2>
                <p className="text-slate-500 mt-2">Choose from our pre-designed templates to kickstart your professional presence.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div key={template.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${template.color}`}>
                            <template.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{template.name}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-4">{template.description}</p>
                        <div className="flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Select Template
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
