
import React, { useState, useRef, useEffect } from "react";
import { Camera, LogOut, Edit, Bell, Check, User } from "lucide-react";
import AppLayout from "@/components/layouts/AppLayout";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useMessages } from "@/hooks/useMessages";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

interface ProfileFormValues {
  firstName: string;
  lastName: string;
}

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user, updateUserProfile } = useMessages();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName
    }
  });

  // Update form default values when user changes
  useEffect(() => {
    form.reset({
      firstName: user.firstName,
      lastName: user.lastName
    });
  }, [user, form]);

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
        updateUserProfile(undefined, undefined, e.target.result as string);
        toast({
          title: "Photo de profil mise à jour",
          variant: "default",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const onSubmitProfile = (data: ProfileFormValues) => {
    updateUserProfile(data.firstName, data.lastName);
    setEditDialogOpen(false);
    toast({
      title: "Profil mis à jour",
      description: "Vos informations ont été mises à jour avec succès",
      variant: "default",
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Entête de profil */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-neon-orange to-neon-yellow"></div>
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-dark">
                <img src={user.avatar} alt={user.name} className="object-cover" />
              </Avatar>
              <button 
                className="absolute bottom-2 right-2 bg-neon-orange text-white p-1.5 rounded-full"
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
          <p className="text-neon-orange">@{user.firstName.toLowerCase()}{user.lastName.toLowerCase()}</p>
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

          <Button 
            className="mt-4 bg-dark-light border border-neon-orange/30 hover:bg-dark-light/80 text-white"
            onClick={() => setEditDialogOpen(true)}
          >
            <Edit size={16} className="mr-2 text-neon-orange" />
            Modifier le profil
          </Button>
        </div>

        {/* Paramètres */}
        <div className="mt-8 px-6">
          <h3 className="text-lg font-semibold text-white mb-4">Paramètres</h3>

          <div className="space-y-4 glass-panel p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell size={20} className="text-neon-orange mr-3" />
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
                className="data-[state=checked]:bg-neon-orange"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-neon-orange mr-3">
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
                className="data-[state=checked]:bg-neon-orange"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-neon-orange mr-3">🔊</div>
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
                className="data-[state=checked]:bg-neon-orange"
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

      {/* Dialog de modification du profil */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-dark-lighter text-white border-neon-orange/20 sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-neon-orange">Modifier le profil</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitProfile)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Prénom</FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-dark-light border-neon-orange/20 text-white"
                        placeholder="Votre prénom" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Nom</FormLabel>
                    <FormControl>
                      <Input 
                        className="bg-dark-light border-neon-orange/20 text-white"
                        placeholder="Votre nom" 
                        {...field} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditDialogOpen(false)}
                  className="border-neon-orange/20 text-white hover:bg-dark-light"
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="bg-neon-orange hover:bg-neon-orange/80 text-white"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Profile;
