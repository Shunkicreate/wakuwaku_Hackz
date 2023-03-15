import styled from "@emotion/styled";
import Header from "../../component/header/Header";
import ContentsCanvas from "../../component/ContentsCanvas/ContentsCanvas";
import tree1 from "../../images/tree1.png"
import tree2 from "../../images/tree2.png"
import tree3 from "../../images/tree3.png"
import tree4 from "../../images/tree4.png"
import tree5 from "../../images/tree5.png"
import { useState } from "react";

const Home = (): JSX.Element => {
  const [tree, setTree] = useState<string>(tree4);
  
  return (
    <NewCanvasPage>
      <HeaderOuter>
        <Header />
      </HeaderOuter>
      <ContentsCanvas/>
      <BackGroundImage src={tree} />
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
  // background: linear-gradient(0deg, rgb(132,255,255),rgb(65,169,236));
  // background: linear-gradient(0deg, rgb(255,201,111), rgb(255,70,0));
  background: linear-gradient(0deg, rgb(74,148,218), rgb(108,73,210));
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -4;
`

export default Home;
