
import React from 'react';
import { Check } from 'lucide-react';
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
  senderAvatar?: string;
  senderName?: string;
}

const MessageItem = ({ message, isOwn, senderAvatar, senderName }: MessageItemProps) => {
  return (
    <div 
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      {!isOwn && senderAvatar && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <img src={senderAvatar} alt={senderName || "User"} />
        </Avatar>
      )}
      
      <div 
        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
          isOwn 
            ? 'bg-neon-blue text-white rounded-br-none neon-border' 
            : 'bg-dark-light text-white rounded-bl-none'
        }`}
      >
        <p>{message.content}</p>
        <div className="flex items-center justify-end mt-1 space-x-1">
          <span className="text-xs opacity-70">{message.timestamp}</span>
          {isOwn && <Check size={12} className={message.isRead ? 'text-green-400' : 'opacity-70'} />}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
