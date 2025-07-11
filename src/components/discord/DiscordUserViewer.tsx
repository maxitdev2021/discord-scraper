import { useState } from "react";
import { DiscordUser, fetchUsers, UserDetails } from "@/api/discord";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserCard } from "./UserCard";
import { UserProfile } from "./UserProfile";
import { Search, Users, Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

export function DiscordUserViewer() {
  const [serverId, setServerId] = useState<string>("");
  const [authKey, setAuthKey] = useState<string>("");
  const [users, setUsers] = useState<DiscordUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleServerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serverId.trim() || !authKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a above info",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setSelectedUser(null);

    try {
      const fetchedUsers = await fetchUsers(serverId,authKey);
      setUsers(fetchedUsers);
      
      if (fetchedUsers.length === 0) {
        setError("No users found for this server.");
      }
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserClick = async (user: any) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log(user,11111111111111);
      
      // const userDetails = await fetchUserDetails(userId);
      setSelectedUser(user);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch user details. Please try again.",
        variant: "destructive",
      });
      console.error("Error fetching user details:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {!selectedUser ? (
        <>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Discord User Viewer</h1>
            <p className="text-muted-foreground">
              Enter a Discord server ID to view its members
            </p>
          </div>

          <form onSubmit={handleServerSubmit} className="mb-8">
            <div className="flex gap-2 w-full max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Enter Authentication key"
                value={authKey}
                onChange={(e) => setAuthKey(e.target.value)}
                className="flex-1"
              />
            </div>
             <div className="flex gap-2 w-full max-w-md mx-auto mb-1">
              <Input
                type="text"
                placeholder="Enter Discord server ID"
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader className="animate-spin h-4 w-4 mr-2" /> : <Search className="h-4 w-4 mr-2" />}
                Search
              </Button>
            </div>
          </form>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader className="animate-spin h-8 w-8 text-primary" />
              <span className="ml-2">Loading users...</span>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="max-w-md mx-auto">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : users.length > 0 ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Users in this server</h2>
                <span className="text-muted-foreground ml-2">({users.length})</span>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                {users.map((user) => (
                  <UserCard
                    key={user.user.id}
                    user={user}
                    onClick={() => handleUserClick(user)}
                  />
                ))}
              </div>
            </div>
          ) : serverId ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>No users found. Try a different server ID.</p>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Enter a server ID to see users</p>
            </div>
          )}
        </>
      ) : (
        <UserProfile userDetails={selectedUser} onBack={handleBackClick} />
      )}
    </div>
  );
}