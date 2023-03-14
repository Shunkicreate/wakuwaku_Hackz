import { atom } from "recoil";
import { LoginInfoAtomType } from "../../@types/global";

const LoginInfoAtom = atom<LoginInfoAtomType>({
  key: "LoginInfoAtom",
  default: {
    email: null,
    name: null,
    displayName: null,
    photoURL: null,
    emailVerified: false,
    isAnonymous: true,
    phoneNumber: null,
    uid: null,
  },
});

export default LoginInfoAtom;
