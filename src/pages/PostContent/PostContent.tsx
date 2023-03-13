import Header from "../../component/header/Header";
import { useNavigate } from 'react-router-dom';
import { styled, TextField, withStyles } from "@mui/material";

const PostContent = (): JSX.Element => {

  const navigate = useNavigate();
 //button→投稿ボタンのコンポーネントつくる（全要素そろってるか分岐して違うボタン出す）
  return (
    <>
      <Header />
      <div>
        {/* <myTextbox>title</myTextbox> */}
        <TextField id="outlined-basic" label="tittle" variant="outlined" />
        {/* <input type="text" name="title" placeholder="title"></input> */}
      </div>
      <div>
        <TextField id="outlined-basic" label="comment" variant="outlined" />
      </div>
      <button onClick={() => {navigate("/")}}>post</button>
    </>
  );
};

export default PostContent;

// const myTextbox = styled(TextField)`
//   position: fixed;
// `;

// const CustomComponent = withStyles({
//   root: {
//     // ここにスタイルを書いたり
//   },
//   label: {},
//   // etc...
// })(TextField)