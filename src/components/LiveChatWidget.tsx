import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Phone, CheckCircle2, User, MessageCircle } from 'lucide-react';
import { PageId } from '../types';

interface LiveChatWidgetProps {
  onNavigate: (page: PageId) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; page?: PageId; link?: string }[];
}

export const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Assalam-o-Alaikum! Welcome to Zaitoon Roots Academy (زیتون روٹس اکیڈمی). How can I assist you today with Admissions, Degrees, Diplomas, or Scholarships? You can also contact our Academy Owner directly on WhatsApp at 0344-7956085.',
      timestamp: 'Just now',
      actions: [
        { label: '💬 WhatsApp Owner (0344-7956085)', link: 'https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20want%20information%20regarding%20Zaitoon%20Roots%20Academy' },
        { label: '🎓 View World Degrees', page: 'degrees' },
        { label: '📜 View Diplomas', page: 'diplomas' },
        { label: '📝 Apply for Fall 2026', page: 'admissions' },
        { label: '💰 Fee & Scholarship Calculator', page: 'fee-scholarship' }
      ]
    }
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userText = inputText;
    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent academic counselor response
    setTimeout(() => {
      let replyText = 'Thank you for your query regarding Zaitoon Roots Academy! Our admission officers are reviewing application batches for the 2026-27 session.';
      let actions: { label: string; page?: PageId; link?: string }[] = [];

      const lower = userText.toLowerCase();
      if (lower.includes('whatsapp') || lower.includes('phone') || lower.includes('contact') || lower.includes('number') || lower.includes('owner') || lower.includes('call') || lower.includes('rabta')) {
        replyText = 'You can connect directly with the Academy Owner and Executive Admissions Desk on WhatsApp at 0344-7956085 (+92 344 7956085). We are available 24/7 to answer your questions.';
        actions = [
          { label: '💬 Chat on WhatsApp Now (0344-7956085)', link: 'https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20need%20information%20regarding%20Zaitoon%20Roots%20Academy' },
          { label: '📍 View All Campuses', page: 'contact' }
        ];
      } else if (lower.includes('degree') || lower.includes('bs') || lower.includes('master') || lower.includes('phd')) {
        replyText = 'Zaitoon Roots Academy offers comprehensive A-Z World Degrees in Artificial Intelligence, Computer Science, Engineering, Medicine (MBBS, DPT, Pharm-D), Business, and Law with international accreditations.';
        actions = [{ label: 'Browse All Degrees', page: 'degrees' }, { label: 'Submit Admission Application', page: 'admissions' }];
      } else if (lower.includes('diploma') || lower.includes('certificate') || lower.includes('cyber') || lower.includes('ai')) {
        replyText = 'We provide fast-track 6-Month and 1-2 Year Diplomas in GenAI Prompt Engineering, Cyber Security, Full-Stack Web, Cloud DevOps, Electric Vehicles, and Medical Lab Technology.';
        actions = [{ label: 'Explore Diplomas Catalog', page: 'diplomas' }, { label: 'Calculate Diploma Fees', page: 'fee-scholarship' }];
      } else if (lower.includes('fee') || lower.includes('cost') || lower.includes('scholarship') || lower.includes('discount')) {
        replyText = 'We offer up to 100% Merit Scholarships based on Matric/Intermediate marks, alongside flexible 3-installment semester fee plans and sports quotas.';
        actions = [{ label: 'Open Scholarship Calculator', page: 'fee-scholarship' }];
      } else if (lower.includes('apply') || lower.includes('admission') || lower.includes('dakhla')) {
        replyText = 'Online admissions are currently open! You can complete your 4-step digital application in less than 3 minutes and generate your fee challan instantly.';
        actions = [{ label: 'Go to Online Admission Portal', page: 'admissions' }];
      } else if (lower.includes('verify') || lower.includes('result') || lower.includes('certificate')) {
        replyText = 'You can instantly verify any genuine degree or diploma issued by Zaitoon Roots Academy on our online verification system with QR security.';
        actions = [{ label: 'Verify Certificate Now', page: 'verification' }];
      } else {
        replyText = 'I am here to guide you across all our 23 institutional portals, program requirements, and campus facilities. What would you like to explore? You can also message our Owner directly on WhatsApp at 0344-7956085.';
        actions = [
          { label: '💬 WhatsApp (0344-7956085)', link: 'https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20want%20information%20regarding%20Zaitoon%20Roots%20Academy' },
          { label: 'Explore Degrees', page: 'degrees' },
          { label: 'Fee Calculator', page: 'fee-scholarship' },
          { label: 'Campus Tour', page: 'campus-tour' }
        ];
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: 'Just now',
        actions
      };

      setMessages(prev => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      {isOpen ? (
        <div className="w-[360px] sm:w-[400px] h-[520px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-800 to-rose-900 text-white p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-amber-300 font-bold border border-white/20">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none">ZRA Smart Counselor</h4>
                <p className="text-[11px] text-rose-200 flex items-center gap-1 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Online • 24/7 Admissions AI</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/20 text-rose-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Direct Owner WhatsApp Strip */}
          <a
            href="https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20want%20to%20speak%20with%20the%20Owner%20%2F%20Chancellor%20of%20Zaitoon%20Roots%20Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 text-xs font-bold flex items-center justify-between transition-colors shadow-inner"
          >
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Owner WhatsApp Helpline:</span>
              <span className="font-mono underline">0344-7956085</span>
            </div>
            <span className="text-[10px] bg-emerald-800 px-1.5 py-0.5 rounded uppercase font-semibold">Direct Desk</span>
          </a>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-full bg-red-700 text-white flex items-center justify-center shrink-0 text-xs mt-1">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] rounded-2xl p-3 text-xs leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-red-700 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.actions.map((act, i) => (
                        act.link ? (
                          <a
                            key={i}
                            href={act.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3 fill-current" />
                            <span>{act.label}</span>
                          </a>
                        ) : (
                          <button
                            key={i}
                            onClick={() => {
                              if (act.page) onNavigate(act.page);
                              setIsOpen(false);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-800 font-semibold text-[11px] border border-red-200 transition-colors"
                          >
                            {act.label}
                          </button>
                        )
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 text-white flex items-center justify-center shrink-0 text-xs mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about degrees, eligibility, fee, diplomas..."
              className="flex-1 text-xs px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-red-600 bg-slate-50"
            />
            <button
              onClick={handleSend}
              className="p-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <a
            href="https://wa.me/923447956085?text=Assalam-o-Alaikum%2C%20I%20want%20information%20regarding%20Zaitoon%20Roots%20Academy%20Admissions"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer border-2 border-white/40 font-bold text-xs"
            id="floating-whatsapp-btn"
            title="Chat directly with Academy Owner on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="hidden sm:inline">WhatsApp Owner: 0344-7956085</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-full bg-gradient-to-r from-red-700 to-rose-700 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer border-2 border-white/40"
            id="live-chat-toggle-btn"
          >
            <div className="relative">
              <MessageSquare className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse"></span>
            </div>
            <span className="font-bold text-xs">Admission Advisor 24/7</span>
          </button>
        </div>
      )}
    </div>
  );
};
