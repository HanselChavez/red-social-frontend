export interface User {
    id: number;
    email: string;
    role: string;
    profile: UserProfile;
}

/*Reaciones sobre post*/
export interface Comment {
    id: number;
    content: string;
    createdAt?: string;
}

export interface Reaction {
    id: number;
    type?: string;
}


export interface Post {
    id: number;
    content: string;
    createdAt: string;
    imageUrl?: string | null;
    user: User;


    comments?: Comment[];
    reactions?: Reaction[];
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
