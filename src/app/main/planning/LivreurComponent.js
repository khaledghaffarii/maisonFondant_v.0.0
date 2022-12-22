import React, { Component } from 'react'
import Select from 'react-select';
import swal from 'sweetalert';
import { Plannings } from '../../static';

function LivreurComponent({liv, livreurs, _id, locked}) {
    const [livreur, setLivreur] = React.useState(liv)
    const updateLivreur = async (data) => {
        swal({
            title: 'êtes vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!!",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then((result) => {
            if (result) {
              fetch(Plannings.update(_id), {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                      'x-auth-token': localStorage.getItem('id_token')
                  },
                  body: JSON.stringify({delivredBy: data.value})
              })
                .then(updated => {
                    if (updated) {
                        setLivreur(data);
                    }
                })
                .catch(e=>console.log(e));
            }
          });
    }
    return (
        <div style={{minWidth: 150, zIndex:1000,}}>
        <Select
            isDisabled={locked}
            onChange={updateLivreur}
            options={livreurs.map(liv => {return {label: `${liv.fname} ${liv.lname}`, value: liv._id, fname: liv.fname, lname: liv.lname, _id: liv._id}})}
            value={livreur ? {label: `${livreur.fname} ${livreur.lname}`, value: livreur._id} : {label: 'Aucune element'}}
        />
        </div>
        
    )
}

export default LivreurComponent

