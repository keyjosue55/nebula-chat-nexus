
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { CurrentUser } from "@/types/messages";

interface ProfileHeaderProps {
  user: CurrentUser;
  handleAvatarChange: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  handleAvatarChange,
  fileInputRef,
  handleFileChange,
}) => {
  return (
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
  );
};

export default ProfileHeader;
