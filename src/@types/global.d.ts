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