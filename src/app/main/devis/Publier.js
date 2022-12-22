import React, { Component } from 'react'
import Select from 'react-select';
import { REP_RETOUR, stock } from '../../static';
import swal from 'sweetalert';
function Publier({ _id, publierValue, locked }) {
    let labelPublierValue=publierValue==true?"true":'false';
    const [publier, setPublier] = React.useState({ value: publierValue, label: labelPublierValue });
    let i = 0;
    const suggestionsPublier = Object.keys(REP_RETOUR).map(
        key => {
            i++;
            return {
                key: i,
                value: REP_RETOUR[key],
                label: REP_RETOUR[key],
            }
        }
    )
    const update = (newState) => {
        swal({
            title: 'êtes vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!!",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((result) => {
            if (result) {
                    fetch(stock.update(_id), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('id_token')
                        },
                        body: JSON.stringify({ publier: newState.value })
                    })
                        .then(updated => {
                            if (updated) {
                                setPublier(newState)
                            }
                        });
                }

            
        });
    }
    return (
        <div style={{ minWidth: 175 }}>

            <Select
                isDisabled={locked}
                options={suggestionsPublier}
                value={publier}
                onChange={update}
            />

        </div>
    )
}

export default Publier


