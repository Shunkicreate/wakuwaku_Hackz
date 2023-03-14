import { useNavigate } from 'react-router-dom';
import Header from "../../component/header/Header";
import { Button, CircularProgress, createTheme, Stack, styled, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import react, { useRef, useState, useEffect } from "react"
import FaceDetector from "../../function/Faceexpression"

const PostContent = (): JSX.Element => {
  const [check, setCheck] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [happy, setHappy] = useState<string>("----");
  const [color, setColor] = useState<string>("#999999");

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

  useEffect(
    () => {
      checkFilled(title);
    },
    [happy]
  );

  const checkFilled = (value: string) => {
    if (value == '' || happy == "Happyじゃありませんでした" || happy == "----" || happy == "エラーが発生しました" || happy == "loading") {
      setCheck(true);
    }
    else {
      setCheck(false);
    }
  }

  const inputFileRef = useRef<HTMLInputElement>(null);

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
        borderBottom: "3px solid"
      }}>
        新規投稿
      </div>
      <div
        style={{
          gridColumn: "2/3",
          gridRow: "4/5",
          marginTop: "7vh"
        }}>
        {/* <SelectPhoto></SelectPhoto> */}
        <FaceDetector happy={happy} setHappy={setHappy} color={color} setColor={setColor}></FaceDetector>
      </div>
      <div style={{ gridColumn: "2/4", gridRow: "4/5", margin: "0 auto", paddingTop: "20vh" }}>
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
          <CircularProgress size={100} color="inherit" style={{ display: happy === "loading" ? "" : "none" }}></CircularProgress>
        </Stack>
      </div>
      <div style={{ gridColumn: "3/4", gridRow: "3/5", textAlign: "center" }}>
        <div style={{ margin: "2%" }}>
          {/* 幸せ度表示 */}
          <div style={{ fontSize: "5vh", margin: "3vh", marginBottom: "3vh", marginTop: "13vh", gridColumn: "2/3", gridRow: "3/4", color: color }}>
            {happy}
          </div>
          <ThemeProvider theme={theme1}>

            {/* titleテキストボックス */}
            <div>
              <TextField
                id="outlined-basic"
                label="title" variant="outlined"
                style={{
                  width: "40vw",
                  marginBottom: "4%"
                }}
                onChange={(event) => {
                  setTitle(event.target.value);
                  checkFilled(event.target.value);
                }}
              />
            </div>
            {/* commentテキストボックス */}
            <div>
              <TextField
                size="small"
                id="outlined-basic"
                label="comment"
                variant="outlined"
                multiline
                minRows="6"
                style={{
                  width: "40vw",
                }}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
              />
            </div>
          </ThemeProvider>
        </div>
        {/* 投稿ボタン */}
        <div style={{ textAlign: "right", width: "40vw" }}>
          <ThemeProvider theme={theme2}>
            <Button variant="contained" size={"large"} disabled={check} style={{ flexGrow: "1" }} onClick={() => { navigate(`/content/${title}`) }}>post</Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default PostContent;