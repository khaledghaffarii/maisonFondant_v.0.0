import React, { Component } from 'react';
import { Button, CardContent } from '@material-ui/core';
import { FuseAnimate, } from '@fuse';
import { FuseChipSelect } from '@fuse';
import Formsy from 'formsy-react';
import { TextFieldFormsy, } from '@fuse';
import {
    withRouter
} from 'react-router-dom';

class FactureForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormValid: false,
        }
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
    }

    disableButton() {
        this.setState({
            isFormValid: false,
        })
    }
    enableButton() {
        this.setState({
            isFormValid: true,
        })
    }
 
    render() {
        const props = this.props;
        const suggestionsReparation = props.state.repairerOptions.map(item => (
            
            {
            key: item._id,
            value: {id:item._id,owner:item.owner,etat:item.etat},
            label: `${item.code}`
          }));
        return (
            <div className="p-16 sm:p-24 max-w-2xl">
                <FuseAnimate animation="transition.expandIn">
                    <CardContent className="flex flex-col items-center justify-center p-32">
                        <Formsy
                            onValidSubmit={props.handleSubmit}
                            onValid={this.enableButton}
                            onInvalid={this.disableButton}
                            className="flex flex-col justify-center w-full"
                        >
                            <FuseChipSelect
                            className="w-full my-16"
                            value={props.state.reparation}
                            onChange={props.handleChipChangeReparation}
                            placeholder="Select reparation"
                            textFieldProps={{
                                label: 'Réparation',
                                InputLabelProps: {
                                shrink: true
                                },
                                variant: 'outlined'
                            }}
                            options={suggestionsReparation}
                            required
                            isMulti
                            />
                            <TextFieldFormsy
                                className="mt-8 mb-16 mr-8"
                                value={props.state.tva}
                                label="TVA en %"
                                name="tva"
                                type="number"
                                onChange={props.handleChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                             <TextFieldFormsy
                            className="mt-8 mb-16"
                            value={props.state.timber}
                            label="Timber en DT"
                            name="timber"
                            type="number"
                            onChange={props.handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                            variant="outlined"
                            required
                        />
                           
                            <TextFieldFormsy
                                className="mt-8 mb-16"
                                value={props.state.montant_ht}
                                label="Montant hors taxes en Dt"
                                type="number"
                                name="montant_ht"
                                onChange={props.handleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                                margin="normal"
                                variant="outlined"
                                requiredfinalFormValidation
                            />
                            <TextFieldFormsy
                                className="mt-8 mb-16 mr-8"
                                value={props.state.remise}
                                label="Remise en %"
                                name="remise"
                                type="number"
                                onChange={props.handleChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                           
                           <TextFieldFormsy
                                className="mt-8 mb-16 mr-8"
                                label="Remarque"
                                name="remarque"
                                type="remarque"
                                multiline
                                rowsMax="5"
                                rows={5}
                                value={props.state.remarque}
                                onChange={props.handleChange}
                                margin="normal"
                                helperText="décrivez votre pièce en occasion"
                                variant="outlined"
                                required
                            />
                             <Button
                                variant="contained"
                                color="primary"
                                className="w-224 mx-auto mt-16"
                                aria-label="Register"
                                disabled={!this.state.isFormValid}
                                type="submit"
                            >
                                {props.ButtonText}
                            </Button>
                        </Formsy>
                    </CardContent>
                </FuseAnimate>

            </div>
        );
    }

}
export default withRouter(FactureForm);
