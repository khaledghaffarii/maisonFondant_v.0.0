import React, { Component } from 'react'

function LivreurComponentSuivi({liv, livreurs, _id, locked}) {
    const [livreur, setLivreur] = React.useState(liv)
    return (
        <div style={{minWidth: 150, zIndex:1000,}}>
            {livreur ? livreur.fname+" "+ livreur.lname : 'Aucune element'}
        
        </div>
        
    )
}

export default LivreurComponentSuivi

