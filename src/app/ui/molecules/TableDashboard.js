import React from 'react'
import styles from '../../dashboard.module.scss'
import Link from 'next/link'
import Image from 'next/image'

function TableDashboard() {
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

    const handleSearch = (e) => {
        e.preventDefault()
        return true
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
                        <th>Name Client</th>
                        <th>Theme</th>
                        <th>Profile Picture</th>
                        <th>Client Profile</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => (
                        <tr key={user.customer_id}>
                            <td>{user.customer_id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.theme}</td>
                            <td>{user.profile_picture ? <img src={`https://api.dicebear.com/7.x/avataaars-neutral/svg?seed=felix`} height={24} width={24} role='img' alt='profile picture'></img> : '/'}</td>
                            <td>
                                <Link href={`/dashboard/profile/${user.customer_id}`}>Go to profile</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default TableDashboard