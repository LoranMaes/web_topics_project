import React from 'react'

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
        <div>
            <form noValidate onSubmit={e => handleSearch(e)}>
                <input></input>
                <input type='submit'></input>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>Name Client</th>
                        <th>Theme</th>
                        <th>Profile Picture</th>
                    </tr>
                </thead>
                <tbody>
                {
                    users.map((user) => (
                        <tr key={user.customer_id}>
                            <td>{user.customer_id}</td>
                            <td>{user.first_name} {user.last_name}</td>
                            <td>{user.theme}</td>
                            <td>{user.profile_picture}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default TableDashboard