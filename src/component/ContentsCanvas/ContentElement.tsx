import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { FC } from "react";
import { Link } from "react-router-dom";
import { position2D } from "../../@types/global";

interface Props {
    diameter: string;
    position: position2D;
    delay: number;
    imageUrl:string;
    index: number
}

const ContentsElement: FC<Props> = ({ diameter, position, delay,imageUrl,index }): JSX.Element => {
    
    return (
        <Link to={`content/${index}`}>
            <Content
                diameter={diameter}
                position={position}
                delay={delay}
            >
                <ContentInner>
                    <ImageBox
                        src={imageUrl}
                        diameter={diameter}
                    />
                </ContentInner>
            </Content>
        </Link>
    );
}

const fadeIn = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`

const Content = styled.div<{
    diameter: string,
    position: position2D,
    delay: number
}>`
    width:${({ diameter }) => diameter};
    height:${({ diameter }) => diameter};
    top:${({ position }) => position.y}px;
    left:${({ position }) => position.x}px;
    background-color: transparent;
    border-radius: 50%;
    position: absolute;
    animation: ${fadeIn} 2.5s infinite;
    animation-delay: ${({ delay }) => delay}s;
    `

const ContentInner = styled.div`
    overflow: hidden;
    border-radius: 50%;
    filter: drop-shadow(0 0 10px black);
    &:hover{
        transform:scale(1.1);
    }
`

const ImageBox = styled.img<{
    diameter: string,
}>`
    height:${({ diameter }) => diameter};
    width:${({ diameter }) => diameter};
    object-fit: cover;
`

export default ContentElement;
