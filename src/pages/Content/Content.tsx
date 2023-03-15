import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Header from "../../component/header/Header";
import { Button, CircularProgress, createTheme, IconButton, Stack, styled, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import react, { useRef, useState, useEffect } from "react"
import FaceDetector from "../../function/Faceexpression"
import { data } from "../../component/ContentsCanvas/dataUrl";

import { Post } from "../../@types/global";
import heart0 from "../../images/heart0.png";
import heart1 from "../../images/heart1.png";
import share from "../../images/share.png";


const Content = (): JSX.Element => {
  const [check, setCheck] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [heart, setHeart] = useState<boolean>(false);

  const [happy, setHappy] = useState<string>("----");
  const location = useLocation()
  const myRE =  /index=.*/;
  const path = myRE.exec(location.pathname)
  let index = 0
  if(path){
    index = Number(path[0].replace("index=", ""))
  }
  console.log(location, index)

  let testUser: Post = {
    post_id: 11,
    img_url: data(index),
    // img_url: "https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqG9dUxBZzDlI4sMQm3qrArYJAVN0KNV4ozNB_n8wwajJQkQ23GJiahCFg1WybqJ_vWY4RSWHm22bmRghKDLettLMsAcPkkKOmJQ5M4O55z8cBSrOIb74hC735APTQwch577nIGXvL5Xb3kBd306ZtJN8IdPg849LO5pfMhRBhNffSKcXX9ctHvjSbSRPnK9YZ26FGAa5hB3xlBz5e7alwoJjijGWsGGmrIz3ODGOMdnS6MbYSBASdUwqgAi6EtoXIYQ==/gahag-0052682376.jpg",
    title: "パンダさん",
    description: "パンダさんかわいいなあ",
    uid: 1,
    // user: User,
    alt: "",
    posted_at: 1567566215, //unix time
    modified_at: 2, //unix time
    happiness_rate: 97.1,
    deleted: true
  }

  let dateTime = new Date(testUser.posted_at===null?0:testUser.posted_at * 1000);
  // let dateTime = new Date(testUser.posted_at===null?0:Number((testUser.posted_at * 1000).toFixed(-1)));
  console.log(dateTime.toLocaleDateString());
  console.log(dateTime.toLocaleTimeString('ja-JP'));

  const theme1 = createTheme({
    palette: {
      primary: {
        main: "#95a5a6"
      },
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
    <div style={{
      height: "100%",
      display: "grid",
      gridTemplateColumns: "10vw 35vw 45vw 10vw",
      gridTemplateRows: "10vh 8vh 5vh 70vh 7vh",
      backgroundColor: "rgb(150,235,235)"
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
          marginTop: "7vh",
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
    </div>
  );
};

export default Content;