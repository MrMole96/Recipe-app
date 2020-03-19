import React from "react";
import { Grid, Input } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import { useState } from "react";

const units = ["ml", "g", "szt", "dkg", "kg"];

export const RecipeFormSecondStep = props => {
  const [valueInputs, setValueInputs] = useState({});

  const handleInputChange = event => {
    event.persist();
    setValueInputs(valueInputs => {
      let name = event.target.name.split("-")[0];
      if (isNaN(parseInt(event.target.value))) {
        return {
          ...valueInputs,
          [name]: { ...valueInputs[name], unit: event.target.value }
        };
      } else {
        return {
          ...valueInputs,
          [name]: { ...valueInputs[name], quantity: event.target.value }
        };
      }
    });
  };

  const addField = () => {
    console.log("addField");
    let object = {};
    props.formik.setFieldValue("productsDetails", object);
  };

  const addProductInput = value => {
    let products = value;

    return products.map((x, index) => (
      <Grid item xs={6} md={4} lg={3} key={index}>
        <Box display="flex" flexWrap="nowrap">
          <h4>{x.name}:</h4>
          <FormControl style={{ margin: "0px 10px" }}>
            <InputLabel>Ilosc</InputLabel>
            <Input
              className="input"
              type="number"
              name={x.name + "-input"}
              inputProps={{ min: "0", style: { textAlign: "center" } }}
              style={{ width: "50px" }}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Jednostka</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className="input"
              style={{ width: "100px" }}
              defaultValue={""}
              name={x.name + "-select"}
              onChange={handleInputChange}
            >
              {units.map((option, index) => (
                <MenuItem
                  key={index}
                  style={{ display: "block", paddingLeft: "10px" }}
                  value={option}
                >
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    ));
  };

  let productInputs = addProductInput(props.formik.values.listOfProducts);
  console.log(productInputs);
  console.log("valueInputs", valueInputs);
  return (
    <Grid container justify="center" item spacing={3}>
      <Grid item xs={12}>
        <Autocomplete
          style={{ width: "100%" }}
          multiple
          options={props.products}
          getOptionLabel={option => option.name}
          filterSelectedOptions
          // value={props.formik.getFieldProps("listOfProducts").value}
          onChange={(e, value) => {
            //dodac funkcje ktora dodaje inputy aby mozna bylo ustawic ilosc i miare
            props.formik.setFieldValue("listOfProducts", value);
          }}
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
      <Grid container direction="row" item spacing={3} xs={12}>
        {productInputs}
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
            onClick={() => {
              addField();
              props.navigateNext();
            }}
            disabled={Boolean(props.formik.errors.listOfProducts)}
          >
            Dalej
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
