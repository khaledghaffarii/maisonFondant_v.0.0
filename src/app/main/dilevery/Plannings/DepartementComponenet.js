import React from 'react'
import Select from 'react-select';
import {  EtatSortie } from '../../../static';
import swal from 'sweetalert';

function DepartementComponent({ _id, dep, locked }) {
   
    const [selectedState, setSelectedState] = React.useState({ value: dep, label: dep });
 
    const    suggestionsEtat = [{
                key: 0,
                value:"B2B",
                label: "B2B",
               },
               {
                key: 1,
                value: "B2C",
                label:"B2C",
               },
               {
                key: 2,
                value: "Finance",
                label:"Finance",
               },
               {
                key: 3,
                value: "Sales",
                label:"Sales",
               },
               {
                key: 4,
                value: "Trustit Team",
                label:"Trustit Team",
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
                        body: JSON.stringify({ departement: newState.value })
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
        <div style={{ minWidth: 150 }}>

            <Select
                isDisabled={locked}
                options={suggestionsEtat}
                value={selectedState}
                onChange={update}
            />

        </div>
    )
}

export default DepartementComponent




