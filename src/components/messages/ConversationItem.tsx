
import React from 'react';
import { Avatar } from "@/components/ui/avatar";

interface ConversationItemProps {
  conversation: {
    id: number;
    userId: number;
    userName: string;
    userAvatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isOnline: boolean;
    typing: boolean;
  };
  isActive: boolean;
  onClick: () => void;
}

const ConversationItem = ({ conversation, isActive, onClick }: ConversationItemProps) => {
  return (
    <div
      className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
        conversation.unreadCount > 0 ? 'bg-dark-light' : 'hover:bg-dark-light/50'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-12 w-12 border-2 border-neon-blue/30">
          <img src={conversation.userAvatar} alt={conversation.userName} />
        </Avatar>
        {conversation.isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-dark-lighter"></span>
        )}
      </div>

      <div className="ml-3 flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium text-white">{conversation.userName}</h3>
          <span className="text-xs text-gray-400">{conversation.lastMessageTime}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-sm text-gray-400 truncate max-w-[180px]">
            {conversation.typing ? (
              <em className="text-neon-blue">En train d'écrire...</em>
            ) : conversation.lastMessage}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="ml-2 bg-neon-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationItem;
