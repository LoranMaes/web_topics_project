'use client'
import styles from './page.module.scss'
import Header from '@/ui/molecules/header'
import Small_card from '@/ui/molecules/small_card'
import Image from 'next/image'
import Check from '@/ui/atoms/check'
import ServiceCard from '@/ui/molecules/serviceCard'

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

          <div className={styles.subTitle}>
            <div className={styles.cards}>
              <Small_card
                title='Happy sqmlfjseiml'
                value='283+'
              ></Small_card>
              <Small_card
                title='Happy patients'
                value='283+'
              ></Small_card>
              <Small_card
                title='Happy patients'
                value='283+'
              ></Small_card>
              <Small_card
                title='Happy patients'
                value='283+'
              ></Small_card>
            </div>
            <Image className={styles.video_card} role='img' alt='video template image' src={require('./assets/video_template.png')}></Image>
          </div>
        </div>

        <div id='about-us' className={`${styles.section} ${styles.white_bg} ${styles.about_us}`}>
          <div className={styles.left}>
            <div className={styles.top}>
              <p className={styles.label}>Over ons</p>
              <h2 className={styles.h2}>Hygiëne en verstandelijke beperking gaan nu ook hand in hand!</h2>
            </div>
            <p>
            Quis nesciunt eum vel dolores. Sint accusamus repellendus repellendus. Laborum possimus accusantium beatae animi adipisci praesentium numquam quia.
            </p>

            <div className={styles.checks}>
              <Check description='Quis nesciunt eum vel dolores. Sint accusamus repellendus repellendus' ></Check>
              <Check description='Quis nesciunt eum vel dolores. Sint accusamus repellendus repellendus' ></Check>
              <Check description='Quis nesciunt eum vel dolores. Sint accusamus repellendus repellendus' ></Check>
            </div>

          </div>
          
          <div className={styles.right}>
            <Image role='img' alt='tooth brushing teeth' src={require('./assets/tooth_image.png')}></Image>
          </div>
        </div>

        <div id='services' className={`${styles.section} ${styles.services}`}>
          <h2 className={`${styles.h2} ${styles.white}`}>Diensten</h2>
          
          <div className={styles.services_cards}>
            <ServiceCard
              title={'Happy patients'}
              description={'Quis nesciunt eum vel dolores. Sint accusamus repellendus repellendus'}
              price={'€ 99,-'}
            ></ServiceCard>
            <ServiceCard
              title={'Happy patients'}
              description={'Quis nesciunt eum vel dolores. Sint accusamus repellendus repellendus'}
              price={'€ 99,-'}
            ></ServiceCard>
            <ServiceCard
              title={'Happy patients'}
              description={'Quis nesciunt eum vel dolores. Sint accusamus repellendus repellendus'}
              price={'€ 99,-'}
            ></ServiceCard>
          </div>
        </div>
      </main>
    </>
  )
}