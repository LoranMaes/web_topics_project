import React from 'react'
import styles from '@/app/page.module.scss'
import Image from 'next/image'

export default function Small_card({ title, value }) {
  return (
    <div className={styles.card}>
      <Image className={styles.card_icon} role='img' alt='icon' src={require('@/app/assets/icon_people.png')}></Image>
      <p>{ title }</p>
      <p className={styles.value}>{ value }+</p>
    </div>
  )
}