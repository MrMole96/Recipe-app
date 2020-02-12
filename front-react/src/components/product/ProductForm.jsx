import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const units = ["ml", "g", "szt", "dkg", "kg"];

export const ProductForm = props => {
  const formik = useFormik({
    initialValues: {
      name: "",
      amount: 0,
      calories: 0,
      unit: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Zbyt krotka nazwa")
        .required("To pole jest wymagane"),
      amount: Yup.number()
        .moreThan(0, "Wartosc musi byc wieksza niz 0")
        .required("To pole jest wymagane"),
      calories: Yup.number()
        .moreThan(0, "Wartosc musi byc wieksza niz 0")
        .required("To pole jest wymagane"),
      unit: Yup.string().required("To pole jest wymagane")
    }),
    onSubmit: (values, { resetForm }) => {
      props.sendForm(values);
      resetForm();
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <TextField
          id="name"
          label="Nazwa"
          onChange={value => this.inputHandler(value)}
          placeholder="Nazwa produktu"
          margin="normal"
          {...formik.getFieldProps("name")}
          helperText={formik.touched.name && formik.errors.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
        />
      </div>
      <div>
        <TextField
          id="amount"
          label="Ilosc"
          className="input"
          onChange={value => this.inputHandler(value)}
          placeholder="Ilosc produktu"
          margin="normal"
          {...formik.getFieldProps("amount")}
          helperText={formik.touched.amount && formik.errors.amount}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
        />
      </div>
      <div>
        <TextField
          id="calories"
          label="Kalorie"
          onChange={value => this.inputHandler(value)}
          className="input"
          placeholder="Ilosc kalori w produkcie"
          margin="normal"
          {...formik.getFieldProps("calories")}
          helperText={formik.touched.calories && formik.errors.calories}
          error={formik.touched.calories && Boolean(formik.errors.calories)}
        />
      </div>
      <div>
        <TextField
          id="unit"
          select
          label="Wybierz"
          onChange={value => this.inputSelectHandler(value)}
          placeholder="Miara ilosci produktu"
          margin="normal"
          style={{ width: "200px" }}
          {...formik.getFieldProps("unit")}
          helperText={formik.touched.unit && formik.errors.unit}
          error={formik.touched.unit && Boolean(formik.errors.unit)}
        >
          {units.map(option => (
            <MenuItem
              key={option}
              style={{ display: "block", paddingLeft: "10px" }}
              value={option}
            >
              {option}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div className="Button">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<SaveIcon />}
        >
          Zapisz
        </Button>
      </div>
    </form>
  );
};
