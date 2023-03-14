import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthCredential } from "firebase/auth";
import { useState } from "react";
import { authResult, LoginInfoAtomType } from "../@types/global";
import { auth } from "../firebase"
import LoginInfoAtom from "../globalState/atoms/LoginInfo";
import AddLoginInfoSelector from "../globalState/selectors/AddLoginInfoSelector";
import { useRecoilValue, useSetRecoilState } from 'recoil';

export const useAuth = () => {
    const [userData, setUserData] = useState<authResult>({ isAuthenticated: false })
    const [email, setEmail] = useState("")
    const AddLoginInfo = useSetRecoilState(AddLoginInfoSelector)
    
    const login = async () => {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result) as OAuthCredential;
                const token = credential.accessToken;
                const user = result.user;
                const authedUserData  = {
                    isAuthenticated: true,
                    token: token,
                    user: user
                }
                const addLoginInfoData: LoginInfoAtomType = {
                    email: result.user.email || null,
                    name: result.user.displayName || null,
                    displayName: result.user.displayName || null,
                    photoURL: result.user.email || null,
                    emailVerified: result.user.emailVerified,
                    isAnonymous: result.user.isAnonymous,
                    phoneNumber: result.user.phoneNumber || null,
                    uid: result.user.uid || null
                }
                AddLoginInfo(addLoginInfoData)
                setUserData(authedUserData)
                console.log(authedUserData)
                if (result.user.email) {
                    setEmail(result.user.email)
                }
                
                return authedUserData
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                return {
                    isAuthenticated: false
                }
            });
    }

    return {
        isAuthenticated: false,
        userData,
        email,
        login
    };
}