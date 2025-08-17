import React, { useEffect } from 'react'
import { useState, useRef } from 'react';
import './NotesContainer.css';
import NotesTitleLV from "./Title/NotesTitleLV";
import AddNotesLV from "./CreateNotes/AddNotesLV";

function NotesContainer() {
    const [titles, setTitles] = useState([]);
    const [popup, setPopup] = useState(false);
    const [groupName, setGroupName] = useState(() => {
        try {
            const stored = localStorage.getItem("groupName");
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error("Failed to parse groupName from localStorage:", error);
            return [];
        }
    });
        

    useEffect(() => {
        try {
            const data = localStorage.getItem("groupName");
            if (data) {
                setGroupName(JSON.parse(data));
            } else {
                setGroupName([]);
            }
        } catch (error) {
            console.error("Error reading groupName from localStorage:", error);
            setGroupName([]);
        }
    }, []);

 useEffect(() => {
        try {
            if (groupName.length > 0) {
                const obj = JSON.parse(localStorage.getItem("groupName")) || [];
                const result = Object.keys(obj).map(key => [obj[key]]);
                setTitles(result);
            } else {
                setTitles([]);
            }
        } catch (error) {
            console.error("Error updating titles:", error);
            setTitles([]);
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
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                handleClose();
            }
        };
        
        if(popup){
           document.addEventListener('mousedown', handleClickOutside); 
        }else{
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popup]);
    
  return (
    <div className='sidePanel'>
        <div className='title'>Pocket Notes</div>
        <div className='notes-title'>
            {titles.length > 0 ? (titles.map((title, index) => 
                <NotesTitleLV key={index} title={title} />)) : (<div></div>)}
        </div>
        <div className='add-notes-btn'>
            <button className="add-btn" onClick={handleClick}>
                <span id='add-note'>+</span>
            </button>
        </div>
        {popup && (
            <div className='popup_overlay'>
                <div ref={popupRef}>
                    <AddNotesLV groupName={groupName}
                    setGroupName={setGroupName} onClose={handleClose} />
                </div>
            </div>  
        )}
    </div>
  );
}

export default NotesContainer