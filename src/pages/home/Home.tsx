import styled from "@emotion/styled";
import Header from "../../component/header/Header";
import ContentsCanvas from "./ContentsCanvas/ContentsCanvas";

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
      <HeaderOuter>
        <Header />
      </HeaderOuter>
      <ContentsCanvas />
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
