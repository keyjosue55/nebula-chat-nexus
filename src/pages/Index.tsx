
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Phone, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatiquement rediriger vers la page d'authentification après 3 secondes
    const timer = setTimeout(() => {
      navigate("/auth");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark cyber-grid-bg p-4">
      <div className="animate-float mb-8">
        <h1 className="text-5xl md:text-6xl font-bold text-center font-cyber">
          <span className="text-neon-blue text-glow">Saba</span>
          <span className="text-neon-purple text-glow">Ongeya</span>
        </h1>
        <p className="text-gray-400 text-center mt-2">Messagerie sociale du futur</p>
      </div>

      <div className="max-w-md w-full bg-black/40 backdrop-blur-md rounded-xl border border-neon-blue/20 p-6 animate-entrance">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex flex-col items-center p-4 rounded-lg bg-dark-lighter">
            <MessageCircle size={24} className="text-neon-blue mb-2" />
            <span className="text-white text-center text-sm">Messagerie instantanée</span>
          </div>
          
          <div className="flex flex-col items-center p-4 rounded-lg bg-dark-lighter">
            <Phone size={24} className="text-neon-purple mb-2" />
            <span className="text-white text-center text-sm">Appels audio</span>
          </div>
          
          <div className="flex flex-col items-center p-4 rounded-lg bg-dark-lighter">
            <Users size={24} className="text-neon-orange mb-2" />
            <span className="text-white text-center text-sm">Réseau social</span>
          </div>
          
          <div className="flex flex-col items-center p-4 rounded-lg bg-dark-lighter">
            <Bell size={24} className="text-neon-blue mb-2" />
            <span className="text-white text-center text-sm">Notifications</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button 
            className="w-full cyber-button"
            onClick={() => navigate("/auth")}
          >
            Commencer
          </Button>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">Redirection automatique...</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
