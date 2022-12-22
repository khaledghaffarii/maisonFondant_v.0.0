import React, { Component } from 'react';
import { Button, CardContent, } from '@material-ui/core';
import {TextFieldFormsy, } from '@fuse';
import CroppedImage from '../sharedComponent/CroppedImage';
import { FuseAnimate, } from '@fuse';
import Formsy from 'formsy-react';
import {
    withRouter
  } from 'react-router-dom';

class AdministratorForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFormValid : false,
        }
        this.disableButton = this.disableButton.bind(this);
        this.enableButton = this.enableButton.bind(this);
    }
    disableButton(){
        this.setState({
            isFormValid: false,
        })
    }
    enableButton()
    {
        this.setState({
            isFormValid: true,
        })
    }


    render() {
        
        const props = this.props;

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
                             
                             <CroppedImage 
                                fileChangedHandler = {props.fileChangedHandler}
                            />
                            
                            <TextFieldFormsy
                                className="mt-8 mb-16 mr-8"
                                value={props.state.fname}
                                type="text"
                                name="fname"
                                label="Fname"
                                onChange={props.handleChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />
                            <TextFieldFormsy
                                className="mt-8 mb-16 mr-8"
                                value={props.state.lname}
                                type="text"
                                name="lname"
                                label="Lname"
                                onChange={props.handleChange}
                                margin="normal"
                                variant="outlined"
                                required
                            />

                            <TextFieldFormsy
                                className="mt-8 mb-16"
                                value={props.state.email}
                                type="email"
                                name="email"
                                label="Email"
                                onChange={props.handleChange}
                                validations="isEmail"
                                 validationError="This is not a valid email"
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                required
                                
                            />
                            <TextFieldFormsy
                                className="mt-8 mb-16"
                                value={props.state.password}
                                type="password"
                                name="password"
                                label="Password" 
                                autoComplete="current-password"
                                margin="normal"
                                variant="outlined"
                                onChange={props.handleChange}
                            />
                            <TextFieldFormsy
                                className="mt-8 mb-16"
                                value={props.state.username}
                                type="text"
                                name="username"
                                label="Username"
                                margin="normal"
                                variant="outlined"
                                onChange={props.handleChange}
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

export default withRouter(AdministratorForm);
