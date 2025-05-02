
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Heart, MessageCircle, UserPlus, Check } from 'lucide-react';
import AppLayout from '@/components/layouts/AppLayout';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: number;
  type: 'like' | 'comment' | 'follow' | 'message' | 'system';
  userId: number;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: string;
  read: boolean;
  actionable?: boolean;
}

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');

  // Simuler les données des notifications
  useEffect(() => {
    const demoNotifications: Notification[] = [
      {
        id: 1,
        type: 'like',
        userId: 101,
        userName: "Aria Chen",
        userAvatar: "https://i.pravatar.cc/150?img=1",
        content: "a aimé votre photo.",
        timestamp: "Il y a 30 mins",
        read: false
      },
      {
        id: 2,
        type: 'follow',
        userId: 102,
        userName: "Marcus Wright",
        userAvatar: "https://i.pravatar.cc/150?img=2",
        content: "s'est abonné à votre profil.",
        timestamp: "Il y a 2 heures",
        read: false,
        actionable: true
      },
      {
        id: 3,
        type: 'comment',
        userId: 103,
        userName: "Nova Kaneda",
        userAvatar: "https://i.pravatar.cc/150?img=3",
        content: "a commenté: \"Super idée, on devrait essayer!\"",
        timestamp: "Il y a 3 heures",
        read: true
      },
      {
        id: 4,
        type: 'message',
        userId: 104,
        userName: "Lex Freeman",
        userAvatar: "https://i.pravatar.cc/150?img=4",
        content: "vous a envoyé un message.",
        timestamp: "Il y a 5 heures",
        read: true
      },
      {
        id: 5,
        type: 'system',
        userId: 0,
        userName: "SabaOngeya",
        userAvatar: "/favicon.ico",
        content: "Bienvenue sur SabaOngeya! Complétez votre profil pour commencer.",
        timestamp: "Il y a 1 jour",
        read: true
      }
    ];
    
    setNotifications(demoNotifications);
  }, []);

  // Marquer une notification comme lue
  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notif => {
      if (notif.id === notificationId) {
        return { ...notif, read: true };
      }
      return notif;
    }));
  };

  // Filtrer les notifications
  const getFilteredNotifications = () => {
    if (activeTab === 'unread') {
      return notifications.filter(n => !n.read);
    }
    return notifications;
  };

  // Obtenir le nombre de notifications non lues
  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length;
  };

  // Gérer le clic sur une notification
  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    switch (notification.type) {
      case 'message':
        navigate(`/messages`);
        break;
      case 'like':
      case 'comment':
        navigate(`/feed`);
        break;
      case 'follow':
        // Pas de navigation pour follow car c'est actionable
        break;
      case 'system':
        navigate('/profile');
        break;
    }
  };

  // Tout marquer comme lu
  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  // Gérer l'acceptation d'un abonnement
  const handleAcceptFollow = (notificationId: number) => {
    // Simuler l'acceptation et marquer comme lu
    markAsRead(notificationId);
    
    // Mettre à jour la notification pour montrer qu'elle a été acceptée
    setNotifications(notifications.map(notif => {
      if (notif.id === notificationId) {
        return {
          ...notif,
          content: "s'est abonné à votre profil. Vous avez accepté.",
          actionable: false
        };
      }
      return notif;
    }));
  };

  // Rendre l'icône en fonction du type de notification
  const renderNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart size={18} className="text-red-500" />;
      case 'comment':
        return <MessageCircle size={18} className="text-neon-blue" />;
      case 'follow':
        return <UserPlus size={18} className="text-neon-purple" />;
      case 'message':
        return <MessageCircle size={18} className="text-neon-orange" />;
      case 'system':
        return <Bell size={18} className="text-neon-blue" />;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <header className="px-4 py-3 bg-dark-lighter border-b border-neon-blue/20 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">Notifications</h1>
          
          {getUnreadCount() > 0 && (
            <Button
              variant="link"
              size="sm"
              className="text-neon-blue pl-1 h-auto py-0"
              onClick={markAllAsRead}
            >
              Tout marquer comme lu
            </Button>
          )}
        </header>
        
        <Tabs defaultValue="all" className="flex-1" onValueChange={(value) => setActiveTab(value as 'all' | 'unread')}>
          <TabsList className="w-full justify-start px-4 border-b border-neon-blue/20">
            <TabsTrigger value="all" className="data-[state=active]:text-neon-blue">
              Toutes
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:text-neon-blue">
              Non lues
              {getUnreadCount() > 0 && (
                <span className="ml-2 bg-neon-blue text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getUnreadCount()}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0 flex-1">
            <NotificationsList
              notifications={getFilteredNotifications()}
              onNotificationClick={handleNotificationClick}
              onAcceptFollow={handleAcceptFollow}
              renderIcon={renderNotificationIcon}
            />
          </TabsContent>
          
          <TabsContent value="unread" className="mt-0 flex-1">
            <NotificationsList
              notifications={getFilteredNotifications()}
              onNotificationClick={handleNotificationClick}
              onAcceptFollow={handleAcceptFollow}
              renderIcon={renderNotificationIcon}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

// Composant de liste des notifications
interface NotificationsListProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onAcceptFollow: (notificationId: number) => void;
  renderIcon: (type: Notification['type']) => JSX.Element;
}

const NotificationsList = ({
  notifications,
  onNotificationClick,
  onAcceptFollow,
  renderIcon
}: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <Bell size={48} className="mb-4 opacity-20" />
        <p>Aucune notification à afficher</p>
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[calc(100vh-130px)]">
      <div className="p-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-3 mb-1 rounded-md cursor-pointer transition-colors ${
              !notification.read ? 'bg-dark-light' : 'hover:bg-dark-light/50'
            }`}
            onClick={() => onNotificationClick(notification)}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                {renderIcon(notification.type)}
              </div>
              
              <Avatar className="h-10 w-10 mr-3">
                <img src={notification.userAvatar} alt={notification.userName} />
              </Avatar>
              
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline">
                  <span className="font-medium text-white mr-1">
                    {notification.userName}
                  </span>
                  <span className="text-gray-400">
                    {notification.content}
                  </span>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    {notification.timestamp}
                  </span>
                  
                  {!notification.read && (
                    <span className="h-2 w-2 bg-neon-blue rounded-full"></span>
                  )}
                </div>
                
                {notification.type === 'follow' && notification.actionable && (
                  <div className="mt-2 flex">
                    <Button
                      size="sm"
                      className="mr-2 bg-neon-blue hover:bg-neon-blue/80 text-xs px-3 py-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAcceptFollow(notification.id);
                      }}
                    >
                      <Check size={14} className="mr-1" />
                      Accepter
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-white border-gray-600 hover:bg-dark-light text-xs px-3 py-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        onAcceptFollow(notification.id); // On simplifie en utilisant la même fonction
                      }}
                    >
                      Ignorer
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default Notifications;
