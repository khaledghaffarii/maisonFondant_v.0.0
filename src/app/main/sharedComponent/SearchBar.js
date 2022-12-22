import React from 'react';
import { TextFieldFormsy } from '@fuse';

export default function SearchBar(props) {
    const handleChange = (e) => {
        props.suggest(e.target.value)
    }
    const handleSelect = (e) => {
        props.select(e.target.getAttribute('data-id'), e.target.getAttribute('data-name'), e.target.getAttribute('data-prix'))
    }
    return (
        <div

        >
            <TextFieldFormsy
                className="full-width"
                style={{
                    paddingBottom: 0,
                }}
                value={props.state.value ? props.state.value : props.state.productName}
                label={props.label ? props.label : 'Produit'}
                type="text"
                name={props.name ? props.name : 'Produit'}
                placeHolder={props.placeHolder ? props.placeHolder : 'Entrer le nom du produit'}
                onChange={handleChange}
                InputLabelProps={{
                    shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
            />
            {
            props.suggestions.length > 0 ?
            <ul
                style={{
                    listStyle: 'none',
                    textAlign: 'initial',
                    padding: 0,
                    border: '1px solid #eee',
                    boxShadow: '0 0 10px #eee',
                    maxHeight: 150,
                    overflowY: 'scroll',
                }}
            >
                {
                    props.suggestions.map(
                        props.render ? props.render : suggest => (
                            <li
                                key={suggest._id}
                                indexkey={suggest._id}
                                onClick={handleSelect}
                                style={{
                                    padding: 5,
                                    borderBottom: '1px solid #eee',
                                    color: '#0088cc',
                                    cursor: 'pointer'
                                }}
                                data-id={suggest._id}
                                data-name={`${suggest.name} (${suggest.prix} TND)`}
                                data-prix={suggest.prix}
                            >
                                {suggest.displayName ? suggest.displayName : suggest.name} ({suggest.prix} TND)
                            </li>
                        )
                    )
                }
            </ul>
            :
            <></>
            }
        </div>
    )
}