import React, { useEffect, useState } from 'react';
import { analyticsApi } from '../api';
import { Card } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Users, AlertTriangle, BarChart3 } from 'lucide-react';

interface ClassAnalyticsPageProps { navigate: (to: string) => void; }

export function ClassAnalyticsPage({ navigate }: ClassAnalyticsPageProps) {
  const [classData, setClassData] = useState<any[]>([]);
  const [topicData, setTopicData] = useState<{ topics: any[]; total_students: number; class_wide_threshold: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([analyticsApi.class(), analyticsApi.topics()])
      .then(([cls, topics]) => { setClassData(cls); setTopicData(topics); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        {[1, 2, 3].map(i => <div key={i} className="h-32 bg-white rounded-xl border border-gray-200 animate-pulse" />)}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Class overview */}
      {classData.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <BarChart3 size={40} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">No class data available yet.</p>
            <p className="text-sm text-gray-400 mt-1">Import student reports to see class analytics.</p>
          </div>
        </Card>
      ) : (
        classData.map(cls => (
          <Card key={cls.class} padding={false}>
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-bold text-sm">
                  {cls.class}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Class {cls.class}</h2>
                  <p className="text-xs text-gray-500">{cls.total_students} student{cls.total_students !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>

            {cls.topics.length === 0 ? (
              <p className="px-5 py-4 text-sm text-gray-400">No topic data for this class.</p>
            ) : (
              <div className="p-5 space-y-4">
                {cls.topics.map((t: any) => {
                  const isClassWide = t.class_wide;
                  return (
                    <div key={`${t.subject}::${t.topic}`} className={`p-3 rounded-lg border ${isClassWide ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-800">{t.topic}</span>
                          <span className="text-xs text-gray-400">{t.subject}</span>
                          {isClassWide && (
                            <span className="flex items-center gap-1 text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-medium">
                              <AlertTriangle size={10} />
                              Class-wide issue
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Users size={11} />{t.students_with_signal} with signal</span>
                          {t.avg_score !== null && <span className="font-semibold text-gray-700">{t.avg_score}%</span>}
                        </div>
                      </div>
                      {t.avg_score !== null && (
                        <ProgressBar value={t.avg_score} showLabel={false} color={isClassWide ? 'red' : 'indigo'} />
                      )}
                      {isClassWide && (
                        <p className="text-xs text-red-700 mt-2">
                          {t.students_with_signal} of {cls.total_students} students are showing difficulty with this topic.
                          Consider a class-wide revision session.
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        ))
      )}

      {/* Topic heatmap across all classes */}
      {topicData && topicData.topics.length > 0 && (
        <Card padding={false}>
          <div className="p-5 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Topic Heatmap — All Classes</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Class-wide threshold: {topicData.class_wide_threshold} of {topicData.total_students} students
            </p>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {['Topic', 'Subject', 'Avg Score', 'Students', 'With Signal', 'Scope'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {topicData.topics.sort((a, b) => (a.avg_score ?? 100) - (b.avg_score ?? 100)).map((t: any) => (
                <tr key={`${t.subject}::${t.topic}`} className={t.class_wide ? 'bg-red-50/50' : ''}>
                  <td className="px-4 py-3 font-medium text-gray-900">{t.topic}</td>
                  <td className="px-4 py-3 text-gray-500">{t.subject}</td>
                  <td className="px-4 py-3">
                    {t.avg_score !== null ? (
                      <div className="flex items-center gap-2 w-32">
                        <ProgressBar value={t.avg_score} />
                        <span className="text-xs font-semibold text-gray-700 w-10">{t.avg_score}%</span>
                      </div>
                    ) : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{t.student_count}</td>
                  <td className="px-4 py-3">
                    {t.students_with_signal > 0 ? (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${t.class_wide ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                        {t.students_with_signal}
                      </span>
                    ) : <span className="text-gray-300">0</span>}
                  </td>
                  <td className="px-4 py-3">
                    {t.class_wide ? (
                      <span className="text-xs font-medium text-red-700 flex items-center gap-1">
                        <AlertTriangle size={11} /> Class-wide
                      </span>
                    ) : t.students_with_signal > 0 ? (
                      <span className="text-xs text-amber-700">Individual</span>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
