
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MicOff, Mic, PhoneOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const CallScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [callStatus, setCallStatus] = useState<'connecting' | 'active' | 'ended'>('connecting');
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [userData, setUserData] = useState<{
    name: string;
    avatar: string;
  } | null>(null);

  // Simuler les informations de l'utilisateur
  useEffect(() => {
    const users = {
      "1": { name: "Aria Chen", avatar: "https://i.pravatar.cc/150?img=1" },
      "2": { name: "Marcus Wright", avatar: "https://i.pravatar.cc/150?img=2" },
      "3": { name: "Nova Kaneda", avatar: "https://i.pravatar.cc/150?img=3" },
      "4": { name: "Lex Freeman", avatar: "https://i.pravatar.cc/150?img=4" }
    };
    
    if (id && id in users) {
      setUserData(users[id as keyof typeof users]);
    }
    
    // Simuler la connexion de l'appel
    const connectionTimer = setTimeout(() => {
      setCallStatus('active');
      toast({
        title: "Appel connecté",
        description: `En communication avec ${users[id as keyof typeof users]?.name || 'inconnu'}`,
        variant: "default",
      });
    }, 2000);
    
    return () => {
      clearTimeout(connectionTimer);
    };
  }, [id, toast]);

  // Gérer la durée de l'appel
  useEffect(() => {
    let timer: number | undefined;
    
    if (callStatus === 'active') {
      timer = window.setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callStatus]);

  // Formater la durée de l'appel
  const formatCallDuration = () => {
    const minutes = Math.floor(callDuration / 60);
    const seconds = callDuration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Gérer la fin d'appel
  const handleEndCall = () => {
    setCallStatus('ended');
    toast({
      title: "Appel terminé",
      description: `Durée : ${formatCallDuration()}`,
      variant: "default",
    });
    
    setTimeout(() => {
      navigate('/calls');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-dark cyber-grid-bg flex flex-col items-center justify-between p-8 z-50">
      {/* Visualisations audio stylisées */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute left-0 right-0 top-1/4 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent animate-pulse-neon"></div>
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent animate-pulse-neon" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute left-0 right-0 top-3/4 h-px bg-gradient-to-r from-transparent via-neon-orange to-transparent animate-pulse-neon" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Informations de l'appel */}
      <div className="flex flex-col items-center mt-16">
        <div className="text-gray-400 mb-2">
          {callStatus === 'connecting' ? 'Appel en cours...' : 
           callStatus === 'active' ? formatCallDuration() : 'Appel terminé'}
        </div>
        
        <div className="relative mb-6">
          <div className={`absolute inset-0 rounded-full bg-neon-blue/20 blur-md ${
            callStatus === 'active' ? 'animate-pulse-neon' : ''
          }`}></div>
          <Avatar className="w-32 h-32 border-4 border-neon-blue/50 relative">
            {userData?.avatar ? (
              <img src={userData.avatar} alt={userData.name} className="object-cover" />
            ) : (
              <div className="bg-dark-light w-full h-full flex items-center justify-center text-3xl text-neon-blue">
                {userData?.name?.charAt(0) || '?'}
              </div>
            )}
          </Avatar>
          
          {callStatus === 'active' && (
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-xs text-white px-3 py-1 rounded-full">
              En direct
            </div>
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">{userData?.name || 'Inconnu'}</h2>
        
        <div className="text-gray-400">
          {callStatus === 'connecting' && (
            <div className="flex items-center">
              <span className="mr-2">Connexion en cours</span>
              <span className="flex space-x-1">
                <span className="h-2 w-2 bg-neon-blue rounded-full animate-pulse"></span>
                <span className="h-2 w-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="h-2 w-2 bg-neon-blue rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Visualisations audio */}
      {callStatus === 'active' && (
        <div className="flex justify-center items-end h-20 space-x-1 my-8">
          {Array.from({ length: 12 }).map((_, i) => {
            const height = 20 + Math.sin(Date.now() / 500 + i) * 15;
            return (
              <div 
                key={i}
                className="w-2 bg-neon-blue rounded-sm"
                style={{ 
                  height: `${height}px`,
                  opacity: isMuted ? 0.3 : 0.7,
                  transition: 'all 0.2s ease',
                  animationDuration: `${0.8 + Math.random() * 0.5}s`
                }}
              ></div>
            );
          })}
        </div>
      )}

      {/* Contrôles d'appel */}
      <div className="mb-16 flex items-center space-x-6">
        <Button
          size="lg"
          variant="outline"
          className={`rounded-full w-16 h-16 ${
            isMuted 
              ? 'bg-neon-purple text-white' 
              : 'bg-dark-light border-neon-blue/50 text-neon-blue'
          }`}
          onClick={() => setIsMuted(!isMuted)}
          disabled={callStatus !== 'active'}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </Button>
        
        <Button
          size="lg"
          className="rounded-full w-20 h-20 bg-red-500 hover:bg-red-600 text-white"
          onClick={handleEndCall}
        >
          <PhoneOff size={28} />
        </Button>
      </div>
    </div>
  );
};

export default CallScreen;
