'use client'
import styles from './page.module.scss'
import Header from '@/app/ui/molecules/header'

export default function Home() {
  return (
    <>
      <Header></Header>

      <main className={styles.main}>

        <div id='start' className={styles.start}>
          <h1 className={styles.heading}>
            <span>Uw Partner voor</span>
            <span>Uitgebreide Zorgverlenings</span>
            <span>
              <span>Services</span>
              <span></span>
              <span>
              Ontdek hoe onze innovatieve applicatie met een virtuele mascotte mensen met een verstandelijke beperking inspireert en ondersteunt bij het verbeteren van hun persoonlijke hygiëne.
              </span>
            </span>
          </h1>
        </div>
      </main>
    </>
  )
}