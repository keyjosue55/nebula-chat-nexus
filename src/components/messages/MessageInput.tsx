
import React, { useState } from 'react';
import { Send, Image, Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  
  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <div className="p-3 bg-dark-lighter border-t border-neon-blue/20 flex items-center">
      <Button 
        size="sm" 
        variant="ghost"
        className="text-neon-blue mr-1"
      >
        <Image size={20} />
      </Button>
      
      <Button 
        size="sm" 
        variant="ghost"
        className="text-neon-blue mr-2"
      >
        <Plus size={20} />
      </Button>
      
      <Input
        placeholder="Tapez votre message..."
        className="bg-dark-light border-neon-blue/20"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
      />
      
      <Button 
        className="ml-2 bg-neon-blue hover:bg-neon-blue/80"
        size="sm"
        onClick={handleSend}
      >
        <Send size={18} />
      </Button>
    </div>
  );
};

export default MessageInput;
