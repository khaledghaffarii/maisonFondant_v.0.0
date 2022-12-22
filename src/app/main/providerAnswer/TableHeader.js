import React from "react";
import { Button, Icon, Typography } from "@material-ui/core";
import { FuseAnimate } from "@fuse";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function TableHeader(props) {
  const classes = useStyles();

  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Icon className="text-32 mr-0 sm:mr-12">shopping_cart</Icon>
        </FuseAnimate>
        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
          <Typography className="hidden sm:flex" variant="h5">
            {props.textHeader}
          </Typography>
        </FuseAnimate>
      </div>

      <div className="flex flex-col min-w-0">
        <hr />
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <Button
            component={Link}
            to={props.archive}
            className={classes.button}
          >
            Archive
          </Button>
        </FuseAnimate>
      </div>
    </div>
  );
}

export default TableHeader;
