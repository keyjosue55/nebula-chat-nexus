
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppLayout from "@/components/layouts/AppLayout";
import { useToast } from "@/components/ui/use-toast";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/context/AuthContext"; // Import du contexte d'authentification

// Importing the components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileSettings from "@/components/profile/ProfileSettings";
import EditProfileDialog from "@/components/profile/EditProfileDialog";
import { uploadFile } from "@/services/storageService";

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
  const { user, updateUserProfile, isLoading } = useMessages();
  const { signOut } = useAuth(); // Utilisation de signOut du contexte d'authentification
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

  const handleLogout = async () => {
    toast({
      title: "Déconnexion en cours...",
      variant: "default",
    });
    
    try {
      // Utilise la fonction signOut de Supabase via notre contexte d'authentification
      await signOut();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur lors de la déconnexion",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Créer un bucket avatars s'il n'existe pas déjà
      const publicUrl = await uploadFile('avatars', file, 'profiles');
      
      // Mettre à jour le profil utilisateur avec la nouvelle URL d'avatar
      await updateUserProfile(undefined, undefined, publicUrl);
      
      toast({
        title: "Photo de profil mise à jour",
        variant: "default",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre photo de profil",
        variant: "destructive",
      });
    }
  };

  const onSubmitProfile = async (data: ProfileFormValues) => {
    try {
      await updateUserProfile(data.firstName, data.lastName);
      setEditDialogOpen(false);
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
        variant: "default",
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour votre profil",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
          <div className="animate-pulse flex space-x-2">
            <div className="w-3 h-3 bg-neon-blue rounded-full"></div>
            <div className="w-3 h-3 bg-neon-purple rounded-full"></div>
            <div className="w-3 h-3 bg-neon-orange rounded-full"></div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col min-h-[calc(100vh-64px)]">
        {/* Header with profile picture */}
        <ProfileHeader
          user={user}
          handleAvatarChange={handleAvatarChange}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
        />

        {/* User information */}
        <ProfileInfo 
          user={user} 
          onEditClick={() => setEditDialogOpen(true)} 
        />

        {/* Settings */}
        <ProfileSettings
          notificationsEnabled={notificationsEnabled}
          isDarkMode={isDarkMode}
          soundEnabled={soundEnabled}
          handleToggleSetting={handleToggleSetting}
          handleLogout={handleLogout}
        />
      </div>

      {/* Edit profile dialog */}
      <EditProfileDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        form={form}
        onSubmit={onSubmitProfile}
      />
    </AppLayout>
  );
};

export default Profile;
