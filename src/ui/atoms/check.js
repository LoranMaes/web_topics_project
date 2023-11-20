import React from 'react'
import styles from '@/app/page.module.scss'
import Image from 'next/image'

export default function Check({ description }) {
  return (
    <div className={styles.check}>
        <Image className={styles.check_icon} role='img' alt='checkmark' src={require('@/app/assets/check.svg')}></Image>
        <p>{ description }</p>
    </div>
  )
}
