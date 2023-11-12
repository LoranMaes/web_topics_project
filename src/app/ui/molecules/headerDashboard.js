import React from 'react'
import styles from '../../dashboard.module.scss'
import Link from 'next/link'
import Image from 'next/image'

function HeaderDashboard({ user }) {
  return (
    <nav className={styles.header_dashboard}>
        <Link href={'/'}>Ga terug</Link>

        <ul>
            <li>
                <Link href={'/dashboard'}>Overzicht</Link>
            </li>
            <li>
                <Link href={'/dashboard/new-client'}>Nieuwe cliënt</Link>
            </li>
            <li>
                <Link href={'/dashboard/settings'}>Instellingen</Link>
            </li>
            <li>
                {
                    user?.profile_picture ?
                        <Image width={48} height={48} role='img' alt='profile_picture' src={user?.profile_picture}></Image>:
                        <img width={48} height={48} src='https://api.dicebear.com/7.x/avataaars-neutral/svg' style={{borderRadius: 999}}></img>
                }
            </li>
        </ul>
    </nav>
  )
}

export default HeaderDashboard