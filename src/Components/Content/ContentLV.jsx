import React from 'react'
import styles from '../Styles/ContentLV.module.css';

function ContentLV({ note }) {
  return (
    <div className={styles.contentContainer}>
        <div className={styles.notes_content}>
            {note.content}
        </div>
        <div className={styles.time_details}>
            <div className={styles.date}>{note.date}</div>
            <span>&bull;</span>
            <div className={styles.time}>{note.time}</div>
        </div>
    </div>
  )
}

export default ContentLV