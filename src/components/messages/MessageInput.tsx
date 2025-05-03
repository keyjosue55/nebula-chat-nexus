
import React, { useState, useRef } from 'react';
import { Send, Image, FileAudio, Video, Paperclip, Plus, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

interface MessageInputProps {
  onSendMessage: (message: string, type?: 'text' | 'image' | 'video' | 'audio' | 'document', mediaUrl?: string, fileName?: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'text' | 'image' | 'video' | 'audio' | 'document'>('text');
  const [fileName, setFileName] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleSend = () => {
    if ((mediaType === 'text' && !message.trim()) && !mediaPreview) return;
    
    if (mediaPreview) {
      onSendMessage(message, mediaType, mediaPreview, fileName || undefined);
    } else {
      onSendMessage(message);
    }
    
    setMessage('');
    setMediaPreview(null);
    setMediaType('text');
    setFileName(null);
  };

  const handleFileSelect = (type: 'image' | 'video' | 'audio' | 'document') => {
    if (fileInputRef.current) {
      setMediaType(type);
      fileInputRef.current.accept = type === 'image' ? 'image/*' : 
                                    type === 'video' ? 'video/*' : 
                                    type === 'audio' ? 'audio/*' : 
                                    'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (mediaType === 'image') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMediaPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // Pour les autres types, nous utilisons juste une URL fictive en simulation
      // Dans une vraie application, nous devrions télécharger le fichier et obtenir une URL
      setMediaPreview(`${mediaType}_url_${file.name}`);
      toast({
        title: "Fichier sélectionné",
        description: `${file.name} (Simulation)`
      });
    }
  };

  const clearMediaPreview = () => {
    setMediaPreview(null);
    setMediaType('text');
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="p-3 bg-dark-lighter border-t border-neon-blue/20">
      {mediaPreview && mediaType === 'image' && (
        <div className="mb-3 relative">
          <img 
            src={mediaPreview} 
            alt="Preview" 
            className="h-20 rounded-md object-contain bg-dark-light"
          />
          <button 
            className="absolute top-1 right-1 bg-dark/80 rounded-full p-1 text-white"
            onClick={clearMediaPreview}
          >
            <X size={16} />
          </button>
        </div>
      )}

      {mediaPreview && mediaType !== 'image' && (
        <div className="mb-3 p-2 bg-dark-light rounded-md flex items-center justify-between">
          <div className="flex items-center">
            {mediaType === 'video' && <Video size={16} className="text-neon-blue mr-2" />}
            {mediaType === 'audio' && <FileAudio size={16} className="text-neon-blue mr-2" />}
            {mediaType === 'document' && <Paperclip size={16} className="text-neon-blue mr-2" />}
            <span className="text-sm text-white truncate max-w-[200px]">{fileName}</span>
          </div>
          <button 
            className="ml-2 text-gray-400 hover:text-white"
            onClick={clearMediaPreview}
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              size="sm" 
              variant="ghost"
              className="text-neon-blue mr-2"
            >
              <Plus size={20} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-2 bg-dark-lighter">
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="ghost"
                className="text-neon-blue"
                onClick={() => handleFileSelect('image')}
              >
                <Image size={20} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-neon-blue"
                onClick={() => handleFileSelect('video')}
              >
                <Video size={20} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-neon-blue"
                onClick={() => handleFileSelect('audio')}
              >
                <FileAudio size={20} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost"
                className="text-neon-blue"
                onClick={() => handleFileSelect('document')}
              >
                <Paperclip size={20} />
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
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

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
        />
      </div>
    </div>
  );
};

export default MessageInput;
