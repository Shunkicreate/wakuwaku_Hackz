import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

const FaceDetector = ():JSX.Element => {
    const [expressions, setExpressions] = useState<Record<string, number>>({});
    // モデルの読み込みを待つ

    const [profileImage, setProfileImage] = useState<string>('default-profile.png');//ファイル名格納

    const detectExpressions = async (image: HTMLImageElement) => {
      try {
        const MODEL_URL = `${process.env.PUBLIC_URL}/models/`
        await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
        await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
        await faceapi.loadFaceExpressionModel(MODEL_URL);
        console.log(MODEL_URL)

        const detections = await faceapi.detectAllFaces(image, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();
        console.log("表示")
        console.log(detections)

        if (detections) {
          console.log("if文")
          const Array = Object.entries(detections[0].expressions);
          const scoresArray = Array.map((i) => i[1]);
          const expressionsArray = Array.map((i) => i[0]);
          const max = Math.max.apply(null, scoresArray);
          const index = scoresArray.findIndex((score) => score === max);
          const expression = expressionsArray[index];
          const expressionscore = scoresArray[index]*100
          const happyscore = scoresArray[1]*100
          console.log(Array)
          console.log(scoresArray)
          console.log(expressionsArray)
          console.log(expression)
          console.log(expressionscore)
          console.log(happyscore)
          
          if(expression === "happy"){
            console.log("Happyですね");

          }
          else{
            console.log("Happyじゃないですね");
          }
        }
      } catch (error) {
        console.log("エラー")
        console.error(error);
      }
  
      
    };
    const handleImageChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
      let imgElement = document.createElement('img');
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          imgElement.src = reader.result as string;
        }, false);
        reader.readAsDataURL(file);
      }
      console.log(imgElement)
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
            }}>
            <input type="file" style={{ display: "none", }} onChange={onFileInputChange} />
          </label>
        )
      }
      else {
        return (
          <div>
            <img
              src={profileImage}
              style={{
                width: "27vw",
                height: "27vw",
                marginLeft: "6vw",
                marginTop: "5vh",
                objectFit: "cover"
              }}
            />
          </div>
        )
      }
    }


  return (
    <div>
      <label htmlFor="imageUpload">Select an image:</label>
      <input type="file" id="imageUpload" accept="image/*" onChange={(event) =>handleImageChange(event)} />
      
    </div>
    
  );


}
export default FaceDetector;
