import React, { useEffect, useState, useRef, useMemo } from "react";
import Box from "@material-ui/core/Box";
import EtatSortieForm from "./etatSortieForm";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import Update from "@material-ui/icons/Edit";
import { styled } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useReactToPrint } from "react-to-print";
import env from "../../../static";
import Request from "../../../utils/Request";
import TablePagination from "@material-ui/core/TablePagination";
import StateComponent from "./StateComponent";
import DepartementComponent from "./DepartementComponenet";
import PriceComponent from "./PriceComponent";
import CentreRecuperation from "./CentreRecuperation";
import Destination from "./Destination";
import StateLivraisonComponent from "./StateLivraisonComponent";
import Modal from "@material-ui/core/Modal";
import { withTranslation, Translation } from "react-i18next";
var Barcode = require("react-barcode");
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: 12,
  height: 10,
  width: 3,
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
    height: 8,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
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
  return order === "desc"
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
  const [open, setOpen] = useState(false);
  const [rows, setRows] = React.useState([]);
  const [editRowData, setEditRowData] = React.useState({});
  const [currentId, setCurrentId] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [refPlanning, setRefPlanning] = React.useState("");
  const [testSortie, setTestSortie] = React.useState(false);
  const [id, setId] = React.useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    fetchData();
  }, []); //DidMount

  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };

  const handelEditRow = (row) => {
    setOpen(true);
    setCurrentId(row._id);

    setEditRowData(row);
  };
  const onDelete = (id) => {
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
  };

  const filterData = useMemo(() => {
    let computedData = rows;

    if (search) {
      computedData = computedData.filter(
        (d) =>
          d.code.toLowerCase().includes(search.toLowerCase()) ||
          d.category.toLowerCase().includes(search.toLowerCase()) ||
          d.center_recuperatin.toLowerCase().includes(search.toLowerCase())
      );
    }

    setTotalItems(computedData.length);

    //Current Page slice
    return computedData;
  }, [rows, search]);

  const fetchData = async () => {
    return new Promise(async (resolve) => {
      try {
        // get planning by id
        const planning = props.history.location.pathname.substring(17);

        let url = env.Plannings.info;

        const dataList = await request.getById(url, planning);

        setRefPlanning(dataList?.data.reference);
        if (dataList?.data.listSorties.length != 0) {
          setTestSortie(true);
        }
        setId(dataList?.data._id);
        setRows(dataList?.data.listSorties);
        setRowsPerPage(dataList?.data.listSorties.length);
      } catch (e) {
        if (e.response) {
          console.log(e.response.data.message, {
            variant: "error",
          });
        } else {
          console.log("Erreur : " + e.message, {
            variant: "error",
          });
        }
      }
    });
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, filterData.length - page * rowsPerPage);

  return (
    <Grid spacing={5}>
      <Grid item xs={12} ref={componentRef}>
        <Grid spacing={2}>
          <Item style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              style={{ padding: "10px 0px 0px 0px" }}
              component="div"
              variant="h4"
            >
              {refPlanning}
            </Typography>
            {testSortie ? (
              <Box mt={2}>
                <a href={"/printPlanning/" + id}>
                  <Button
                    target="_blank"
                    className="whitespace-no-wrap"
                    variant="contained"
                  >
                    Envoyer pour imprimer
                  </Button>
                </a>
              </Box>
            ) : null}
          </Item>
          <Item>
            {testSortie ? (
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Code</StyledTableCell>
                      <StyledTableCell>Appareil</StyledTableCell>
                      <StyledTableCell>Centre de récuperation</StyledTableCell>
                      <StyledTableCell>Destination</StyledTableCell>
                      <StyledTableCell>Numero</StyledTableCell>
                      <StyledTableCell>Prix Client</StyledTableCell>
                      <StyledTableCell>Etat Appareil</StyledTableCell>
                      <StyledTableCell>Departement</StyledTableCell>
                      <StyledTableCell>Remarque CS</StyledTableCell>
                      <StyledTableCell>Action</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stableSort(filterData, getComparator(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => (
                        <StyledTableRow key={row.code}>
                          <StyledTableCell component="th" scope="row">
                            <Barcode
                              format="CODE128"
                              height="15"
                              width="2"
                              fontSize="20
                                                    "
                              fontFamily='"Roboto", "Helvetica", "Arial", sans-serif'
                              value={row.code}
                            />
                          </StyledTableCell>
                          <StyledTableCell width="8" fontSize="8" align="left">
                            {row.item}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <CentreRecuperation
                              key={row._id}
                              currentCentreRecuperation={
                                row.center_recuperation
                              }
                              locked={row.locked}
                              _id={row._id}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Destination
                              key={row._id}
                              currentDestination={row.destination}
                              locked={row.locked}
                              _id={row._id}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.phone}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <PriceComponent
                              key={row._id}
                              currentPrice={row.prix_client}
                              locked={row.locked}
                              _id={row._id}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <StateComponent
                              key={row._id}
                              etat={row.status_reparation}
                              _id={row._id}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <DepartementComponent
                              height="5"
                              key={row._id}
                              dep={row.departement}
                              _id={row._id}
                            />
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {row.remarque_CS ? row.remarque_CS : "Rien"}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Update onClick={() => handelEditRow(row)} />
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Item>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Typography component="div" variant="h5">
                  <Translation>
                    {(t) => <div>{t("plannings.empty")}</div>}
                  </Translation>
                </Typography>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
              </Item>
            )}

            {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={totalItems}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    /> */}
          </Item>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EtatSortieForm
            {...{ editRowData, setEditRowData, currentId, setCurrentId }}
          />
        </Box>
      </Modal>
    </Grid>
  );
};

export default withTranslation()(Plannings);
