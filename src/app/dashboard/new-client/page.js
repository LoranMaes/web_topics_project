'use client'
import HeaderDashboard from '../../ui/molecules/headerDashboard'
import styles from '../../dashboard.module.scss'
import Image from 'next/image'
import React from 'react'

export default function NewClient() {
    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png','image/gif','image/bmp'];
    const [form, setForm] = React.useState({
        first_name: '',
        last_name: '',
        profile_picture: null
    })
    const [error, setError] = React.useState({
        first_name: false,
        last_name: false,
        profile_picture: false
    })

    const submitForm = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)

        setError(prevError => ({ ...prevError, first_name: data.first_name.trim() === '' }));
        setError(prevError => ({ ...prevError, last_name: data.last_name.trim() === '' }));
        if (data.profile_picture.size > 0) {
            setError(prevError => ({ ...prevError, profile_picture: !allowedExtension.includes(data.profile_picture.type) }));
        }


        // console.log(data)
        // console.log(error)
    }

    return(
        <React.Fragment>
            <HeaderDashboard></HeaderDashboard>
            <main className={`${styles.form} ${styles.new_client}`}>
                <h1>Maak een nieuwe cliënt</h1>
                <form noValidate onSubmit={submitForm}>
                    <div className={styles.form_group}>
                        <label className={styles.form_label} htmlFor="first_name">Voornaam <span className={styles.required}>*</span></label>
                        <input className={styles.form_input} type="text" name="first_name" id="first_name" placeholder="Jan" />
                        {error.first_name ? <p className={styles.error}>Gelieve een geldige voornaam in te voeren</p> : null}
                    </div>

                    <div className={styles.form_group}>
                        <label className={styles.form_label} htmlFor="last_name">Achternaam <span className={styles.required}>*</span></label>
                        <input className={styles.form_input} type="text" name="last_name" id="last_name" placeholder="Janssens" />
                        {
                            error.last_name ? <p className={styles.error}>Gelieve een geldige achternaam in te voeren</p> : null
                        }
                    </div>

                    <div className={styles.form_group}>
                        <label className={styles.form_label} htmlFor="profile_picture">Profielfoto</label>
                        <input className={styles.form_input} type="file" accept='image/*' name="profile_picture" id="profile_picture" />
                        {
                            error.profile_picture ? <p className={styles.error}>Gelieve een geldige profielfoto in te voeren</p> : null
                        }
                    </div>

                    <label className={styles.form_label} htmlFor="create_client">
                        <input className={styles.form_input} type="submit" name="create_client" id="create_client"  />
                    </label>
                </form>
            </main>
        </React.Fragment>
    )
}