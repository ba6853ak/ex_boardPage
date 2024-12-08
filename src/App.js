import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BoardList from './boardPage/BoardList';
import BoardEdit from './boardPage/BoardEdit';
import BoardWrite from './boardPage/BoardWrite';
function App() {



  return (

    <div className="App">

      <Router>
        <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/BoardWrite" element={<BoardWrite />} />
        <Route path="/boardEdit" element={<BoardEdit />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
