import React from "react";
import { Button, Icon, Typography } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { withTranslation, Translation } from "react-i18next";
import SimpleModal from "./SimpleModal";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}));

function TableHeader(props) {
  const classes = useStyles();

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
      
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex" variant="h5">
            {props.textHeader}
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-col min-w-0">
        { props.addRoute?
                    (props.addRoute !== '/newFinancial' && props.addRoute!=='/newDilevery') && (
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {
                                props.useNewHeader?
                                <Button component={Link} to={props.addRoute}  target="_blank" className="whitespace-no-wrap" variant="contained">
                                    <span className="hidden sm:flex">{props.buttonText}</span>
                                    <span className="flex sm:hidden">New</span>
                                </Button>
                                :
                                <Button component={Link} to={props.addRoute} className="whitespace-no-wrap" variant="contained">
                                <span className="hidden sm:flex">{props.buttonText}</span>
                                <span className="flex sm:hidden">New</span>
                            </Button>
                            }
                        </FuseAnimate>
                    ):""
                }{props.name=="country"? 
                 <SimpleModal
           open={true}
           show={props.show}
            buttonText={props.buttonText}
          />
           :""

                }
        <hr/>
        {props.addRoutedevis?<div style={{display: 'flex',
justifyContent: 'space-between'}}>    
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
        
            <Button  component={Link} to={props.archive} className={classes.button}>Archive</Button>
            
        </FuseAnimate>
 <FuseAnimate animation="transition.slideRightIn" delay={300}>
        
        <Button  component={Link} to={props.addRoutedevis} className={classes.button}> <Translation>
              {(t) => <div>{t("reparation.addDevisTitle")}</div>}
            </Translation></Button>

    </FuseAnimate></div>:''}
       
        {props.showBlock && (
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>

                        <Button component={Link} to={props.block} className={classes.button}>Blocked list</Button>

                    </FuseAnimate>
                )
                }

        </div>
    </div>
  );
}

export default withTranslation()(TableHeader);
