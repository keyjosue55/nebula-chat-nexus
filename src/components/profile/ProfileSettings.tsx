
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { LogOut, Bell } from "lucide-react";

interface ProfileSettingsProps {
  notificationsEnabled: boolean;
  isDarkMode: boolean;
  soundEnabled: boolean;
  handleToggleSetting: (
    setting: "notifications" | "darkMode" | "sound",
    newValue: boolean
  ) => void;
  handleLogout: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  notificationsEnabled,
  isDarkMode,
  soundEnabled,
  handleToggleSetting,
  handleLogout,
}) => {
  return (
    <div className="mt-8 px-6">
      <h3 className="text-lg font-semibold text-white mb-4">Paramètres</h3>

      <div className="space-y-4 glass-panel p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Bell size={20} className="text-neon-orange mr-3" />
            <div>
              <p className="text-white">Notifications</p>
              <p className="text-xs text-gray-400">
                Recevoir des alertes pour les nouveaux messages
              </p>
            </div>
          </div>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={(checked) =>
              handleToggleSetting("notifications", checked)
            }
            className="data-[state=checked]:bg-neon-orange"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-neon-orange mr-3">
              {isDarkMode ? "🌙" : "☀️"}
            </div>
            <div>
              <p className="text-white">Mode sombre</p>
              <p className="text-xs text-gray-400">
                Changer l'apparence de l'application
              </p>
            </div>
          </div>
          <Switch
            checked={isDarkMode}
            onCheckedChange={(checked) =>
              handleToggleSetting("darkMode", checked)
            }
            className="data-[state=checked]:bg-neon-orange"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-neon-orange mr-3">🔊</div>
            <div>
              <p className="text-white">Sons</p>
              <p className="text-xs text-gray-400">
                Activer les sons de notification
              </p>
            </div>
          </div>
          <Switch
            checked={soundEnabled}
            onCheckedChange={(checked) =>
              handleToggleSetting("sound", checked)
            }
            className="data-[state=checked]:bg-neon-orange"
          />
        </div>
      </div>

      <div className="mt-8 mb-6">
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;
