import React from 'react'
import './Laptop.css';
import NotesContext from '../../Context/NotesContext'
import NotesContainer from '../NotesContainer';
import Home from '../Home/Home';
import NotesLV from '../Notes/NotesLV';

function Laptop() {
  const {selected} = NotesContext();


  return (
    <div className="laptopView">
      <NotesContainer />
      {selected.length > 0 ? <NotesLV/> : <Home/>}
    </div>
  )
}

export default Laptop