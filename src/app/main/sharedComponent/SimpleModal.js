import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Badge } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import HistoriqueIcon from "@material-ui/icons/History";
import SpeakerNotes from "@material-ui/icons/EventNote";//SpeakerNotes
import ListAlt from "@material-ui/icons/ListAlt";//LowPriority
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>{props.open?<Button onClick={handleOpen}target="_blank" className="whitespace-no-wrap" variant="contained">{props.buttonText}</Button>:
    <Badge badgeContent={props.badgeContent} color="primary">
    {props.remarque?<SpeakerNotes
       onClick={handleOpen}
     />:props.historique?<HistoriqueIcon
     onClick={handleOpen}
   />:<ListAlt
     onClick={handleOpen}
   />} 
       
   </Badge>
   }
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}

            style={{
              overflowY: 'scroll',
              maxHeight: '90vh'
            }}>
            {props.showReparations?props.showReparations:""}
            {props.show?props.show:""}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
