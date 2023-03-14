import { User } from "firebase/auth";

export interface position2D {
    x: number;
    y: number;
}

export interface authResult {
    isAuthenticated: boolean;
    token?: string | undefined;
    user?: User;
}

export type LoginInfoAtomType = {
    email: string | null
    name: string | null
    displayName: string | null
    photoURL: string | null
    emailVerified: boolean
    isAnonymous: boolean
    phoneNumber: string | null
    uid: string | null
}

export interface clientPost {
    title: string | null,
    description: string | null,
    uid: string,
    alt: string | null,
    happiness_rate: number,
}
  
export interface clientUser {
    uid: string,
    user_name: string,
    profile_message: string | null
}