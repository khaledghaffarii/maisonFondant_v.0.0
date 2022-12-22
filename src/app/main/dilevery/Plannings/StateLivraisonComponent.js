import React from 'react'
import Select from 'react-select';
import {  EtatSortie } from '../../../static';
import swal from 'sweetalert';


function StateLivraisonComponent({ _id, etat, locked }) {
   
    const [selectedState, setSelectedState] = React.useState({ value: etat, label: etat });
 
    const    suggestionsEtat = [
            { key: 0,
                value:"Livré",
                label: "Livré",
               },{
                key: 1,
                value:"Annulé",
                label: "Annulé",
               },
               {
                key: 2,
                value: 'Reporté',
                label:"Reporté",
               }
             ]
 
    const update = (newState) => {
    
        swal({
            title: 'êtes vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!!",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((result) => {
            if (result) {
                
                    fetch(EtatSortie.update(_id), {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('id_token')
                        },
                        body: JSON.stringify({ status_livraison: newState.value })
                    })
                        .then(updated => {
                            if (updated) {
                                setSelectedState(newState)
                            }
                        });
               

            }
        });
    }
    return (
        <div style={{minWidth: 150 }}>

            <Select
                isDisabled={locked}
                options={suggestionsEtat}
                value={selectedState}
                onChange={update}
            />

        </div>
    )
}

export default StateLivraisonComponent




