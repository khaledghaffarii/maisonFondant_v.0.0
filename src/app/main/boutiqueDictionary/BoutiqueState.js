import React, { Component } from 'react'

import env from '../../static';
import { FuseChipSelect } from '@fuse';
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
  componentWillReceiveProps(nextProps) {
    const { id, etat } = nextProps;
    if (id) {
      this.setState({
        id, etat
      })
    }
  }
  updateBoutiqueState(id, value) {
    const { etat } = this.state;
    this.setState({ etat })
  }

  render() {
    return (
      <FuseChipSelect
        variant={'fixed'}
        disabled={true}
        className="w-full my-16"
        value={this.state.etat ? { key: '', label: this.state.etat, value: this.state.etat } : { key: '', label: env.BOUTIQUE_STATE.ACTIVE_VISIBLE, value: env.BOUTIQUE_STATE.ACTIVE_VISIBLE }}
        onChange={(value) => { this.updateBoutiqueState(this.state.id, value);  }}
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
    )
  }
}

export default withSnackbar(withRouter(BotuiqueState));
