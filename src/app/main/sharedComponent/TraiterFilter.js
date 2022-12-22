import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Select from 'react-select'
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

export default function TraiterFilter(props) {
  const classes = useStyles();
  const { columnDef, onFilterChanged } = props;
    const [value, setValue] = React.useState('Tous');
  
  return (
    <div  style={{minWidth: 200}}>
        <Select
            style={{minWidth: 200}}
            options={[
                {label: 'Tous', value: 'Tous'},
                {label: 'Traité', value: 'Traité'},
                {label: 'Non Traité', value: 'Non Traité'},
            ]}
            onChange={(data) => {
                setValue(data.value);
                onFilterChanged(columnDef.id, data.value);
            }}
            value={{label: value, value: value}}
        />
    </div>
  );
} 