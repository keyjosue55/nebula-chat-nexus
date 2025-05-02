
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from './MessageItem';
import ConversationHeader from './ConversationHeader';
import MessageInput from './MessageInput';

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  typing: boolean;
}

interface MessageViewProps {
  activeConversation: number;
  conversations: Conversation[];
  messages: Record<number, Message[]>;
  onBack: () => void;
  onSendMessage: (message: string) => void;
}

const MessageView = ({ 
  activeConversation,
  conversations,
  messages,
  onBack,
  onSendMessage
}: MessageViewProps) => {
  const conversation = conversations.find(c => c.id === activeConversation);
  
  if (!conversation) {
    return <div className="flex-1 flex items-center justify-center">Conversation non trouvée</div>;
  }
  
  return (
    <>
      <ConversationHeader conversation={conversation} onBack={onBack} />
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages[activeConversation]?.map(msg => {
            const isOwn = msg.senderId === 0;
            const sender = isOwn ? null : conversations.find(c => c.userId === msg.senderId);
            
            return (
              <MessageItem 
                key={msg.id} 
                message={msg} 
                isOwn={isOwn}
                senderAvatar={sender?.userAvatar}
                senderName={sender?.userName}
              />
            );
          })}
        </div>
      </ScrollArea>
      
      <MessageInput onSendMessage={onSendMessage} />
    </>
  );
};

export default MessageView;
