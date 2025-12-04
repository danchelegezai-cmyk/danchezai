import React, { useState } from 'react';
import { GeneratedCopyResult } from '../types';
import { Copy, Check, Sparkles, AlertCircle, FileText, Smile, Zap } from 'lucide-react';

interface ResultSectionProps {
  result: GeneratedCopyResult | null;
  hasGenerated: boolean;
}

const ResultSection: React.FC<ResultSectionProps> = ({ result, hasGenerated }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  if (!hasGenerated) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <Sparkles className="w-16 h-16 mb-4 text-slate-200" />
        <h3 className="text-lg font-medium text-slate-600">等待生成</h3>
        <p className="text-center text-sm max-w-xs mt-2">
          在左侧填写活动信息并点击生成，AI 将为您创作多个版本的精彩文案。
        </p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-6 h-full overflow-y-auto custom-scrollbar pr-2">
      {/* Concise Version */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-3 border-b border-emerald-100 flex justify-between items-center">
          <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
            <Zap className="w-4 h-4" /> 简洁版 (Concise)
          </h3>
          <button
            onClick={() => handleCopy(result.concise, 'concise')}
            className="text-emerald-600 hover:text-emerald-800 p-1.5 rounded-md hover:bg-emerald-100 transition-colors"
            title="复制文案"
          >
            {copiedKey === 'concise' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="p-6 text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
          {result.concise}
        </div>
      </div>

      {/* Playful Version */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 px-6 py-3 border-b border-violet-100 flex justify-between items-center">
          <h3 className="font-semibold text-violet-800 flex items-center gap-2">
            <Smile className="w-4 h-4" /> 好玩版 (Playful)
          </h3>
          <button
            onClick={() => handleCopy(result.playful, 'playful')}
            className="text-violet-600 hover:text-violet-800 p-1.5 rounded-md hover:bg-violet-100 transition-colors"
             title="复制文案"
          >
             {copiedKey === 'playful' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="p-6 text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
          {result.playful}
        </div>
      </div>

       {/* Detailed Version */}
       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 border-b border-blue-100 flex justify-between items-center">
          <h3 className="font-semibold text-blue-800 flex items-center gap-2">
            <FileText className="w-4 h-4" /> 详细公告版 (Detailed)
          </h3>
          <button
            onClick={() => handleCopy(result.detailed, 'detailed')}
            className="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-100 transition-colors"
             title="复制文案"
          >
             {copiedKey === 'detailed' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="p-6 text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
          {result.detailed}
        </div>
      </div>

       {/* Emoji Pack */}
       <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center justify-between">
          <div className="flex-1">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 block">推荐 Emojis</span>
             <p className="text-xl tracking-widest">{result.emojiStr}</p>
          </div>
          <button
            onClick={() => handleCopy(result.emojiStr, 'emojis')}
            className="text-slate-400 hover:text-slate-600 p-2 rounded-md hover:bg-slate-200 transition-colors"
             title="复制 Emojis"
          >
             {copiedKey === 'emojis' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
       </div>
    </div>
  );
};

export default ResultSection;