import { useParams } from "react-router-dom";
import Header from "../../component/header/Header";

const Content = (): JSX.Element => {

    const {contentId} = useParams()
    return (
        <>
            <Header/>
            <h2>content ID : {contentId}</h2>
        </>
    );
}

export default Content;