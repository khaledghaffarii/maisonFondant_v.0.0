import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {REP_STATES} from '../../static';
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

export default function StateFilter(props) {
  const classes = useStyles();
  const { columnDef, onFilterChanged } = props;
  const [value, setValue] = React.useState(null);
  return (
    <div style={{minWidth: 200}}>
        <Select
            isMulti
            options={
                Object.keys(REP_STATES).map(
                  state => ({
                    label: REP_STATES[state],
                    value: REP_STATES[state]
                  })
                )}
            onChange={(data) => {
              setValue(data.value);              
              onFilterChanged(columnDef.id, data.map(v => v.value).join('|'));
            }}
            value={value}
        />
    </div>
  );
} 