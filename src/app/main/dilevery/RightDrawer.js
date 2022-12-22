import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import NewClient from './NewClient';
const useStyles = makeStyles({
  list: {
    width: 1000,
  },
  fullList: {
    width: 'auto',
  },
});

export default function RightDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
   
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
     
    >
      { 
       
       
       <NewClient 
       closeDrawer={toggleDrawer('right', false)}
       updateClientOptions={props.updateClientOptions}
       />
      }
    </div>
  );

  
  return (
    <div>
      <Button onClick={toggleDrawer('right', true)}>Add Client</Button>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}