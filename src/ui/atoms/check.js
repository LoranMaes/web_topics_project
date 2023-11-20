import React from 'react'
import styles from '../../page.module.scss'
import Image from 'next/image'

export default function Check({ description }) {
  return (
    <div className={styles.check}>
        <Image className={styles.check_icon} role='img' alt='checkmark' src={require('../../assets/check.svg')}></Image>
        <p>{ description }</p>
    </div>
  )
}
