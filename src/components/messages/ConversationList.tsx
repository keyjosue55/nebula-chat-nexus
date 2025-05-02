
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationItem from './ConversationItem';

interface User {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
}

interface Conversation {
  id: number;
  isGroup: boolean;
  name: string;
  avatar: string;
  participants: User[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  typing: boolean;
}

interface ConversationListProps {
  conversations: Conversation[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectConversation: (id: number) => void;
}

const ConversationList = ({
  conversations,
  searchQuery,
  onSearchChange,
  onSelectConversation
}: ConversationListProps) => {
  // Filter conversations by search query
  const filteredConversations = conversations.filter(convo => 
    convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Rechercher des conversations..."
            className="pl-10 bg-dark-light border-neon-blue/20"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="space-y-1 p-2">
          {filteredConversations.map(convo => (
            <ConversationItem
              key={convo.id}
              conversation={convo}
              isActive={false}
              onClick={() => onSelectConversation(convo.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ConversationList;
