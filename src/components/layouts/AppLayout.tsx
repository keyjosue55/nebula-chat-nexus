
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Users, Bell, User, Phone } from 'lucide-react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: '/messages', icon: MessageCircle, label: 'Messages' },
    { path: '/feed', icon: Users, label: 'Réseau' },
    { path: '/calls', icon: Phone, label: 'Appels' },
    { path: '/notifications', icon: Bell, label: 'Alertes' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-dark cyber-grid-bg">
      {/* Content Area */}
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {/* Navigation Bar - Fixed at Bottom for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-dark-lighter border-t border-neon-blue/30">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center px-2 py-1 ${
                isActivePath(item.path) 
                  ? 'text-neon-blue text-glow' 
                  : 'text-gray-400'
              }`}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
