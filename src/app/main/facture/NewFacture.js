import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';
import FormHeader from '../sharedComponent/FormHeader'
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import FactureForm from './FactureForm';
import env from '../../static';
import {
    withRouter
} from 'react-router-dom';

const styles = theme => ({
    layoutRoot: {}
});
class NewDevis extends Component {
    Auth = new AuthHelperMethods();
    request = new Request();
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            reparation: {},
            remarque: '',
            tva: 0,
            timber: 0,
            montant_ht: 0,
            remise:0,
            postedBy: {},
            repairerOptions: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeRemarque = this.handleChangeRemarque.bind(this);
        this.handleChipChangeReparation = this.handleChipChangeReparation.bind(this);
    }
    fileChangedHandler = (image) => {
        this.setState({ file: image })

    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    }

    handleChangeSelect(event) {
        this.setState({
            lang: event
        })
    }
    handleChipChangeReparation(value) {
        this.setState({ reparation: value });
    }
    handleSubmit = async (e) => {
        const { reparation, remarque, tva, timber, montant_ht, postedBy,remise } = this.state;
        try {
            let test=true;
            let e=null;
            let o=null;
            const url = env.devis.new;
            const rep = await Promise.all(reparation.map(async (obj) => {
                if(e!=null){
                    if(e!=obj.value.etat){
                        test=false;
                    }

                }
                e=obj.value.etat;
                o=obj.value.owner;
                return obj.value.id;
            }))
          
          if(test==true){
            const response = await this.request.new(url, { reparation: rep,etat:e,owner:o, remarque, tva, timber, montant_ht, postedBy: postedBy.value,remise }, false);
            this.props.enqueueSnackbar('Operation reussi avec succes', {
                variant: 'success',
            })
            this.setState({ id: response.data._id })
        }else{
            this.props.enqueueSnackbar("les réparations doivent être de même client", {
                variant: 'error',
            });
        }
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
    handleChangeRemarque(content) {
        this.setState({ content })
    }
    async componentDidMount() {
        const urlRepairers = env.reparations.allForDevis;
        const repairers = await this.request.getAll(urlRepairers);
        
        this.setState({ repairerOptions: repairers.data, });
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
                        returnRoute='/facture'
                        title="Ajouter un facture"
                    />
                }
                content={
                    this.state.id ?
                        <ImageManager id={this.state.id} />
                        :
                        <FactureForm
                            handleSubmit={this.handleSubmit}
                            state={this.state}
                            ButtonText="Ajouter"
                            handleChange={this.handleChange}
                            fileChangedHandler={this.fileChangedHandler}
                            handleChangeSelect={this.handleChangeSelect}
                            handleChangeRemarque={this.handleChangeRemarque}
                            handleChipChangeReparation={this.handleChipChangeReparation}
                        />
                }
            />
        )
    }
}

export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewDevis)));
