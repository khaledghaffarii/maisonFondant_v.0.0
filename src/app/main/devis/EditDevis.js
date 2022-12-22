import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods'
import {
    withRouter
} from 'react-router-dom';
import { withSnackbar } from 'notistack';

import decode from "jwt-decode";
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import DevisForm from './DevisForm';
import env from '../../static';
import { CircularProgress } from "@material-ui/core";
import { Tabs } from "@yazanaabed/react-tabs";
import { useDropzone } from 'react-dropzone';
import { Button } from "@material-ui/core";
const styles = theme => ({
    layoutRoot: {}
});
class EditDevis extends Component {
    Auth = new AuthHelperMethods();
    request = new Request();
    constructor(props) {
        super(props);
        this.state = {
          id: null,
            reparation: {},
            list:{},
            listPieces:{},
            remarque: '',
            timber: 0,
            postedBy: {},
            repairerOptions: [],
            listOption:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.handleChangeRemarque = this.handleChangeRemarque.bind(this);
        this.handleChipChangeReparation = this.handleChipChangeReparation.bind(this);
        this.handleChipChangeList = this.handleChipChangeList.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        });
    }

    async handleChipChangeReparation (value) {
        this.setState({ reparation: value });
        let listCategory;
        listCategory=await Promise.all(value.map(async (obj) => {
       
                return obj.value.category?.parent;
        }))
    
        const urlClient=env.products.allForDevis;
        const lists=await this.request.getByCategory(urlClient,listCategory);
        this.setState({listOption:lists.data });
    }
    handleChangeRemarque(content) {
        this.setState({ content })
    }
    handleChipChangeList(value) {
    
        this.setState({ listPieces: value });
    }
    async update() {
        const { remarque, timber,  reparation,listPieces } = this.state;
        try {
            const url = env.devis.update(this.props.match.params.id);
            let test=true;
            let e=null;
            let o=null;
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
            const user = decode(localStorage.getItem("id_token"));
            const response = await this.request.new(url, {reparation:rep,etat:e,owner:o,remarque,listPieces,timber,updatedBy:user.id}, false);
            this.props.enqueueSnackbar('Operation reussi avec succes', {
                variant: 'success',
            })
            this.props.history.push('/devis');

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
    async componentDidMount() {
        try {
            const url = env.devis.info;
            const devis = await this.request.getById(url, this.props.match.params.id);
            const urlRepairers = env.reparations.allForDevis;
            const repairers = await this.request.getAll(urlRepairers);
        
        let lis=await Promise.all(devis.data.listPieces.map(async (item) => {
            return {
            Piece: {
                value: {id:item.piece?._id,prix:item.piece?.prix}
            },Quantite:item.quantite,Remise:item.remise,prix:item.piece?.prix
            };
        }))
       const rep = await Promise.all(devis.data.reparation.map(async (obj) => {
                return {
                    key: obj._id,
                    value: {id:obj._id,owner:obj.owner,etat:obj.etat},
                    label: `${obj.code}`
                };
            }))
                    this.setState({
                        repairerOptions: repairers.data,
                        id: devis.data._id,
                        remarque: devis.data.remarque,
                        timber: devis.data.timber,
                        reparation:rep,
                        list:lis,
                        loading: false,
                    })
                
                
              
            
            
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
                        returnRoute='/devis'
                        title="Modifier un devis"

                    />

                }

                content={
                    this.state.loading ?
                        <div style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress color="secondary" />
                            <h1>Chargement...</h1>
                        </div>
                        :
                        <Tabs
                            activeTab={{
                                id: "tab1"
                            }}
                        >
                            <Tabs.Tab id="tab1" title="Information Piece">
                                <div style={{ padding: 20 }} className="flex flex-col justify-center w-full">
                                    <div class="row">
                                        <DevisForm
                                            showCover={this.state.showCover}
                                            handleSubmit={this.update}
                                            state={this.state}
                                            ButtonText="Metter À jour"
                                            handleChange={this.handleChange}
                                            fileChangedHandler={this.fileChangedHandler}
                                            handleChangeSelect={this.handleChangeSelect}
                                            handleChangeRemarque={this.handleChangeRemarque}
                                            handleChipChangeReparation={this.handleChipChangeReparation}
                                            handleChipChangeList={this.handleChipChangeList}
                                            id={this.props.match.params.id}
                                        />
                                    </div>
                                </div>
                            </Tabs.Tab>
                          
                        </Tabs>
                }
            />

        )
    }

}
export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditDevis)));