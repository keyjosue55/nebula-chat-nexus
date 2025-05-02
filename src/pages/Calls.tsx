
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Phone, PhoneOff } from 'lucide-react';
import AppLayout from '@/components/layouts/AppLayout';
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CallHistory {
  id: number;
  userId: number;
  userName: string;
  userAvatar: string;
  timestamp: string;
  duration: string;
  type: 'incoming' | 'outgoing' | 'missed';
  isAudioCall: boolean;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: string;
}

const Calls = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [callHistory, setCallHistory] = useState<CallHistory[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Données de démonstration
  useEffect(() => {
    // Historique d'appels
    const demoCallHistory: CallHistory[] = [
      {
        id: 1,
        userId: 101,
        userName: "Aria Chen",
        userAvatar: "https://i.pravatar.cc/150?img=1",
        timestamp: "Aujourd'hui, 10:42",
        duration: "05:32",
        type: 'incoming',
        isAudioCall: true
      },
      {
        id: 2,
        userId: 102,
        userName: "Marcus Wright",
        userAvatar: "https://i.pravatar.cc/150?img=2",
        timestamp: "Hier, 18:30",
        duration: "",
        type: 'missed',
        isAudioCall: true
      },
      {
        id: 3,
        userId: 103,
        userName: "Nova Kaneda",
        userAvatar: "https://i.pravatar.cc/150?img=3",
        timestamp: "Hier, 14:15",
        duration: "02:18",
        type: 'outgoing',
        isAudioCall: true
      },
      {
        id: 4,
        userId: 104,
        userName: "Lex Freeman",
        userAvatar: "https://i.pravatar.cc/150?img=4",
        timestamp: "Lundi, 09:30",
        duration: "08:44",
        type: 'incoming',
        isAudioCall: true
      }
    ];
    
    setCallHistory(demoCallHistory);
    
    // Contacts
    const demoContacts: Contact[] = [
      {
        id: 101,
        name: "Aria Chen",
        avatar: "https://i.pravatar.cc/150?img=1",
        status: "En ligne"
      },
      {
        id: 102,
        name: "Marcus Wright",
        avatar: "https://i.pravatar.cc/150?img=2",
        status: "Hors ligne"
      },
      {
        id: 103,
        name: "Nova Kaneda",
        avatar: "https://i.pravatar.cc/150?img=3",
        status: "En ligne"
      },
      {
        id: 104,
        name: "Lex Freeman",
        avatar: "https://i.pravatar.cc/150?img=4",
        status: "Hors ligne"
      },
      {
        id: 105,
        name: "Zara Mason",
        avatar: "https://i.pravatar.cc/150?img=5",
        status: "En ligne"
      },
      {
        id: 106,
        name: "Echo Syn",
        avatar: "https://i.pravatar.cc/150?img=6",
        status: "Hors ligne"
      }
    ];
    
    setContacts(demoContacts);
  }, []);

  // Filtrer les contacts et l'historique d'appels
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredCallHistory = callHistory.filter(call => 
    call.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Initier un appel audio
  const startAudioCall = (contactId: number) => {
    navigate(`/calls/audio/${contactId}`);
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <header className="px-4 py-3 bg-dark-lighter border-b border-neon-blue/20">
          <h1 className="text-xl font-bold text-white">Appels</h1>
        </header>
        
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Rechercher des contacts ou appels..."
              className="pl-10 bg-dark-light border-neon-blue/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="history" className="flex-1">
          <TabsList className="w-full justify-start px-4 border-b border-neon-blue/20">
            <TabsTrigger value="history" className="data-[state=active]:text-neon-blue">
              Récents
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:text-neon-blue">
              Contacts
            </TabsTrigger>
          </TabsList>
          
          {/* Onglet historique des appels */}
          <TabsContent value="history" className="flex-1 mt-0">
            <ScrollArea className="h-[calc(100vh-190px)]">
              <div className="space-y-1 p-2">
                {filteredCallHistory.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Aucun appel récent
                  </div>
                ) : (
                  filteredCallHistory.map(call => (
                    <div
                      key={call.id}
                      className="flex items-center p-3 rounded-md hover:bg-dark-light/50 cursor-pointer"
                    >
                      <Avatar className="h-12 w-12 border-2 border-neon-blue/30">
                        <img src={call.userAvatar} alt={call.userName} />
                      </Avatar>
                      
                      <div className="ml-3 flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-white">{call.userName}</h3>
                          <span className="text-xs text-gray-400">{call.timestamp}</span>
                        </div>
                        
                        <div className="flex items-center">
                          {call.type === 'incoming' && (
                            <Phone size={14} className="text-green-500 mr-1 rotate-90" />
                          )}
                          {call.type === 'outgoing' && (
                            <Phone size={14} className="text-neon-blue mr-1 rotate-180" />
                          )}
                          {call.type === 'missed' && (
                            <PhoneOff size={14} className="text-red-500 mr-1" />
                          )}
                          
                          <span className={`text-sm ${
                            call.type === 'missed' ? 'text-red-500' : 'text-gray-400'
                          }`}>
                            {call.type === 'incoming' ? 'Appel entrant' : 
                             call.type === 'outgoing' ? 'Appel sortant' : 
                             'Appel manqué'}
                            {call.duration && ` · ${call.duration}`}
                          </span>
                        </div>
                      </div>
                      
                      <button
                        className="ml-2 p-2 rounded-full bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue"
                        onClick={() => startAudioCall(call.userId)}
                      >
                        <Phone size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
          
          {/* Onglet contacts */}
          <TabsContent value="contacts" className="flex-1 mt-0">
            <ScrollArea className="h-[calc(100vh-190px)]">
              <div className="space-y-1 p-2">
                {filteredContacts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Aucun contact trouvé
                  </div>
                ) : (
                  filteredContacts.map(contact => (
                    <div
                      key={contact.id}
                      className="flex items-center p-3 rounded-md hover:bg-dark-light/50"
                    >
                      <div className="relative">
                        <Avatar className="h-12 w-12 border-2 border-neon-blue/30">
                          <img src={contact.avatar} alt={contact.name} />
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-dark-lighter ${
                          contact.status === 'En ligne' ? 'bg-green-500' : 'bg-gray-500'
                        }`}></span>
                      </div>
                      
                      <div className="ml-3 flex-1">
                        <h3 className="font-medium text-white">{contact.name}</h3>
                        <p className="text-sm text-gray-400">{contact.status}</p>
                      </div>
                      
                      <button
                        className="ml-2 p-2 rounded-full bg-neon-blue/10 hover:bg-neon-blue/20 text-neon-blue"
                        onClick={() => startAudioCall(contact.id)}
                      >
                        <Phone size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Calls;
