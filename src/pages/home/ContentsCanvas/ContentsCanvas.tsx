import { position2D } from "../../../@types/global";
import Repeat from "../../../function/Repeat";
import ContentElement from "./ContentElement";

const ContentsCanvas = (): JSX.Element => {
    let conetntDistribution:position2D[] = []

    const DIAMETER = '10em';
    //em to px ----------------
    const fontSize = getComputedStyle(document.documentElement).fontSize;
    const diameterPx = parseInt(DIAMETER) * parseFloat(fontSize);
    //-------------------------
    
    // const MAX_QUANTITY = 10;

    // const quantity = Math.floor(Math.random() * MAX_QUANTITY - 3) + 1;
    const quantity = 15;
    
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
                        delay = {Math.random()}
                    />
                    </div>
                }
            </Repeat>
    </>
  );
}

export default ContentsCanvas;