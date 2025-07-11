import { DiscordUser } from "@/api/discord";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface UserCardProps {
  user: DiscordUser;
  onClick: () => void;
}

export function UserCard({ user, onClick }: UserCardProps) {
  const avatarUrl = user.user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.user.id}/${user.user.avatar}.png`
    : null;

  return (
    <Card 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow" 
      onClick={onClick}
    >
      <CardContent className="p-4 flex items-center gap-4">
        {avatarUrl ? (
          <img 
            src={avatarUrl}
            alt={user.user.username}
            className="rounded-full w-12 h-12 object-cover"
          />
        ) : (
          <div className="rounded-full w-12 h-12 bg-secondary flex items-center justify-center">
            <User className="w-6 h-6 text-muted-foreground" />
          </div>
        )}
        <div>
          <h3 className="font-semibold text-lg">{user.user.global_name || user.user.username}</h3>
          <p className="text-sm text-muted-foreground">@{user.user.username}</p>
        </div>
      </CardContent>
    </Card>
  );
}