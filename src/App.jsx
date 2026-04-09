import React from 'react'
import { Routes,Route } from 'react-router-dom';
import Home from './Components/Home/Home.jsx';
import MovieDetails from './Components/MovieDetails/MovieDetails.jsx';
import Header from './Components/Header/Header.jsx';
import Genre from './Components/Genre/Genre.jsx';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/genre/:genreName' element={<Genre/>} />
        <Route path ='/movie/:id' element={<MovieDetails/>} />
      
      </Routes>
    </div>
  )
}

export default App
