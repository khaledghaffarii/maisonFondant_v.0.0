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

export default function CategoryFilter(props) {
  const classes = useStyles();
  const { columnDef, onFilterChanged } = props;
  const [value, setValue] = React.useState(props.value);
  return (
    <div style={{minWidth: 150}}>
        <Select
            options={[
                {label: props.allValue, value: null},
                ...(props.values||[]).map(
                  cat => ({
                    label: cat.name,
                    value: cat._id
                  })
                )
            ]}
            onChange={(data) => {
              setValue(data.value);
              
              if(props.onChange){
                onFilterChanged(columnDef.id, data.value);
                props.onChange(data.value);
              } else {
                onFilterChanged(columnDef.id, data.value);
              }
            }}
            value={{label: value ? props.values.filter(v => v._id == value)[0].name : props.allValue, value: value}}
        />
    </div>
  );
} 