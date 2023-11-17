'use client'
import React from "react";
import signIn from "@/firebase/auth/signin";
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/context/AuthContext";
import styles from '../auth.module.scss'


function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    
    React.useEffect(() => {
        if (user !== null) return router.push("/dashboard")
    }, [user])

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [error, setError] = React.useState('')

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signIn(email, password);

        if (error) {
            return setError(error.message)
        }

        // else successful
        console.log(result)
        return router.push("/dashboard")
    }

    const handleBack = () => {
        router.push('/')
    }

    const handleRegister = () => {
        router.push('/signup')
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Sign in</h1>
                <form onSubmit={handleForm}>
                    <label htmlFor="email">
                        <p>Email</p>
                        <input autoComplete="email" onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input autoComplete="" onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                    </label>
                    <button disabled={!email.length || !password.length} type="submit" className={styles.btn}>Sign in</button>
                </form>
                {
                    error === '' ?
                        <></>
                        :
                        <p className={styles.error}>{error}</p>
                }

                <button type="submit" onClick={handleRegister} className={`${styles.btn} ${styles.link}`}>Create an account</button>
                <button type="submit" onClick={handleBack} className={`${styles.btn} ${styles.link}`}>Go back to the homepage</button>
            </div>
        </div>
    );
}

export default Page;