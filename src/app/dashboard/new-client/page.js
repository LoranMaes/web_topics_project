'use client'
import styles from '../../dashboard.module.scss'
import Image from 'next/image'
import React from 'react'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation';
import { addClient } from '@/firebase/firestore/addData'
import HeaderDashboard from '@/ui/molecules/headerDashboard'

export default function NewClient() {
    const allowedExtension = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
    const [loading, setLoading] = React.useState(false);
    const { user } = useAuthContext()
    const router = useRouter()
    const [touchedFields, setTouchedFields] = React.useState({
        first_name: false,
        last_name: false,
    });

    React.useEffect(() => {
        if (user === null) router.push("/")
    }, [user])

    const [form, setForm] = React.useState({
        first_name: '',
        last_name: '',
        profile_picture: null,
    });
    const [error, setError] = React.useState({
        first_name: false,
        last_name: false,
        profile_picture: false,
    });

    const checkForm = () => {
        setError((prevError) => ({ ...prevError, first_name: form.first_name.trim() === '' }));
        setError((prevError) => ({ ...prevError, last_name: form.last_name.trim() === '' }));
        if (form.profile_picture?.size > 0) {
            setError((prevError) => ({ ...prevError, profile_picture: !allowedExtension.includes(form.profile_picture.type) }));
        }
    };

    const submitForm = async (e) => {
        e.preventDefault();
        
        checkForm();

        // Early return if there's an error
        if (error.first_name || error.last_name || error.profile_picture) return;

        setLoading(true)
        // Get user ID

        // Add the data to the database
        await addClient('users', user.uid, 'clients', {
            first_name: form.first_name,
            last_name: form.last_name,
            profile_picture: form.profile_picture,
            
            theme: null,
            character_id: null,
            progress: 0,
        });
        
        setLoading(false)
        router.push('/dashboard')
    };

    React.useEffect(() => {
        if (touchedFields.first_name || touchedFields.last_name) {
            checkForm();
        }
    }, [touchedFields, form]);

    const handleInputChange = (field, value) => {
        setForm((prevForm) => ({ ...prevForm, [field]: value }));
        setTouchedFields((prevTouched) => ({ ...prevTouched, [field]: true }));
    };

    return(
        <React.Fragment>
            <HeaderDashboard></HeaderDashboard>
            <main className={`${styles.form} ${styles.new_client}`}>
            {
                loading ? <div className={styles.loading}></div> : 
                <React.Fragment>
                <h1>Maak een nieuwe cliënt</h1>
                <form noValidate onSubmit={submitForm}>
                    <div className={styles.form_group}>
                        <label className={styles.form_label} htmlFor="first_name">Voornaam <span className={styles.required}>*</span></label>
                        <input 
                        className={styles.form_input} 
                        onChange={(e) => handleInputChange('first_name', e.target.value)}
                        type="text" 
                        name="first_name" id="first_name" 
                        placeholder="Jan" />
                        { error.first_name && touchedFields.first_name ? <p className={styles.error}>Gelieve een geldige voornaam in te voeren</p> : null}
                    </div>

                    <div className={styles.form_group}>
                        <label className={styles.form_label} htmlFor="last_name">Achternaam <span className={styles.required}>*</span></label>
                        <input 
                        className={styles.form_input} 
                        onChange={(e) => handleInputChange('last_name', e.target.value)}
                        type="text" 
                        name="last_name" id="last_name" 
                        placeholder="Janssens" />
                        {
                            error.last_name && touchedFields.last_name ? <p className={styles.error}>Gelieve een geldige achternaam in te voeren</p> : null
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
                        <input disabled={form.first_name === '' || form.last_name === ''} className={styles.form_input} type="submit" name="create_client" id="create_client"  />
                    </label>
                </form>
                </React.Fragment>
            }
            </main>
        </React.Fragment>
    )
}