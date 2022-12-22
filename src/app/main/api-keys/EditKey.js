import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

import Request from '../../utils/Request';
import AuthHelperMethods from '../../services/AuthHelperMethods'
import {
    withRouter
  } from 'react-router-dom';
import env from '../../static'; 
import { FusePageCarded } from '@fuse';
import FormHeader from '../sharedComponent/FormHeader';
import ClientForm from './KeyForm';
const styles = theme => ({
    layoutRoot: {}
});

class EditClient extends Component {
    Auth = new AuthHelperMethods();
    request = new Request();
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            gouvernorat: '',
            delegation: '',
            localite: '',
            codePostal:'',
            email: '',
            username: '',
            password: '',
            file: '',
            phone: '',
            gouvernoratsOptions: [],
            delegationsOptions: [],
            localitesOptions: []
            }
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleChangeGouvernorat = this.handleChangeGouvernorat.bind(this);
        this.handleChangeDelegation = this.handleChangeDelegation.bind(this);
        this.handleChangeLocalite = this.handleChangeLocalite.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
        if(name === 'fname' || name === 'lname' ){
            this.generateUserName(name, value)
        }
           }
    fileChangedHandler =  (image) => {
        this.setState({ file: image })
    
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

    async update() {
        try{
        let form_data = new FormData();
        form_data.append('fname',this.state.fname);
        form_data.append('lname', this.state.lname);
        form_data.append('gouvernorat', this.state.gouvernorat.label);
        form_data.append('delegation', this.state.delegation.label);
        form_data.append('localite', this.state.localite.label);
        form_data.append('codePostal', this.state.codePostal);
        form_data.append('email',this.state.email);
        form_data.append('username', this.state.username);
        if (this.state.password !== ''){
            form_data.append('password',this.state.password);
        }      
        if(this.state.file !== ''){
            form_data.append('file', this.state.file, this.state.file.name)
        }    
        form_data.append('phone', this.state.phone);
        
        const url = env.clients.update(this.props.match.params.id); 
        await this.request.update(url, form_data, true);

        this.props.enqueueSnackbar('Operation reussi avec succes',{ 
            variant: 'success',
          })
            
        this.props.history.push('/client');

        
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
    

    async componentDidMount() {
        try{
            const url = env.clients.info;
            const response = await this.request.getById(url, this.props.match.params.id);
                this.setState({
                    fname: response.data.fname,
                    lname: response.data.lname,
                    gouvernorat: response.data.adress ? {
                        key: '1',
                        value: '1',
                        label: response.data.adress.gouvernorat
                    }: '', 
                    delegation: response.data.delegation ? {
                        key: '2',
                        value:'2',
                        label:response.data.adress.delegation     
                        } : '',   
                    localite: response.data.localite ? {
                        key:'3',
                        value:'3',
                        label:response.data.adress.localite
                    }: '',
                    codePostal: response.data.adress ? response.data.adress.codePostal:'',
                    email: response.data.email,
                    username: response.data.username,
                    phone: response.data.phone
                })
            const urlGouvernorats = env.gouvernorats.all 
            const gouvernorats = await this.request.getAll(urlGouvernorats);
            this.setState({
                gouvernoratsOptions: gouvernorats.data
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
              
        }
       

    }
    generateUserName = (name, value) => {
        let username = name === 'fname' ? value +this.state.lname : this.state.fname + value;
        this.checkUserName(username);
        
    }
    async checkUserName(username){
        try{
            const url = env.clients.searchUserName 
            const data = { username }
            await this.request.new(url,data , false);
            this.setState({
                username,
            })
         }catch(e){
            username = username + Math.floor(Math.random() * 1000) 
            this.checkUserName(username)
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

    render() {

        const { classes } = this.props;

        return (
            <FusePageCarded
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <FormHeader
                        returnRoute='/client'
                        title= "modifier un client "

                    />

                }

                content= {
                    <ClientForm 
                    handleChange ={this.handleChange}
                    handleSubmit = {this.update}
                    state = {this.state} 
                    ButtonText = "modifier"
                    fileChangedHandler = {this.fileChangedHandler}
                    handleChangeGouvernorat={this.handleChangeGouvernorat}
                    handleChangeDelegation= {this.handleChangeDelegation}
                    handleChangeLocalite = {this.handleChangeLocalite}
                    showPassword = {false}
                    />
                    
                    
                }
            />

        )
    }

}
export default withStyles(styles, { withTheme: true })(withSnackbar(withRouter(EditClient)));