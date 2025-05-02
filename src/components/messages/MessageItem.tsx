import React from 'react';
import { Check, CheckCheck, Clock } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";
import { Message } from '@/types/messages';

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  senderAvatar?: string;
  senderName?: string;
  isGroup?: boolean;
}

const MessageItem = ({ message, isOwn, senderAvatar, senderName, isGroup = false }: MessageItemProps) => {
  // Render the appropriate status icon based on message status
  const renderStatusIcon = () => {
    if (!isOwn) return null;
    
    switch (message.status) {
      case 'sending':
        return <Clock size={12} className="text-gray-400" />;
      case 'sent':
        return <Check size={12} className="text-gray-400" />;
      case 'delivered':
        return <CheckCheck size={12} className="text-gray-400" />;
      case 'read':
        return <CheckCheck size={12} className="text-green-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div 
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      {!isOwn && senderAvatar && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <img src={senderAvatar} alt={senderName || "User"} />
        </Avatar>
      )}
      
      <div className="flex flex-col max-w-[75%]">
        {!isOwn && isGroup && senderName && (
          <span className="text-xs text-neon-blue ml-2 mb-1">{senderName}</span>
        )}
        <div 
          className={`rounded-2xl px-4 py-2 ${
            isOwn 
              ? 'bg-neon-blue text-white rounded-br-none neon-border' 
              : 'bg-dark-light text-white rounded-bl-none'
          }`}
        >
          <p>{message.content}</p>
          <div className="flex items-center justify-end mt-1 space-x-1">
            <span className="text-xs opacity-70">{message.timestamp}</span>
            {renderStatusIcon()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
