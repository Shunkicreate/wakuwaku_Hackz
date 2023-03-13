import Header from "../../component/header/Header";
import { useNavigate } from 'react-router-dom';
import { Button, createMuiTheme, styled, TextField, useFormControl, withStyles } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import react, { useContext, useState } from "react"

const PostContent = (): JSX.Element => {

  const [check, setCheck] = useState(true);
  const [tittle, setTittle] = useState('');
  const [comment, setComment] = useState('');

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

  const navigate = useNavigate();

  return (
    <>
      <Header />
      {/* <div> */}
      <div style={{ margin: "2%" }}>
        <ThemeProvider theme={theme1}>
          <div>
            <TextField
              id="outlined-basic"
              label="tittle" variant="outlined"
              style={{
                width: "50%",
                marginBottom: "2%"
              }}
              onChange={(event) => {
                setTittle(event.target.value);
                checkFilled(event.target.value);
              }} />
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="comment"
              variant="outlined"
              multiline
              minRows="10"
              style={{
                width: "50%",
              }}
              onChange={(event) => {
                setComment(event.target.value);
              }}
            />
          </div>
        </ThemeProvider>
      </div>
      <ThemeProvider theme={theme2}>
        <Button variant="contained" disabled={check} onClick={() => { navigate(`/content/${tittle}`) }}>post</Button>
      </ThemeProvider>
    </>
  );
};

export default PostContent;