import React from 'react'
import Select from 'react-select';
import {  EtatSortie } from '../../../static';
import swal from 'sweetalert';

function StateComponent({ _id, etat, locked }) {
   
    const [selectedState, setSelectedState] = React.useState({ value: etat, label: etat });
 
    const    suggestionsEtat = [
            { key: 0,
                value:"Pour Réparation",
                label: "Pour Réparation",
               },{
                key: 1,
                value:"Non Réparé",
                label: "Non Réparé",
               },
               {
                key: 2,
                value: 'Réparé',
                label:"Réparé",
               },
               {
                key: 3,
                value:'Retour SAV',
                label:'Retour SAV',
               },
               {
                key: 4,
                value:'Achat',
                label:'Achat',
               }
               ,
               {
                key: 5,
                value:'Décharge Cheque',
                label:'Décharge Cheque',
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
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('id_token')
                    },
                    body: JSON.stringify({ status_reparation: newState.value })
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

export default StateComponent




