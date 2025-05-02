import React from 'react';
import { Phone, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from '@/types/messages';

interface ConversationHeaderProps {
  conversation: {
    id: number;
    isGroup: boolean;
    name: string;
    avatar: string;
    participants: User[];
    typing: boolean;
  };
  onBack: () => void;
}

const ConversationHeader = ({ conversation, onBack }: ConversationHeaderProps) => {
  const navigate = useNavigate();
  const onlineCount = conversation.participants.filter(p => p.isOnline).length;

  return (
    <div className="px-4 py-2 bg-dark-lighter border-b border-neon-blue/20 flex items-center">
      <button 
        className="mr-2 text-gray-400 hover:text-white"
        onClick={onBack}
      >
        &larr;
      </button>
      
      <div className="flex items-center">
        {conversation.isGroup ? (
          <div className="h-8 w-8 bg-neon-blue/20 rounded-full flex items-center justify-center">
            <UsersRound className="h-4 w-4 text-neon-blue" />
          </div>
        ) : (
          <Avatar className="h-8 w-8 border-2 border-neon-blue/30">
            <img src={conversation.avatar} alt={conversation.name} />
          </Avatar>
        )}
        
        <div className="ml-2">
          <h3 className="font-medium text-white">
            {conversation.name}
            {conversation.isGroup && (
              <span className="text-xs text-gray-400 ml-2">({conversation.participants.length})</span>
            )}
          </h3>
          <p className="text-xs text-gray-400">
            {conversation.isGroup ? (
              <span>
                {onlineCount} en ligne
              </span>
            ) : (
              conversation.participants[0].isOnline ? (
                <span className="text-green-500">En ligne</span>
              ) : 'Hors ligne'
            )}
          </p>
        </div>
      </div>
      
      <div className="ml-auto flex">
        {conversation.isGroup && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="sm" 
                  variant="ghost"
                  className="text-neon-blue hover:bg-dark-light mr-2"
                >
                  <UsersRound size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Voir les membres</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
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
