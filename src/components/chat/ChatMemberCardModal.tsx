/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  Mail,
  ShieldCheck,
  AtSign,
  MessageSquare,
  Layers,
  Clock,
  CheckCircle2,
  Sliders,
  Calculator,
  UserCheck
} from 'lucide-react';
import { ChatUserMember } from '../../types';

interface ChatMemberCardModalProps {
  member: ChatUserMember | null;
  onClose: () => void;
  onMentionMember: (memberName: string) => void;
  onStartDirectMessage: (memberId: string) => void;
}

export const ChatMemberCardModal: React.FC<ChatMemberCardModalProps> = ({
  member,
  onClose,
  onMentionMember,
  onStartDirectMessage
}) => {
  if (!member) return null;

  const isIe = member.department === 'IE';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl border border-[#d9d2c2] w-full max-w-sm overflow-hidden animate-in zoom-in-95">
        {/* Header banner */}
        <div
          className={`h-24 p-4 flex items-start justify-between relative ${
            isIe
              ? 'bg-gradient-to-r from-[#176f78] to-[#208a95] text-white'
              : 'bg-gradient-to-r from-slate-700 to-slate-800 text-white'
          }`}
        >
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold backdrop-blur-xs">
            {isIe ? <Calculator className="w-3 h-3" /> : <Layers className="w-3 h-3" />}
            <span>{member.department} Division</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
            aria-label="Close user profile"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar & Identity details */}
        <div className="px-5 pb-5 -mt-10 relative">
          <div className="flex items-end justify-between mb-3">
            <div className="relative">
              <img
                src={member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'}
                alt={member.name}
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
                referrerPolicy="no-referrer"
              />
              <span
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                  member.status === 'online'
                    ? 'bg-emerald-500'
                    : member.status === 'busy'
                    ? 'bg-amber-500'
                    : 'bg-slate-400'
                }`}
                title={`Status: ${member.status}`}
              />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="px-2 py-1 rounded-lg bg-[#f1eee6] text-[#17343a] text-[10px] font-bold capitalize">
                {member.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-base text-[#17343a]">{member.name}</h3>
              <ShieldCheck className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-xs font-semibold text-[#176f78]">{member.role}</p>
          </div>

          {/* Departmental info matrix */}
          <div className="mt-4 p-3 rounded-2xl bg-[#f8f6f0] border border-[#e7e1d5] space-y-2 text-xs">
            {member.specialization && (
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#527078] uppercase tracking-wider">
                  IE Specialization / Focus:
                </span>
                <p className="font-medium text-[#17343a]">{member.specialization}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#e7e1d5]/60 text-[11px]">
              <div>
                <span className="text-[10px] text-[#527078] block">Assigned Sector:</span>
                <span className="font-bold text-[#17343a]">{member.assignedLine || 'All Floors'}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#527078] block">Shift Schedule:</span>
                <span className="font-bold text-[#17343a]">{member.shift || '08:00 - 17:00'}</span>
              </div>
            </div>

            {member.email && (
              <div className="pt-1 border-t border-[#e7e1d5]/60 flex items-center gap-1.5 text-[11px] text-[#527078]">
                <Mail className="w-3.5 h-3.5 text-[#176f78]" />
                <span className="truncate">{member.email}</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onMentionMember(member.name);
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl bg-[#176f78] hover:bg-[#125860] text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <AtSign className="w-3.5 h-3.5" />
              <span>@ Mention</span>
            </button>

            <button
              onClick={() => {
                onStartDirectMessage(member.id);
                onClose();
              }}
              className="py-2.5 px-3 rounded-xl border border-[#d9d2c2] bg-white hover:bg-[#f1eee6] text-[#17343a] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#176f78]" />
              <span>Direct Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
