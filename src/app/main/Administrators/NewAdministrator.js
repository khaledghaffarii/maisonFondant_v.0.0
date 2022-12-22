import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from "notistack";

import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader'
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import {
    withRouter
} from 'react-router-dom';
import AdministratorForm from './AdministratorForm';
import env from '../../static';
const styles = theme => ({
    layoutRoot: {}
});


class NewAdministrator extends Component {
    Auth = new AuthHelperMethods();
    request = new Request();
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            username: '',
            file: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
    }

    fileChangedHandler = (image) => {
        this.setState({ file: image })

    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleSubmit = async (e) => {
        try {
            let form_data = new FormData();
            form_data.append('fname', this.state.fname);
            form_data.append('lname', this.state.lname);
            form_data.append('email', this.state.email);
            form_data.append('password', this.state.password);
            form_data.append('username', this.state.username);
            if (this.state.file !== '') {
                form_data.append('file', this.state.file, this.state.file.name);
            }
            const url = env.admin.new;
            await this.request.new(url, form_data, true);
            this.props.enqueueSnackbar("Operation reussi avec succes", {
                variant: "success"
            });
            this.props.history.push('/administrator')


        } catch (e) {
            if (e.response) {
                this.props.enqueueSnackbar(e.response.data.message, {
                    variant: "error"
                });
            } else {
                this.props.enqueueSnackbar("Erreur", {
                    variant: "error"
                });
            }
            this.props.history.push('/newadministrator');
        }



    }


    render() {
        const { classes } = this.props;
        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <FormHeader
                        returnRoute='/administrator'
                        title="ajouter un administrateur"

                    />

                }
                content={
                    <AdministratorForm
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        state={this.state}
                        ButtonText="ajouter"
                        fileChangedHandler={this.fileChangedHandler}
                    />
                }
            />
        )
    }
}

export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewAdministrator)));