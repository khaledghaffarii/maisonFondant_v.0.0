import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Badge } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { DateRangePicker } from "materialui-daterange-picker";
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
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

export default function DateFilter(props) {
  const classes = useStyles();
  const { columnDef, onFilterChanged } = props;
  const [open, setOpen] = React.useState(false);
  const [dateRange, setDateRange] = React.useState({});
  const [filterString, setFilterString] = React.useState('');
  const [message, setMessage] = React.useState('');
  const handleOpen = () => {
    setMessage('');
    setOpen(true);
  };

  const handleClose = () => {
    setMessage('');
    setOpen(false);
  };
  const submitFilter = () => {
    if (dateRange.endDate && dateRange.startDate) {
      setMessage('');
      setFilterString(moment(dateRange.startDate).format('YYYY-MM-DD') + ' à ' + moment(dateRange.endDate).format('YYYY-MM-DD'));
      setOpen(false);
      onFilterChanged(columnDef.id, moment(dateRange.startDate).format('YYYY-MM-DD') + ' à ' + moment(dateRange.endDate).format('YYYY-MM-DD'));
    } else {
      if (!dateRange.startDate){
        setMessage('Please select a start date!');
      } else {
        setMessage('Please select an end date!');
      }
    }
  }
  const clearFilter = () => {
    setMessage('');
      setFilterString('');
      setOpen(false);
      onFilterChanged(columnDef.id, undefined);
  }
  const toggle = () => setOpen(!open);
  return (
    <div>
      <TextField
        style={columnDef.type === 'numeric' ? { float: 'right' } : {}}
        type={columnDef.type === 'numeric' ? 'number' : 'search'}
        onClick={handleOpen}
        value={filterString}
      />
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
            <div className="row">
              <h1 style={{textAlign: 'center'}}>Select Range</h1>
              {message.length > 0 ? 
              <Alert severity="error">{message}</Alert>
              :
              <></>
              }
              <DateRangePicker
                open={open}
                toggle={toggle}
                onChange={(range) => setDateRange(range)}
              />
            </div>
            <div style={{justifyContent: 'flex-around', display: 'flex'}}>
              <Button
                variant="contained"
                color="default"
                className="w-224 mx-auto mt-16 mr-16"
                onClick={handleClose}
              >
                Annuler
              </Button>
              <Button
                variant="contained"
                color="danger"
                className="w-224 mx-auto mt-16 mr-16"
                onClick={clearFilter}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="w-224 mx-auto mt-16 mr-16"
                onClick={submitFilter}
              >
                Filtrer
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
} 