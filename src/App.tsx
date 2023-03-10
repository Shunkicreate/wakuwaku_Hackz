import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Content from './pages/Content/Content';
import PostContent from './pages/PostContent/PostContent';
import MyPage from './pages/MyPage/MyPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/post`} element={<PostContent />} />
        <Route path={`/mypage`} element={<MyPage />} />
        <Route path={`content`}>
          <Route path={`:contentId`} element={<Content/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
