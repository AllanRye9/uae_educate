import { useState } from 'react';
import { motion } from 'framer-motion';
import { UAEFlagStripe, GeometricPattern } from './UAEPatterns';
import { useLanguage } from '../context/LanguageContext';

const CLASS_STUDENTS = [
  { name: 'Fatima Al Hassan', xp: 1580, stars: 22, streak: 12, modules: 4, accuracy: 91, avatar: '👩', trend: 'up' },
  { name: 'Ahmed Al Mansouri', xp: 1240, stars: 18, streak: 7, modules: 3, accuracy: 84, avatar: '🦅', trend: 'up', isYou: true },
  { name: 'Omar Al Rashid', xp: 980, stars: 14, streak: 4, modules: 2, accuracy: 78, avatar: '👦', trend: 'stable' },
  { name: 'Mariam Al Zaabi', xp: 1820, stars: 26, streak: 18, modules: 5, accuracy: 94, avatar: '👸', trend: 'up' },
  { name: 'Khalid Al Nuaimi', xp: 620, stars: 9, streak: 2, modules: 2, accuracy: 65, avatar: '🧑', trend: 'down' },
  { name: 'Sara Al Mazrouei', xp: 1120, stars: 16, streak: 9, modules: 3, accuracy: 82, avatar: '🧕', trend: 'stable' },
  { name: 'Hamdan Al Maktoum', xp: 1450, stars: 20, streak: 11, modules: 4, accuracy: 88, avatar: '👨', trend: 'up' },
  { name: 'Aisha Al Qubaisi', xp: 760, stars: 11, streak: 3, modules: 2, accuracy: 71, avatar: '👧', trend: 'stable' },
];

const MODULE_COMPLETION = [
  { title: 'What is Algebra?', completion: 100, avgScore: 88, color: '#009A44' },
  { title: 'Algebraic Expressions', completion: 87, avgScore: 82, color: '#C8A840' },
  { title: 'Linear Equations', completion: 62, avgScore: 74, color: '#CE1126' },
  { title: 'Word Problems', completion: 25, avgScore: 68, color: '#3B82F6' },
  { title: 'Inequalities', completion: 0, avgScore: 0, color: '#8B5CF6' },
  { title: 'Final Challenge', completion: 0, avgScore: 0, color: '#C8A840' },
];

const TABS = ['overview', 'students', 'modules', 'reports'];

function TabButton({ id, active, onClick, label }) {
  return (
    <button
      onClick={() => onClick(id)}
      className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap"
      style={{
        background: active ? '#C8A840' : 'rgba(200,168,64,0.1)',
        color: active ? '#0D1B2A' : '#C8A840',
      }}
    >
      {label}
    </button>
  );
}

function StatCard({ icon, label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-uae-navy/60 border border-uae-gold/10 rounded-xl p-3 text-center"
    >
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xl font-bold" style={{ color }}>{value}</div>
      <div className="text-white/40 text-xs">{label}</div>
    </motion.div>
  );
}

export default function TeacherDashboard({ onBack }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');

  const sortedStudents = [...CLASS_STUDENTS].sort((a, b) => b.xp - a.xp);
  const avgXP = Math.round(CLASS_STUDENTS.reduce((s, st) => s + st.xp, 0) / CLASS_STUDENTS.length);
  const avgAccuracy = Math.round(CLASS_STUDENTS.reduce((s, st) => s + st.accuracy, 0) / CLASS_STUDENTS.length);
  const activeStudents = CLASS_STUDENTS.filter(s => s.streak >= 3).length;

  return (
    <div className="min-h-screen bg-uae-dark flex flex-col">
      {/* Background */}
      <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
        <GeometricPattern size={250} opacity={1} />
      </div>

      <UAEFlagStripe height={5} />

      {/* Header */}
      <div className="sticky top-0 z-30 bg-uae-dark/90 backdrop-blur border-b border-uae-gold/10">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBack}
              className="text-uae-gold/70 hover:text-uae-gold text-sm transition-colors"
            >
              ← {t('back')}
            </button>
            <div className="text-center">
              <div className="text-white font-bold text-sm">Teacher Dashboard</div>
              <div className="text-uae-gold/60 text-xs">Grade 8 · Mathematics · Class 8A</div>
            </div>
            <div className="text-uae-gold text-sm">👩‍🏫</div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {TABS.map(tab => (
              <TabButton
                key={tab}
                id={tab}
                active={activeTab === tab}
                onClick={setActiveTab}
                label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-4">

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Stats row */}
              <div className="grid grid-cols-4 gap-2 mb-4">
                <StatCard icon="👥" label="Students" value={CLASS_STUDENTS.length} color="#C8A840" delay={0.1} />
                <StatCard icon="⚡" label="Avg XP" value={avgXP.toLocaleString()} color="#009A44" delay={0.15} />
                <StatCard icon="🎯" label="Avg Score" value={`${avgAccuracy}%`} color="#CE1126" delay={0.2} />
                <StatCard icon="🔥" label="Active" value={activeStudents} color="#FF6B00" delay={0.25} />
              </div>

              {/* Heatmap — module completion */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-uae-navy/60 border border-uae-gold/10 rounded-xl p-4 mb-4"
              >
                <div className="text-uae-gold text-sm font-bold mb-3">📊 Module Completion Heatmap</div>
                {MODULE_COMPLETION.map((mod, i) => (
                  <div key={i} className="mb-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/70 text-xs truncate max-w-36">{mod.title}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white/40 text-xs">{mod.avgScore > 0 ? `${mod.avgScore}% avg` : 'Not started'}</span>
                        <span className="text-xs font-bold" style={{ color: mod.color }}>{mod.completion}%</span>
                      </div>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${mod.completion}%` }}
                        transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        style={{ background: `linear-gradient(90deg, ${mod.color}, ${mod.color}88)` }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Top performers */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-uae-navy/60 border border-uae-gold/10 rounded-xl p-4 mb-4"
              >
                <div className="text-uae-gold text-sm font-bold mb-3">🏆 Top Performers</div>
                {sortedStudents.slice(0, 3).map((student, i) => (
                  <div key={student.name} className="flex items-center gap-3 py-2">
                    <span className="text-uae-gold font-bold text-sm w-5">#{i + 1}</span>
                    <span className="text-lg">{student.avatar}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{student.name}</div>
                      <div className="text-white/40 text-xs">{student.modules} modules · {student.accuracy}% accuracy</div>
                    </div>
                    <div className="text-right">
                      <div className="text-uae-gold text-sm font-bold">{student.xp.toLocaleString()} XP</div>
                      <div className="text-white/40 text-xs">{student.streak}🔥</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Intervention list */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-uae-navy/60 border border-uae-red/20 rounded-xl p-4"
              >
                <div className="text-uae-red text-sm font-bold mb-3">⚠️ Needs Attention</div>
                {CLASS_STUDENTS.filter(s => s.accuracy < 75 || s.streak < 3).map(student => (
                  <div key={student.name} className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-lg">{student.avatar}</span>
                    <div className="flex-1">
                      <div className="text-white text-sm">{student.name}</div>
                      <div className="flex gap-2 mt-0.5">
                        {student.accuracy < 75 && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-uae-red/20 text-uae-red">
                            Low accuracy ({student.accuracy}%)
                          </span>
                        )}
                        {student.streak < 3 && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-500/20 text-yellow-400">
                            Low engagement ({student.streak} day streak)
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="text-xs text-uae-gold border border-uae-gold/30 px-2 py-1 rounded-lg hover:bg-uae-gold/10 transition-colors">
                      Message
                    </button>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'students' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="space-y-2">
                {sortedStudents.map((student, i) => (
                  <motion.div
                    key={student.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-uae-navy/60 border border-uae-gold/10 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-uae-gold font-bold w-5 text-sm">#{i + 1}</span>
                      <div className="w-10 h-10 rounded-full bg-uae-gold/10 border border-uae-gold/20 flex items-center justify-center text-xl">
                        {student.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-white text-sm font-semibold">{student.name}</span>
                          <span style={{
                            color: student.trend === 'up' ? '#009A44' : student.trend === 'down' ? '#CE1126' : '#C8A840',
                            fontSize: 12,
                          }}>
                            {student.trend === 'up' ? '↑' : student.trend === 'down' ? '↓' : '→'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${student.accuracy}%`,
                                background: student.accuracy >= 85 ? '#009A44' : student.accuracy >= 70 ? '#C8A840' : '#CE1126',
                              }}
                            />
                          </div>
                          <span className="text-white/50 text-xs w-8">{student.accuracy}%</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-uae-gold font-bold text-sm">{student.xp.toLocaleString()}</div>
                        <div className="text-white/40 text-xs">{student.streak}🔥 {student.stars}⭐</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* MODULES TAB */}
          {activeTab === 'modules' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="space-y-3">
                {MODULE_COMPLETION.map((mod, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-uae-navy/60 border border-uae-gold/10 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-white text-sm font-semibold">{mod.title}</div>
                        <div className="text-white/40 text-xs mt-0.5">
                          {mod.completion > 0
                            ? `${Math.round((mod.completion / 100) * CLASS_STUDENTS.length)} of ${CLASS_STUDENTS.length} students`
                            : 'Not started yet'}
                        </div>
                      </div>
                      <div
                        className="text-xs font-bold px-2 py-1 rounded-full"
                        style={{ background: `${mod.color}20`, color: mod.color }}
                      >
                        {mod.completion}%
                      </div>
                    </div>
                    <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${mod.completion}%` }}
                        transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
                        style={{ background: `linear-gradient(90deg, ${mod.color}, ${mod.color}88)` }}
                      />
                    </div>
                    {mod.avgScore > 0 && (
                      <div className="mt-2 text-xs text-white/40">
                        Average score: <span style={{ color: mod.color }}>{mod.avgScore}%</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* REPORTS TAB */}
          {activeTab === 'reports' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* AI-generated report summary */}
              <div className="bg-uae-navy/60 border border-uae-gold/20 rounded-xl p-4 mb-4">
                <div className="text-uae-gold text-sm font-bold mb-2">🤖 AI Progress Report — Class 8A</div>
                <div className="text-white/70 text-sm leading-relaxed space-y-2">
                  <p>
                    Class 8A has demonstrated <strong className="text-uae-green">strong engagement</strong> with
                    an average accuracy of {avgAccuracy}% across completed modules. Mariam Al Zaabi and
                    Fatima Al Hassan are outperforming expectations.
                  </p>
                  <p>
                    <strong className="text-uae-gold">Area for improvement:</strong> Module 3 (Linear Equations)
                    shows a drop to 74% average — consider reviewing inverse operations with the class.
                  </p>
                  <p>
                    <strong className="text-uae-red">Intervention recommended</strong> for Khalid Al Nuaimi —
                    low streak (2 days) and 65% accuracy suggest disengagement. A parent notification has been
                    prepared below.
                  </p>
                </div>
              </div>

              {/* Parent notifications */}
              <div className="bg-uae-navy/60 border border-uae-gold/10 rounded-xl p-4 mb-4">
                <div className="text-uae-gold text-sm font-bold mb-3">📩 Parent Notification Drafts</div>
                {[
                  {
                    student: 'Khalid Al Nuaimi',
                    avatar: '🧑',
                    message: "Khalid completed 2 modules this week with 65% accuracy. We recommend reviewing Module 2 together. Suggested home activity: practice algebraic expressions for 15 minutes daily.",
                    type: 'intervention',
                  },
                  {
                    student: 'Mariam Al Zaabi',
                    avatar: '👸',
                    message: "Mariam achieved a 18-day learning streak and 94% accuracy! She has unlocked 5 modules and earned 1,820 XP. Excellent progress — she is ready for the Final Challenge!",
                    type: 'achievement',
                  },
                ].map((notif, i) => (
                  <div key={i} className="border border-white/5 rounded-lg p-3 mb-2 last:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span>{notif.avatar}</span>
                      <span className="text-white text-sm font-medium">{notif.student}</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full ml-auto"
                        style={{
                          background: notif.type === 'achievement' ? 'rgba(0,154,68,0.2)' : 'rgba(206,17,38,0.2)',
                          color: notif.type === 'achievement' ? '#009A44' : '#CE1126',
                        }}
                      >
                        {notif.type === 'achievement' ? '⭐ Achievement' : '⚠️ Intervention'}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed">{notif.message}</p>
                    <div className="flex gap-2 mt-2">
                      <button className="text-xs text-uae-gold border border-uae-gold/30 px-3 py-1 rounded-lg hover:bg-uae-gold/10 transition-colors">
                        Send via Email
                      </button>
                      <button className="text-xs text-white/50 border border-white/10 px-3 py-1 rounded-lg hover:bg-white/5 transition-colors">
                        Send via App
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Download buttons */}
              <div className="space-y-2">
                {[
                  { label: '📊 Download Class Report (PDF)', color: '#009A44' },
                  { label: '📋 Export Gradebook (CSV)', color: '#C8A840' },
                  { label: '📩 Send Weekly Summary to All Parents', color: '#CE1126' },
                ].map(btn => (
                  <button
                    key={btn.label}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white border transition-colors"
                    style={{ border: `1px solid ${btn.color}40`, background: `${btn.color}10` }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <UAEFlagStripe height={5} />
    </div>
  );
}
