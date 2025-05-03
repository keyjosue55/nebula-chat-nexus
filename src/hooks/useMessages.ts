
import { useState, useEffect } from 'react';
import { Message, Conversation, CurrentUser } from '../types/messages';
import { demoConversations, demoMessages } from '../data/demoMessages';
import { 
  updateMessageStatus, 
  toggleTypingIndicator, 
  generateMessageId,
  getCurrentTime 
} from '../utils/messageUtils';

// Utilisateur courant simulé
const currentUser: CurrentUser = {
  id: 0,
  firstName: "Julien",
  lastName: "Leroux",
  name: "Julien Leroux",
  avatar: "https://i.pravatar.cc/300"
};

export const useMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});
  const [user, setUser] = useState<CurrentUser>(currentUser);

  // Load demo data
  useEffect(() => {
    setConversations(demoConversations);
    setMessages(demoMessages);
    
    // By default, open the first conversation
    setActiveConversation(1);
  }, []);

  // Send a new message
  const handleSendMessage = (messageContent: string, type: 'text' | 'image' | 'video' | 'audio' | 'document' = 'text', mediaUrl?: string, fileName?: string) => {
    if ((!messageContent.trim() && type === 'text') || !activeConversation) return;
    
    const updatedMessages = { ...messages };
    const conversationMessages = updatedMessages[activeConversation] || [];
    
    const newMsg: Message = {
      id: generateMessageId(conversationMessages),
      senderId: 0, // 0 represents current user
      content: messageContent,
      timestamp: getCurrentTime(),
      status: 'sending',
      type,
      ...(mediaUrl && { mediaUrl }),
      ...(fileName && { fileName })
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
          status: 'delivered',
          type: 'text'
        };
        
        updatedMessages[conversationId] = [...conversationMessages, replyMsg];
      } else {
        // For direct messages, simulate a reply from the participant
        const replyMsg: Message = {
          id: generateMessageId(conversationMessages),
          senderId: activeConvo.participants[0].id,
          content: "Je viens de recevoir ton message...",
          timestamp: getCurrentTime(),
          status: 'delivered',
          type: 'text'
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

  // Update user profile
  const updateUserProfile = (firstName?: string, lastName?: string, avatar?: string) => {
    setUser(prevUser => {
      const updates: Partial<CurrentUser> = {};
      
      if (firstName !== undefined) updates.firstName = firstName;
      if (lastName !== undefined) updates.lastName = lastName;
      
      // Mettre à jour le nom complet si prénom ou nom ont changé
      if (firstName !== undefined || lastName !== undefined) {
        const newFirstName = firstName !== undefined ? firstName : prevUser.firstName;
        const newLastName = lastName !== undefined ? lastName : prevUser.lastName;
        updates.name = `${newFirstName} ${newLastName}`;
      }
      
      if (avatar !== undefined) updates.avatar = avatar;
      
      return { ...prevUser, ...updates };
    });
  };

  return {
    searchQuery,
    setSearchQuery,
    activeConversation,
    setActiveConversation,
    conversations,
    messages,
    handleSendMessage,
    user,
    updateUserProfile
  };
};
