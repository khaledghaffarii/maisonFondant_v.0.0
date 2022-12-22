import React from 'react'

function ClinetInfo({owner}) {
    const client = owner ? owner : { fname: 'None Spécifié', lname: '', email: '' }
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ margin: 5 }}>
                <p>{client.fname} {client.lname}</p>
                <p>
                    <a href={`mailto:${client.email}`}>{client.email}</a>
                </p>
                <p>{client.phone}</p>
            </div>
        </div>
    )
}

export default ClinetInfo
