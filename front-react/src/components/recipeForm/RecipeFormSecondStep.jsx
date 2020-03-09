import React from "react";
import { Grid } from "@material-ui/core";
import { TextField, AutoComplete } from "material-ui";

export const RecipeFormSecondStep = ({ formik, products }) => {
  return (
    <React.Fragment>
      <AutoComplete
        multiple
        options={products.data}
        getOptionLabel={option => option.name}
        filterSelectedOptions
        value={formik.getFieldProps("listOfProducts").value}
        onChange={(e, value) => formik.setFieldValue("listOfProducts", value)}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            label="Wybierz produkty do przepisu"
            placeholder="Produkt"
            margin="normal"
            fullWidth
            {...formik.getFieldProps("listOfProducts")}
            helperText={
              formik.touched.listOfProducts && formik.errors.listOfProducts
            }
            error={
              formik.touched.listOfProducts &&
              Boolean(formik.errors.listOfProducts)
            }
          />
        )}
      />
      <Grid container></Grid>
    </React.Fragment>
  );
};
