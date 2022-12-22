import React, { useRef, useState } from "react";
import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  Typography,
} from "@material-ui/core";
import {
  TextFieldFormsy,
  CheckboxFormsy,
  RadioGroupFormsy,
  SelectFormsy,
  FuseChipSelectFormsy,
} from "@fuse";
import Formsy from "formsy-react";
import { withTranslation, Translation } from "react-i18next";
const suggestions = ["Sea", "Sky", "Forest", "Aerial", "Art"].map((item) => ({
  value: item,
  label: item,
}));

function SimpleFormExample() {
  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  function disableButton() {
    setIsFormValid(false);
  }

  function enableButton() {
    setIsFormValid(true);
  }

  function handleSubmit(model) {
    console.info("submit", model);
  }

  return (
    <div className="max-w-sm">
      <Typography className="h2 mb-24">Example Formsy Form</Typography>
      <Formsy
        onValidSubmit={handleSubmit}
        onValid={enableButton}
        onInvalid={disableButton}
        ref={formRef}
        className="flex flex-col justify-center"
      >
        <TextFieldFormsy
          className="my-16"
          type="text"
          name="name"
          label={
            <Translation>
              {(t) => <div>{t("form.nameOutline")}</div>}
            </Translation>
          }
          validations={{
            minLength: 4,
          }}
          validationErrors={{
            minLength: (
              <Translation>
                {(t) => <div>{t("form.validation.minLength")}</div>}
              </Translation>
            ),
          }}
          required
          variant="outlined"
        />

        <TextFieldFormsy
          className="my-16"
          type="text"
          name="email"
          label={
            <Translation>{(t) => <div>{t("form.email")}</div>}</Translation>
          }
          validations="isEmail"
          validationError={
            <Translation>
              {(t) => <div>{t("form.errors.email")}</div>}
            </Translation>
          }
          required
          variant="outlined"
        />

        <RadioGroupFormsy
          className="my-16"
          name="gender"
          label={
            <Translation>{(t) => <div>{t("form.gender")}</div>}</Translation>
          }
          validations="equals:female"
          validationError="Only ladies are accepted"
          required
        >
          <FormControlLabel
            value="male"
            control={<Radio color="primary" />}
            label={
              <Translation>{(t) => <div>{t("form.mal")}</div>}</Translation>
            }
          />
          <FormControlLabel
            value="female"
            control={<Radio color="primary" />}
            label={
              <Translation>{(t) => <div>{t("form.female")}</div>}</Translation>
            }
          />
          <FormControlLabel
            value="other"
            control={<Radio color="primary" />}
            label={
              <Translation>{(t) => <div>{t("form.other")}</div>}</Translation>
            }
          />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label={
              <Translation>
                {(t) => <div>{t("form.disabled")}</div>}
              </Translation>
            }
          />
        </RadioGroupFormsy>

        <SelectFormsy
          className="my-16"
          name="related"
          label={
            <Translation>{(t) => <div>{t("form.related")}</div>}</Translation>
          }
          value="none"
          validations="equals:none"
          validationError="Must be None"
          variant="outlined"
        >
          <MenuItem value="none">
            <em>None</em>
          </MenuItem>
          <MenuItem value="hai">Hai</MenuItem>
          <MenuItem value="olivier">Olivier</MenuItem>
          <MenuItem value="kevin">Kevin</MenuItem>
        </SelectFormsy>

        <CheckboxFormsy
          className="my-16"
          name="accept"
          value={false}
          label={
            <Translation>{(t) => <div>{t("form.accept")}</div>}</Translation>
          }
          validations="equals:true"
          validationError="You need to accept"
        />

        <FuseChipSelectFormsy
          className="my-16"
          name="tags"
          placeholder={
            <Translation>
              {(t) => <div>{t("form.tagsSelect")}</div>}
            </Translation>
          }
          textFieldProps={{
            label: "Tags",
            InputLabelProps: {
              shrink: true,
            },
            variant: "standard",
          }}
          options={suggestions}
          isMulti
          validations={{ minLength: 1 }}
          validationErrors={{
            minLength: (
              <Translation>
                {(t) => <div>{t("form.validation.lastOne")}</div>}
              </Translation>
            ),
          }}
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mx-auto my-16"
          aria-label={
            <Translation>{(t) => <div>{t("form.login")}</div>}</Translation>
          }
          disabled={!isFormValid}
        >
          <Translation>{(t) => <div>{t("form.submit")}</div>}</Translation>
        </Button>
      </Formsy>
    </div>
  );
}

export default withTranslation()(SimpleFormExample);
