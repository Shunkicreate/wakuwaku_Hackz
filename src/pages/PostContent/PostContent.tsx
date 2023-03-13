import Header from "../../component/header/Header";
import { useNavigate } from 'react-router-dom';
import { Button, createMuiTheme, styled, TextField, useFormControl, withStyles } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import react, { useContext, useRef, useState } from "react"
import { grid, height, padding } from "@mui/system";
import { right } from "@popperjs/core";

const PostContent = (): JSX.Element => {

  const [check, setCheck] = useState(true);
  const [tittle, setTittle] = useState('');
  const [comment, setComment] = useState('');
  const [profileImage, setProfileImage] = useState('default-profile.png');

  const theme1 = createMuiTheme({
    palette: {
      primary: {
        main: "#95a5a6"
      },
    }
  });
  const theme2 = createMuiTheme({
    palette: {
      primary: {
        main: "#7f8c8d"
      },
    }
  });

  const checkFilled = (value: string) => {
    if (value == '') {
      setCheck(true);
    }
    else {
      setCheck(false);
    }
  }
  
  const inputFileRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();


  const SelectPhoto = () => {
    if(profileImage=='default-profile.png'){
      return(
        <label 
          style={{
            width: "31vw",
            height: "31vw",
            padding: "30vh",
            color: "#999999",
            backgroundColor: "#DDDDDD",
          }}>
          <input type="file" style={{display: "none", marginTop: "90vh",}} onChange={onFileInputChange}/>ファイルを選択
        </label>
      )
      // return(
      //   <>
      //     <button onClick={() => { navigate(`/content/${tittle}`) }}>ファイルを選択</button>
      //     <input type="file" style={{display: "none"}} onChange={onFileInputChange}/>ファイルを選択
      //   </>
      // )
    }
    else{
      return(
        <img
              src={profileImage}
              // className="h-32 w-32 rounded-full"
              style={{
                marginTop: "-40%",
                width: "31vw",
                height: "31vw",
                paddingLeft: "2vw",
                paddingRight: "2vw",
                objectFit: "cover"
              }}
            />
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

  return (
    <>
      <Header />
      <div
        style={{
          display: "grid",
          paddingLeft: "10vw",
          paddingRight: "10vw",
          gridTemplateColumns: "35vw 55vw",
          height: "100vh"
        }}
      >
        <div style={{height: "100%",paddingTop: "50%", textAlign: "center"}}>
          <SelectPhoto></SelectPhoto>
        </div>
        <div style={{height: "100%",paddingTop: "20%"}}>
          <div style={{ margin: "2%" }}>
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
                    setTittle(event.target.value);
                    checkFilled(event.target.value);
                  }}
                />
              </div>
              {/* commentテキストボックス */}
              <div>
                <TextField
                  id="outlined-basic"
                  label="comment"
                  variant="outlined"
                  multiline
                  minRows="7"
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
          <div style={{textAlign: "right", width: "40vw"}}>
            <ThemeProvider theme={theme2}>
              <Button variant="contained" size={"large"} disabled={check} style={{flexGrow: "1"}} onClick={() => { navigate(`/content/${tittle}`) }}>post</Button>
            </ThemeProvider>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostContent;