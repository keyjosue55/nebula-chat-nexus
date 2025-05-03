
import React, { useState, useRef } from "react";
import { Camera, LogOut, Edit, Bell, Check } from "lucide-react";
import AppLayout from "@/components/layouts/AppLayout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useMessages } from "@/hooks/useMessages";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUserProfile } = useMessages();

  const handleLogout = () => {
    toast({
      title: "Déconnexion en cours...",
      variant: "default",
    });
    
    // Simule une déconnexion avec délai
    setTimeout(() => {
      navigate("/auth");
    }, 1500);
  };

  const handleToggleSetting = (
    setting: "notifications" | "darkMode" | "sound",
    newValue: boolean
  ) => {
    if (setting === "notifications") {
      setNotificationsEnabled(newValue);
      toast({
        title: newValue ? "Notifications activées" : "Notifications désactivées",
        variant: "default",
      });
    } else if (setting === "darkMode") {
      setIsDarkMode(newValue);
      toast({
        title: newValue ? "Mode sombre activé" : "Mode clair activé",
        variant: "default",
      });
    } else if (setting === "sound") {
      setSoundEnabled(newValue);
      toast({
        title: newValue ? "Sons activés" : "Sons désactivés",
        variant: "default",
      });
    }
  };

  const handleAvatarChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        updateUserProfile(undefined, e.target.result as string);
        toast({
          title: "Photo de profil mise à jour",
          variant: "default",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Entête de profil */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-neon-blue to-neon-purple"></div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-dark">
                <img src={user.avatar} alt={user.name} className="object-cover" />
              </Avatar>
              <button 
                className="absolute bottom-2 right-2 bg-neon-blue text-white p-1.5 rounded-full"
                onClick={handleAvatarChange}
              >
                <Camera size={18} />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>

        {/* Informations de profil */}
        <div className="mt-20 px-6 text-center">
          <h2 className="text-2xl font-bold text-white">{user.name}</h2>
          <p className="text-neon-blue">@{user.name.toLowerCase().replace(/\s/g, '')}</p>
          <p className="text-gray-400 mt-2 max-w-sm mx-auto">Explorer numérique | Communicateur interstellaire | Toujours connecté</p>

          <div className="flex justify-center mt-4 space-x-6">
            <div className="text-center">
              <p className="text-white font-bold">287</p>
              <p className="text-gray-400 text-sm">Abonnés</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold">152</p>
              <p className="text-gray-400 text-sm">Abonnements</p>
            </div>
          </div>

          <Button className="mt-4 bg-dark-light border border-neon-blue/30 hover:bg-dark-light/80 text-white">
            <Edit size={16} className="mr-2" />
            Modifier le profil
          </Button>
        </div>

        {/* Paramètres */}
        <div className="mt-8 px-6">
          <h3 className="text-lg font-semibold text-white mb-4">Paramètres</h3>

          <div className="space-y-4 glass-panel p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell size={20} className="text-neon-blue mr-3" />
                <div>
                  <p className="text-white">Notifications</p>
                  <p className="text-xs text-gray-400">
                    Recevoir des alertes pour les nouveaux messages
                  </p>
                </div>
              </div>
              <Switch
                checked={notificationsEnabled}
                onCheckedChange={(checked) =>
                  handleToggleSetting("notifications", checked)
                }
                className="data-[state=checked]:bg-neon-blue"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-neon-blue mr-3">
                  {isDarkMode ? "🌙" : "☀️"}
                </div>
                <div>
                  <p className="text-white">Mode sombre</p>
                  <p className="text-xs text-gray-400">
                    Changer l'apparence de l'application
                  </p>
                </div>
              </div>
              <Switch
                checked={isDarkMode}
                onCheckedChange={(checked) =>
                  handleToggleSetting("darkMode", checked)
                }
                className="data-[state=checked]:bg-neon-blue"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-neon-blue mr-3">🔊</div>
                <div>
                  <p className="text-white">Sons</p>
                  <p className="text-xs text-gray-400">
                    Activer les sons de notification
                  </p>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={(checked) =>
                  handleToggleSetting("sound", checked)
                }
                className="data-[state=checked]:bg-neon-blue"
              />
            </div>
          </div>

          <div className="mt-8 mb-6">
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut size={16} className="mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
