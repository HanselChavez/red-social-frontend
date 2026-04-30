export interface User {
    id: number;
    email: string;
    role: string;
    profile: UserProfile;
}
export interface Post {
    id: number;
    content: string;
    createdAt: string;
    user: User;
}
export interface UserProfile {
    avatar: string;
    firstName: string;
    lastName: string;
    username: string;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}
