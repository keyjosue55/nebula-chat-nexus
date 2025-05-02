
import { useState, useEffect } from 'react';

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
}

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

export const useMessages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});

  // Load demo data
  useEffect(() => {
    // Demo users
    const demoUsers: User[] = [
      {
        id: 101,
        name: "Aria Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        isOnline: true
      },
      {
        id: 102,
        name: "Marcus Wright",
        avatar: "https://i.pravatar.cc/150?img=2",
        isOnline: false
      },
      {
        id: 103,
        name: "Nova Kaneda",
        avatar: "https://i.pravatar.cc/150?img=3",
        isOnline: true
      },
      {
        id: 104,
        name: "Lex Freeman",
        avatar: "https://i.pravatar.cc/150?img=4",
        isOnline: false
      }
    ];

    // Simuler le chargement des conversations
    const demoConversations: Conversation[] = [
      {
        id: 1,
        isGroup: false,
        name: "Aria Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        participants: [demoUsers[0]],
        lastMessage: "Tu as vu la nouvelle mise à jour du système?",
        lastMessageTime: "10:30",
        unreadCount: 2,
        typing: false
      },
      {
        id: 2,
        isGroup: false,
        name: "Marcus Wright",
        avatar: "https://i.pravatar.cc/150?img=2",
        participants: [demoUsers[1]],
        lastMessage: "Je t'envoie les coordonnées...",
        lastMessageTime: "Hier",
        unreadCount: 0,
        typing: false
      },
      {
        id: 3,
        isGroup: false,
        name: "Nova Kaneda",
        avatar: "https://i.pravatar.cc/150?img=3",
        participants: [demoUsers[2]],
        lastMessage: "Le signal est faible dans ce secteur.",
        lastMessageTime: "Lun",
        unreadCount: 0,
        typing: true
      },
      {
        id: 4,
        isGroup: false,
        name: "Lex Freeman",
        avatar: "https://i.pravatar.cc/150?img=4",
        participants: [demoUsers[3]],
        lastMessage: "Mission terminée. Rapport transmis.",
        lastMessageTime: "12/05",
        unreadCount: 1,
        typing: false
      },
      {
        id: 5,
        isGroup: true,
        name: "Equipe Alpha",
        avatar: "", // Will use initials or group icon
        participants: [demoUsers[0], demoUsers[1], demoUsers[2]],
        lastMessage: "Briefing de mission à 15h00",
        lastMessageTime: "09:45",
        unreadCount: 3,
        typing: false
      },
      {
        id: 6,
        isGroup: true,
        name: "Projet Nexus",
        avatar: "",
        participants: [demoUsers[1], demoUsers[2], demoUsers[3]],
        lastMessage: "Les mises à jour sont en cours de déploiement",
        lastMessageTime: "Hier",
        unreadCount: 0,
        typing: true
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
      ],
      5: [
        { id: 1, senderId: 101, content: "Bonjour à tous, briefing de mission à 15h00 aujourd'hui.", timestamp: "09:30", status: 'read' },
        { id: 2, senderId: 102, content: "Je serai là.", timestamp: "09:35", status: 'read' },
        { id: 3, senderId: 103, content: "Compris. J'apporte les rapports.", timestamp: "09:40", status: 'read' },
        { id: 4, senderId: 0, content: "Je prépare la salle de réunion.", timestamp: "09:45", status: 'delivered' }
      ],
      6: [
        { id: 1, senderId: 102, content: "Les mises à jour de sécurité sont prêtes à être déployées.", timestamp: "Hier, 14:20", status: 'read' },
        { id: 2, senderId: 103, content: "J'ai terminé les tests sur l'environnement de développement.", timestamp: "Hier, 14:30", status: 'read' },
        { id: 3, senderId: 104, content: "Les mises à jour sont en cours de déploiement. Surveillance en cours.", timestamp: "Hier, 15:45", status: 'delivered' }
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
        
        // Then add reply message(s)
        if (activeConvo.isGroup) {
          // For group chats, simulate multiple replies
          const randomParticipant = activeConvo.participants[Math.floor(Math.random() * activeConvo.participants.length)];
          
          const replyMsg: Message = {
            id: Math.max(0, ...updatedMessages[activeConversation].map(m => m.id)) + 1,
            senderId: randomParticipant.id,
            content: "J'ai bien reçu ton message...",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'delivered'
          };
          
          updatedMessages[activeConversation] = [...updatedMessages[activeConversation], replyMsg];
        } else {
          // For direct messages, simulate a single reply
          const replyMsg: Message = {
            id: Math.max(0, ...updatedMessages[activeConversation].map(m => m.id)) + 1,
            senderId: activeConvo.participants[0].id,
            content: "Je viens de recevoir ton message...",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'delivered'
          };
          
          updatedMessages[activeConversation] = [...updatedMessages[activeConversation], replyMsg];
        }
        
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
