import React from 'react'
import styles from '../Styles/ContentMV.module.css';

function ContentMV({ note }) {
  return (
    // <div className={styles.contentContainer}>
    //     <div className={styles.note_content}>
    //         {note.content.split("\n").map((line, index)=> {
    //             return (<p key={index}>{line}</p>)
    //         })}
    //     </div>
    //     <div className={styles.time_details}>
    //         <div className={styles.time}>{note.time}</div>
    //         <div className={styles.date}>{note.date}</div>
    //     </div>
    // </div>
    <div className={styles.McontentContainer}>
        <div className={styles.Mnotes_content}>
            {note.content}
        </div>
        <div className={styles.Mtime_details}>
            <div className={styles.Mdate}>{note.date}</div>
            <span>&bull;</span>
            <div className={styles.Mtime}>{note.time}</div>
        </div>
    </div>
  )
}

export default ContentMV