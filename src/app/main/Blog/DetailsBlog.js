import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods'
import { withSnackbar } from 'notistack';

import {
    withRouter
} from 'react-router-dom';
import Formsy from 'formsy-react';
import { TextFieldFormsy } from '@fuse';
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import { FuseAnimate, } from '@fuse';
import env from '../../static';
const styles = theme => ({
    layoutRoot: {}
});

class DetailsBlog extends Component {
    Auth = new AuthHelperMethods();
    request = new Request();
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            prix: 0,
            parent: '',
            optionParent: [],
            couleur: '',
            disponibilite: '',
            file: '',
            show: false,

        }

    }
    async componentDidMount() {
        try {
            const url = env.categories.info;
            const response = await this.request.getById(url, this.props.match.params.id);
            const urlParent = env.categories.all;
            const parent = await this.request.getAll(urlParent);
            console.log(response.data)
            let parentValue;
            if (response.data.parent) {
                parentValue = response.data.parent.name

            } else {
                parentValue = ''

            }
            this.setState({
                name: response.data.name,
                prix: response.data.prix,
                parent: parentValue,
                optionParent: parent.data,
                couleur: response.data.couleur,
                disponibilite: response.data.disponibilite,
                file: response.data.picture,

            })

            response.data.prix > 0 ? this.setState({ show: true }) : this.setState({ show: false })


        }
        catch (e) {
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
                        returnRoute='/blog'
                        title="modifier une categorie"
                    />
                }
                content={
                    <div className="p-16 sm:p-24 max-w-2xl">
                        <FuseAnimate animation="transition.expandIn">
                            <CardContent className="flex flex-col items-center justify-center p-32">
                                <Formsy
                                    className="flex flex-col justify-center w-full"
                                >
                                    <img alt="Crop" style={{ maxWidth: '100%' }} src={`${env.staticFiles}${this.state.file}`} />
                                    <TextFieldFormsy
                                        className="mt-8 mb-16 "
                                        value={this.state.name}
                                        label="name"
                                        name="name"
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextFieldFormsy
                                        className="mt-8 mb-16 "
                                        value={this.state.prix}
                                        label="prix"
                                        name="prix"
                                        type="number"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    <TextFieldFormsy
                                        className="mt-8 mb-16 "
                                        value={this.state.parent}
                                        label="parent"
                                        name="parent"
                                        type="text"
                                        margin="normal"
                                        variant="outlined"
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                    {this.state.show ? (

                                        <TextFieldFormsy
                                            className="mt-8 mb-16 "
                                            value={this.state.couleur}
                                            label="couleur"
                                            name="couleur"
                                            type="text"
                                            margin="normal"
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />
                                    ) : (null)

                                    }
                                    {this.state.show ? (
                                        <TextFieldFormsy
                                            className="mt-8 mb-16 "
                                            value={this.state.disponibilite}
                                            label="disponibilite"
                                            name="disponibilite"
                                            type="text"
                                            margin="normal"
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                        />


                                    ) : (null)

                                    }



                                </Formsy>
                            </CardContent>
                        </FuseAnimate>

                    </div>


                }
            />
        )
    }
}
export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(DetailsBlog)));