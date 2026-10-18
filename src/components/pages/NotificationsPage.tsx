import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Activity, 
  ShieldAlert, 
  Calendar, 
  Trash2, 
  Check, 
  Filter,
  Sparkles
} from 'lucide-react';
import { useCareConnect } from '../../context/CareConnectContext';

export const NotificationsPage: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    clearAllNotifications,
    setActiveTab 
  } = useCareConnect();

  const [activeFilter, setActiveFilter] = useState<'all' | 'reminder' | 'checkin' | 'safety' | 'appointment'>('all');

  const filtered = notifications.filter(n => activeFilter === 'all' || n.category === activeFilter);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'reminder':
        return <Clock className="w-4 h-4 text-teal-600" />;
      case 'checkin':
        return <Activity className="w-4 h-4 text-purple-600" />;
      case 'safety':
        return <ShieldAlert className="w-4 h-4 text-rose-600" />;
      case 'appointment':
        return <Calendar className="w-4 h-4 text-amber-600" />;
      default:
        return <FileText className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Notification Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit log of medication reminders, discharge documents, and vital check-ins.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={markAllNotificationsAsRead}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Mark all read
          </button>
          <button
            onClick={clearAllNotifications}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-medium">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'reminder', label: 'Medicine Reminders' },
          { id: 'checkin', label: 'Recovery Check-ins' },
          { id: 'safety', label: 'Herb–Drug Safety' },
          { id: 'appointment', label: 'Appointments' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveFilter(f.id as any)}
            className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all ${
              activeFilter === f.id
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div 
              key={item.id}
              onClick={() => {
                markNotificationAsRead(item.id);
                if (item.actionUrl) setActiveTab(item.actionUrl);
              }}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
                item.read ? 'hover:bg-slate-50/80' : 'bg-indigo-50/30 hover:bg-indigo-50/60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 shrink-0 mt-0.5">
                  {getCategoryIcon(item.category)}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-xs font-bold ${item.read ? 'text-slate-800' : 'text-slate-900'}`}>
                      {item.title}
                    </h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {item.timestamp}
                  </span>
                </div>
              </div>

              {!item.read && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead(item.id);
                  }}
                  className="p-1.5 rounded-lg text-indigo-600 hover:bg-indigo-100 text-xs font-semibold shrink-0"
                  title="Mark as read"
                >
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-slate-500 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-bold text-slate-700">No notifications in this category</p>
          </div>
        )}
      </div>

    </div>
  );
};
