import LoginInfoAtom from "../atoms/LoginInfo";
import { LoginInfoAtomType } from "../../@types/global";
import { selector, DefaultValue } from "recoil";

const AddLoginInfoSelector = selector<LoginInfoAtomType>({
  key: "AddLoginInfoSelector",
  get: ({ get }) => {
    return get(LoginInfoAtom);
  },
  set: ({ get, set }, newLoginInfo) => {
    const defaultLoginInfo = get(LoginInfoAtom)
    const addLoginInfo: LoginInfoAtomType = {
      email: null,
      name: null,
      displayName: null,
      photoURL: null,
      emailVerified: false,
      isAnonymous: true,
      phoneNumber: null,
      uid: null,
    }
    if (!(newLoginInfo instanceof DefaultValue)) {
      debugger
    addLoginInfo.email = newLoginInfo.email || defaultLoginInfo.email;
    addLoginInfo.name = newLoginInfo.name || defaultLoginInfo.name;
    addLoginInfo.displayName = newLoginInfo.displayName || defaultLoginInfo.displayName;
    addLoginInfo.photoURL =
        newLoginInfo.photoURL || defaultLoginInfo.photoURL;
    addLoginInfo.emailVerified =
        newLoginInfo.emailVerified || defaultLoginInfo.emailVerified;
    addLoginInfo.isAnonymous =
        newLoginInfo.isAnonymous || defaultLoginInfo.isAnonymous;
    addLoginInfo.phoneNumber =
        newLoginInfo.phoneNumber || defaultLoginInfo.phoneNumber;
    addLoginInfo.uid = newLoginInfo.uid || defaultLoginInfo.uid;
      set(LoginInfoAtom, addLoginInfo);
    }
  },
});

export default AddLoginInfoSelector