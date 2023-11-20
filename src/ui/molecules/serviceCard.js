import React from 'react'
import styles from "@/app/page.module.scss"
import Image from 'next/image'

function ServiceCard({ title, description, imageImport, price }) {
    const image = (imageImport ?
        require(`@/app/assets/${imageImport}.png`) :
        require('@/app/assets/logo.jpeg')
    )

    return (
        <div className={styles.service_card}>
            <Image role='img' alt='image icon' src={image}></Image>
            <h3>{ title }</h3>
            <p>{ description }</p>
            <h3>{ price }</h3>
        </div>
    )
}

export default ServiceCard