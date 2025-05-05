
import { useState, useEffect, useCallback } from 'react';
import { CurrentUser, Message, Conversation } from '@/types/messages';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { demoMessages, demoConversations } from '@/data/demoMessages';

export const useMessages = () => {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<CurrentUser>({
    id: 0, // Using 0 for current user to match the demo data structure
    name: "",
    firstName: "",
    lastName: "",
    avatar: "/placeholder.svg"
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Record<number, Message[]>>(demoMessages);
  const [conversations, setConversations] = useState<Conversation[]>(demoConversations);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour charger le profil utilisateur depuis Supabase
  const loadUserProfile = useCallback(async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setCurrentUser({
          id: 0, // Using 0 for current user to match the demo data structure
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          avatar: data.avatar_url || "/placeholder.svg"
        });
      }
    } catch (error) {
      console.error("Erreur lors du chargement du profil:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Charger le profil utilisateur au démarrage ou quand l'utilisateur change
  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user, loadUserProfile]);

  const updateUserProfile = async (firstName?: string, lastName?: string, avatarUrl?: string) => {
    if (!user) return;

    try {
      const updates: {
        first_name?: string;
        last_name?: string;
        avatar_url?: string;
        updated_at: string;
      } = {
        updated_at: new Date().toISOString(),
      };

      if (firstName !== undefined) updates.first_name = firstName;
      if (lastName !== undefined) updates.last_name = lastName;
      if (avatarUrl !== undefined) updates.avatar_url = avatarUrl;

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Mettre à jour l'état local du profil utilisateur
      setCurrentUser(prev => ({
        ...prev,
        firstName: firstName !== undefined ? firstName : prev.firstName,
        lastName: lastName !== undefined ? lastName : prev.lastName,
        name: `${firstName !== undefined ? firstName : prev.firstName} ${lastName !== undefined ? lastName : prev.lastName}`.trim(),
        avatar: avatarUrl !== undefined ? avatarUrl : prev.avatar
      }));
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      throw error;
    }
  };

  // Fonction pour télécharger une image de profil dans Supabase Storage
  const uploadProfileImage = async (file: File): Promise<string> => {
    if (!user) throw new Error("Utilisateur non connecté");

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Erreur lors du téléchargement de l'image:", error);
      throw error;
    }
  };

  // Sélectionner une conversation
  const selectConversation = (conversationId: number) => {
    setActiveConversation(conversationId);
  };

  // Obtenir la conversation sélectionnée
  const selectedConversation = activeConversation
    ? conversations.find(conv => conv.id === activeConversation) || null
    : null;

  // Obtenir les messages de la conversation sélectionnée
  const conversationMessages = activeConversation && messages[activeConversation]
    ? messages[activeConversation]
    : [];

  // Fonction pour envoyer un message
  const handleSendMessage = (content: string, type: 'text' | 'image' | 'video' | 'audio' | 'document' = 'text', mediaUrl?: string, fileName?: string) => {
    if (!activeConversation || !content.trim()) return;

    const newMessage: Message = {
      id: Math.max(0, ...(messages[activeConversation]?.map(m => m.id) || [0])) + 1,
      senderId: 0,
      content,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      status: 'sent',
      type,
      mediaUrl,
      fileName
    };

    setMessages(prev => {
      const updated = { ...prev };
      if (!updated[activeConversation]) {
        updated[activeConversation] = [];
      }
      updated[activeConversation] = [...updated[activeConversation], newMessage];
      return updated;
    });
  };

  return {
    user: currentUser,
    messages,
    conversations,
    selectedConversation,
    conversationMessages,
    isLoading,
    searchQuery,
    setSearchQuery,
    activeConversation,
    setActiveConversation,
    selectConversation,
    handleSendMessage,
    updateUserProfile,
    uploadProfileImage
  };
};
