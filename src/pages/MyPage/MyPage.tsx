import Header from "../../component/header/Header";
import { useRecoilValue } from "recoil";
import LoginInfoAtom from "../../globalState/atoms/LoginInfo";

const MyPage = (): JSX.Element => {
  const LoginInfo = useRecoilValue(LoginInfoAtom)

  return (
    <>
      <Header></Header>
      <h2>This is My Page</h2>
      <div>
        email: {LoginInfo.email}<br/>
        display name: {LoginInfo.displayName}
      </div>
    </>
  );
};

export default MyPage;