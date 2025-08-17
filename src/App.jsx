import React, { useEffect, useState } from 'react'
import './App.css';
import NotesContext, { Provider } from './Context/NotesContext';
import Laptop from './Components/Pages/Laptop';
import Mobile from './Components/Pages/Mobile';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NotesMV from './Components/Notes/NotesMV';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const[screenSize, setScreenSize] = useState(window.innerWidth);
  const {selected, setSelected} = NotesContext();

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
  }, [selected]);

  useEffect(() => {
    const checkScreenSize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  return (
    <Provider>
      <div className='App'>
      { screenSize > 500 ? (
          <Laptop/> 
          ) : (
            <Router>
              <Routes>
                <Route path='/' element={<Mobile/>}/>
                <Route path='/notes' element={<NotesMV/>}/>
              </Routes>
            </Router>
        )
      }
      
    </div>
    <ToastContainer position="top-right" autoClose={2000} />
  </Provider>
  
  )
}

export default App
