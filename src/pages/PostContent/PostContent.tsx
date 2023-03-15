import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress, createTheme, Stack, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import react, { useRef, useState, useEffect } from "react"
import FaceDetector from "../../function/Faceexpression"
import LoginInfoAtom from "../../globalState/atoms/LoginInfo";
import { useRecoilValue } from "recoil";
import { clientPost } from '../../@types/global';
import Header from '../../component/header/Header';
import styled from '@emotion/styled';

const PostContent = (): JSX.Element => {
  const [check, setCheck] = useState<boolean>(true);
  const [title, setTitle] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const [happy, setHappy] = useState<string>("----");
  const [color, setColor] = useState<string>("#999999");
  const [loading, setLoading] = useState<boolean>(false);
  const LoginInfo = useRecoilValue(LoginInfoAtom)
  const [profileImage, setProfileImage] = useState<string>('default-profile.png');
  

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

  const SelectPhoto = () => {
    if (profileImage === 'default-profile.png') {
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
            alt="画像をPost"
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

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setProfileImage(window.URL.createObjectURL(fileObject));
  };
const onClickAddScreen = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  if(!LoginInfo.uid){
    alert("ログインしてください！")
    return
  }
  const raw:clientPost = {
    // "img_url": profileImage,
    "title": title,
    "description": comment,
    "uid": LoginInfo.uid,
    "alt": "alttttttt",
    "happiness_rate": Number(happy)
  };
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(raw),
  };
  fetch("https://wakuwaku-backend.azurewebsites.net/create-post", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
  return (
    <div style={{
      height: "100%",
      display: "grid",
      gridTemplateColumns: "10vw 35vw 45vw 10vw",
      gridTemplateRows: "10vh 8vh 5vh 70vh 7vh",
      backgroundColor: "rgb(150,235,235)"
    }}>
      <HeaderOuter><Header></Header></HeaderOuter>
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
                label="title"
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
            <Button size={"large"} disabled={check} style={{ flexGrow: "1" }} onClick={onClickAddScreen} >post</Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

const HeaderOuter = styled.div`
  position: absolute;
  width: ${window.innerWidth}px;
  top: 0;
`;

export default PostContent;