import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FusePageCarded } from '@fuse';
import { withSnackbar } from 'notistack';
import decode from "jwt-decode";
import AuthHelperMethods from '../../services/AuthHelperMethods'
import FormHeader from '../sharedComponent/FormHeader'
import Request from '../../utils/Request';
import DevisForm from './DevisForm';
import env from '../../static';
import { withTranslation, Translation } from "react-i18next";
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
            categoryList:{},
            list:{},
            remarque: '',
            timber: 0,
            postedBy: {},
            repairerOptions: [],
            listOption:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleChangeRemarque = this.handleChangeRemarque.bind(this);
        this.handleChipChangeReparation = this.handleChipChangeReparation.bind(this);
        this.handleChipChangeList = this.handleChipChangeList.bind(this);
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
    async handleChipChangeReparation (value) {
        this.setState({ reparation: value });
        let listCategory;
        listCategory=await Promise.all(value.map(async (obj) => {
                return obj.value.category?.parent;
        }))
       // console.log("listCategory"+listCategory);
        const urlClient=env.products.allForDevis;
        const lists=await this.request.getByCategory(urlClient,listCategory);
        this.setState({listOption:lists.data });
    }
    handleChipChangeList(value) {
       // console.log("value",value);
        this.setState({ list: value });
    }
    handleSubmit = async (e) => {
        const { list,reparation, remarque, timber, postedBy } = this.state;
        
           
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
          //  console.log("reparation.value."+reparation);
          if(test==true){
            const user = decode(localStorage.getItem("id_token"));
            const response = await this.request.new(url, { reparation: rep,etat:e,owner:o, remarque,list, timber, createdBy: user.id }, false);
            this.props.enqueueSnackbar('Operation reussi avec succes', {
                variant: 'success',
            })
          //  console.log("response"+response.data.tva);
            this.setState({ id: response.data._id })
            
            this.props.history.push(`/devis/imprimer/${response.data._id}`);
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
        //console.log('repairers.data'+repairers.data);
        this.setState({ repairerOptions: repairers.data});
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
                        title={this.props.t("devis.addDevisTitle")}
                    />
                }
                content={
                        <DevisForm
                            handleSubmit={this.handleSubmit}
                            state={this.state}
                            ButtonText="Ajouter"
                            handleChange={this.handleChange}
                            fileChangedHandler={this.fileChangedHandler}
                            handleChangeSelect={this.handleChangeSelect}
                            handleChangeRemarque={this.handleChangeRemarque}
                            handleChipChangeReparation={this.handleChipChangeReparation}
                            handleChipChangeList={this.handleChipChangeList}
                        />
                }
            />
        )
    }
}
export default withTranslation()(
    withStyles(styles, { withTheme: true })(withSnackbar(withRouter(NewDevis)))
  );