import React, { Component } from 'react'

import env from '../../static';
import Select from "react-select";
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';

class BotuiqueState extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         etat: this.props.etat,
         id: this.props.id,
      }
      this.updateBoutiqueState = this.updateBoutiqueState.bind(this);

    }
    componentWillReceiveProps(nextProps){
        const {id, etat} = nextProps;
        if (id) {
            this.setState({
                id, etat
            })
        }
    }
    updateBoutiqueState(id, value) {
        fetch(env.boutiques.update(id), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': localStorage.getItem('id_token')
            },
            body: JSON.stringify({state: value.value})
          })
          .then(res => res.json())
          .then(
            response => {
              if (response.error) {
                this.props.enqueueSnackbar(response.message, {
                  variant: 'error',
                });
              }else{
                this.props.enqueueSnackbar('Etat boutique a été mis a jour avec succees', {
                  variant: 'success',
                });
              }
            }
          )
      }

  render() {
    return (
      <div style={{ minWidth: 175 }}>
        <Select
        className="w-full my-16"
        value={this.state.etat ? {key: '', label: this.state.etat, value: this.state.etat} : {key: '', label: env.BOUTIQUE_STATE.ACTIVE_VISIBLE, value: env.BOUTIQUE_STATE.ACTIVE_VISIBLE}}
        onChange={(value) => {this.updateBoutiqueState(this.state.id, value);this.setState({etat: value.value});}}
        placeholder="Select etat boutique"
        textFieldProps={{
          label: 'Etat Boutique',
          InputLabelProps: {
            shrink: true
          },
          variant: 'outlined'
        }}
        options={[{
          key: 1,
          value: env.BOUTIQUE_STATE.ACTIVE_VISIBLE,
          label: env.BOUTIQUE_STATE.ACTIVE_VISIBLE,
        },
        {
          key: 2,
          value: env.BOUTIQUE_STATE.ACTIVE_NOT_VISIBLE,
          label: env.BOUTIQUE_STATE.ACTIVE_NOT_VISIBLE,
        },
        {
          key: 3,
          value: env.BOUTIQUE_STATE.NOT_ACTIVE,
          label: env.BOUTIQUE_STATE.NOT_ACTIVE,
        },
        {
          key: 4,
          value: env.BOUTIQUE_STATE.SUSPENDED,
          label: env.BOUTIQUE_STATE.SUSPENDED,
        }, {
          key: 5,
          value: env.BOUTIQUE_STATE.UNDER_VERIFICATION,
          label: env.BOUTIQUE_STATE.UNDER_VERIFICATION,
        }]}
      />
      </div>
    )
  }
}

export default withSnackbar(withRouter(BotuiqueState));
