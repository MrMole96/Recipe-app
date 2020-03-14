import React from "react";
import { Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
export const RecipeFormSecondStep = props => {
  console.log(props);

  return (
    <Grid container justify="center" item spacing={3}>
      <Grid item xs={12}>
        <Autocomplete
          style={{ width: "100%" }}
          multiple
          options={props.products}
          getOptionLabel={option => option.name}
          filterSelectedOptions
          value={props.formik.getFieldProps("listOfProducts").value}
          onChange={(e, value) =>
            props.formik.setFieldValue("listOfProducts", value)
          }
          renderInput={params => (
            <TextField
              {...params}
              variant="outlined"
              label="Wybierz produkty do przepisu"
              placeholder="Produkt"
              margin="normal"
              fullWidth
              {...props.formik.getFieldProps("listOfProducts")}
              helperText={
                props.formik.touched.listOfProducts &&
                props.formik.errors.listOfProducts
              }
              error={
                props.formik.touched.listOfProducts &&
                Boolean(props.formik.errors.listOfProducts)
              }
            />
          )}
        />
      </Grid>
      <Grid
        container
        item
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            onClick={props.navigateBack}
            disabled={props.formStep === 0}
          >
            Wstecz
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            // type="submit"
            // startIcon={<SaveIcon />}
            onClick={props.navigateNext}
            disabled={!props.formik.errors.listOfProducts}
          >
            Dalej
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
