import React from 'react';
import styles from './Logo.module.css';
import original from '../../assets/images/original.png';
const logo=()=>(
    <div className={styles.Logo}>
        <img src={original} alt="My Burger!"></img>
    </div>
)
export default logo;