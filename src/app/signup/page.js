'use client'
import React from "react";
import signUp from "@/firebase/auth/signup";
import { useRouter } from 'next/navigation'
import { useAuthContext } from "@/context/AuthContext";
import styles from '../auth.module.scss'

function Page() {
    const { user } = useAuthContext()
    const router = useRouter()
    React.useEffect(() => {
        if (user !== null) router.push("/dashboard")
    }, [user])

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleForm = async (event) => {
        event.preventDefault()

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error)
        }

        // else successful
        console.log(result)
        return router.push("/admin")
    }

    const handleBack = () => {
        router.push('/')
    }

    const handleLogin = () => {
        router.push('/signin')
    }

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>Sign up</h1>
                <form onSubmit={handleForm}>
                    <label htmlFor="email">
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                    </label>
                    <button type="submit" className={styles.btn}>Sign up</button>
                </form>

                <button type="submit" onClick={handleLogin} className={`${styles.btn} ${styles.link}`}>Already have an account?</button>
                <button type="submit" onClick={handleBack} className={`${styles.btn} ${styles.link}`}>Go back to the homepage</button>
            </div>
        </div>
    );
}

export default Page;