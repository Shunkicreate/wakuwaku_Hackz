import styled from "@emotion/styled";
import Header from "../../component/header/Header";
import ContentsCanvas from "../../component/ContentsCanvas/ContentsCanvas";
import backgroundImage from "../../images/tree2.png"

const Home = (): JSX.Element => {
  return (
    <NewCanvasPage>
      <HeaderOuter>
        <Header />
      </HeaderOuter>
      <ContentsCanvas/>
      <BackGroundImage src={backgroundImage} />
      <BackGroundMat />
    </NewCanvasPage>
  );
};

const NewCanvasPage = styled.div`
  position: fixed;
`

const HeaderOuter = styled.div`
  position: absolute;
  width: ${window.innerWidth}px;
  top: 0;
`

const BackGroundImage = styled.img`
  position: absolute;
  z-index: -3;
  width: ${window.innerWidth}px;
`

const BackGroundMat = styled.div`
  background-color: #adfcff;
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -4;
`

export default Home;
