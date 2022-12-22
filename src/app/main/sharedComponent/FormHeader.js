import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FuseAnimate } from "@fuse";
import { withTranslation, Translation } from "react-i18next";
function FormHeader(props) {
  return (
    <div className="flex flex-1 w-full items-center justify-between">
      <div className="flex items-center p-24">
        <FuseAnimate animation="transition.expandIn" delay={300}>
          <Button
            component={Link}
            to={props.returnRoute}
            className="whitespace-no-wrap"
            variant="contained"
          >
            <span className="hidden sm:flex">
              {
                <Translation>
                  {(t) => <div>{t("devis.backButton")}</div>}
                </Translation>
              }
            </span>
          </Button>
        </FuseAnimate>
      </div>

      <div className="flex flex-1 items-center justify-center px-12">
        <Typography variant="h6">{props.title}</Typography>
      </div>
    </div>
  );
}

export default withTranslation()(FormHeader);
