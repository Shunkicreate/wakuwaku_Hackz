import styled from "@emotion/styled";
import { FC, useRef } from "react";
import { position2D } from "../../@types/global";
import Repeat from "../../function/Repeat";
import ContentElement from "./ContentElement";
import { data } from "./dataUrl";

interface Props{
    canvasWidth?: number;
    canvasHeight?: number;
}

const ContentsCanvas:FC<Props> = ({ canvasWidth, canvasHeight}): JSX.Element => {
    
    let conetntDistribution: position2D[] = []
    const DIAMETER = '10em';
    //em to px ----------------
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    const diameterPx = parseInt(DIAMETER) * parseFloat(fontSize);
    //-------------------------

    const canvasSize = (!canvasWidth || !canvasHeight) ? 
        window.innerWidth * window.innerHeight
        : canvasWidth * canvasHeight

    const quantity = Math.floor(canvasSize / (diameterPx * diameterPx) / 4);
    
    const positionHandler = (): position2D => {

        const maxTop = 100;
        const maxBottom = window.innerHeight - 100 - diameterPx;
        const maxLeft = 100;
        const maxRight = window.innerWidth - 100 - diameterPx;

        const checkBooking = (position:position2D):boolean => {

            for (let i = 0; i < conetntDistribution.length; i++) {
                const betweenTwoPoints = Math.sqrt((position.x - conetntDistribution[i].x ) ** 2 + (position.y - conetntDistribution[i].y ) ** 2);
                if (betweenTwoPoints - 10 < diameterPx) {
                    return true
                }
            }
            return false
        }
        
        let position = { x: 0, y: 0 }
        
        while (1) {
            const x = Math.random() * (maxRight - maxLeft) + maxLeft;
            const y = Math.random() * (maxBottom - maxTop) + maxTop;
            position = { x: x, y: y }
            if (!checkBooking(position)) {
                break
            }
        }

        conetntDistribution.push(position)
        return position
    }

    return (
        <>
          <Repeat numTimes={quantity}>
                {(index: number) => <div key={index}>
                    <ContentElement
                        diameter = {DIAMETER}
                        position = {positionHandler()}
                        delay={Math.random()}
                        // imageUrl={data(index).img_url}
                        imageUrl={data(index)}
                        index={index}
                    />
                    </div>
                }
            </Repeat>
    </>
  );
}

export default ContentsCanvas;