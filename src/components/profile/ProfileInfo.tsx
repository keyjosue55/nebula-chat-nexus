
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { CurrentUser } from "@/types/messages";

interface ProfileInfoProps {
  user: CurrentUser;
  onEditClick: () => void;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ user, onEditClick }) => {
  return (
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
        onClick={onEditClick}
      >
        <Edit size={16} className="mr-2 text-neon-orange" />
        Modifier le profil
      </Button>
    </div>
  );
};

export default ProfileInfo;
