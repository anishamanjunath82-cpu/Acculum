// ─── Student Learning Report Schema ─────────────────────────────────────────

export interface AccumulReportSchema {
  report_version: string;
  generated_at: string;
  student: ReportStudent;
  learning_activities: ReportLesson[];
  quizzes: ReportQuiz[];
  ai_questions: ReportAIQuestion[];
  peer_competitions: ReportPeerCompetition[];
  confidence_data: ReportConfidence[];
  adaptive_learning: ReportAdaptiveLearning;
}

export interface ReportStudent {
  student_id: string;
  full_name: string;
  class: string;
  school: string;
  preferred_language: string;
  interests: string[];
}

export interface ReportLesson {
  lesson_id: string;
  title: string;
  subject: string;
  topic: string;
  subtopic?: string;
  difficulty: string;
  format: string;
  language: string;
  completed: boolean;
  partially_completed: boolean;
  skipped: boolean;
  time_spent_seconds: number;
  date: string;
}

export interface ReportQuiz {
  quiz_id: string;
  subject: string;
  topic: string;
  subtopic?: string;
  total_questions: number;
  correct: number;
  incorrect: number;
  score_percentage: number;
  attempts: number;
  time_taken_seconds: number;
  questions_skipped: number;
  hints_requested: number;
  repeated_mistakes: number;
  date: string;
}

export interface ReportAIQuestion {
  question: string;
  subject: string;
  topic: string;
  lesson_context?: string;
  help_type: 'explanation' | 'hint' | 'example' | 'clarification';
  date: string;
}

export interface ReportPeerCompetition {
  competition_id: string;
  subject: string;
  topic: string;
  difficulty: string;
  total_questions: number;
  student_score: number;
  completed: boolean;
  time_taken_seconds: number;
  correct: number;
  incorrect: number;
  date: string;
  xp_earned: number;
  previous_score?: number;
}

export interface ReportConfidence {
  topic: string;
  subject: string;
  confidence_rating: number;
  associated_quiz_score?: number;
  date: string;
}

export interface ReportAdaptiveLearning {
  difficulty_served: string;
  difficulty_changes: number;
  recommended_revisions: string[];
  topics_revisited: string[];
  formats_used: string[];
  languages_used: string[];
  interests_used: string[];
}

// ─── Database Entities ───────────────────────────────────────────────────────

export interface FacilitatorProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  school?: string;
  facilitator_id?: string;
  subjects?: string[];
  classes?: string[];
  preferred_language: string;
  created_at: string;
  updated_at: string;
}

export interface StudentProfile {
  id: string;
  student_id: string;
  full_name: string;
  class: string;
  school: string;
  preferred_language: string;
  interests?: string[];
  created_at: string;
  updated_at: string;
}

export interface StudentReport {
  id: string;
  student_id: string;
  report_version: string;
  report_date: string;
  raw_json: string;
  imported_at: string;
  imported_by: string;
  is_demo: number;
}

export interface LearningActivity {
  id: string;
  report_id: string;
  student_id: string;
  activity_type: 'lesson' | 'quiz' | 'ai_question' | 'peer_competition' | 'revision';
  subject?: string;
  topic?: string;
  subtopic?: string;
  difficulty?: string;
  language?: string;
  score_numerator?: number;
  score_denominator?: number;
  time_spent_seconds?: number;
  completed: number;
  attempts: number;
  hints_requested: number;
  questions_skipped: number;
  repeated_mistakes: number;
  confidence_rating?: number;
  activity_date?: string;
  extra_data?: string;
  created_at: string;
}

export interface LearningSignal {
  id: string;
  student_id: string;
  report_id: string;
  signal_type: string;
  subject?: string;
  topic?: string;
  subtopic?: string;
  severity: 'low' | 'medium' | 'high';
  evidence: string;
  confidence_score: number;
  recommended_action: string;
  status: 'active' | 'resolved' | 'monitoring';
  created_at: string;
  updated_at: string;
}

export interface Intervention {
  id: string;
  student_id: string;
  signal_id?: string;
  facilitator_id: string;
  intervention_type: string;
  subject?: string;
  topic?: string;
  subtopic?: string;
  language?: string;
  format?: string;
  difficulty?: string;
  notes?: string;
  status: string;
  assigned_at: string;
  completed_at?: string;
  created_at: string;
}

export interface Reassessment {
  id: string;
  intervention_id: string;
  student_id: string;
  subject?: string;
  topic?: string;
  before_score_numerator: number;
  before_score_denominator: number;
  after_score_numerator?: number;
  after_score_denominator?: number;
  before_report_id?: string;
  after_report_id?: string;
  improvement_percentage?: number;
  status: string;
  completed_at?: string;
  created_at: string;
}

// ─── Service Types ───────────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  studentId?: string;
  studentName?: string;
  reportVersion?: string;
  reportDate?: string;
  activitiesCount?: number;
  quizzesCount?: number;
  signalsDetected?: number;
}

export interface ParsedReport {
  student: Omit<StudentProfile, 'created_at' | 'updated_at'>;
  lessons: Partial<LearningActivity>[];
  quizzes: Partial<LearningActivity>[];
  aiQuestions: Partial<LearningActivity>[];
  peerCompetitions: Partial<LearningActivity>[];
}

export interface RawSignal {
  signal_type: string;
  subject: string;
  topic: string;
  subtopic?: string;
  severity: 'low' | 'medium' | 'high';
  evidence: string[];
  confidence_score: number;
  recommended_action: string;
}

export interface InterventionRecommendation {
  intervention_type: string;
  topic: string;
  format: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ComparisonResult {
  improvement: boolean;
  change_percentage: number;
  before_score: number;
  after_score: number;
  summary: string;
}

export interface DashboardStats {
  total_students: number;
  on_track: number;
  needs_attention: number;
  requires_intervention: number;
  recent_signals: LearningSignal[];
  recent_interventions: Intervention[];
}
