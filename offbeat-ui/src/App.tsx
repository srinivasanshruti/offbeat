import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.tsx';
import RecentItemsPage from './pages/RecentItemsPage/RecentItemsPage.tsx';
import SavedItemsPage from './pages/SavedItemsPage.tsx';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/recent" element={<RecentItemsPage/>}></Route>
        <Route path="/saved" element={<SavedItemsPage/>}></Route>
      </Routes>

    </BrowserRouter>

  );
}

export default App;
