import styled from "@emotion/styled";
import { FC } from "react";
import { position2D } from "../../../@types/global";

interface Props{
    diameter: string;
    position: position2D;
}

const ContentsCanvas: FC<Props> = ({ diameter, position }): JSX.Element => {
    
    return (
        <Content
            diameter = {diameter}
            position = {position}
        >
        </Content>
  );
}

const Content = styled.div<{
    diameter: string,
    position: position2D
}>`
    width:${({diameter}) => diameter };
    height:${({diameter}) => diameter };
    top:${({position}) => position.y }px;
    left:${({position}) => position.x }px;
    background-color: #f48080;
    border-radius: 50%;
    position: absolute;

`

export default ContentsCanvas;