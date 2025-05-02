
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Send, Image, Plus, Check, Phone } from 'lucide-react';
import AppLayout from '@/components/layouts/AppLayout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const Messages = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Record<number, Message[]>>({});

  // Données de démonstration
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
        { id: 1, senderId: 101, content: "Salut! Comment ça va aujourd'hui?", timestamp: "10:15", isRead: true },
        { id: 2, senderId: 0, content: "Ça va bien, merci! Et toi?", timestamp: "10:18", isRead: true },
        { id: 3, senderId: 101, content: "Tu as vu la nouvelle mise à jour du système?", timestamp: "10:30", isRead: false }
      ],
      2: [
        { id: 1, senderId: 102, content: "Hey, j'ai besoin de ton aide pour une mission.", timestamp: "Hier, 18:42", isRead: true },
        { id: 2, senderId: 0, content: "Bien sûr, de quoi s'agit-il?", timestamp: "Hier, 18:45", isRead: true },
        { id: 3, senderId: 102, content: "Je t'envoie les coordonnées...", timestamp: "Hier, 18:50", isRead: true }
      ],
      3: [
        { id: 1, senderId: 0, content: "Nova, tu me reçois?", timestamp: "Lun, 09:30", isRead: true },
        { id: 2, senderId: 103, content: "5/5. Je suis dans la zone B.", timestamp: "Lun, 09:32", isRead: true },
        { id: 3, senderId: 103, content: "Le signal est faible dans ce secteur.", timestamp: "Lun, 09:35", isRead: true }
      ],
      4: [
        { id: 1, senderId: 104, content: "Mission terminée. Rapport transmis.", timestamp: "12/05, 22:15", isRead: false }
      ]
    };
    
    setMessages(demoMessages);
    
    // Par défaut, ouvrir la première conversation
    setActiveConversation(1);
  }, []);

  // Filtrer les conversations par la recherche
  const filteredConversations = conversations.filter(convo => 
    convo.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Gérer l'envoi d'un nouveau message
  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !activeConversation) return;
    
    const updatedMessages = { ...messages };
    const newMsg: Message = {
      id: Math.max(0, ...updatedMessages[activeConversation].map(m => m.id)) + 1,
      senderId: 0, // 0 représente l'utilisateur actuel
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    
    updatedMessages[activeConversation] = [...updatedMessages[activeConversation], newMsg];
    setMessages(updatedMessages);
    setNewMessage('');
    
    // Simuler une réponse après un délai
    setTimeout(() => {
      const activeConvo = conversations.find(c => c.id === activeConversation);
      if (activeConvo) {
        const replyMsg: Message = {
          id: Math.max(0, ...updatedMessages[activeConversation].map(m => m.id)) + 1,
          senderId: activeConvo.userId,
          content: "Je viens de recevoir ton message...",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isRead: false
        };
        
        updatedMessages[activeConversation] = [...updatedMessages[activeConversation], replyMsg];
        setMessages({ ...updatedMessages });
      }
    }, 3000);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <header className="px-4 py-3 bg-dark-lighter border-b border-neon-blue/20">
          <h1 className="text-xl font-bold text-white">Messages</h1>
        </header>

        {!activeConversation ? (
          // Vue liste des conversations
          <div className="flex-1">
            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Rechercher des conversations..."
                  className="pl-10 bg-dark-light border-neon-blue/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-180px)]">
              <div className="space-y-1 p-2">
                {filteredConversations.map(convo => (
                  <div
                    key={convo.id}
                    className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
                      convo.unreadCount > 0 ? 'bg-dark-light' : 'hover:bg-dark-light/50'
                    }`}
                    onClick={() => setActiveConversation(convo.id)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 border-2 border-neon-blue/30">
                        <img src={convo.userAvatar} alt={convo.userName} />
                      </Avatar>
                      {convo.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-dark-lighter"></span>
                      )}
                    </div>

                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-medium text-white">{convo.userName}</h3>
                        <span className="text-xs text-gray-400">{convo.lastMessageTime}</span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <p className="text-sm text-gray-400 truncate max-w-[180px]">
                          {convo.typing ? (
                            <em className="text-neon-blue">En train d'écrire...</em>
                          ) : convo.lastMessage}
                        </p>
                        {convo.unreadCount > 0 && (
                          <span className="ml-2 bg-neon-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {convo.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        ) : (
          // Vue conversation active
          <>
            <div className="px-4 py-2 bg-dark-lighter border-b border-neon-blue/20 flex items-center">
              <button 
                className="mr-2 text-gray-400 hover:text-white"
                onClick={() => setActiveConversation(null)}
              >
                &larr;
              </button>
              
              {(() => {
                const convo = conversations.find(c => c.id === activeConversation);
                return convo ? (
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 border-2 border-neon-blue/30">
                      <img src={convo.userAvatar} alt={convo.userName} />
                    </Avatar>
                    <div className="ml-2">
                      <h3 className="font-medium text-white">{convo.userName}</h3>
                      <p className="text-xs text-gray-400">
                        {convo.isOnline ? (
                          <span className="text-green-500">En ligne</span>
                        ) : 'Hors ligne'}
                      </p>
                    </div>
                  </div>
                ) : null;
              })()}
              
              <div className="ml-auto">
                <Button 
                  size="sm" 
                  variant="ghost"
                  onClick={() => navigate(`/calls/audio/${activeConversation}`)}
                  className="text-neon-blue hover:bg-dark-light"
                >
                  <Phone size={18} />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {activeConversation && messages[activeConversation]?.map(msg => {
                  const isOwn = msg.senderId === 0;
                  const convo = conversations.find(c => c.userId === msg.senderId);
                  
                  return (
                    <div 
                      key={msg.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isOwn && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <img src={convo?.userAvatar} alt={convo?.userName} />
                        </Avatar>
                      )}
                      
                      <div 
                        className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                          isOwn 
                            ? 'bg-neon-blue text-white rounded-br-none neon-border' 
                            : 'bg-dark-light text-white rounded-bl-none'
                        }`}
                      >
                        <p>{msg.content}</p>
                        <div className="flex items-center justify-end mt-1 space-x-1">
                          <span className="text-xs opacity-70">{msg.timestamp}</span>
                          {isOwn && <Check size={12} className={msg.isRead ? 'text-green-400' : 'opacity-70'} />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
            
            {/* Input de message */}
            <div className="p-3 bg-dark-lighter border-t border-neon-blue/20 flex items-center">
              <Button 
                size="sm" 
                variant="ghost"
                className="text-neon-blue mr-1"
              >
                <Image size={20} />
              </Button>
              
              <Button 
                size="sm" 
                variant="ghost"
                className="text-neon-blue mr-2"
              >
                <Plus size={20} />
              </Button>
              
              <Input
                placeholder="Tapez votre message..."
                className="bg-dark-light border-neon-blue/20"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
              />
              
              <Button 
                className="ml-2 bg-neon-blue hover:bg-neon-blue/80"
                size="sm"
                onClick={handleSendMessage}
              >
                <Send size={18} />
              </Button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Messages;
