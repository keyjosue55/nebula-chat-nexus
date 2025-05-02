
import React from 'react';
import { Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";

interface ConversationHeaderProps {
  conversation: {
    id: number;
    userId: number;
    userName: string;
    userAvatar: string;
    isOnline: boolean;
  };
  onBack: () => void;
}

const ConversationHeader = ({ conversation, onBack }: ConversationHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-2 bg-dark-lighter border-b border-neon-blue/20 flex items-center">
      <button 
        className="mr-2 text-gray-400 hover:text-white"
        onClick={onBack}
      >
        &larr;
      </button>
      
      <div className="flex items-center">
        <Avatar className="h-8 w-8 border-2 border-neon-blue/30">
          <img src={conversation.userAvatar} alt={conversation.userName} />
        </Avatar>
        <div className="ml-2">
          <h3 className="font-medium text-white">{conversation.userName}</h3>
          <p className="text-xs text-gray-400">
            {conversation.isOnline ? (
              <span className="text-green-500">En ligne</span>
            ) : 'Hors ligne'}
          </p>
        </div>
      </div>
      
      <div className="ml-auto">
        <Button 
          size="sm" 
          variant="ghost"
          onClick={() => navigate(`/calls/audio/${conversation.id}`)}
          className="text-neon-blue hover:bg-dark-light"
        >
          <Phone size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ConversationHeader;
