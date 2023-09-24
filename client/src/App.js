import { useEffect } from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css';


import Home from './components/Home/Home';
import AddSong from './components/AddSong/AddSong';

import { useDispatch, useSelector } from'react-redux';

import {GetAllArtist} from "./store/action/artistAction"
import {GetAllSongs} from "./store/action/songAction"


function App() {

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetAllArtist());
    // dispatch(GetAllSongs());
  },[]);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/addSong' element={<AddSong/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
