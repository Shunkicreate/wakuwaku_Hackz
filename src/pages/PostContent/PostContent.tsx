import { useNavigate } from 'react-router-dom';
import { Button, createMuiTheme, styled, TextField } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import react, { useRef, useState } from "react"

const PostContent = (): JSX.Element => {

  const [check, setCheck] = useState(true);
  const [tittle, setTittle] = useState('');
  const [comment, setComment] = useState('');
  const [profileImage, setProfileImage] = useState('default-profile.png');

  const [happy, setHappy] = useState<number>();
  // const [happy, setHappy] = useState<number>(97.0);

  const theme1 = createMuiTheme({
    palette: {
      primary: {
        main: "#95a5a6"
      },
    },
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

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setProfileImage(window.URL.createObjectURL(fileObject));
  };

  return (
    <div style={{
      height: "100%",
      display: "grid",
      gridTemplateColumns: "10vw 35vw 45vw 10vw",
      gridTemplateRows: "10vh 10vh 70vh 10vh",
      backgroundColor: "rgb(150,235,235)"
    }}>
      <div style={{
        gridColumn: "2/4",
        gridRow: "2/4",
        margin: "-5vh",
        backgroundColor: "rgba(255,255,255,0.8)"
      }}>

      </div>
      <div style={{
        gridColumn: "2/4",
        gridRow: "2/3",
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
          gridRow: "3/4",
        }}>
        <SelectPhoto></SelectPhoto>
      </div>
      <div style={{ gridColumn: "3/4", gridRow: "3/4", }}>
        <div style={{ margin: "2%" }}>
          {/* 幸せ度表示 */}
          <div style={{ fontSize: "5vh", margin: "3vh", marginBottom: "3vh", marginTop: "7vh", gridColumn: "2/3", gridRow: "3/4", }}>
            Happiness {happy === 0 ? happy.toFixed(1) : "----"}
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
                  setTittle(event.target.value);
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
            <Button variant="contained" size={"large"} disabled={check} style={{ flexGrow: "1" }} onClick={() => { navigate(`/content/${tittle}`) }}>post</Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default PostContent;