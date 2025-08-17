import React from 'react'
import home from '../../assets/home.png';
import lockIcon from '../../assets/lock.png';
import styles from '../Styles/home.module.css';

function Home() {
  return (
    <div className={styles.home}>
        <img src={home} alt="Home" className={styles.homeImg} />
        <h1>Pocket Notes</h1>
        <p>Send and receive messages without keeping your phone online.<br />Use Pocket Notes on up to 4 linked Devices and 1 mobile phone.</p> 
        <div className={styles.lockIcon}>
            <img src={lockIcon} alt="Lock Icon" className={styles.lockIconImg} />
            <span>end to end encrypted</span>
        </div>
    </div>
  )
}

export default Home