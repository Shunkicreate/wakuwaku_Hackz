import styled from "@emotion/styled";
import Header from "../../component/header/Header";
import ContentsCanvas from "./ContentsCanvas/ContentsCanvas";
import BackGround from "../../component/backGround/BackGround";
//フォルダ名タイポしてた
const Home = (): JSX.Element => {
  const disallowScrolling = (event: Event) => {
    event.preventDefault();
  };

  document.addEventListener("touchmove", disallowScrolling, { passive: false });
  document.addEventListener("mousewheel", disallowScrolling, {
    passive: false,
  });

  return (
    <HomePage>
      <BackGround>
        <HeaderOuter>
          <Header />
        </HeaderOuter>
        <ContentsCanvas />
      </BackGround>
    </HomePage>
  );
};

const HomePage = styled.div`
  position: fixed;
`;

const HeaderOuter = styled.div`
  position: absolute;
  width: ${window.innerWidth}px;
  top: 0;
`;

export default Home;
