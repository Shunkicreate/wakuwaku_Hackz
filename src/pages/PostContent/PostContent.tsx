import React, { useRef, useEffect, useState } from 'react';
import Header from "../../component/header/Header";
import FaceDetector from "../../function/Faceexpression"

const PostContent = (): JSX.Element => {
  return (
    <>
      <Header />
      <h2>This is Post Page</h2>
      <FaceDetector />
    </>

  );
};

export default PostContent;
