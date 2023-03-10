import styled from "@emotion/styled";
import Matter from "matter-js";

const ContentsCanvas = (): JSX.Element => {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

  const engine = Engine.create();

  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      background: "FFF",
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

  let addContentes:Matter.Body[] = [ground, leftWall, rightWall];

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
          angle: Math.random()*45,
        }
      )
    );
  }

  Composite.add(engine.world, addContentes);
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);

  return (
    <CanvasArea>
      ランダムで1〜{MAX_QUANTITY}個のブロックを落としているわよ
    </CanvasArea>
  );
};

const CanvasArea = styled.h2`
  position: absolute;
  color: #24292f;
  white-space: nowrap;
  top: ${window.innerHeight / 2}px;
  left: 100px;
`;

export default ContentsCanvas;
