import { useParams } from "react-router-dom";

const Content = (): JSX.Element => {

    const {contentId} = useParams()
    return (
        <>
            <h2>content ID : {contentId}</h2>
        </>
    );
}

export default Content;