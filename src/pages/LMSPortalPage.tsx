import React, { useState } from 'react';
import { PageId } from '../types';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Award,
  Clock,
  Play,
  FileCheck,
  CheckCircle2,
  TrendingUp,
  User,
  Bell,
  Download,
  AlertCircle
} from 'lucide-react';

interface LMSPortalPageProps {
  onNavigate: (page: PageId) => void;
}

export const LMSPortalPage: React.FC<LMSPortalPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'courses' | 'lectures' | 'gpa' | 'assignments'>('courses');
  const [isPlayingLecture, setIsPlayingLecture] = useState(false);
  const [activeLectureTitle, setActiveLectureTitle] = useState('Neural Networks & Transformer Architectures (Lecture 14)');

  // GPA Calculator State
  const [gpaCourses, setGpaCourses] = useState([
    { name: 'CS-401: Deep Learning & AI', gradePoint: 4.0, credits: 4 },
    { name: 'SE-302: Cloud Native Microservices', gradePoint: 3.7, credits: 3 },
    { name: 'MATH-201: Multivariable Calculus', gradePoint: 3.3, credits: 3 },
    { name: 'CYB-405: Cryptography & Defense', gradePoint: 4.0, credits: 3 }
  ]);

  const totalCredits = gpaCourses.reduce((acc, c) => acc + c.credits, 0);
  const calculatedGPA = (
    gpaCourses.reduce((acc, c) => acc + c.gradePoint * c.credits, 0) / (totalCredits || 1)
  ).toFixed(2);

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* LMS Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-3xl p-8 shadow-xl mb-8 border border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                ZRA
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    Live Demo Portal
                  </span>
                  <span className="text-xs text-slate-400">Page 5: Student Academic LMS</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                  ZRA Student Academic Portal & LMS
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  Welcome, <strong>Hamza Bilal</strong> (Roll No: ZRA-BSCS-2023-042) • BS Artificial Intelligence (Semester 6)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-md">
              <div className="text-right">
                <span className="text-[10px] text-slate-300 uppercase block font-bold">Current CGPA</span>
                <span className="text-xl font-black text-amber-300">3.88 / 4.00</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="text-right">
                <span className="text-[10px] text-slate-300 uppercase block font-bold">Attendance</span>
                <span className="text-xl font-black text-emerald-400">94.2%</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-wrap gap-2">
            {[
              { id: 'courses', label: 'Enrolled Courses (5)', icon: BookOpen },
              { id: 'lectures', label: 'Recorded Lectures & Player', icon: Play },
              { id: 'assignments', label: 'Assignments & Quizzes', icon: FileCheck },
              { id: 'gpa', label: 'Interactive GPA Calculator', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'bg-white/10 hover:bg-white/20 text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Enrolled Courses */}
        {activeTab === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                code: 'CS-401',
                title: 'Deep Learning & Neural Architectures',
                instructor: 'Prof. Dr. Tariq Mahmood Zaitoon',
                credits: 4,
                progress: 78,
                nextClass: 'Monday 09:00 AM • STEM Lab 3'
              },
              {
                code: 'CYB-405',
                title: 'Digital Forensics & Incident Response',
                instructor: 'Dr. Mariam Farooq Qureshi',
                credits: 3,
                progress: 85,
                nextClass: 'Tuesday 11:30 AM • Cyber War Room'
              },
              {
                code: 'SE-302',
                title: 'Cloud Native Microservices & Docker',
                instructor: 'Engr. Haris Arshad',
                credits: 3,
                progress: 62,
                nextClass: 'Wednesday 02:00 PM • Compute Hall 1'
              },
              {
                code: 'AI-420',
                title: 'Autonomous Robotics & ROS Systems',
                instructor: 'Prof. Engr. Salman Rafiq Khan',
                credits: 4,
                progress: 90,
                nextClass: 'Thursday 10:00 AM • Robotics Arena'
              },
              {
                code: 'ENG-301',
                title: 'Technical Writing & Research Proposals',
                instructor: 'Dr. Farhana Yasmin Malik',
                credits: 2,
                progress: 70,
                nextClass: 'Friday 09:30 AM • Aud-B'
              }
            ].map((course, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 font-bold text-xs">
                    {course.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">{course.credits} Credits</span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-base">{course.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">Instructor: {course.instructor}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600">
                    <span>Syllabus Covered</span>
                    <span className="text-red-700">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 truncate max-w-[180px]">{course.nextClass}</span>
                  <button
                    onClick={() => {
                      setActiveLectureTitle(course.title);
                      setActiveTab('lectures');
                    }}
                    className="text-red-700 font-bold hover:underline"
                  >
                    View Lectures
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Lecture Player Simulator */}
        {activeTab === 'lectures' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-red-700 uppercase">Live & Recorded Lecture Theater</span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">{activeLectureTitle}</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>HD 1080p Stream Online</span>
              </span>
            </div>

            {/* Video Player Canvas */}
            <div className="aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden relative flex items-center justify-center text-white border border-slate-800 shadow-2xl">
              {isPlayingLecture ? (
                <div className="p-8 text-center space-y-4 max-w-lg">
                  <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500 text-red-500 flex items-center justify-center mx-auto animate-pulse">
                    <Play className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold">Lecture Streaming Active</h4>
                  <p className="text-xs text-slate-400">
                    &ldquo;Attention Mechanisms in Vision Transformers & Generative Multi-Modal Models&rdquo;
                  </p>
                  <button
                    onClick={() => setIsPlayingLecture(false)}
                    className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Pause Lecture
                  </button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <button
                    onClick={() => setIsPlayingLecture(true)}
                    className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center mx-auto shadow-2xl transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                  <p className="text-sm font-semibold text-slate-300">Click to Play Interactive Class Recording (52 mins)</p>
                </div>
              )}
            </div>

            {/* Lecture Downloads & Notes */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                  <Download className="w-4 h-4" />
                  <span>Download Lecture Slides (PDF)</span>
                </button>
                <button className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5">
                  <Download className="w-4 h-4" />
                  <span>Download Python Jupyter Notebook (.ipynb)</span>
                </button>
              </div>

              <button
                onClick={() => onNavigate('library')}
                className="text-xs font-bold text-red-700 hover:underline"
              >
                Access Digital E-Library Book Bank →
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Assignments & Quizzes */}
        {activeTab === 'assignments' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Current Semester Assignments & Submissions</h3>
            <div className="divide-y divide-slate-100">
              {[
                { title: 'Assignment 3: Fine-tuning LLaMA Model with LoRA', course: 'CS-401', deadline: 'Due in 3 Days (August 17, 2026)', status: 'Pending Upload', maxMarks: 50 },
                { title: 'Lab Project: Penetration Testing of E-Commerce Web API', course: 'CYB-405', deadline: 'Submitted on August 10', status: 'Graded (48/50)', maxMarks: 50 },
                { title: 'Case Study: Kubernetes Cluster Deployment on AWS EKS', course: 'SE-302', deadline: 'Submitted on August 05', status: 'Graded (49/50)', maxMarks: 50 }
              ].map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 mr-2">
                      {item.course}
                    </span>
                    <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                    <p className="text-xs text-slate-500 mt-1">{item.deadline}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      item.status.includes('Graded') ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                    <button className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-red-700 text-white font-bold text-xs transition-colors">
                      {item.status.includes('Graded') ? 'View Feedback' : 'Submit Solution'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: GPA Calculator */}
        {activeTab === 'gpa' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Interactive Semester GPA & CGPA Calculator</h3>
                <p className="text-xs text-slate-500 mt-0.5">Adjust course grade points to simulate your predicted semester CGPA</p>
              </div>
              <div className="bg-red-50 p-3 rounded-2xl border border-red-200 text-center">
                <span className="text-[10px] font-bold text-red-600 uppercase block">Calculated Semester GPA</span>
                <span className="text-2xl font-black text-red-700">{calculatedGPA} / 4.00</span>
              </div>
            </div>

            <div className="space-y-3">
              {gpaCourses.map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm">{c.name}</h4>
                    <p className="text-xs text-slate-500">{c.credits} Credit Hours</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-600">Grade:</span>
                      <select
                        value={c.gradePoint}
                        onChange={(e) => {
                          const updated = [...gpaCourses];
                          updated[i].gradePoint = parseFloat(e.target.value);
                          setGpaCourses(updated);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:outline-none focus:border-red-600"
                      >
                        <option value={4.0}>A+ / A (4.00)</option>
                        <option value={3.7}>A- (3.70)</option>
                        <option value={3.3}>B+ (3.30)</option>
                        <option value={3.0}>B (3.00)</option>
                        <option value={2.7}>B- (2.70)</option>
                        <option value={2.0}>C (2.00)</option>
                      </select>
                    </div>
                    <span className="text-xs font-black text-slate-800 w-12 text-right">
                      {(c.gradePoint * c.credits).toFixed(1)} Pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
