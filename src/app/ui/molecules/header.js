import React, { Component, useEffect, useState } from 'react';
import styles from '../../page.module.scss'
import Image from 'next/image'
import Link from 'next/link';

function Header() {
    const [expanded, setExpanded] = React.useState(false);
    const [scrollY, setScrollY] = useState(0);

    const windowHeight = window.innerHeight;

    const changeAria = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        const handleScroll = () => {
          setScrollY(window.scrollY);
        };    
        
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`${styles.header} ${(scrollY > windowHeight + 118) && (scrollY < windowHeight*2 + 118)  ? styles.scrolled : ''}`}>
            <Image className={styles.header_image} src={require('../../assets/logo.jpeg')} style={{borderRadius: 999}}></Image>
            <button onClick={changeAria} aria-expanded={expanded} className={styles.hamburger}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        
            <nav className={`${styles.nav}`}>
                <ul className={`${styles.nav_ul}`}>
                    <Link href="#start">
                        <li>Startpagina</li>
                    </Link>
                    <Link href="#about-us">
                        <li>Over ons</li>
                    </Link>
                    <Link href="#services">
                        <li>Diensten</li>
                    </Link>
                    <Link href="#dashboard" className={`${styles.dashboard_link}`}>
                        <li>Dashboard</li>
                    </Link>
                </ul>
            </nav>
        </header>
     );
}

export default Header;