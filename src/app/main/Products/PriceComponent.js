import React, { Component } from 'react'
import Select from 'react-select';
import {REP_STATES, REP_LABELS, products} from '../../static';
import swal from 'sweetalert';


function PriceComponent({currentPrice, _id}) {
    const [price, setPrice] = React.useState(currentPrice);
    const updateRep = async (e) => {
        e.preventDefault();
       let prix = e.target.value;
       swal({
            title: 'êtes vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!!",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then((result) => {
            if (result) {
              fetch(products.update(_id), {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'x-auth-token': localStorage.getItem('id_token')
                  },
                  body: JSON.stringify({prix})
              })
                .then(updated => {
                    if (updated) {
                        setPrice(prix);
                        setEdit(false);
                    }
                });
            } else {
                setEdit(false);
            }
          });
    }
    const ref = React.createRef(null);

    React.useEffect(() => {
        if (ref && ref.current) {
            ref.current.focus();
        }
    }, [ref])
    const [edit, setEdit] = React.useState(false);
    return (
        <div onClick={() => setEdit(true)}>
            {edit ? 
                <input ref={ref} onKeyDown={e => {
                    if (e.key === 'Enter') {
                        updateRep(e);
                    }
                }} type="number" defaultValue={price} onBlur={updateRep} className={"MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"}/>
                :
                <span>{price == -1 ?  'Après diagnostic' : price == -2 ? 'Gratuit' : price == -3 ? 'Demander un devis' : `${price} TND`}</span>
            }
        </div>
    )
}

export default PriceComponent
