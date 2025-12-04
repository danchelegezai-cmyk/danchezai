import React from 'react';
import { CopyStyle, EventFormData, PrizeItem } from '../types';
import { Calendar, Gift, FileText, Hash, MessageSquare, Zap, Plus, Trash2, Users, AlertCircle } from 'lucide-react';

interface InputSectionProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  formData,
  setFormData,
  onGenerate,
  isLoading,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrizeChange = (index: number, field: keyof PrizeItem, value: string) => {
    const newPrizes = [...formData.prizes];
    newPrizes[index] = { ...newPrizes[index], [field]: value };
    setFormData(prev => ({ ...prev, prizes: newPrizes }));
  };

  const addPrize = () => {
    setFormData(prev => ({
      ...prev,
      prizes: [...prev.prizes, { name: '', content: '' }]
    }));
  };

  const removePrize = (index: number) => {
    if (formData.prizes.length === 1) {
      handlePrizeChange(0, 'name', '');
      handlePrizeChange(0, 'content', '');
      return;
    }
    setFormData(prev => ({
      ...prev,
      prizes: prev.prizes.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary-600" />
          九元飞跑团 · 活动设置
        </h2>
        <p className="text-sm text-slate-500 mt-1">输入线上跑活动详情，AI 将生成社群运营文案。</p>
      </div>

      <div className="space-y-5 flex-grow overflow-y-auto pr-2 custom-scrollbar">
        {/* Theme */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <Hash className="w-4 h-4 text-slate-400" /> 活动主题
          </label>
          <input
            type="text"
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            placeholder="例如：夏日清凉跑、国庆7天乐跑..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" /> 活动时间
          </label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="例如：10月1日 - 10月7日，不限时间段"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
          />
        </div>

        {/* Prizes (Dynamic List) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
            <Gift className="w-4 h-4 text-slate-400" /> 奖项设置
          </label>
          <div className="space-y-3">
            {formData.prizes.map((prize, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="奖项 (如: 一等奖)"
                  value={prize.name}
                  onChange={(e) => handlePrizeChange(index, 'name', e.target.value)}
                  className="w-1/3 px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="奖品内容 (如: 跑鞋一双)"
                  value={prize.content}
                  onChange={(e) => handlePrizeChange(index, 'content', e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none text-sm"
                />
                <button 
                  onClick={() => removePrize(index)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="删除奖项"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              onClick={addPrize}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 mt-2 px-2 py-1 rounded-md hover:bg-primary-50 transition-colors w-fit"
            >
              <Plus className="w-4 h-4" /> 添加更多奖项
            </button>
          </div>
        </div>

        {/* Rules */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" /> 活动规则
          </label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            placeholder="例如：使用指定APP记录，单次跑步里程>3km..."
            rows={2}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none resize-none"
          />
        </div>

        {/* Participation */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-400" /> 参与方式
          </label>
          <textarea
            name="participation"
            value={formData.participation}
            onChange={handleChange}
            placeholder="例如：活动结束后将跑步截图发到群相册..."
            rows={2}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none resize-none"
          />
        </div>

        {/* Other Requirements */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400" /> 其他要求
          </label>
          <textarea
            name="otherRequirements"
            value={formData.otherRequirements}
            onChange={handleChange}
            placeholder="例如：必须穿戴团服，注意安全..."
            rows={2}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
           {/* Style */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-slate-400" /> 文案风格
            </label>
            <select
              name="style"
              value={formData.style}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none bg-white"
            >
              {Object.values(CopyStyle).map((style) => (
                <option key={style} value={style}>
                  {style}
                </option>
              ))}
            </select>
          </div>
           {/* Platform */}
           <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4 text-slate-400" /> 发布平台
            </label>
             <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              placeholder="微信群, 朋友圈..."
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
            />
          </div>
        </div>

      </div>

      <div className="mt-8 pt-4 border-t border-slate-100">
        <button
          onClick={onGenerate}
          disabled={isLoading || !formData.theme}
          className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-primary-500/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2
            ${isLoading || !formData.theme
              ? 'bg-slate-300 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700'
            }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成活动文案
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" /> 生成文案
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default InputSection;