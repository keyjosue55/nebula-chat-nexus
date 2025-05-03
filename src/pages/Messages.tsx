
import React from 'react';
import AppLayout from '@/components/layouts/AppLayout';
import ConversationList from '@/components/messages/ConversationList';
import MessageView from '@/components/messages/MessageView';
import { useMessages } from '@/hooks/useMessages';
import { User, Conversation } from '@/types/messages';

const Messages = () => {
  const {
    searchQuery,
    setSearchQuery,
    activeConversation,
    setActiveConversation,
    conversations,
    messages,
    handleSendMessage,
    user
  } = useMessages();

  return (
    <AppLayout>
      <div className="flex flex-col h-[calc(100vh-64px)]">
        <header className="px-4 py-3 bg-dark-lighter border-b border-neon-blue/20 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">Messages</h1>
          {user && (
            <div className="flex items-center">
              <span className="text-sm text-white mr-2">{user.name}</span>
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="h-6 w-6 rounded-full object-cover border border-neon-blue/30"
              />
            </div>
          )}
        </header>

        {!activeConversation ? (
          // View list of conversations
          <ConversationList 
            conversations={conversations}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectConversation={setActiveConversation}
          />
        ) : (
          // View active conversation
          <MessageView 
            activeConversation={activeConversation}
            conversations={conversations}
            messages={messages}
            onBack={() => setActiveConversation(null)}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Messages;
