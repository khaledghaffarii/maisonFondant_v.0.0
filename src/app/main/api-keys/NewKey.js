import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader'
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import KeyForm from './KeyForm';
import env from '../../static';
import {
    withRouter
} from 'react-router-dom';
const styles = theme => ({
    layoutRoot: {}
});
class NewKey extends Component {
    Auth = new AuthHelperMethods();
    request = new Request();
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        try {
            const url = env.keys.new;
            await this.request.new(url, this.state);
            this.props.enqueueSnackbar('Operation reussi avec succes', {
                variant: 'success',
            })

            this.props.history.push('/api-keys/list');


        } catch (err) {

            if (e.response) {
                this.props.enqueueSnackbar(e.response.data.message, {
                    variant: 'error',
                });
            } else {
                this.props.enqueueSnackbar('Erreur', {
                    variant: 'error',
                });
            }

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
                        returnRoute='/api-keys'
                        title="Ajouter API Key"

                    />

                }
                content={
                    <KeyForm
                        handleChange={this.handleChange}
                        handleSubmit={this.handleSubmit}
                        state={this.state}
                        ButtonText="ajouter"
                    />
                }
            />
        )
    }
}

export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewKey)));