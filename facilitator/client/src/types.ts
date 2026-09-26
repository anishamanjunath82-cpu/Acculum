// ─── Student Learning Report Schema ────────────────────────────────────────

export interface Facilitator {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  school?: string;
  facilitator_id?: string;
  subjects?: string[];
  classes?: string[];
  preferred_language: string;
}

export interface Student {
  id: string;
  student_id: string;
  full_name: string;
  class: string;
  school: string;
  preferred_language: string;
  interests?: string[];
  priority?: 'intervention_required' | 'needs_attention' | 'on_track' | 'improving';
  latest_score?: number;
  current_topic?: string;
  current_subject?: string;
  signal_count?: number;
  top_signal_type?: string;
  last_report_date?: string;
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
  signal_type:
    | 'PERFORMANCE_SIGNAL'
    | 'REPEATED_ERROR_SIGNAL'
    | 'CONFIDENCE_PERFORMANCE_SIGNAL'
    | 'ENGAGEMENT_SIGNAL'
    | 'HELP_SEEKING_SIGNAL'
    | 'IMPROVEMENT_SIGNAL'
    | 'PERSISTENCE_SIGNAL';
  subject?: string;
  topic?: string;
  subtopic?: string;
  severity: 'low' | 'medium' | 'high';
  evidence: string[];
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
  language?: string;
  format?: string;
  difficulty?: string;
  notes?: string;
  status: string;
  assigned_at: string;
  completed_at?: string;
  // Joined fields
  student_name?: string;
  student_class?: string;
  improvement_percentage?: number;
  reassessment_status?: string;
  before_score_numerator?: number;
  before_score_denominator?: number;
  after_score_numerator?: number;
  after_score_denominator?: number;
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
  improvement_percentage?: number;
  status: string;
  completed_at?: string;
}

export interface StudentReport {
  id: string;
  student_id: string;
  report_version: string;
  report_date: string;
  imported_at: string;
  is_demo: number;
  full_name?: string;
  class?: string;
  activities_count?: number;
  quizzes_count?: number;
}

export interface DashboardStats {
  total_students: number;
  on_track: number;
  needs_attention: number;
  requires_intervention: number;
  recent_signals: (LearningSignal & { student_name: string; student_class: string })[];
  recent_interventions: (Intervention & { student_name: string })[];
}

export interface Notification {
  id: string;
  facilitator_id: string;
  type: string;
  title: string;
  message: string;
  student_id?: string;
  report_id?: string;
  read: number;
  created_at: string;
}

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

export interface StudentDetail extends Student {
  reports: StudentReport[];
  activities: LearningActivity[];
  signals: LearningSignal[];
  interventions: Intervention[];
  reassessments: Reassessment[];
  ai_summary?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  full_name: string;
  phone?: string;
  school?: string;
  facilitator_id?: string;
  subjects?: string[];
  classes?: string[];
  preferred_language?: string;
}

export interface CreateInterventionData {
  student_id: string;
  signal_id?: string;
  intervention_type: string;
  subject?: string;
  topic?: string;
  language?: string;
  format?: string;
  difficulty?: string;
  notes?: string;
}
