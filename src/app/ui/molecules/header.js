import React, { Component } from 'react';
import styles from '../../page.module.scss'
import Image from 'next/image'
import Link from 'next/link';

function Header() {
    return ( 
        <header className={`${styles.header}`}>
            <Image src={require('../../assets/logo.jpeg')} width={64} style={{borderRadius: 999}}></Image>
        
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