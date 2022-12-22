import React, { Component } from "react";
import { Button, CardContent } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { FuseChipSelect } from "@fuse";
import Formsy from "formsy-react";
import { TextFieldFormsy } from "@fuse";
import List from "./list";
import { withRouter } from "react-router-dom";
import { withTranslation, Translation } from "react-i18next";
class DevisForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormValid: false,
    };
    this.disableButton = this.disableButton.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.handleChipChangeValid = this.handleChipChangeValid.bind(this);
  }

  disableButton() {
    this.setState({
      isFormValid: false,
    });
  }
  enableButton() {
    this.setState({
      isFormValid: true,
    });
  }
  handleChipChangeValid(value) {
    let t = false;
    value.map((data) => {
      //console.log("aaaa",data.Piece,"data.Quantite",data.Quantite,"data.Remise",data.Remise);
      switch ("") {
        case data.Piece:
          t = true;
          break;
        case data.Quantite:
          t = true;
          break;
        case data.Remise:
          t = true;
          break;
        case data.tva:
          t = true;
          break;
      }

      if (t == true) {
        this.setState({
          isFormValid: false,
        });
      } else {
        this.setState({

            isFormValid: true,
        })
    }
  })
  }
    handleChipChangeValid(value) {
        let t=false;
        value.map((data)=>{
            //console.log("aaaa",data.Piece,"data.Quantite",data.Quantite,"data.Remise",data.Remise);
            switch (""){
                case data.Piece:
                  t=true;
                  break;
                case data.Quantite:
                  t=true;
                  break;
                case data.Remise:
                  t=true;
                  break;
                case data.tva:
                  t=true;
                  break;      
                      }
                      
              if(t==true){
                this.setState({
                    isFormValid: false,
                });
              }else{
                this.setState({
                    isFormValid: true,
                });
              }
        })
     }
    // render() {
    //     const props = this.props;
    //     const suggestionsReparation = props.state.repairerOptions.map(item => (
    //         {
    //         key: item._id,
    //         value: {id:item._id,owner:item.owner,etat:item.etat,category:item.category},
    //         label: `${item.code}`
    //       }));
    //       const suggestionsList = props.state.listOption.map(item => (
    //         {
    //         key: item._id,
    //         value: {id:item._id,prix:item.prix},
    //         label: `${item.displayName?item.displayName:item.name}`
    //       }));
    //     return (
    //         <div className="p-16 sm:p-24 max-w-2xl">
    //             <FuseAnimate animation="transition.expandIn">
    //                 <CardContent className="flex flex-col items-center justify-center p-32">
    //                     <Formsy
    //                         onValidSubmit={props.handleSubmit}
    //                         onValid={this.enableButton}
    //                         onInvalid={this.disableButton}
    //                         className="flex flex-col justify-center w-full"
    //                     >
    //                         <FuseChipSelect
    //                         className="w-full my-16"
    //                         value={props.state.reparation}
    //                         onChange={props.handleChipChangeReparation}
    //                         placeholder="Select reparation"
    //                         textFieldProps={{
    //                             label: 'Réparation',
    //                             InputLabelProps: {
    //                             shrink: true
    //                             },
    //                             variant: 'outlined'
    //                         }}
    //                         options={suggestionsReparation}
    //                         required
    //                         isMulti
    //                         />
                           
    //                          <TextFieldFormsy
    //                         className="mt-8 mb-16"
    //                         value={props.state.timber}
    //                         label="Timber en DT"
    //                         name="timber"
    //                         type="number"
    //                         onChange={props.handleChange}
    //                         InputLabelProps={{
    //                             shrink: true,
    //                         }}
    //                         margin="normal"
    //                         variant="outlined"
    //                         required
    //                     />
                           
    //                        <TextFieldFormsy
    //                             className="mt-8 mb-16 mr-8"
    //                             label="Remarque"
    //                             name="remarque"
    //                             type="remarque"
    //                             multiline
    //                             rowsMax="5"
    //                             rows={5}
    //                             value={props.state.remarque}
    //                             onChange={props.handleChange}
    //                             margin="normal"
    //                             helperText="décrivez votre pièce en occasion"
    //                             variant="outlined"
    //                             required
    //                         />
    //                         <List handleChipChangeList={props.handleChipChangeList} 
    //                               handleChipChangeValid={this.handleChipChangeValid}
    //                               suggestionsList={suggestionsList}
    //                               listProduit={props.state.list}
    //                               id={props.id}
    //                         />
    //              <Button        variant="contained"
    //                             color="primary"
    //                             className="w-224 mx-auto mt-16"
    //                             aria-label="Register"
    //                             disabled={!this.state.isFormValid}
    //                             type="submit"
    //                         >
    //                             {props.ButtonText}
    //                         </Button>
    //                     </Formsy>
    //                 </CardContent>
    //             </FuseAnimate>

    //       isFormValid: true,
    //       </div>
    //     );
    //   }
    
  
  render() {
    const props = this.props;
    const suggestionsReparation = props.state.repairerOptions.map((item) => ({
      key: item._id,
      value: { id: item._id, owner: item.owner, etat: item.etat ,category:item.category},
      label: `${item.code}`,
    }));
    const suggestionsList = props.state.listOption.map((item) => ({
      key: item._id,
      value: { id: item._id, prix: item.prix },
      label: `${item.displayName?item.displayName:item.name}`
    }));
    return (
      <div className="p-16 sm:p-24 max-w-2xl">
        <FuseAnimate animation="transition.expandIn">
          <CardContent className="flex flex-col items-center justify-center p-32">
            <Formsy
              onValidSubmit={props.handleSubmit}
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              className="flex flex-col justify-center w-full"
            >
              <FuseChipSelect
                className="w-full my-16"
                value={props.state.reparation}
                onChange={props.handleChipChangeReparation}
                placeholder="Select reparation"
                textFieldProps={{
                  label: (
                    <Translation>
                      {(t) => <div>{t("devis.reparationToAddquotes")}</div>}
                    </Translation>
                  ),
                  InputLabelProps: {
                    shrink: true,
                  },
                  variant: "outlined",
                }}
                options={suggestionsReparation}
                required
                isMulti
              />


              <TextFieldFormsy
                className="mt-8 mb-16"
                value={props.state.timber}
                label={(
                    <Translation>
                      {(t) => <div>{t("devis.stampToAddquotes")}</div>}
                    </Translation>
                  )}
                name="timber"
                type="number"
                onChange={props.handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                variant="outlined"
                required
              />

              <TextFieldFormsy
                className="mt-8 mb-16 mr-8"
                label={(
                    <Translation>
                      {(t) => <div>{t("devis.noticeToAddquotes")}</div>}
                    </Translation>
                  )}
                name="remarque"
                type="remarque"
                multiline
                rowsMax="5"
                rows={5}
                value={props.state.remarque}
                onChange={props.handleChange}
                margin="normal"
                helperText="décrivez votre pièce en occasion"
                variant="outlined"
                required
              />
              <List
                handleChipChangeList={props.handleChipChangeList}
                handleChipChangeValid={this.handleChipChangeValid}
                suggestionsList={suggestionsList}
                listProduit={props.state.list}
                id={props.id}
              />
              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16"
                aria-label="Register"
                disabled={!this.state.isFormValid}
                type="submit"
              >
            {(
              <Translation>
                {(t) => <div>{t("devis.addButton")}</div>}
              </Translation>
            )}
              </Button>
            </Formsy>
          </CardContent>
        </FuseAnimate>
      </div>
    );
  }
}
export default withTranslation()(withRouter(DevisForm));
