import React from 'react'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home';
import { Routes,Route } from 'react-router-dom';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import Genre from './Components/genre/genre';


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
