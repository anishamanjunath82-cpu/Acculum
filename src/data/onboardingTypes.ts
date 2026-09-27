export type Interest = 'cricket' | 'gaming' | 'music' | 'robotics' | 'art' | 'football' | 'reading' | 'science' | 'dance';
export type Theme = 'normal' | 'cricket' | 'gaming' | 'music' | 'robotics' | 'art' | 'football' | 'reading' | 'science' | 'dance';
export type Role = 'student' | 'facilitator';

export interface StudentProfile {
  role: Role;
  name: string;
  class: string;
  school: string;
  section: string;
  rollNumber?: string;
  interests: Interest[];
  theme: Theme;
  onboardingCompleted: boolean;
  xp: number;
  runs: number;
  streak: number;
  createdAt: string;
}

export interface ThemeConfig {
  name: string;
  displayName: string;
  primaryColor: string;
  accentColor: string;
  icon: string;
  isCricketTheme: boolean;
  terminology: {
    points: string;
    streak: string;
    quiz: string;
    progress: string;
    lesson: string;
    startLesson: string;
  };
}

export interface InterestOption {
  id: Interest;
  label: string;
  emoji: string;
  selectedBg: string;
  selectedBorder: string;
  textColor: string;
}
