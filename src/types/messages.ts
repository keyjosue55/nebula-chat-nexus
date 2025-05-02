
export interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface User {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface Conversation {
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
