import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';

import {FusePageCarded} from '@fuse';
import { withSnackbar } from 'notistack';

import FormHeader from '../sharedComponent/FormHeader'
import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods';
import DileveryForm from './DileveryForm';
import decode from 'jwt-decode';
import env from '../../static';

import {
    withRouter
  } from 'react-router-dom';
const styles = theme => ({
    layoutRoot: {}
});


class NewDilevery extends Component {
    Auth = new AuthHelperMethods();
    request = new Request();
    constructor(props) {
        super(props);
        this.state = {
           category:'',
           categoryOptions:[],
           categoryValidation: false,
           etat:'Non depose',
           etatValidation: false,
           prix:'',
           prixPiece:'',
           avance:'',
           detailsPanne:'',
           couleurAppareil:'',
           centreDepot:'',
           centreDepotOptions:[],
           centreService:'',
           centreServiceOptions:[],
           centreRecuperation:'',
           centreRecuperationOptions:[],
           estimatedTimeReparation: '02:00',
           estimatedTimeLivraison: '02:00',
           difficulty: '',
           numeroSerie:'',
           repairer:'',
           repairerOptions:[],
           client:'',
           clientOptions:[],
           clientValidation: false,
           showExtraData: false,
           gouvernoratsOptions: [],
           delegationsOptions: [],
           localitesOptions: [],
           gouvernorat: '',
           delegation: '',
           localite: '',
           codePostal:'',
           indication:'',
           disponibleA:'',
           disponibleAOptions:[],
           rappelDate:'',
           remarqueClient: '',
           remarqueAcquisition: '',
           remarqueSuivi:'',
           remarqueSatisfaction:'',
           remarqueEquipe:'',
           HAWB:'',
           COD:'',
           etatLivraison:'',
           remarqueLivraison:''
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
        this.handleChangeSelect = this.handleChangeSelect.bind(this);

    }
  
    showExtraData() {
            this.setState({
                showExtraData: true,
            })       
    }
        
    handleChangeSelect(event){
        this.setState({
            diponibilte:event.target.value
        })
    }
    
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }
    handleChangeRappelTime(date){
        this.setState({
            rappelDate:date
        })
    }
    async handleChangeGouvernorat(value) {

        this.setState(state => {
            return {
              gouvernorat: value,
              delegation:'',
              localite:'',
              codePostal:''

            };
          });  
        try {
            const urlDelegation = env.gouvernorats.info
            const data = {
                'name': value.label
            }
         
            const delegations = await this.request.new(urlDelegation, data, false);
         
            this.setState({
                delegationsOptions: delegations.data.delegations
            })

        } catch (e) {
            if(e.response) {
                this.props.enqueueSnackbar(e.response.data.message, { 
                    variant: 'error',
                });
              }else {
                this.props.enqueueSnackbar('Erreur',{ 
                    variant: 'error',
                });
              }
        }

    }
    async handleChangeDelegation(value) {
        this.setState(state => {
            return {
                delegation: value,
                localite:'',
                codePostal:''
            };
          }); 
        try {
            const urlLocalite = env.delegations.info 
            const data = {
                'name': value.label
            }
           
            const localites = await this.request.new(urlLocalite, data, false);
          
            this.setState({
                localitesOptions: localites.data.localites
            })

        } catch (e) {
            if(e.response) {
                this.props.enqueueSnackbar(e.response.data.message, { 
                    variant: 'error',
                });
              }else {
                this.props.enqueueSnackbar('Erreur',{ 
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
            const urlLocalite = env.localites.info 
            const data = {
                'name': value.label
            }
           
            const localite = await this.request.new(urlLocalite, data, false);
          
            this.setState({
                codePostal: localite.data.codePostal
            })
        } catch (e) {
            if(e.response) {
                this.props.enqueueSnackbar(e.response.data.message, { 
                    variant: 'error',
                });
              }else {
                this.props.enqueueSnackbar('Erreur',{ 
                    variant: 'error',
                });
              }
        }

    }




    onTimeChangeReparation(event, time) {
        this.setState({estimatedTimeReparation:time});
      }
    onTimeChangeLivraison(event, time){
        this.setState({estimatedTimeLivraison : time});
    }

    handleChipChangeCategory(value)
    {
        this.setState({
            category: value,
            prix: value.prix,
            categoryValidation: value !== ''?  true: false
        })
            
    }

    handleChipChangeCentreDepot(value)
    {
        this.setState(state => {
            return {
              centreDepot: value
            };
          });    
    }
    handleChipChangeDisponibilite(value)
    {
        this.setState(state => {
            return {
            disponibleA: value
            };
          });    
    }
    handleChipChangeCentreService(value)
    {
        this.setState(state => {
            return {
              centreService: value
            };
          });    
    }
    handleChipChangeCentreRecuperation(value)
    {
        this.setState(state => {
            return {
                centreRecuperation: value
            };
          }); 
    if(value.label === 'domicile'){
        this.showExtraData();
    }          
    }
    handleChipChangeRepairer(value)
    {
        this.setState(state => {
            return {
              repairer: value
            };
          });    
    }
    handleChipChangeClient(value)
    {   
        this.setState({
            client: value, 
            clientValidation: value !== '' ? true: false,
        })
           
    }
    async updateClientOptions(){
        try{
            const urlClients = env.clients.all 
            const clients = await this.request.getAll(urlClients);
            this.setState({
                clientOptions:clients.data,
            })
        }catch(e){
            if(e.response) {
                this.props.enqueueSnackbar(e.response.data.message, { 
                    variant: 'error',
                });
              }else {
                this.props.enqueueSnackbar('Erreur',{ 
                    variant: 'error',
                });
              }        }
       
    }
   
     handleSubmit = async (e) => {
        try {
            const user =  decode(localStorage.getItem('id_token'))

            const reparation = {
                category:this.state.category.key,
                etat: this.state.etat,
                prix: this.state.prix,
                prixPiece: this.state.prixPiece,
                avance: this.state.avance,
                detailsPanne: this.state.detailsPanne,
                couleurAppareil: this.state.couleurAppareil,
                centreDepot: this.state.centreDepot.key,
                centreService: this.state.centreService.key,
                centreRecuperation: this.state.centreRecuperation.key,
                estimatedTimeReparation:this.state.estimatedTimeReparation,
                difficulty: this.state.difficulty,
                estimatedTimeLivraison:this.state.estimatedTimeLivraison,
                numeroSerie: this.state.numeroSerie,
                repairer: this.state.repairer.key,
                client:this.state.client.key,
                extraData: {
                    adress: {
                      gouvernorat: this.state.gouvernorat.label,
                      delegation: this.state.delegation.label,
                      localite: this.state.localite.label,
                      codePostal: this.state.codePostal,
                    },
                    indication: this.state.indication,
                    livraison: {
                        HAWB: this.state.HAWB,
                        COD: this.state.COD,
                        etat: this.state.etatLivraison,
                        remarqueLivraison: this.state.remarqueLivraison,
                      },
                  },
                disponibleA: this.state.disponibleA.key,
                rappel:{title:this.state.numeroSerie,start:this.state.rappelDate, end: this.state.rappelDate},
                remarqueClient: {description: this.state.remarqueClient, owner:user.id},
                remarqueAcquisition:{description: this.state.remarqueAcquisition, owner: user.id} ,
                remarqueSuivi: {description: this.state.remarqueSuivi, owner: user.id},
                remarqueSatisfaction: {description: this.state.remarqueSatisfaction, owner: user.id} ,
                remarqueEquipe: {description: this.state.remarqueEquipe, owner: user.id} 

            }
            
            
            const url = env.deliveries.new 
            await this.request.new(url, reparation, false);
      

            this.props.enqueueSnackbar('Operation reussi avec succes',{ 
                variant: 'success',
              })           
            this.props.history.push('/reparation');
            
        }catch(e){
            if(e.response) {
                this.props.enqueueSnackbar(e.response.data.message, { 
                    variant: 'error',
                });
              }else {
                this.props.enqueueSnackbar('Erreur',{ 
                    variant: 'error',
                });
              }
        }
        

    }
    async componentDidMount(){
        try{
        const urlCategories = env.products.all
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

            this.setState({
                categoryOptions:categories.data,
                centreDepotOptions: centreDepots.data,
                centreServiceOptions: centreServices.data,
                centreRecuperationOptions: centreDepots.data,
                repairerOptions: repairers.data,
                clientOptions:clients.data,
                disponibleAOptions: centreDepots.data
            })
        }catch(e){
            if(e.response) {
                this.props.enqueueSnackbar(e.response.data.message, { 
                    variant: 'error',
                });
              }else {
                this.props.enqueueSnackbar('Erreur',{ 
                    variant: 'error',
                });
              }
              console.log(e)
        }   
        }

    render()
    {
        const {classes} = this.props;
        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <FormHeader
                     returnRoute='/dilevery'
                     title= "ajouter une reparation"

                    />
                }
                content={
                    <DileveryForm 
                    handleSubmit = {this.handleSubmit}
                    state = {this.state} 
                    ButtonText = "ajouter"
                    handleChange = {this.handleChange}
                    handleChipChangeCategory = {this.handleChipChangeCategory}
                    handleChipChangeCentreDepot = {this.handleChipChangeCentreDepot}
                    handleChipChangeCentreService = {this.handleChipChangeCentreService}
                    handleChipChangeRepairer = {this.handleChipChangeRepairer}
                    handleChipChangeClient = {this.handleChipChangeClient}
                    handleChipChangeCentreRecuperation = {this.handleChipChangeCentreRecuperation}
                    onTimeChangeReparation = {this.onTimeChangeReparation}
                    onTimeChangeLivraison = {this.onTimeChangeLivraison}
                    updateClientOptions = {this.updateClientOptions}
                    handleChangeGouvernorat={this.handleChangeGouvernorat}
                    handleChangeDelegation= {this.handleChangeDelegation}
                    handleChangeLocalite = {this.handleChangeLocalite}
                    handleChipChangeDisponibilite = {this.handleChipChangeDisponibilite}
                    handleChangeRappelTime= {this.handleChangeRappelTime}
                    handleChangeSelect= {this.handleChangeSelect}

                   />
                }
            />
        )
    }
}

export default withStyles(styles, {withTheme: true})(withSnackbar(withRouter(NewDilevery)));