import { DiscordUser, UserDetails } from "@/api/discord";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft, Music, Twitter, Youtube } from "lucide-react";

interface UserProfileProps {
  userDetails: DiscordUser;
  onBack: () => void;
}

export function UserProfile({ userDetails, onBack }: UserProfileProps) {
  
  const { user, connected_accounts, badges, user_profile } = userDetails;
  console.log(user, connected_accounts, badges, user_profile,'userDetailsuserDetailsuserDetails');
  
  const avatarUrl = user.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : null;

  const getAccountIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'spotify':
        return <Music className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        className="mb-6" 
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 w-4 h-4" /> Back to list
      </Button>
      
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600"></div>
        <CardContent className="pt-0 relative">
          <div className="absolute -top-16 left-6">
            {avatarUrl ? (
              <img 
                src={avatarUrl}
                alt={user.username}
                className="rounded-full w-32 h-32 border-4 border-background"
              />
            ) : (
              <div className="rounded-full w-32 h-32 bg-secondary border-4 border-background flex items-center justify-center">
                <User className="w-16 h-16 text-muted-foreground" />
              </div>
            )}
          </div>
          
          <div className="pt-16">
            <h1 className="text-2xl font-bold">{user.global_name || user.username}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            
            {user_profile.pronouns && (
              <Badge variant="outline" className="mt-2">{user_profile.pronouns}</Badge>
            )}
            
            {user_profile.bio && (
              <div className="mt-4">
                <p className="whitespace-pre-line">{user_profile.bio}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      {connected_accounts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {connected_accounts.map((account) => (
                <div key={`${account.type}-${account.id}`} className="flex items-center gap-2">
                  {getAccountIcon(account.type)}
                  <span className="font-medium">{account.type}</span>
                  <span className="text-muted-foreground">{account.name}</span>
                  {account.verified && (
                    <Badge variant="secondary" className="ml-auto">Verified</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {badges.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {badges.map((badge) => (
                <div key={badge.id} className="flex items-start gap-3">
                  {badge.icon && (
                    <img 
                      src={`https://cdn.discordapp.com/badge-icons/${badge.icon}.png`} 
                      alt={badge.description}
                      className="w-6 h-6"
                    />
                  )}
                  <div>
                    <p className="font-medium">{badge.description}</p>
                    {badge.link && (
                      <a 
                        href={badge.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-sm text-blue-500 hover:underline"
                      >
                        More info
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}