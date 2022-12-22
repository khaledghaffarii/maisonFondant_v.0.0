import React, { useRef } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useReactToPrint } from "react-to-print";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import { withTranslation, Translation, useTranslation } from "react-i18next";
var Barcode = require("react-barcode");

function ComponentToPrint({ currentReparation, props }) {
  const { t } = useTranslation();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Container fixed>
      <React.Fragment>
        <div ref={componentRef} style={{ margin: 20 }}>
          <Grid container spacing={3}>
            <Grid container item spacing={1}>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <img src="./assets/images/logos/LogoTrust.png" width={170} />
                </Paper>
              </Grid>
              <Grid item xs={4}>
        
                {currentReparation.etat == "Prêt pour Transfert" &&
                currentReparation.centreDepot.name == "domicile" ? (
                  <Paper elevation={0}>
                    <h2>
                      <Translation>
                        {(t) => <div>{t("print.receipt")}</div>}
                      </Translation>
                      ,
                    </h2>
                  </Paper>
                ) : currentReparation.etat == "Prêt pour Transfert" ? (
                  <Paper elevation={0}>
                    <h2>
                      <Translation>
                        {(t) => <div>{t("print.transferVoucher")}</div>}
                      </Translation>
                      ,
                    </h2>
                  </Paper>
                ) : currentReparation.etat == "Récupéré par le Livreur" ? (
                  <Paper elevation={0}>
                    <h2>
                      <Translation>
                        {(t) => <div>{t("print.deliveryForm")}</div>}
                      </Translation>
                    </h2>
                  </Paper>
                ) : (
                  <Paper elevation={0}>
                    <h2>
                      <Translation>
                        {(t) => <div>{t("print.ExitVoucher")}</div>}
                      </Translation>
                    </h2>
                  </Paper>
                )}
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <Barcode value={currentReparation.code} />
                </Paper>
              </Grid>

              <Typography variant="caption" display="block" style={{width:"100%"}} gutterBottom>
                {t("print.dateOfPrint")}:
                {moment(new Date()).format("DD/MM/YYYY")}
              </Typography>
              <br />

              <Typography variant="caption" display="block" gutterBottom>
                {t("print.dateOfPlanning")}: ..........
              </Typography>
            </Grid>

            <Grid container item spacing={1}>
              <Grid item xs={12}>
                <Paper elevation={0}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: "auto" }}
                      aria-label="spanning table"
                    >
                      <TableRow style={{ border: "1px" }}>
                        <TableCell colSpan={2}>
                          <Translation>
                            {(t) => <div>{t("reparation.recoveryCenter")}</div>}
                          </Translation>
                        </TableCell>
                        {currentReparation.etat == "Prêt pour Transfert" &&
                        currentReparation.centreDepot.name == "domicile" ? (
                          <TableCell>
                            {currentReparation.centreDepot.name} (
                            {currentReparation.extraData.indication} )
                          </TableCell>
                        ) : currentReparation.etat == "Prêt pour Transfert" ? (
                          <TableCell>
                            {currentReparation.centreDepot.name}
                          </TableCell>
                        ) : currentReparation.etat == "Prêt pour Livraison" ? (
                          <TableCell>
                            {currentReparation.centreService
                              ? currentReparation.centreService.name
                              : currentReparation.centreRecuperation?.adress}
                          </TableCell>
                        ) : currentReparation.etat ==
                          "Récupéré par le Livreur" ? (
                          <TableCell>
                            {currentReparation.centreRecuperation.name}
                          </TableCell>
                        ) : currentReparation.etat ==
                            "Récupéré pour le Client" &&
                          currentReparation.centreRecuperation.name ==
                            "domicile" ? (
                          <TableCell>
                            {currentReparation.centreRecuperation.name} (
                            {currentReparation.extraData.indication} )
                          </TableCell>
                        ) : (
                          <TableCell>
                            {currentReparation.centreRecuperation.name}
                          </TableCell>
                        )}
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={2}>
                          <Translation>
                            {(t) => <div>{t("reparation.destination")}</div>}
                          </Translation>
                        </TableCell>
                        {currentReparation.etat == "Prêt pour Transfert" ? (
                          <TableCell>
                            {currentReparation.centreService
                              ? currentReparation.centreService.name
                              : currentReparation.centreRecuperation?.adress}
                          </TableCell>
                        ) : currentReparation.etat ==
                          "Récupéré par le Livreur" ? (
                          <TableCell>
                            {currentReparation.centreDepot.name}
                          </TableCell>
                        ) : (
                          <TableCell>
                            {currentReparation.centreRecuperation.name}
                          </TableCell>
                        )}
                      </TableRow>
                      {/* <TableRow>
                                            <TableCell colSpan={3}>Adresse</TableCell >
                                            <TableCell >{currentReparation.owner.adress}</TableCell >

                                        </TableRow> */}
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item xs={12}>
                <Paper elevation={0}>
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: "auto" }}
                      aria-label="spanning table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell colSpan={2}>Code</TableCell>

                          <TableCell colSpan={2}>
                            <Translation>
                              {(t) => <div>{t("print.designation")}</div>}
                            </Translation>
                          </TableCell>

                          {/* <TableCell colSpan={2} >Quantité</TableCell > */}
                          <TableCell colSpan={2}>
                            <Translation>
                              {(t) => <div>{t("reparation.panne")}</div>}
                            </Translation>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableRow>
                        <TableCell colSpan={2}>
                          {currentReparation.code}
                        </TableCell>
                        <TableCell colSpan={2}>
                          {currentReparation.category.name}
                        </TableCell>
                        {/* <TableCell colSpan={2}>............</TableCell > */}
                        <TableCell colSpan={2}>
                          {currentReparation.detailsPanne}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </TableContainer>
                </Paper>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item xs={6}>
                <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
                  {t("print.signature")}
                </Box>
              </Grid>
              <Grid item xs={6} align="right">
                <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
                  {t("print.signature_2")}
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <br />
          <br />
          <br />
          <Divider variant="middle" />
          <br />
          <br />
          <Grid container spacing={3}>
            <Grid container item spacing={3}>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <img src="./assets/images/logos/LogoTrust.png" width={170} />
                </Paper>
              </Grid>

              <Grid item xs={4}>
                <Paper elevation={0}>
                  <Barcode value={currentReparation.code} />
                </Paper>
              </Grid>

              <Typography variant="caption" style={{width:"100%"}} display="block" gutterBottom>
                <p>
                  {t("print.dateOfPrint")} :
                  {moment(new Date()).format("DD/MM/YYYY")}
                </p>
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                <p>{t("print.dateOfPlanning")}: .......... </p>
              </Typography>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <FormLabel component="legend">
                    <Translation>
                      {(t) => <div>{t("print.laptopAccessories")}</div>}
                    </Translation>
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox name="sac" />}
                      label={
                        <Translation>
                          {(t) => <div>{t("print.bag")}</div>}
                        </Translation>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox name="chargeur" />}
                      label={
                        <Translation>
                          {(t) => <div>{t("print.Charger")}</div>}
                        </Translation>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox name="sourie" />}
                      label={
                        <Translation>
                          {(t) => <div>{t("print.mouse")}</div>}
                        </Translation>
                      }
                    />
                  </FormGroup>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <FormLabel component="legend">
                    <Translation>
                      {(t) => <div>{t("print.accessoirPhone")}</div>}
                    </Translation>
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox name="etui" />}
                      label={
                        <Translation>
                          {(t) => <div>{t("print.etui")}</div>}
                        </Translation>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox name="chargeur" />}
                      label={
                        <Translation>
                          {(t) => <div>{t("print.Charger")}</div>}
                        </Translation>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox name="cable" />}
                      label="Cable"
                    />
                    <FormControlLabel
                      control={<Checkbox name="sim" />}
                      label="SIM"
                    />
                  </FormGroup>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={0}>
                  <FormLabel component="legend">
                    <Translation>
                      {(t) => <div>{t("print.printOrOther")}</div>}
                    </Translation>
                  </FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox name="paquet" />}
                      label={
                        <Translation>
                          {(t) => <div>{t("print.Pack")}</div>}
                        </Translation>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox name="chargeur" />}
                      label={
                        <Translation>
                          {(t) => <div>{t("print.Charger")}</div>}
                        </Translation>
                      }
                    />
                    <FormControlLabel
                      control={<Checkbox name="cable" />}
                      label="Cable"
                    />
                  </FormGroup>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
      <Box mt={2}>
        <button onClick={handlePrint}>
          <Translation>
            {(t) => <div>{t("print.PrintThisOut")}</div>}
          </Translation>
        </button>
      </Box>
    </Container>
  );
}

export default withTranslation()(ComponentToPrint);
