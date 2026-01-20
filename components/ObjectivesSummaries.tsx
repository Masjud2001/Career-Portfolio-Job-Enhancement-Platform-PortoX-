import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';

const objectives = [
    "Seeking a challenging role in [field] to apply my [skills] and grow professionally.",
    "Aspiring [job title] eager to leverage my experience in [technology/skill] for [goal].",
    "Recent graduate with knowledge in [field] looking to contribute to [company type] projects."
];

const summaries = [
    "I am a highly motivated [field] student with experience in [projects/skills]...",
    "A recent international graduate specializing in [field] with hands-on experience in [technology]...",
    "Passionate about cybersecurity and network solutions; skilled in [skills] and seeking opportunities to apply them in real-world scenarios."
];

export const ObjectivesSummaries: React.FC = () => {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h2 className="text-3xl font-bold text-slate-900">Objectives & Summaries</h2>
                <p className="text-slate-500 mt-2">Craft professional statements for your resume and portfolio.</p>
            </div>

            <div className="space-y-6">
                <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Objective Templates</h3>
                        <button className="text-indigo-600 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {objectives.map((obj, i) => (
                            <div key={i} className="group relative bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                <p className="text-slate-700 pr-8 font-medium">{obj}</p>
                                <button className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 bg-white p-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Summary Templates</h3>
                        <button className="text-indigo-600 hover:text-indigo-700 p-2 rounded-full hover:bg-indigo-50">
                            <RefreshCw className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="space-y-4">
                        {summaries.map((sum, i) => (
                            <div key={i} className="group relative bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 transition-colors">
                                <p className="text-slate-700 pr-8 font-medium">{sum}</p>
                                <button className="absolute top-4 right-4 text-slate-400 hover:text-indigo-600 bg-white p-1.5 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                                    <Copy className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};
