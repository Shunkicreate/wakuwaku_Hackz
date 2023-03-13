import styled from "@emotion/styled";
import Header from "../../component/header/Header";
import COntentsCanvas from "./ContentsCanvas/ContentsCanvas";

const Home = (): JSX.Element => {

    return (
        <NewCanvasPage>
          <HeaderOuter>
            <Header />
        </HeaderOuter>
        <COntentsCanvas/>
        </NewCanvasPage>
      );
    };
    
    const NewCanvasPage = styled.div`
      position: fixed;
    `;
    
    const HeaderOuter = styled.div`
      position: absolute;
      width: ${window.innerWidth}px;
      top: 0;
    `;

export default Home;