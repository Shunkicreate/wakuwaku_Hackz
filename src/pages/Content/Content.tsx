import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../../component/header/Header";
import { Button, CircularProgress, createTheme, IconButton, Stack, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import react, { useRef, useState, useEffect } from "react"
import FaceDetector from "../../function/Faceexpression"
import { Post } from "../../@types/global";
import heart0 from "../../images/heart0.png";
import heart1 from "../../images/heart1.png";
import share from "../../images/share.png";
import tree1 from "../../images/tree1.png"
import tree2 from "../../images/tree2.png"
import tree3 from "../../images/tree3.png"
import tree4 from "../../images/tree4.png"
import tree5 from "../../images/tree5.png"
import styled from "@emotion/styled";
import { data } from "../../component/ContentsCanvas/dataUrl"


const Content = (): JSX.Element => {
  const [tree, setTree] = useState<string>(tree3);
  const [check, setCheck] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [heart, setHeart] = useState<boolean>(false);

  const [happy, setHappy] = useState<string>("----");

  const {contentId} = useParams()

  let testUser: Post = {
    post_id: data(Number(contentId)).post_id,
    img_url: data(Number(contentId)).img_url,
    title: data(Number(contentId)).title,
    description: data(Number(contentId)).description,
    uid: data(Number(contentId)).uid,
    // user: User,
    alt: data(Number(contentId)).alt,
    posted_at: data(Number(contentId)).posted_at, //unix time
    modified_at: data(Number(contentId)).modified_at, //unix time
    happiness_rate: data(Number(contentId)).happiness_rate,
    deleted: data(Number(contentId)).deleted,
  }

  let dateTime = new Date(testUser.posted_at===null?0:testUser.posted_at * 1000);
  // let dateTime = new Date(testUser.posted_at===null?0:Number((testUser.posted_at * 1000).toFixed(-1)));
  console.log(dateTime.toLocaleDateString());
  console.log(dateTime.toLocaleTimeString('ja-JP'));

  const theme1 = createTheme({
    palette: {
      primary: {
        main: "#95a5a6",
        light: "white",
      },
      // neutral: {
      //   main: "#999000",
      //   contrastText: "#fff000",
      // },
    },
  });
  const theme2 = createTheme({
    palette: {
      primary: {
        main: "#7f8c8d"
      },
    }
  });

  const navigate = useNavigate();

  return (
    <NewCanvasPage>
      <div style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "10vw 35vw 45vw 10vw",
        gridTemplateRows: "10vh 8vh 5vh 70vh 7vh",
      }}>
        <div style={{
          gridColumn: "1/5",
        }}>
          <Header></Header>
        </div>
        <div style={{
          gridColumn: "2/4",
          gridRow: "3/5",
          margin: "-2vh",
          marginLeft: "-4vh",
          marginRight: "-4vh",
          backgroundColor: "rgba(255,255,255,0.8)"
        }}>

        </div>
        <div style={{
          gridColumn: "2/4",
          gridRow: "3/4",
          marginTop: "auto",
          textAlign: "left",
          fontSize: "30px",
          color: "#999999",
          borderColor: "black",
        }}>
        </div>
        <div
          style={{
            gridColumn: "2/3",
            gridRow: "4/5",
            marginTop: "1vh",
          }}>
          <img
            src={testUser.img_url}
            style={{
              width: "25vw",
              height: "25vw",
              marginBottom: "2vh",
              marginLeft: "8vw",
              objectFit: "cover",
              backgroundPosition: "center center",
            }}
          />
          <img
            src={heart?heart1:heart0}
            onClick={()=>setHeart(heart?false:true)}
            style={{
              width: "3vw",
              height: "3vw",
              marginLeft: "9vw",
              objectFit: "cover",
              backgroundPosition: "center center",
            }}
          />
          <img
            src={share}
            style={{
              width: "3vw",
              height: "3vw",
              marginLeft: "1vw",
              objectFit: "cover",
              backgroundPosition: "center center",
            }}
          />
          <text style={{marginLeft:"1vw"}}>
            {dateTime.toLocaleDateString()+" "+dateTime.toLocaleTimeString('ja-JP')}
          </text>
        </div>
        <div style={{ gridColumn: "2/4", gridRow: "4/5", margin: "0 auto", paddingTop: "20vh" }}>
          <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress size={100} color="inherit" style={{ display: happy === "loading" ? "" : "none" }}></CircularProgress>
          </Stack>
        </div>
        <div style={{ gridColumn: "3/4", gridRow: "3/5", textAlign: "center" }}>
          <div style={{ }}>
            {/* 幸せ度表示 */}
            <div style={{ fontSize: "5vh", margin: "3vh", marginBottom: "5vh", marginTop: "7vh", gridColumn: "2/3", gridRow: "3/4", color: "#f39c12",}}>
              {"Happy! " + testUser.happiness_rate + "%"}
            </div>
          </div>
          <div style={{
            gridColumn: "2/4",
            gridRow: "3/4",
            marginLeft: "2vw",
            marginRight: "5vw",
            marginTop: "auto",
            textAlign: "left",
            fontSize: "30px",
            color: "#999999",
            borderColor: "black",
            borderBottom: "3px solid"
          }}>
            {testUser.title}
          </div>
          <div style={{
            gridColumn: "2/4",
            gridRow: "3/4",
            height: "30vh",
            padding: "2vh",
            marginLeft: "2vw",
            marginRight: "5vw",
            marginTop: "2vw",
            textAlign: "left",
            fontSize: "20px",
            color: "#999999",
            backgroundColor: "rgba(200,200,200,0.3)",
          }}>
            {testUser.description}
          </div>
        </div>
        <BackGroundImage src={tree} />
        <BackGroundMat />
      </div>
    </NewCanvasPage>
  );
};

const NewCanvasPage = styled.div`
  position: fixed;
`

const BackGroundImage = styled.img`
  position: absolute;
  z-index: -3;
  width: ${window.innerWidth}px;
`

const BackGroundMat = styled.div`
  // background: linear-gradient(0deg, rgb(132,255,255),rgb(65,169,236));
  background: linear-gradient(0deg, rgb(255,201,111), rgb(255,70,0));
  // background: linear-gradient(0deg, rgb(74,148,218), rgb(108,73,210));
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: -4;
`

export default Content;