import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods'
import {
    withRouter
} from 'react-router-dom';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import AdministratorForm from './AdministratorForm';
import env from '../../static';
import { withSnackbar } from "notistack";

const styles = theme => ({
    layoutRoot: {}
});

class EditAdministrator extends Component {
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
            file: '',
            imagePreviewUrl: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);

    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    fileChangedHandler = (image) => {
        this.setState({ file: image })

    }

    async update(e, data, newData) {

        try {
            let form_data = new FormData();
            form_data.append('fname', this.state.fname);
            form_data.append('lname', this.state.lname);
            form_data.append('email', this.state.email);
            if (this.state.password !== '') {
                form_data.append('password', this.state.password);
            }
            form_data.append('username', this.state.username);
            if (this.state.file !== '') {
                form_data.append('file', this.state.file, this.state.file.name)
            }
            const url = env.admin.update(this.props.match.params.id);
            const response = await this.request.update(url, form_data, true);
            this.props.enqueueSnackbar("Operation reussi avec succes", {
                variant: "success"
            });
            this.props.history.push('/administrator');

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
        }

    }


    async componentDidMount() {
        try {
            const url = env.admin.info;
            const response = await this.request.getById(url, this.props.match.params.id);
            this.setState({
                fname: response.data.fname,
                lname: response.data.lname,
                email: response.data.email,
                username: response.data.username,
            });
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
                        title="modifier un administrateur "
                    />

                }
                content={
                    <AdministratorForm
                        handleChange={this.handleChange}
                        handleSubmit={this.update}
                        state={this.state}
                        ButtonText="modifier"
                        fileChangedHandler={this.fileChangedHandler}
                    />
                }
            />

        )
    }

}
export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditAdministrator)));