import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods'
import {
    withRouter
} from 'react-router-dom';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import { FuseAnimate, } from '@fuse';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import env from '../../static';
import { withSnackbar } from "notistack";

const styles = theme => ({
    layoutRoot: {}
});


class DetailsAdministrator extends Component {
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
            imagePreviewUrl: '',
            picture: ''
        }

    }

    async componentDidMount() {
        try {
            const url = env.admin.info;
            console.log(this.props.match.params.id)
            const response = await this.request.getById(url, this.props.match.params.id);
            this.setState({
                fname: response.data.fname,
                lname: response.data.lname,
                email: response.data.email,
                username: response.data.username,
                picture: response.data.picture
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
                        title="details administrator "

                    />

                }

                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <FuseAnimate animation="transition.expandIn">
                            <CardContent className="flex flex-col items-center justify-center p-32">

                                <Formsy
                                    className="flex flex-col justify-center w-full"

                                >
                                    <img alt="Crop" style={{ maxWidth: '100%' }} src={`${env.staticFiles}${this.state.picture}`} />

                                    <TextFieldFormsy
                                        className="mt-8 mb-16 mr-8"
                                        value={this.state.fname}
                                        type="text"
                                        name="fname"
                                        label="Fname"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextFieldFormsy
                                        className="mt-8 mb-16 mr-8"
                                        value={this.state.lname}
                                        type="text"
                                        name="lname"
                                        label="Lname"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />

                                    <TextFieldFormsy
                                        className="mt-8 mb-16"
                                        value={this.state.email}
                                        type="email"
                                        name="email"
                                        label="Email"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}

                                    />

                                    <TextFieldFormsy
                                        className="mt-8 mb-16"
                                        value={this.state.username}
                                        type="text"
                                        name="username"
                                        label="Username"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />


                                </Formsy>
                            </CardContent>

                        </FuseAnimate>

                    </div>



                }
            />

        )
    }

}
export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(DetailsAdministrator)));