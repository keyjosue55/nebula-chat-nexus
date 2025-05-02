
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { UsersRound } from 'lucide-react';

interface User {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface ConversationItemProps {
  conversation: {
    id: number;
    isGroup: boolean;
    name: string;
    avatar: string;
    participants: User[];
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
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
        {conversation.isGroup ? (
          <div className="h-12 w-12 bg-neon-blue/20 rounded-full flex items-center justify-center">
            <UsersRound className="h-6 w-6 text-neon-blue" />
          </div>
        ) : (
          <Avatar className="h-12 w-12 border-2 border-neon-blue/30">
            <img src={conversation.avatar} alt={conversation.name} />
          </Avatar>
        )}
        
        {!conversation.isGroup && conversation.participants[0].isOnline && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-dark-lighter"></span>
        )}
      </div>

      <div className="ml-3 flex-1">
        <div className="flex justify-between items-baseline">
          <h3 className="font-medium text-white">
            {conversation.name}
            {conversation.isGroup && (
              <span className="text-xs text-gray-400 ml-2">({conversation.participants.length})</span>
            )}
          </h3>
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
