import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <Image src={require('./assets/logo.jpeg')} width={96} style={{borderRadius: 999, marginRight: 36}}></Image>
        <h1>Guardian Care</h1>
      </div>
    </main>
  )
}
