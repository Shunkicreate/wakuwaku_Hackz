import styled from "@emotion/styled";
import ContentsCanvas from "./ContentsCanvas/ContentsCanvas";

const Home = (): JSX.Element => {
  const disallowScrolling = (event: Event) => {
    event.preventDefault();
  };

  document.addEventListener("touchmove", disallowScrolling, { passive: false });
  document.addEventListener("mousewheel", disallowScrolling, {
    passive: false,
  });

  return (
    <>
      <ContentsCanvas />
    </>
  );
};

export default Home;
