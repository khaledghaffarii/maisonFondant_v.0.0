import React, { useEffect, useState, useRef, useMemo } from "react";
import Box from '@material-ui/core/Box';
import EtatSortieForm from "./etatSortieForm";
import { Grid, Paper, Typography } from "@material-ui/core"
import Update from "@material-ui/icons/Update";
import { styled } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useReactToPrint } from 'react-to-print';
import env from '../../../static';
import Request from '../../../utils/Request';
import TablePagination from '@material-ui/core/TablePagination';
import StateComponent from './StateComponent';
import DepartementComponent from './DepartementComponenet';
import StateLivraisonComponent from './StateLivraisonComponent';
import Modal from '@material-ui/core/Modal';

var Barcode = require('react-barcode');
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 50,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 10,
    height: 8,
    width: 'auto',
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
        height: 8,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,


    },
}));


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const Plannings = ({ classes, ...props }) => {
    const request = new Request();
    const [open, setOpen] = useState(false)
    const [rows, setRows] = React.useState([])
    const [editRowData, setEditRowData] = React.useState({});
    const [currentId, setCurrentId] = useState(0)
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [refPlanning, setRefPlanning] = React.useState('');
    
    const [delivredBy, setDelivredBy] = React.useState('');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });


    useEffect(() => {

        fetchData()


    }, [])//DidMount

    const handleClose = () => {
        setOpen(false)
        window.location.reload();
    }

    const handelEditRow = (row) => {

        setOpen(true)
        setCurrentId(row._id)

        setEditRowData(row)

    }
    const onDelete = id => {
        // const onSuccess = () => {
        //     butterToast.rais({
        //         content: <Cinnamon.Crisp title="Post Box"
        //             content="Deleted successFully"
        //             scheme={Cinnamon.Crisp.SCHEME_PURPLE}
        //             icon={<DeleteSweep />}
        //         />
        //     })
        // }


        // if (window.confirm("Are you sure to delete this model?"))
        //     props.deleteModele(id, onSuccess)
    }


    const filterData = useMemo(() => {

        let computedData = rows;

        if (search) {
            computedData = computedData.filter(
                d =>
                    d.code.toLowerCase().includes(search.toLowerCase()) ||
                    d.category.toLowerCase().includes(search.toLowerCase()) ||
                    d.center_recuperatin.toLowerCase().includes(search.toLowerCase())

            );
        }

        setTotalItems(computedData.length);


        //Current Page slice
        return computedData
    }, [rows, search]);

    const fetchData = async () => {
        return new Promise(async (resolve) => {
            try {
                
                // get planning by id
                const planning = props.history.location.pathname.substring(15)

                let url = env.Plannings.info

                const dataList = await request.getById(url, planning);

                setRefPlanning(dataList?.data.reference);
                setDelivredBy(dataList?.data.delivredBy);
                setRows(dataList?.data.listSorties)
                setRowsPerPage(dataList?.data.listSorties.length)

            } catch (e) {
                if (e.response) {
                    console.log(e.response.data.message, {
                        variant: 'error',
                    });
                } else {
                    console.log('Erreur : ' + e.message, {
                        variant: 'error',
                    });
                }
            }
        })
    }
    const current = new Date().toLocaleString();
    //const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);

    return (
        <Grid spacing={5}>

            <Grid item xs={12} ref={componentRef}>
                <Grid spacing={2}>
                    <Item> <div style={{display: 'flex',
justifyContent: 'space-between'}}>
                        <img class="logo-icon" style={{width:"15%", height:"20%"}} src="//statics.trustit.tn//logo_line.png" alt="logo"/>
                        <Typography style={{padding: '5px 0px 0px 0px'}} component="div" variant="h4">
                            {refPlanning}
                        </Typography>
                        <Typography style={{padding: '10px 0px 0px 0px'}} component="div" variant="h6">
                            {current}
                        </Typography>
                        </div>
                    </Item>
                  

                        <table border="border-collapse">
                            <tr>
                            <th>Code</th>
                            <th>Appareil</th>
                            <th>Centre de récuperation</th>
                            <th>Destination</th>
                            <th>Numéro</th>
                            <th >Prix Client</th>                                        
                            <th>Etat Appareil</th>
                            <th>Remarque CS</th>
                            <th>Décharge Client</th>
                            <th>Décharge TRUSTIT</th>
                            </tr>
                            
                            {stableSort(filterData, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (

                                            <tr>

                                                <td>
                                                {row.code}
                                                </td>
                                                <td>{row.item}</td>
                                                <td>{row.center_recuperation}</td>
                                                <td>{row.destination}</td>
                                                <td>{row.phone}</td>
                                                <td>{row.prix_client==-1?"0":row.prix_client}</td>
                                                <td>{row.status_reparation}</td>
                                                <td>{row.remarque_CS ? row.remarque_CS : "Rien"}</td>
                                                <td></td>
                                                <td></td>



                                            </tr>
                                        ))}
                        </table>
                        {delivredBy?<Typography style={{display: 'flex',
justifyContent: 'flex-end',padding: '10px 20px 0px 0px'}} component="div" variant="h6">
                        Livreur: {delivredBy.fname+' '+delivredBy.lname} 
                        </Typography>:null
}
                        {/*
                        <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> 
                    */}
                    
                    {/* <Item >
                        <Typography align='left' gutterBottom variant="h5" component="div">
                            Livreur:
                        </Typography>
                    </Item> */}
                </Grid>
            </Grid>


            <Box mt={2}><button onClick={handlePrint}>Print this out!</button></Box >

            <Modal
                open={open}

                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <EtatSortieForm {...{ editRowData, setEditRowData, currentId, setCurrentId }} />
                </Box>
            </Modal>
        </Grid>
    );
}

export default Plannings;