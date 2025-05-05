
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from './MessageItem';
import ConversationHeader from './ConversationHeader';
import MessageInput from './MessageInput';
import { Message, User, Conversation } from '@/types/messages';

interface MessageViewProps {
  activeConversation: number;
  conversations: Conversation[];
  messages: Record<number, Message[]>;
  onBack: () => void;
  onSendMessage: (message: string, type?: 'text' | 'image' | 'video' | 'audio' | 'document', mediaUrl?: string, fileName?: string) => void;
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
  
  // Function to find sender details for a message
  const findSender = (senderId: number) => {
    if (senderId === 0) return null; // Current user
    
    // For group chats, find the sender among participants
    if (conversation.isGroup) {
      return conversation.participants.find(p => p.id === senderId);
    }
    
    // For direct messages, it's always the first participant
    return conversation.participants[0];
  };

  const conversationMessages = messages[activeConversation] || [];
  
  return (
    <>
      <ConversationHeader conversation={conversation} onBack={onBack} />
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {conversationMessages.map(msg => {
            const isOwn = msg.senderId === 0;
            const sender = findSender(msg.senderId);
            
            return (
              <MessageItem 
                key={msg.id} 
                message={msg} 
                isOwn={isOwn}
                senderAvatar={sender?.avatar}
                senderName={sender?.name}
                isGroup={conversation.isGroup}
              />
            );
          })}
          
          {conversation.typing && (
            <div className="flex items-center text-neon-blue text-sm ml-12">
              <span className="animate-pulse">En train d'écrire</span>
              <span className="animate-pulse delay-100">.</span>
              <span className="animate-pulse delay-200">.</span>
              <span className="animate-pulse delay-300">.</span>
            </div>
          )}
        </div>
      </ScrollArea>
      
      <MessageInput onSendMessage={onSendMessage} />
    </>
  );
};

export default MessageView;
