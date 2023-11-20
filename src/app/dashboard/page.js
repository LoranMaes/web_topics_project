'use client'
import React from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from '@/app/dashboard.module.scss'
import HeaderDashboard from "@/ui/molecules/headerDashboard";
import TableDashboard from "@/ui/molecules/TableDashboard";


function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    React.useEffect(() => {
        if (user === null) return router.push("/signin")
    }, [user])

    return (
        <React.Fragment>
            <HeaderDashboard></HeaderDashboard>
            
            <main className={styles.main}>
                <TableDashboard></TableDashboard>
            </main>
        </React.Fragment>
    );
}

export default Page;