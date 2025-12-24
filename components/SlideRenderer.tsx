
import React from 'react';
import { SlideData } from '../types';

interface Props {
  slide: SlideData;
}

const SlideRenderer: React.FC<Props> = ({ slide }) => {
  const renderTitle = () => (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fade-in">
      <div className="bg-indigo-600 w-24 h-2 mb-4 rounded-full"></div>
      <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">
        {slide.title}
      </h1>
      <p className="text-3xl text-indigo-600 font-medium">
        {slide.subtitle}
      </p>
      <div className="pt-12 grid grid-cols-2 gap-x-12 gap-y-4 text-left border-t border-slate-200 w-full max-w-3xl">
        <div>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Course</span>
          <p className="text-lg font-semibold text-slate-700">{slide.content.course}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Presented by</span>
          <p className="text-lg font-semibold text-slate-700">{slide.content.presenter}</p>
        </div>
        <div>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold block mb-1">Date</span>
          <p className="text-lg font-semibold text-slate-700">{slide.content.date}</p>
        </div>
        <div className="flex gap-2 items-end">
          {slide.content.tags.map((tag: string) => (
            <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGrid = () => (
    <div className="grid grid-cols-2 gap-8 h-full items-start">
      {slide.content.sections.map((section: any, idx: number) => (
        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 h-full hover:shadow-md transition-shadow">
          <h3 className="text-2xl font-bold text-indigo-600 mb-4 border-b pb-2">{section.title}</h3>
          <ul className="space-y-3">
            {section.items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-lg text-slate-600">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-indigo-400 shrink-0"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderSplit = () => (
    <div className="flex gap-12 h-full">
      <div className="flex-1 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-2xl font-bold text-emerald-600 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-sm">✓</div>
          {slide.content.left.title}
        </h3>
        {slide.content.left.groups.map((group: any, idx: number) => (
          <div key={idx} className="mb-6 last:mb-0">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">{group.label}</h4>
            <ul className="grid grid-cols-1 gap-2">
              {group.items.map((item: string, i: number) => (
                <li key={i} className="px-4 py-2 bg-slate-50 rounded-lg text-slate-700 font-medium">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="w-1/3 bg-slate-900 p-8 rounded-2xl shadow-xl text-white">
        <h3 className="text-2xl font-bold text-rose-400 mb-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center text-sm">✕</div>
          {slide.content.right.title}
        </h3>
        <ul className="space-y-4">
          {slide.content.right.items.map((item: string, i: number) => (
            <li key={i} className="flex items-center gap-3 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  const renderTable = () => (
    <div className="h-full flex flex-col space-y-8">
      {slide.content.description && (
        <p className="text-xl text-slate-600 italic">"{slide.content.description}"</p>
      )}
      <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              {slide.content.headers.map((h: string) => (
                <th key={h} className="px-6 py-4 text-sm font-bold text-slate-500 uppercase tracking-widest">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {slide.content.rows.map((row: string[], idx: number) => (
              <tr key={idx} className="hover:bg-indigo-50/30 transition-colors">
                {row.map((cell, i) => (
                  <td key={i} className={`px-6 py-4 text-lg ${i === 0 ? 'font-bold text-indigo-600' : 'text-slate-700'}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {slide.content.tools && (
        <div className="flex items-center gap-6 p-6 bg-indigo-600 rounded-2xl text-white">
          <span className="font-bold text-indigo-200 uppercase tracking-tighter">Stack & Tools:</span>
          <div className="flex gap-4">
            {slide.content.tools.map((tool: string) => (
              <span key={tool} className="px-4 py-1.5 bg-white/10 rounded-full font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderWorkflow = () => (
    <div className="h-full flex flex-col justify-center">
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
        {slide.content.steps.map((step: string, idx: number) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <div className="w-40 h-24 bg-white border-2 border-indigo-600 rounded-xl shadow-lg flex items-center justify-center p-4 text-center font-bold text-indigo-900 relative z-10 transition-transform hover:scale-105">
                <span className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">
                  {idx + 1}
                </span>
                {step}
              </div>
            </div>
            {idx < slide.content.steps.length - 1 && (
              <div className="flex items-center self-center text-indigo-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-16 p-8 bg-indigo-50 rounded-3xl border-2 border-dashed border-indigo-200 text-center">
        <p className="text-2xl font-bold text-indigo-700">
          Automated Feedback Loop
        </p>
        <p className="text-slate-500 mt-2">
          The dashboard updates automatically as data flows through the system tiers.
        </p>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="h-full flex flex-col space-y-12">
      <div className="grid grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-indigo-600">Key Outcomes</h3>
          <ul className="space-y-4">
            {slide.content.outcomes.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-4 text-xl text-slate-700 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-2xl font-bold">
                  {i + 1}
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-slate-400">Future Roadmap</h3>
          <ul className="space-y-4">
            {slide.content.future.map((item: string, i: number) => (
              <li key={i} className="flex items-center gap-4 text-xl text-slate-500 p-6 rounded-2xl border-2 border-dashed border-slate-200 opacity-70">
                <div className="w-3 h-3 bg-slate-300 rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">
          {slide.content.closing}
        </h2>
        <p className="text-xl text-slate-500 font-medium tracking-widest uppercase">
          Scan to access Project Backlog
        </p>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full max-w-7xl mx-auto py-12 px-8">
      {slide.type !== 'title' && (
        <div className="mb-12 border-b border-slate-100 pb-6 flex justify-between items-end">
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">
            {slide.title}
          </h2>
          <div className="text-slate-300 font-bold text-2xl">
            {String(slide.id).padStart(2, '0')}
          </div>
        </div>
      )}
      <div className="h-[calc(100%-120px)] overflow-y-auto">
        {slide.type === 'title' && renderTitle()}
        {slide.type === 'grid' && renderGrid()}
        {slide.type === 'split' && renderSplit()}
        {slide.type === 'table' && renderTable()}
        {slide.type === 'workflow' && renderWorkflow()}
        {slide.type === 'content' && renderContent()}
      </div>
    </div>
  );
};

export default SlideRenderer;
