import React, { Component } from 'react'
import Select from 'react-select';
import { REP_STATES, REP_LABELS, reparations } from '../../static';
import swal from 'sweetalert';

function StateComponent({ _id, etat, locked }) {
    const [selectedState, setSelectedState] = React.useState({ value: etat, label: etat });
    const [dateLivraison, setDateLivraison] = React.useState(new Date());
    let i = 0;
    const suggestionsEtat = Object.keys(REP_STATES).map(
        key => {
            i++;
            return {
                key: i,
                value: REP_STATES[key],
                label: REP_LABELS[key],
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
                if (newState.value == REP_STATES.PICKEDUP_BY_CLIENT) {
                    fetch(reparations.update(_id), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('id_token')
                        },
                        body: JSON.stringify({ etat: newState.value, dateLivraison })
                    })
                        .then(updated => {
                            if (updated) {
                                setSelectedState(newState)
                            }
                        });
                } else {
                    fetch(reparations.update(_id), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': localStorage.getItem('id_token')
                        },
                        body: JSON.stringify({ etat: newState.value })
                    })
                        .then(updated => {
                            if (updated) {
                                setSelectedState(newState)
                            }
                        });
                }

            }
        });
    }
    return (
        <div style={{ minWidth: 175 }}>
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


