import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import background from "../images/photoBox.jpg";

const FaceDetector = ({happy,setHappy,color,setColor}:{happy:string, setHappy:React.Dispatch<React.SetStateAction<string>>,color:string, setColor:React.Dispatch<React.SetStateAction<string>>}):JSX.Element => {
    const [expressions, setExpressions] = useState<Record<string, number>>({});
    // モデルの読み込みを待つ

    const [profileImage, setProfileImage] = useState<string>('default-profile.png');//ファイル名格納

    const detectExpressions = async (image: HTMLImageElement) => {
      try {
        const MODEL_URL = `${process.env.PUBLIC_URL}/models/`
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceExpressionModel(MODEL_URL);

        const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections) {
          const Array = Object.entries(detections[0].expressions);
          const scoresArray = Array.map((i) => i[1]);
          const expressionsArray = Array.map((i) => i[0]);
          const max = Math.max.apply(null, scoresArray);
          const index = scoresArray.findIndex((score) => score === max);
          const expression = expressionsArray[index];
          const expressionscore = scoresArray[index]*100
          const happyscore = scoresArray[1]*100
          if(expression === "happy"){
            setHappy("Happy! "+happyscore.toFixed(1)+"%");
            setColor("#f39c12");
          }
          else{
            setHappy("Happyじゃありませんでした");
            setColor("blue");
          }
        }
      } catch (error) {
        setHappy("エラーが発生しました");
        setColor("#c0392b");
      }
  
      
    };
    const handleImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
      setHappy("loading");
      setColor("#999999");
      let imgElement = document.createElement('img');
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          imgElement.src = reader.result as string;
        }, false);
        reader.readAsDataURL(file);
      } 
      if(file!=undefined)
        setProfileImage(window.URL.createObjectURL(file));
      detectExpressions(imgElement)
    };



    
    const SelectPhoto = () => {
      if (profileImage == 'default-profile.png') {
        return (
          <label
            style={{
              display: "block",
              float: "left",
              width: "27vw",
              height: "27vw",
              color: "#999999",
              marginLeft: "6vw",
              marginTop: "5vh",
              backgroundColor: "#DDDDDD",
              backgroundSize: "contain",
              backgroundImage: `url(${background})`,
            }}>
            <input style={{ display: "none", }} type="file" id="imageUpload" accept="image/*" onChange={(event) =>handleImageChange(event)} />
          </label>
        )
      }
      else {
        return (
          // <div>
          //   <img
          //     src={profileImage}
          //     style={{
          //       width: "27vw",
          //       height: "27vw",
          //       marginLeft: "6vw",
          //       marginTop: "5vh",
          //       objectFit: "cover"
          //     }}
              
          //   />
          // </div>
          <label
          style={{
            display: "block",
            float: "left",
            width: "27vw",
            height: "27vw",
            marginLeft: "6vw",
            marginTop: "5vh",
            backgroundPosition:"center center",
            backgroundSize: "cover",
            backgroundColor: "#DDDDDD",
            backgroundImage: `url(${profileImage})`,
          }}>
          <input style={{ display: "none", }} type="file" id="imageUpload" accept="image/*" onChange={(event) =>handleImageChange(event)} />
        </label>
        );
      }
    }


  return (
    <div>
      <SelectPhoto></SelectPhoto>
    </div>
    
  );


}
export default FaceDetector;
