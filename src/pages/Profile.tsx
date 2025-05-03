
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AppLayout from "@/components/layouts/AppLayout";
import { useToast } from "@/components/ui/use-toast";
import { useMessages } from "@/hooks/useMessages";

// Importing the new components
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfileSettings from "@/components/profile/ProfileSettings";
import EditProfileDialog from "@/components/profile/EditProfileDialog";

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
