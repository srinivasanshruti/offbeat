import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.tsx';
import RecentItemsPage from './pages/RecentItemsPage/RecentItemsPage.tsx';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/recent" element={<RecentItemsPage/>}></Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;
