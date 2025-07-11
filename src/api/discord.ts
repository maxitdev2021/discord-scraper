// Discord API service
import axios from 'axios'
// Define TypeScript interfaces based on the provided sample data
export interface Badge {
  id: string;
  description: string;
  icon: string;
  link?: string;
}

export interface ConnectedAccount {
  type: string;
  id: string;
  name: string;
  verified: boolean;
}

export interface UserProfile {
  bio: string | null;
  accent_color: string | null;
  pronouns: string | null;
}

export interface InnerUser {
  id: string;
  username: string;
  global_name?: string | null;
  avatar: string | null;
  avatar_decoration_data: any | null;
  discriminator: string;
  public_flags: number;
  primary_guild: any | null;
  clan: any | null;
  flags: number;
  banner: string | null;
  banner_color: string | null;
  accent_color: any | null;
  bio: string | null;
}

export interface DiscordUser {
  user: InnerUser;
  connected_accounts: ConnectedAccount[];
  premium_since: string | null;
  premium_type: number;
  premium_guild_since: string | null;
  profile_themes_experiment_bucket: number;
  user_profile: UserProfile;
  badges: Badge[];
  guild_badges: Badge[];
  mutual_guilds: { id: string; nick: string | null }[];
  legacy_username: string | null;
}
export interface UserDetails {
  user: InnerUser;
  connected_accounts: ConnectedAccount[];
  premium_since: string | null;
  premium_type: number;
  premium_guild_since: string | null;
  profile_themes_experiment_bucket: number;
  user_profile: UserProfile;
  badges: Badge[];
  guild_badges: Badge[];
  mutual_guilds: { id: string; nick: string | null }[];
  legacy_username: string | null;
}




// export interface UserDetails {
//   user: DiscordUser;
//   connected_accounts: ConnectedAccount[];
//   premium_since: string | null;
//   premium_type: number;
//   premium_guild_since: string | null;
//   profile_themes_experiment_bucket: number;
//   user_profile: UserProfile;
//   badges: Badge[];
//   guild_badges: any[];
//   mutual_guilds: MutualGuild[];
//   legacy_username: string | null;
// }

// Mock data for development purposes
// This would be replaced with actual API calls in production
// export const mockUsers: DiscordUser[] = [
//   {
//     id: "636370983460274219",
//     username: "sauain",
//     global_name: "Saurav Jain",
//     avatar: "6a6cb07c7deaace0278061593f8979c0",
//     avatar_decoration_data: null,
//     discriminator: "0",
//     public_flags: 64,
//     primary_guild: null,
//     clan: null,
//     flags: 64,
//     banner: null,
//     banner_color: null,
//     accent_color: null,
//     bio: "23 yo, Male, Indian \n\nDeveloper Community Manager"
//   },
//   {
//     id: "123456789012345678",
//     username: "johndoe",
//     global_name: "John Doe",
//     avatar: "5a7d8b6c9e0f1a2b3c4d5e6f7a8b9c0d",
//     avatar_decoration_data: null,
//     discriminator: "0",
//     public_flags: 0,
//     primary_guild: null,
//     clan: null,
//     flags: 0,
//     banner: null,
//     banner_color: null,
//     accent_color: null,
//     bio: null
//   },
//   {
//     id: "876543210987654321",
//     username: "janedoe",
//     global_name: "Jane Doe",
//     avatar: "1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d",
//     avatar_decoration_data: null,
//     discriminator: "0",
//     public_flags: 0,
//     primary_guild: null,
//     clan: null,
//     flags: 0,
//     banner: null,
//     banner_color: null,
//     accent_color: null,
//     bio: null
//   }
// ];

// export const mockUserDetails: UserDetails = {
//   user: {
//     id: "636370983460274219",
//     username: "sauain",
//     global_name: "Saurav Jain",
//     avatar: "6a6cb07c7deaace0278061593f8979c0",
//     avatar_decoration_data: null,
//     discriminator: "0",
//     public_flags: 64,
//     primary_guild: null,
//     clan: null,
//     flags: 64,
//     banner: null,
//     banner_color: null,
//     accent_color: null,
//     bio: "23 yo, Male, Indian \n\nDeveloper Community Manager"
//   },
//   connected_accounts: [
//     {
//       type: "spotify",
//       id: "31mqywy6cbgugrspa4oskq75an2u",
//       name: "Saurav Jain",
//       verified: true
//     },
//     {
//       type: "twitter",
//       id: "1401210504354304000",
//       name: "Sauain",
//       verified: true
//     },
//     {
//       type: "youtube",
//       id: "UCSHZW0jTfvy9uKiFZgPa3XA",
//       name: "Saurav Jain",
//       verified: true
//     }
//   ],
//   premium_since: null,
//   premium_type: 0,
//   premium_guild_since: null,
//   profile_themes_experiment_bucket: 4,
//   user_profile: {
//     bio: "23 yo, Male, Indian \n\nDeveloper Community Manager",
//     accent_color: null,
//     pronouns: "he/him"
//   },
//   badges: [
//     {
//       id: "hypesquad_house_1",
//       description: "HypeSquad Bravery",
//       icon: "8a88d63823d8a71cd5e390baa45efa02",
//       link: "https://discord.com/settings/hypesquad-online"
//     },
//     {
//       id: "legacy_username",
//       description: "Originally known as sauain#0354",
//       icon: "6de6d34650760ba5551a79732e98ed60"
//     }
//   ],
//   guild_badges: [],
//   mutual_guilds: [
//     {
//       id: "801163717915574323",
//       nick: null
//     }
//   ],
//   legacy_username: "sauain#0354"
// };

const  SERVER_URL = 'http://localhost:3000'
// In a real app, these would be actual API calls
// For now, we'll use mock data for demonstration
export async function fetchUsers(serverId: string,authKey: string): Promise<DiscordUser[]> {
  console.log(`Fetching users for server ID: ${serverId}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const res  = await axios.get(`${SERVER_URL}/members/${serverId}/${authKey}`);
  // In a real implementation, this would call the Discord API
  return res.data.members;
}

// export async function fetchUserDetails(userId: string): Promise<UserDetails> {
//   console.log(`Fetching details for user ID: ${userId}`);
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 500));
  
//   // In a real implementation, this would call the Discord API
//   return null;
// }