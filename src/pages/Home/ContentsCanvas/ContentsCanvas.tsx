import styled from "@emotion/styled";
import Matter from "matter-js";
import { useRef } from "react";

const ContentsCanvas = (): JSX.Element => {
  const boxRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  const engine = Engine.create();

  const render = Render.create({
    element: boxRef.current!,
    engine: engine,
    canvas: canvasRef.current!,
    options: {
      // width: window.innerWidth,
      // height: window.innerHeight,
      // background: "FFF",
      wireframeBackground: "#FFF",
      wireframes: false,
      showAngleIndicator: false,
    },
  });
  
  const ground = Bodies.rectangle(
    window.innerWidth / 2,
    window.innerHeight,
    window.innerWidth,
    60,
    {
      isStatic: true,
      render: {
        fillStyle: "#24292f",
      },
    }
  );

  const leftWall = Bodies.rectangle(
    -1,
    window.innerHeight / 2,
    2,
    window.innerHeight,
    {
      isStatic: true,
      friction: 0,
      render: {
        fillStyle: "#24292f",
      },
    }
  );

  const rightWall = Bodies.rectangle(
    window.innerWidth + 1,
    window.innerHeight / 2,
    2,
    window.innerHeight,
    {
      isStatic: true,
      friction: 0,
      render: {
        fillStyle: "#24292f",
      },
    }
  );

  let addContentes: Matter.Body[] = [ground, leftWall, rightWall];

  const MAX_QUANTITY = 100;
  const quantity = Math.floor(Math.random() * MAX_QUANTITY - 1) + 1;

  const BOX_WIDTH = 80;
  const BOX_HEIGHT = BOX_WIDTH;

  for (let i = 0; i < quantity; i++) {
    addContentes.push(
      Bodies.rectangle(
        Math.random() * (window.innerWidth - BOX_WIDTH - BOX_WIDTH) + BOX_WIDTH,
        (Math.random() * 200) - 500,
        BOX_WIDTH,
        BOX_HEIGHT,
        {
          angle: Math.random() * 45,
        }
      )
    );
  }

  Composite.add(engine.world, addContentes);
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  return (
    <CanvasAreaWrap ref={boxRef}>
      <CanvasArea ref={canvasRef} width={window.innerWidth} height={window.innerHeight} style={{position: "absolute"}} ></CanvasArea>
      <CanvasComment>
        ランダムで1〜{MAX_QUANTITY}個のブロックを落としているわよ
      </CanvasComment>
    </CanvasAreaWrap>
  );
};

const CanvasAreaWrap = styled.div`
  position: relative;
  margin-top: 64px;
  width: 100vw;
  height: 100vh;
  `;

  const CanvasArea = styled.canvas`
  postion: absolute;
  // top: ${window.innerHeight / 2}px;
  // left: 100px;
  top:0;
  left: 0;
  z-index: 10;
  `

const CanvasComment = styled.h2`
  position: absolute;
  color: #24292f;
  white-space: nowrap;
  top: ${window.innerHeight / 2}px;
  left: 100px;
  z-index: 10;
`;

export default ContentsCanvas;
