
import { Conversation, Message } from "../types/messages";

// Update message status
export const updateMessageStatus = (
  messages: Record<number, Message[]>,
  conversationId: number,
  messageId: number,
  status: 'sending' | 'sent' | 'delivered' | 'read'
): Record<number, Message[]> => {
  const updatedMessages = { ...messages };
  const msgIndex = updatedMessages[conversationId]?.findIndex(m => m.id === messageId);
  
  if (msgIndex !== -1) {
    updatedMessages[conversationId] = [...updatedMessages[conversationId]];
    updatedMessages[conversationId][msgIndex] = {
      ...updatedMessages[conversationId][msgIndex],
      status
    };
  }
  
  return updatedMessages;
};

// Toggle typing indicator for a conversation
export const toggleTypingIndicator = (
  conversations: Conversation[],
  conversationId: number,
  isTyping: boolean
): Conversation[] => {
  return conversations.map(convo => {
    if (convo.id === conversationId) {
      return { ...convo, typing: isTyping };
    }
    return convo;
  });
};

// Generate new message ID
export const generateMessageId = (messages: Message[]): number => {
  return Math.max(0, ...messages.map(m => m.id)) + 1;
};

// Format current time
export const getCurrentTime = (): string => {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
