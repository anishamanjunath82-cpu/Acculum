import type { ThemeConfig, Theme } from '@/data/onboardingTypes';

export const THEMES: Record<Theme, ThemeConfig> = {
  normal: {
    name: 'normal', displayName: 'Standard', primaryColor: '#16a34a', accentColor: '#7c3aed',
    icon: '📚', isCricketTheme: false,
    terminology: { points: 'Points', streak: 'Day Streak', quiz: 'Quiz', progress: 'Progress', lesson: 'Lesson', startLesson: 'Start Lesson' },
  },
  cricket: {
    name: 'cricket', displayName: 'Cricket', primaryColor: '#16a34a', accentColor: '#ca8a04',
    icon: '🏏', isCricketTheme: true,
    terminology: { points: 'Runs', streak: 'Winning Streak', quiz: 'Match Challenge', progress: 'Current Form', lesson: 'Innings', startLesson: 'Continue Innings' },
  },
  gaming: {
    name: 'gaming', displayName: 'Gaming', primaryColor: '#7c3aed', accentColor: '#06b6d4',
    icon: '🎮', isCricketTheme: false,
    terminology: { points: 'Score', streak: 'Win Streak', quiz: 'Level Challenge', progress: 'Level Progress', lesson: 'Mission', startLesson: 'Start Mission' },
  },
  music: {
    name: 'music', displayName: 'Music', primaryColor: '#db2777', accentColor: '#7c3aed',
    icon: '🎵', isCricketTheme: false,
    terminology: { points: 'Notes', streak: 'Practice Streak', quiz: 'Rhythm Challenge', progress: 'Melody Progress', lesson: 'Track', startLesson: 'Play Track' },
  },
  robotics: {
    name: 'robotics', displayName: 'Robotics', primaryColor: '#0284c7', accentColor: '#06b6d4',
    icon: '🤖', isCricketTheme: false,
    terminology: { points: 'Circuits', streak: 'Build Streak', quiz: 'System Test', progress: 'Build Progress', lesson: 'Module', startLesson: 'Run Module' },
  },
  art: {
    name: 'art', displayName: 'Art', primaryColor: '#ea580c', accentColor: '#dc2626',
    icon: '🎨', isCricketTheme: false,
    terminology: { points: 'Brushstrokes', streak: 'Creative Streak', quiz: 'Art Challenge', progress: 'Canvas Progress', lesson: 'Masterclass', startLesson: 'Start Masterclass' },
  },
  football: {
    name: 'football', displayName: 'Football', primaryColor: '#15803d', accentColor: '#1d4ed8',
    icon: '⚽', isCricketTheme: false,
    terminology: { points: 'Goals', streak: 'Match Streak', quiz: 'Tactical Challenge', progress: 'Match Form', lesson: 'Training Session', startLesson: 'Start Training' },
  },
  reading: {
    name: 'reading', displayName: 'Reading', primaryColor: '#b45309', accentColor: '#f59e0b',
    icon: '📖', isCricketTheme: false,
    terminology: { points: 'Pages', streak: 'Reading Streak', quiz: 'Book Quiz', progress: 'Reading Progress', lesson: 'Chapter', startLesson: 'Open Chapter' },
  },
  science: {
    name: 'science', displayName: 'Science', primaryColor: '#0891b2', accentColor: '#0284c7',
    icon: '🔬', isCricketTheme: false,
    terminology: { points: 'Discoveries', streak: 'Lab Streak', quiz: 'Experiment', progress: 'Research Progress', lesson: 'Lab Session', startLesson: 'Start Experiment' },
  },
  dance: {
    name: 'dance', displayName: 'Dance', primaryColor: '#be185d', accentColor: '#7c3aed',
    icon: '💃', isCricketTheme: false,
    terminology: { points: 'Moves', streak: 'Performance Streak', quiz: 'Choreography', progress: 'Performance Progress', lesson: 'Routine', startLesson: 'Start Routine' },
  },
};

export function getTheme(theme: Theme): ThemeConfig {
  return THEMES[theme] ?? THEMES.normal;
}
