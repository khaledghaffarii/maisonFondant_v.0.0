/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';

import FormHeader from '../sharedComponent/FormHeader'
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import ReparationForm from './FinancialForm';
import decode from 'jwt-decode';
import env from '../../static';

import {
    withRouter
} from 'react-router-dom';
const styles = theme => ({
    layoutRoot: {}
});


class NewFinancial extends Component {
    Auth = new AuthHelperMethods();
    request = new Request();
    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            productID: '',
            productsOptions: [],
            etat: 'Non depose',
            etatValidation: false,
            prix: '',
            prixPiece: '',
            avance: '',
            detailsPanne: '',
            couleurAppareil: '',
            centreDepot: '',
            centreDepotOptions: [],
            centreService: '',
            centreServiceOptions: [],
            centreRecuperation: '',
            centreRecuperationOptions: [],
            estimatedTimeReparation: '02:00',
            estimatedTimeLivraison: '02:00',
            difficulty: '',
            numeroSerie: '',
            repairer: '',
            repairerOptions: [],
            client: '',
            clientValidation: false,
            clientOptions: [],
            showExtraData: false,
            gouvernoratsOptions: [],
            delegationsOptions: [],
            localitesOptions: [],
            gouvernorat: '',
            delegation: '',
            localite: '',
            codePostal: '',
            indication: '',
            disponibleA: '',
            disponibleAOptions: [],
            rappelDate: undefined,
            remarqueClient: '',
            remarqueClientList: [],
            remarqueAcquisition: '',
            remarqueSuivi: '',
            remarqueSatisfaction: '',
            remarqueEquipe: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChipChangeCategory = this.handleChipChangeCategory.bind(this);
        this.handleChipChangeCentreDepot = this.handleChipChangeCentreDepot.bind(this);
        this.handleChipChangeCentreService = this.handleChipChangeCentreService.bind(this);
        this.handleChipChangeRepairer = this.handleChipChangeRepairer.bind(this);
        this.handleChipChangeClient = this.handleChipChangeClient.bind(this);
        this.handleChipChangeCentreRecuperation = this.handleChipChangeCentreRecuperation.bind(this);
        this.onTimeChangeReparation = this.onTimeChangeReparation.bind(this);
        this.onTimeChangeLivraison = this.onTimeChangeLivraison.bind(this);
        this.updateClientOptions = this.updateClientOptions.bind(this);
        this.handleChangeGouvernorat = this.handleChangeGouvernorat.bind(this);
        this.handleChangeDelegation = this.handleChangeDelegation.bind(this);
        this.handleChangeLocalite = this.handleChangeLocalite.bind(this);
        this.handleChipChangeDisponibilite = this.handleChipChangeDisponibilite.bind(this);
        this.handleChangeRappelTime = this.handleChangeRappelTime.bind(this);
        this.handleChangeEtat = this.handleChangeEtat.bind(this);

    }

    showExtraData() {
        this.setState({
            showExtraData: true,
        })
    }

    handleChangeEtat(value) {
        this.setState({
            etat: value,
            etatValidation: value !== '' ? true : false
        })
    }

    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleChangeRappelTime(date) {
        this.setState({
            rappelDate: date
        })
    }
    async handleChangeGouvernorat(value) {

        this.setState(state => {
            return {
                gouvernorat: value,
                delegation: '',
                localite: '',
                codePostal: ''

            };
        });
        try {
            const urlDelegation = env.gouvernorats.info;
            const data = {
                'name': value.label
            }
            const delegations = await this.request.new(urlDelegation, data, false);
            this.setState({
                delegationsOptions: delegations.data.delegations
            })

        } catch (e) {
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
    async handleChangeDelegation(value) {
        this.setState(state => {
            return {
                delegation: value,
                localite: '',
                codePostal: ''
            };
        });
        try {
            const urlLocalite = env.delegations.info;
            const data = {
                'name': value.label
            }
            const localites = await this.request.new(urlLocalite, data, false);


            this.setState({
                localitesOptions: localites.data.localites
            })

        } catch (e) {
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

    async handleChangeLocalite(value) {
        this.setState(state => {
            return {
                localite: value
            };
        });
        try {
            const urlLocalite = env.localites.info;
            const data = {
                'name': value.label
            }
            const localite = await this.request.new(urlLocalite, data, false);
            this.setState({
                codePostal: localite.data.codePostal
            })
        } catch (e) {
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
    onTimeChangeReparation(event, time) {
        this.setState({ estimatedTimeReparation: time });
    }
    onTimeChangeLivraison(event, time) {
        this.setState({ estimatedTimeLivraison: time });
    }

    handleChipChangeCategory(value) {
        this.setState({
            category: value,
            prix: value.prix,
            categoryValidation: value !== '' ? true : false,
        })

    }

    handleChipChangeCentreDepot(value) {
        this.setState(state => {
            return {
                centreDepot: value
            };
        });
        if (value.label === 'domicile') {
            this.showExtraData();
        }
    }
    handleChipChangeDisponibilite(value) {
        this.setState(state => {
            return {
                disponibleA: value
            };
        });
    }
    handleChipChangeCentreService(value) {
        this.setState(state => {
            return {
                centreService: value
            };
        });
    }
    handleChipChangeCentreRecuperation(value) {
        this.setState(state => {
            return {
                centreRecuperation: value
            };
        });
        if (value.label === 'domicile') {
            this.showExtraData();
        }
    }
    handleChipChangeRepairer(value) {
        this.setState(state => {
            return {
                repairer: value
            };
        });
    }
    handleChipChangeClient(value) {
        this.setState({
            client: value,
            clientValidation: value !== '' ? true : false,
        })
    }
    async updateClientOptions() {
        try {
            const urlClients = env.clients.all
            const clients = await this.request.getAll(urlClients);
            this.setState({
                clientOptions: clients.data,
            })
        } catch (e) {
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


    handleSubmit = async (e) => {
        try {
            const user = decode(localStorage.getItem('id_token'))
            const reparation = {
                category: this.state.category.key,
                etat: this.state.etat,
                prix: this.state.prix,
                prixPiece: this.state.prixPiece,
                avance: this.state.avance,
                detailsPanne: this.state.detailsPanne,
                couleurAppareil: this.state.couleurAppareil,
                centreDepot: this.state.centreDepot.key,
                centreService: this.state.centreService.key,
                centreRecuperation: this.state.centreRecuperation.key,
                estimatedTimeReparation: this.state.estimatedTimeReparation,
                difficulty: this.state.difficulty,
                estimatedTimeLivraison: this.state.estimatedTimeLivraison,
                numeroSerie: this.state.numeroSerie,
                repairer: this.state.repairer.key,
                client: this.state.client.key,
                extraData: {
                    adress: {
                        gouvernorat: this.state.gouvernorat.label,
                        delegation: this.state.delegation.label,
                        localite: this.state.localite.label,
                        codePostal: this.state.codePostal,
                    },
                    indication: this.state.indication,
                },
                disponibleA: this.state.disponibleA.key,
                rappel: this.state.rappelDate ? { title: this.state.numeroSerie, start: this.state.rappelDate, end: this.state.rappelDate } : undefined,
                remarqueClient: this.state.remarqueClient ? { description: this.state.remarqueClient, owner: user.id } : undefined,
                remarqueAcquisition: this.state.remarqueAcquisition ? { description: this.state.remarqueAcquisition, owner: user.id } : undefined,
                remarqueSuivi: this.state.remarqueSuivi ? { description: this.state.remarqueSuivi, owner: user.id } : undefined,
                remarqueSatisfaction: this.state.remarqueSatisfaction ? { description: this.state.remarqueSatisfaction, owner: user.id } : undefined,
                remarqueEquipe: this.state.remarqueEquipe ? { description: this.state.remarqueEquipe, owner: user.id } : undefined,

            }


            const url = env.reparations.new
            await this.request.new(url, reparation, false);
            this.props.enqueueSnackbar('Operation reussi avec succes', {
                variant: 'success',
            })

            this.props.history.push('/reparation');

        } catch (e) {
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

    async handleSuggestProducts(value) {
        try {
            let url = env.products.listSuggestion + '?';
            url += '&search=' + value;
            this.setState({
                productName: value,
                productID: '',
                prix: ''
            })
            const products = await this.request.getAll(url);
            await this.setState({
                productsOptions: products.data,
            });
        } catch (e) {
            console.log(e);
        }

    }
    handleSelect(id, name, prix) {
        this.setState({
            productName: name.toString(),
            productID: id,
            prix: prix,
            productsOptions: []
        })
    }
    async componentDidMount() {
        try {
            const urlCategories = env.categories.all
            const categories = await this.request.getAll(urlCategories);
            const urlCentreDepots = env.boutiques.all
            const centreDepots = await this.request.getAll(urlCentreDepots);

            const urlCentreServices = env.boutiques.all
            const centreServices = await this.request.getAll(urlCentreServices);

            const urlRepairers = env.repairers.all
            const repairers = await this.request.getAll(urlRepairers);

            const urlClients = env.clients.all
            const clients = await this.request.getAll(urlClients);
            const urlGouvernorats = env.gouvernorats.all
            const gouvernorats = await this.request.getAll(urlGouvernorats);
            this.setState({
                gouvernoratsOptions: gouvernorats.data
            })
            let catOptions = [];
            categories.data.map(elem => {
                if (elem.prix > 0) {
                    catOptions.push(elem)
                }

            });
            let centreSerOptions = [];
            centreServices.data.map(elem => {
                if (elem.name !== 'domicile') {
                    centreSerOptions.push(elem)
                }

            });


            this.setState({
                centreDepotOptions: centreDepots.data,
                centreServiceOptions: centreSerOptions,
                centreRecuperationOptions: centreDepots.data,
                repairerOptions: repairers.data,
                clientOptions: clients.data,
                disponibleAOptions: centreDepots.data,
                categoryOptions: catOptions,



            })
        } catch (e) {
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
                        returnRoute='/financial'
                        title="ajouter une reparation"

                    />
                }
                content={
                    <ReparationForm
                        handleSubmit={this.handleSubmit}
                        state={this.state}
                        ButtonText="ajouter"
                        handleChange={this.handleChange}
                        handleChipChangeCategory={this.handleChipChangeCategory}
                        handleChipChangeCentreDepot={this.handleChipChangeCentreDepot}
                        handleChipChangeCentreService={this.handleChipChangeCentreService}
                        handleChipChangeRepairer={this.handleChipChangeRepairer}
                        handleChipChangeClient={this.handleChipChangeClient}
                        handleChipChangeCentreRecuperation={this.handleChipChangeCentreRecuperation}
                        onTimeChangeReparation={this.onTimeChangeReparation}
                        onTimeChangeLivraison={this.onTimeChangeLivraison}
                        updateClientOptions={this.updateClientOptions}
                        handleChangeGouvernorat={this.handleChangeGouvernorat}
                        handleChangeDelegation={this.handleChangeDelegation}
                        handleChangeLocalite={this.handleChangeLocalite}
                        handleChipChangeDisponibilite={this.handleChipChangeDisponibilite}
                        handleChangeRappelTime={this.handleChangeRappelTime}
                        handleChangeEtat={this.handleChangeEtat}

                        handleSuggestProducts = {this.handleSuggestProducts.bind(this)}
                        handleSelect = {this.handleSelect.bind(this)}
                        ShowEdit={false}
                    />
                }
            />
        )
    }
}

export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewFinancial)));