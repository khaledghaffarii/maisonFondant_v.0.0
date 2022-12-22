import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//import {Typography} from '@material-ui/core';
//import {FuseAnimate} from '@fuse';
import Widget1 from './widgets/Widget1';
//import Widget2 from './widgets/Widget2';

const styles = theme => ({
  layoutRoot: {}
});

class Statistique extends Component {
  render() {
    //const {classes} = this.props;
    return (
      <div className="w-full">
          <Widget1/>
            {/* <Widget2/> */}
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Statistique);
