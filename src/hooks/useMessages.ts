
import { useState, useEffect } from 'react';

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
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

export const useMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});

  // Load demo data
  useEffect(() => {
    // Simuler le chargement des conversations
    const demoConversations: Conversation[] = [
      {
        id: 1,
        userId: 101,
        userName: "Aria Chen",
        userAvatar: "https://i.pravatar.cc/150?img=1",
        lastMessage: "Tu as vu la nouvelle mise à jour du système?",
        lastMessageTime: "10:30",
        unreadCount: 2,
        isOnline: true,
        typing: false
      },
      {
        id: 2,
        userId: 102,
        userName: "Marcus Wright",
        userAvatar: "https://i.pravatar.cc/150?img=2",
        lastMessage: "Je t'envoie les coordonnées...",
        lastMessageTime: "Hier",
        unreadCount: 0,
        isOnline: false,
        typing: false
      },
      {
        id: 3,
        userId: 103,
        userName: "Nova Kaneda",
        userAvatar: "https://i.pravatar.cc/150?img=3",
        lastMessage: "Le signal est faible dans ce secteur.",
        lastMessageTime: "Lun",
        unreadCount: 0,
        isOnline: true,
        typing: true
      },
      {
        id: 4,
        userId: 104,
        userName: "Lex Freeman",
        userAvatar: "https://i.pravatar.cc/150?img=4",
        lastMessage: "Mission terminée. Rapport transmis.",
        lastMessageTime: "12/05",
        unreadCount: 1,
        isOnline: false,
        typing: false
      }
    ];
    
    setConversations(demoConversations);
    
    // Simuler le chargement des messages pour chaque conversation
    const demoMessages: Record<number, Message[]> = {
      1: [
        { id: 1, senderId: 101, content: "Salut! Comment ça va aujourd'hui?", timestamp: "10:15", status: 'read' },
        { id: 2, senderId: 0, content: "Ça va bien, merci! Et toi?", timestamp: "10:18", status: 'read' },
        { id: 3, senderId: 101, content: "Tu as vu la nouvelle mise à jour du système?", timestamp: "10:30", status: 'delivered' }
      ],
      2: [
        { id: 1, senderId: 102, content: "Hey, j'ai besoin de ton aide pour une mission.", timestamp: "Hier, 18:42", status: 'read' },
        { id: 2, senderId: 0, content: "Bien sûr, de quoi s'agit-il?", timestamp: "Hier, 18:45", status: 'read' },
        { id: 3, senderId: 102, content: "Je t'envoie les coordonnées...", timestamp: "Hier, 18:50", status: 'delivered' }
      ],
      3: [
        { id: 1, senderId: 0, content: "Nova, tu me reçois?", timestamp: "Lun, 09:30", status: 'read' },
        { id: 2, senderId: 103, content: "5/5. Je suis dans la zone B.", timestamp: "Lun, 09:32", status: 'read' },
        { id: 3, senderId: 103, content: "Le signal est faible dans ce secteur.", timestamp: "Lun, 09:35", status: 'delivered' }
      ],
      4: [
        { id: 1, senderId: 104, content: "Mission terminée. Rapport transmis.", timestamp: "12/05, 22:15", status: 'delivered' }
      ]
    };
    
    setMessages(demoMessages);
    
    // Par défaut, ouvrir la première conversation
    setActiveConversation(1);
  }, []);

  // Send a new message
  const handleSendMessage = (messageContent: string) => {
    if (!messageContent.trim() || !activeConversation) return;
    
    const updatedMessages = { ...messages };
    const newMsg: Message = {
      id: Math.max(0, ...updatedMessages[activeConversation].map(m => m.id)) + 1,
      senderId: 0, // 0 represents current user
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sending'
    };
    
    updatedMessages[activeConversation] = [...updatedMessages[activeConversation], newMsg];
    setMessages(updatedMessages);
    
    // Simulate message status updates
    // First, change to "sent" after a short delay
    setTimeout(() => {
      const msgIndex = updatedMessages[activeConversation].findIndex(m => m.id === newMsg.id);
      if (msgIndex !== -1) {
        updatedMessages[activeConversation][msgIndex].status = 'sent';
        setMessages({...updatedMessages});
      }
    }, 1000);
    
    // Then, change to "delivered" after another delay
    setTimeout(() => {
      const msgIndex = updatedMessages[activeConversation].findIndex(m => m.id === newMsg.id);
      if (msgIndex !== -1) {
        updatedMessages[activeConversation][msgIndex].status = 'delivered';
        setMessages({...updatedMessages});
      }
    }, 2000);
    
    // Set typing indicator
    const updatedConversations = conversations.map(convo => {
      if (convo.id === activeConversation) {
        return { ...convo, typing: true };
      }
      return convo;
    });
    setConversations(updatedConversations);
    
    // Simulate a reply after a delay
    setTimeout(() => {
      const activeConvo = conversations.find(c => c.id === activeConversation);
      if (activeConvo) {
        // First remove typing indicator
        const updatedConvos = conversations.map(convo => {
          if (convo.id === activeConversation) {
            return { ...convo, typing: false };
          }
          return convo;
        });
        setConversations(updatedConvos);
        
        // Then add reply message
        const replyMsg: Message = {
          id: Math.max(0, ...updatedMessages[activeConversation].map(m => m.id)) + 1,
          senderId: activeConvo.userId,
          content: "Je viens de recevoir ton message...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'delivered'
        };
        
        updatedMessages[activeConversation] = [...updatedMessages[activeConversation], replyMsg];
        
        // Also mark the user's message as read
        const msgIndex = updatedMessages[activeConversation].findIndex(m => m.id === newMsg.id);
        if (msgIndex !== -1) {
          updatedMessages[activeConversation][msgIndex].status = 'read';
        }
        
        setMessages({ ...updatedMessages });
      }
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
