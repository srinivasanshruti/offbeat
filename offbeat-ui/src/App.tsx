import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import HomePage from 'pages/HomePage.tsx';
import RecentItemsPage from 'pages/RecentItemsPage.tsx';
import SavedItemsPage from 'pages/SavedItemsPage.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
        <Route path="/recent" element={<RecentItemsPage />}></Route>
        <Route path="/saved" element={<SavedItemsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
