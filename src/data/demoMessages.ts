
import { User, Conversation, Message } from "../types/messages";

// Demo users
export const demoUsers: User[] = [
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

// Demo conversations
export const demoConversations: Conversation[] = [
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

// Demo messages for each conversation
export const demoMessages: Record<number, Message[]> = {
  1: [
    { id: 1, senderId: 101, content: "Salut! Comment ça va aujourd'hui?", timestamp: "10:15", status: 'read', type: 'text' },
    { id: 2, senderId: 0, content: "Ça va bien, merci! Et toi?", timestamp: "10:18", status: 'read', type: 'text' },
    { id: 3, senderId: 101, content: "Tu as vu la nouvelle mise à jour du système?", timestamp: "10:30", status: 'delivered', type: 'text' }
  ],
  2: [
    { id: 1, senderId: 102, content: "Hey, j'ai besoin de ton aide pour une mission.", timestamp: "Hier, 18:42", status: 'read', type: 'text' },
    { id: 2, senderId: 0, content: "Bien sûr, de quoi s'agit-il?", timestamp: "Hier, 18:45", status: 'read', type: 'text' },
    { id: 3, senderId: 102, content: "Je t'envoie les coordonnées...", timestamp: "Hier, 18:50", status: 'delivered', type: 'text' }
  ],
  3: [
    { id: 1, senderId: 0, content: "Nova, tu me reçois?", timestamp: "Lun, 09:30", status: 'read', type: 'text' },
    { id: 2, senderId: 103, content: "5/5. Je suis dans la zone B.", timestamp: "Lun, 09:32", status: 'read', type: 'text' },
    { id: 3, senderId: 103, content: "Le signal est faible dans ce secteur.", timestamp: "Lun, 09:35", status: 'delivered', type: 'text' }
  ],
  4: [
    { id: 1, senderId: 104, content: "Mission terminée. Rapport transmis.", timestamp: "12/05, 22:15", status: 'delivered', type: 'text' }
  ],
  5: [
    { id: 1, senderId: 101, content: "Bonjour à tous, briefing de mission à 15h00 aujourd'hui.", timestamp: "09:30", status: 'read', type: 'text' },
    { id: 2, senderId: 102, content: "Je serai là.", timestamp: "09:35", status: 'read', type: 'text' },
    { id: 3, senderId: 103, content: "Compris. J'apporte les rapports.", timestamp: "09:40", status: 'read', type: 'text' },
    { id: 4, senderId: 0, content: "Je prépare la salle de réunion.", timestamp: "09:45", status: 'delivered', type: 'text' }
  ],
  6: [
    { id: 1, senderId: 102, content: "Les mises à jour de sécurité sont prêtes à être déployées.", timestamp: "Hier, 14:20", status: 'read', type: 'text' },
    { id: 2, senderId: 103, content: "J'ai terminé les tests sur l'environnement de développement.", timestamp: "Hier, 14:30", status: 'read', type: 'text' },
    { id: 3, senderId: 104, content: "Les mises à jour sont en cours de déploiement. Surveillance en cours.", timestamp: "Hier, 15:45", status: 'delivered', type: 'text' }
  ]
};
