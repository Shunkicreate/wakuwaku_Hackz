import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Content from './pages/Content/Content';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`content`}>
          <Route path={`:contentId`} element={<Content/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
