import React from 'react'
import styles from '../../dashboard.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

function HeaderDashboard({ user }) {
    const pathname = usePathname()

    return (
        <nav className={styles.header_dashboard}>
            <Link href={'/'} className={styles.header_back}>
                <Image role='img' alt='back icon' height={16} src={require('../../assets/back_icon.svg')} ></Image>
                Ga terug
            </Link>

            <ul>
                <li className={pathname === '/dashboard' ? styles.active : ''}>
                    <Link href={'/dashboard'}>Overzicht</Link>
                </li>
                <li className={pathname === '/dashboard/new-client' ? styles.active : ''}>
                    <Link href={'/dashboard/new-client'}>Nieuwe cliënt</Link>
                </li>
                <li className={pathname === '/dashboard/settings' ? styles.active : ''}>
                    <Link href={'/dashboard/settings'}>Instellingen</Link>
                </li>
                <li>
                    {
                        user?.profile_picture ?
                            <Image width={48} height={48} role='img' alt='profile_picture' src={user?.profile_picture}></Image>:
                            <img width={48} height={48} src='https://api.dicebear.com/7.x/avataaars-neutral/svg' alt='profile picture header' style={{borderRadius: 999}}></img>
                    }
                </li>
            </ul>
        </nav>
    )
}

export default HeaderDashboard