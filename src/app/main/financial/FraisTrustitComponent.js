import React from 'react';
import { reparations} from '../../static';
import swal from 'sweetalert';

function FraisTrustitComponent({currentFraisTrustit, _id, locked}) {
    const [fraisTrustit, setFraisTrustit] = React.useState(currentFraisTrustit);
    const updateRep = async (e) => {
        e.preventDefault();
       let fraisTrustit = e.target.value;
       swal({
            title: 'êtes vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!!",
            icon: 'warning',
            buttons: true,
            dangerMode: true,
          }).then((result) => {
            if (result) {
              fetch(reparations.update(_id), {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                      'x-auth-token': localStorage.getItem('id_token')
                  },
                  body: JSON.stringify({fraisTrustit})
              })
                .then(updated => {
                    if (updated) {
                        setFraisTrustit(fraisTrustit);
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
        <div onClick={() => setEdit(true && !locked)}>
            {edit ? 
                <input ref={ref} onKeyDown={e => {
                    if (e.key === 'Enter') {
                        updateRep(e);
                    }
                }} type="number" defaultValue={fraisTrustit} onBlur={updateRep} className={"MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputTypeSearch MuiInput-inputTypeSearch"}/>
                :
                <span>{fraisTrustit == -1 ?  'Après diagnostic' :fraisTrustit==undefined?'0 TND': `${fraisTrustit} TND`}</span>
            }
        </div>
    )
}

export default FraisTrustitComponent
