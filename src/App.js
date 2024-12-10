import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from './boardPage/BoardList';
import BoardEdit from './boardPage/BoardEdit';
import BoardWrite from './boardPage/BoardWrite';
import BoardDetail from './boardPage/BoardDetail';
function App() {

  return (

    <div className="App">

      <Router>
        <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/boardWrite" element={<BoardWrite />} />
        <Route path="/boardEdit/:boardIndex" element={<BoardEdit />} />
        <Route path="/boardDetail/:id" element={<BoardDetail />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
