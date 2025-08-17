import React, { useState, useEffect } from 'react'
import ContentLV from '../Content/ContentLV';
import styles from '../Styles/NotesLV.module.css';
import enter from '../../assets/enter.png';
import NotesContext from '../../Context/NotesContext';

function NotesLV() {
    const[text, setText] = useState("");
    const[bgColor, setBgColor] = useState('#fff');
    const[initialText, setInitialText] = useState("");
    const[selectedTitle, setSelectedTitle] = useState("");

    const{ notes, setNotes, selected} = NotesContext();
    

    useEffect(() => {
      setNotes(JSON.parse(localStorage.getItem(selected)) || []);
      const groupNames = JSON.parse(localStorage.getItem("groupName"));
      const selectedGroup = groupNames.find((group) => group.name === selected);

      let initialText = "";
      let selectedTitle = "";

      if (selectedGroup) {
        const words = selectedGroup.name.split(' ');
        if(words.length === 1){
            initialText = words[0].slice(0, 2).toUpperCase();
        }else if(words.length === 2){
            initialText = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
        } else if(words.length > 2) {
            initialText = words[0].charAt(0).toUpperCase() + words[words.length-1].charAt(0).toUpperCase();
        }

        selectedTitle = words.map((word) => 
            word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
        
        setBgColor(selectedGroup ? selectedGroup.color : '#fff');
        setInitialText(initialText);
        setSelectedTitle(selectedTitle);
    }, [selected, setNotes]);

    const handleTextChange = (e) => {
        if(e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSaveNote();
        }else if(e.key === 'Enter' && e.shiftKey) {
            setText((prevText) => prevText + '\n');
        }
    };

    const handleSaveNote = () => {
        if(!text.trim()) {
            return;
        }

        const notes = JSON.parse(localStorage.getItem(selected)) || [];
        const newNote = {
            id: Date.now(),
            title: selected,
            content: text,
            date: formatCurrentDate(),
            time: formatCurrentTime(),
        };
        notes.push(newNote);
        localStorage.setItem(selected, JSON.stringify(notes));
        setNotes(notes);
        setText("");
    };

    const handleChange = (e) => {
        setText(e.target.value);
    };
    

    const formatCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours()> 12 ? now.getHours() - 12 : now.getHours();
        const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
        const minutes = now.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes} ${ampm}`;
    };
        
    const formatCurrentDate = () => {
        const now = new Date();
        const day = now.getDate().toString();
        const monthIndex = now.getMonth();
        const year = now.getFullYear().toString();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[monthIndex];
            return `${day} ${month} ${year}`;    
    };
            
  return (
    <div className={styles.notes}>
        <div className={styles.notesTitle}>
            <div className={styles.notesTitleIcon}
                style={{ backgroundColor: bgColor }}>
                {initialText}
            </div>
            <div className={styles.notesTitleText}>{selectedTitle}</div>
        </div>
        <div className={styles.notesContent}>
            {notes && notes.length > 0 ? notes.map((note, index) => (
                <ContentLV 
                    key={index}
                    note={{ ...note, content:(
                        <div dangerouslySetInnerHTML={{
                            __html: note.content.replace(/\n/g, '<br />'),
                        }}/>
                    ),}}
                />
            )) : null}
        </div>
        <div className={styles.notesInput}>
            <textarea 
                value={text}
                placeholder='Type your notes here...'
                onChange={handleChange}
                onKeyDown={handleTextChange}
            ></textarea>
            <img src={enter} alt="enter" onClick={handleSaveNote}/>
        </div>
    </div>
    
  )
}

export default NotesLV