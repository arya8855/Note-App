import React, { useEffect, useState, useRef } from 'react';
import AddNotesMV from '../CreateNotes/AddNotesMV';
import NotesTitleMV from '../Title/NotesTitleMV';
import "./Mobile.css";


function Mobile() {
    const [titles, setTitles] = useState([]);
    const [popup, setPopup] = useState(false);
    const [groupName, setGroupName] = useState(
        localStorage.getItem("groupName") || []
    );

    useEffect(() => {
        const data = localStorage.getItem("groupName");
        if(data) {
            setGroupName(JSON.parse(data));
        }else{
            setGroupName([]);
        }
    }, []);

    useEffect(() => {
        if(groupName.length > 0){
            const obj = JSON.parse(localStorage.getItem("groupName"));
            const result = Object.keys(obj).map((key) => [obj[key]]);
            setTitles(result);
        }
    }, [groupName]);

    const handleClick = () => {
        setPopup(true);
    }

    const handleClose = () => {
        setPopup(false);
    }

    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if(popupRef.current && !popupRef.current.contains(event.target)){
                setPopup(false);
            }
        };

        if(setPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }else{
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return() => {
            document.removeEventListener("mousedown",handleClickOutside);
        }
    }, [setPopup]);

  return (
    <div className='sidePanelMV'>
        <div className='M_title'>Pocket Notes</div>
        <div className='M_notes-title'>
            {titles.length > 0 ? (titles.map((title, index) => 
                <NotesTitleMV key={index} title={title} />)) : (<div></div>)}
        </div>
        <div className='M_add-notes-btn'>
            <button className="M_add-btn" onClick={handleClick}>
                <span id='M_add-note'>+</span>
            </button>
        </div>
        {popup && (
            <div className='M_popup_overlay'>
                <div ref={popupRef}>
                    <AddNotesMV groupName={groupName}
                    setGroupName={setGroupName} onClose={handleClose} />
                </div>
            </div>  
        )}
    </div>
  )
}

export default Mobile