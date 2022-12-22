import { useRef, useState } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useReactToPrint } from "react-to-print";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";

var Barcode = require("react-barcode");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  overflowY: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 50,
  p: 4,
};

function StickerToPrint({ currentReparation }) {
  const compRef = useRef();
  const category=useState (currentReparation.arb.length > 1 ? currentReparation.arb[0].name : currentReparation.ReparationProduct?.device?.nameEnglish )
  const brand=useState(currentReparation.arb.length > 1 ? currentReparation.arb[1].name :  currentReparation.ReparationProduct?.brand?.name)
  const gamme=useState(currentReparation.arb.length > 1 ? currentReparation.arb[2].name : currentReparation.ReparationProduct?.gamme?.name)
  const model=useState(currentReparation.arb.length > 1 ? currentReparation.arb[3].name : currentReparation.ReparationProduct?.model?.name)

            
  const handlePrint = useReactToPrint({
    content: () => compRef.current,
  });

  return (
    <Container fixed>
    <Box sx={style}>
      <Paper >
    
        <div ref={compRef}>
          <Grid container spacing={5}>
            <Grid container item spacing={0}>
              <Grid container item >
                <Grid item xs={6}>
                  <Grid item xs={12} align="center">
                    <Typography variant="h5" gutterBottom ></Typography>
                  <Typography variant="h5" gutterBottom >
                  {category}{" "}
                  {brand}{" "}
                  {gamme}{" "}
                  {model}{" "}
                    {/* {currentReparation.category ? currentReparation.category.name : currentReparation.ReparationProduct?.device?.nameEnglish  }{" "}      */}
                    </Typography>
                    
                  </Grid>
                  <Grid item xs={12}>
                    <Barcode
                      value={currentReparation.code}
                      width={6}
                      fontSize={70}
                      height={150}
                    />
                  </Grid>
                </Grid>
                
                <Grid item xs={6} align="right" >
                  <img
                    src="./assets/images/logos/LogoTrust.png"
                    style={{ margin: 75}}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container item spacing={0}>
              <Grid item xs={12}>
                <ul>
                  <li>
                  <Typography variant="h2" gutterBottom>
                      {" "}
                      Date de Dépot: <span> {currentReparation.dateDepot}</span>
                    </Typography>
                  </li>
                  <li>
                  <Typography variant="h2" gutterBottom>
                      {" "}
                      Centre de Dépot:{" "}
                      <span>{currentReparation.centreDepot.name}</span>
                    </Typography>
                  </li>
                  <li>
                  <Typography variant="h2" gutterBottom>
                      Technicien:{" "}
                      <span>
                        {currentReparation.repairer?.fname}{" "}
                        {currentReparation.repairer?.lname}
                      </span>
                    </Typography>
                  </li>
                </ul>
              </Grid>
            </Grid>
            <Grid container item spacing={0}>
              <Grid item xs={6}>
                {currentReparation.retour ? (
                  <Typography align="left" color="danger" variant="h3" gutterBottom> SAV</Typography>
                ) :  (
                  <Typography align="left" color="secondary" variant="h3" gutterBottom>Réparation</Typography>
                )}
              </Grid>

              <Grid item xs={6}>
              <Typography align="right" variant="h3" gutterBottom >
                  {" "}
                  Client:{" "}
                  <span>
                    {currentReparation.owner.fname}{" "}
                    {currentReparation.owner.lname}
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
       
        <Box mt={2}>
          <button onClick={handlePrint}>Print this out!</button>
        </Box>
      </Paper>
      </Box>
    </Container>
  );
}

export default StickerToPrint;
