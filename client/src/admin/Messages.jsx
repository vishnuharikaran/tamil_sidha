import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { MessageSquare, Mail, Phone, Clock, CheckCircle2, Circle } from 'lucide-react';
import toast from 'react-hot-toast';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await API.get('/contact');
      setMessages(res.data);
    } catch (err) {
      toast.error('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      await API.patch(`/contact/${id}/read`);
      toast.success('Message marked as read.');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to update message.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-serif text-herbal-dark">Contact Messages Inbox</h1>
          <p className="text-xs text-slate-500">Inquiries sent by prospective patients via the website contact form.</p>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading messages...</div>
      ) : messages.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
          No contact messages received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 rounded-2xl border transition-all ${
                msg.isRead
                  ? 'bg-white border-slate-200 opacity-80'
                  : 'bg-amber-50/60 border-amber-300 shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-3 border-b border-slate-200/60 gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold font-serif text-herbal-dark">{msg.name}</h3>
                    {!msg.isRead && (
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-slate-600 mt-1">
                    <span className="flex items-center space-x-1 font-mono">
                      <Phone className="w-3 h-3 text-siddha-600" />
                      <span>{msg.phone}</span>
                    </span>
                    {msg.email && (
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-siddha-600" />
                        <span>{msg.email}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-xs text-slate-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  {!msg.isRead && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="text-xs font-semibold text-siddha-800 hover:text-siddha-900 bg-siddha-100 px-3 py-1 rounded-lg border border-siddha-200"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-700 leading-relaxed font-sans bg-white p-4 rounded-xl border border-slate-100">
                "{msg.message}"
              </p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Messages;
