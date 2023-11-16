import React from 'react'
import styles from '../../dashboard.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { getClients } from '@/firebase/firestore/getData'
import { useAuthContext } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

function TableDashboard() {
    const router = useRouter()
    const { user } = useAuthContext()
    React.useEffect(() => {
        if (user === null) router.push("/signin")
    }, [user])

    const [loading, setLoading] = React.useState(false)
    const [users, setUsers] = React.useState({})
    const [usersFiltered, setUsersFiltered] = React.useState(users)

    const updateClients = async () => {
        try {
            const clients = await getClients('users', user.uid);
            setUsersFiltered((prevUsers) => {
                return {
                    ...prevUsers,
                    ...clients.result,
                };
            });

            setUsers((prevUsers) => {
                return {
                    ...prevUsers,
                    ...clients.result,
                };
            });
        } catch (error) {
            console.error('Error in updateClients:', error);
        }
    };
    

    const handleSearch = (e) => {
        e.preventDefault()
        setLoading(true)
        const search = e.target.search.value
        if (search === '') {
            setUsersFiltered(users)
        }
        else {
            setUsersFiltered(
                Object.fromEntries(
                    Object.entries(users).filter(
                        ([userId, user]) =>
                            user.first_name.toLowerCase().includes(search.toLowerCase()) ||
                            user.last_name.toLowerCase().includes(search.toLowerCase())
                    )
                )
            );
        }
        setLoading(false)
    }
    
    React.useEffect(() => {
        setLoading(true)

        updateClients()
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className={styles.form}>
            <form noValidate onSubmit={e => handleSearch(e)}>
                <label for="search">
                    <input name="search" id='search' placeholder='Search by name'></input>
                </label>
                <label for='submit'>
                    <input type='submit' name='submit' id='submit' value='Filter'></input>
                </label>
            </form>

            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Client ID</th>
                        <th>Naam Cliënt</th>
                        <th>Thema</th>
                        <th>Profielfoto</th>
                        <th>Progressie</th>
                        <th>Profiel Cliënt</th>
                    </tr>
                </thead>
                <tbody>
                {
                    !Object.keys(usersFiltered).length && !loading ?
                    <tr style={{textAlign: 'center'}}>
                        <td colSpan={5}>Er zijn geen cliënten gevonden</td>
                    </tr> : ''
                }
                {
                    loading ? (
                        <tr style={{textAlign: 'center'}}>
                            <td colSpan={5}><div className={styles.loading}></div></td>
                        </tr>
                    ) : ''
                }
                {
                    Object.keys(usersFiltered).map((uid, index) => (
                        <tr key={uid}>
                            <td>{index+1}</td>
                            <td>{uid}</td>
                            <td>{usersFiltered[uid].first_name} {usersFiltered[uid].last_name}</td>
                            <td style={{ backgroundColor: usersFiltered[uid].theme }}>{ !usersFiltered[uid].theme ? 'Geen thema' : '' }</td>
                            <td>
                                {usersFiltered[uid].profile_picture ? (
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=felix`}
                                        alt={`picture of ${usersFiltered[uid].first_name}`}
                                        height={24}
                                        width={24}
                                        role='img'
                                    ></img>
                                ) : (
                                    '/'
                                )}
                            </td>
                            <td>{usersFiltered[uid].progress}</td>
                            <td>
                                <Link href={`/dashboard/profile/${uid}`}>Ga naar het profiel</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {
                !Object.keys(usersFiltered).length ?
                "" :
                <p>Totaal aantal cliënten: {Object.keys(usersFiltered).length}</p>
            }
        </div>
    )
}

export default TableDashboard