export interface PrizeItem {
  name: string;
  content: string;
}

export interface EventFormData {
  theme: string;
  duration: string;
  prizes: PrizeItem[];
  rules: string;
  participation: string;
  otherRequirements: string;
  style: CopyStyle;
  platform: string;
}

export enum CopyStyle {
  CASUAL = 'Casual & Friendly',
  EXCITED = 'Hype & Excited',
  PROFESSIONAL = 'Professional & Clean',
  HUMOROUS = 'Funny & Witty',
  URGENT = 'Urgent & FOMO',
}

export interface GeneratedCopyResult {
  concise: string;
  playful: string;
  detailed: string;
  emojiStr: string;
}

export interface LoadingState {
  isLoading: boolean;
  message: string;
}