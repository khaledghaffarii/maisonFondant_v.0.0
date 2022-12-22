import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import ENV from "../../static";
const useStyles = makeStyles(theme => ({
  root: {
    "& .logo-icon": {
      width: "100%",
      height: "100%",
      transition: theme.transitions.create(["width", "height"], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut
      })
    },
    "& .react-badge, & .logo-text": {
      transition: theme.transitions.create("opacity", {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut
      })
    }
  },
  reactBadge: {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#61DAFB"
  }
}));

function Logo() {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, "flex items-center")}>
      <img
        className="logo-icon "
        src={`${ENV.staticFiles + "/logo_line.png"}`}
        alt="logo"
      />
    </div>
  );
}

export default Logo;
