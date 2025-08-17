import React from 'react'
import NotesContext from '../../Context/NotesContext';
import styles from  '../Styles/NotesTitleLV.module.css';

function NotesTitleLV({title}) {

  if (!title?.[0]?.name) {
    return null; // Or a loader placeholder
  }

  const { selected, setSelected } = NotesContext();
    const nameInitals = (() => {
      const words = title[0].name.split(" ");
      let initials = "";
    
      
      if (words.length === 1) {
        initials = words[0].slice(0, 2).toUpperCase();
      } else if (words.length === 2) {
        initials = words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
      } else if (words.length > 2) {
        initials = words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
      }
    
      return initials;
    })();
  
    const newTitle = title[0].name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  
    const handleTitleClick = () => {
      setSelected(title[0].name);
    };
  
    return (
      <div
        onClick={handleTitleClick}
        className={`${styles.groupTitleLogo} ${
          selected === title[0].name ? styles.highlighted_title : null
        }`}
      >
        <div className={styles.titleLogo} style={{ backgroundColor: title[0].color }}>
          {nameInitals}
        </div>
        <div className={styles.groupTitle}>{newTitle}</div>
      </div>
    );  
}

export default NotesTitleLV