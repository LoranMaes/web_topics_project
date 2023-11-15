import React from 'react'
import styles from '../../dashboard.module.scss'
import Link from 'next/link'
import Image from 'next/image'

function TableDashboard() {
    const [loading, setLoading] = React.useState(false)
    const [users, setUsers] = React.useState([
        {
            organisation: 1,
            customer_id: 1,
            
            first_name: "Jan",
            last_name: "Janssens",
            
            theme: "blue",
            character_id: 3,
            profile_picture: null
        },
        {
            organisation: 1,
            customer_id: 2,
            
            first_name: "Rune",
            last_name: "Leertermans",
            
            theme: "red",
            character_id: 1,
            profile_picture: "link"
        },
        {
            organisation: 2,
            customer_id: 3,
            
            first_name: "Jef",
            last_name: "Zever",
            
            theme: "purple",
            character_id: 1,
            profile_picture: null
        },
    ])
    
    const [usersFiltered, setUsersFiltered] = React.useState(users)

    const handleSearch = (e) => {
        e.preventDefault()
        setLoading(true)
        const search = e.target.search.value
        if (search === '') {
            setUsersFiltered(users)
        }
        else {
            setUsersFiltered(users.filter(user => user.first_name.toLowerCase().includes(search.toLowerCase()) || user.last_name.toLowerCase().includes(search.toLowerCase())))
        }
        setLoading(false)
    }
    
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
                    usersFiltered.length === 0 ?
                    <tr style={{textAlign: 'center'}}>
                        <td colSpan={5}>Er zijn geen cliënten gevonden</td>
                    </tr> : ''
                }
                {
                    loading ? (
                        <tr style={{textAlign: 'center'}}>
                            <td colSpan={5}>Loading...</td>
                        </tr>
                    ) : ''
                }
                {
                    usersFiltered.map((user, index) => (
                        <tr key={user.customer_id}>
                            <td>{user.customer_id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td style={{ backgroundColor: user.theme }}></td>
                            <td>{user.profile_picture ? <img src={`https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=felix`}   alt={`picture of ${user.first_name}`} height={24} width={24} role='img'></img> : '/'}</td>
                            <td>LEVEL HIER</td>
                            <td>
                                <Link href={`/dashboard/profile/${user.customer_id}`}>Ga naar het profiel</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            {
                usersFiltered.length === 0 ?
                "" :
                <p>Totaal aantal cliënten: {usersFiltered.length}</p>
            }
        </div>
    )
}

export default TableDashboard