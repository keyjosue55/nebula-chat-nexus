
import { useState, useEffect } from 'react';
import { Message, Conversation } from '../types/messages';
import { demoConversations, demoMessages } from '../data/demoMessages';
import { 
  updateMessageStatus, 
  toggleTypingIndicator, 
  generateMessageId,
  getCurrentTime 
} from '../utils/messageUtils';

export const useMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});

  // Load demo data
  useEffect(() => {
    setConversations(demoConversations);
    setMessages(demoMessages);
    
    // By default, open the first conversation
    setActiveConversation(1);
  }, []);

  // Send a new message
  const handleSendMessage = (messageContent: string) => {
    if (!messageContent.trim() || !activeConversation) return;
    
    const updatedMessages = { ...messages };
    const conversationMessages = updatedMessages[activeConversation] || [];
    
    const newMsg: Message = {
      id: generateMessageId(conversationMessages),
      senderId: 0, // 0 represents current user
      content: messageContent,
      timestamp: getCurrentTime(),
      status: 'sending'
    };
    
    updatedMessages[activeConversation] = [...conversationMessages, newMsg];
    setMessages(updatedMessages);
    
    // Simulate message status updates
    // First, change to "sent" after a short delay
    setTimeout(() => {
      setMessages(prevMessages => 
        updateMessageStatus(prevMessages, activeConversation, newMsg.id, 'sent')
      );
    }, 1000);
    
    // Then, change to "delivered" after another delay
    setTimeout(() => {
      setMessages(prevMessages => 
        updateMessageStatus(prevMessages, activeConversation, newMsg.id, 'delivered')
      );
    }, 2000);
    
    // Set typing indicator
    setConversations(prevConversations => 
      toggleTypingIndicator(prevConversations, activeConversation, true)
    );
    
    // Simulate a reply after a delay
    simulateReply(activeConversation, newMsg.id);
  };

  // Simulate reply from the other participant
  const simulateReply = (conversationId: number, sentMessageId: number) => {
    setTimeout(() => {
      const activeConvo = conversations.find(c => c.id === conversationId);
      if (!activeConvo) return;

      // First remove typing indicator
      setConversations(prevConversations => 
        toggleTypingIndicator(prevConversations, conversationId, false)
      );
      
      let updatedMessages = { ...messages };
      const conversationMessages = updatedMessages[conversationId] || [];

      // Generate reply based on conversation type
      if (activeConvo.isGroup) {
        // For group chats, simulate reply from random participant
        const randomParticipant = activeConvo.participants[
          Math.floor(Math.random() * activeConvo.participants.length)
        ];
        
        const replyMsg: Message = {
          id: generateMessageId(conversationMessages),
          senderId: randomParticipant.id,
          content: "J'ai bien reçu ton message...",
          timestamp: getCurrentTime(),
          status: 'delivered'
        };
        
        updatedMessages[conversationId] = [...conversationMessages, replyMsg];
      } else {
        // For direct messages, simulate a reply from the participant
        const replyMsg: Message = {
          id: generateMessageId(conversationMessages),
          senderId: activeConvo.participants[0].id,
          content: "Je viens de recevoir ton message...",
          timestamp: getCurrentTime(),
          status: 'delivered'
        };
        
        updatedMessages[conversationId] = [...conversationMessages, replyMsg];
      }
      
      // Mark the user's message as read
      // Use a new variable instead of reassigning the updatedMessages constant
      const finalMessages = updateMessageStatus(
        updatedMessages, 
        conversationId, 
        sentMessageId, 
        'read'
      );
      
      setMessages(finalMessages);
    }, 3000);
  };

  return {
    searchQuery,
    setSearchQuery,
    activeConversation,
    setActiveConversation,
    conversations,
    messages,
    handleSendMessage
  };
};
