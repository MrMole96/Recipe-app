import React, { Component } from "react";
import Product from "../../components/product/Product";
import styled from "styled-components";
import "../../components/product/Product.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import {
  addProduct,
  getProducts,
  deleteProduct
} from "../../actions/productsActions";
import { ProductForm } from "../../components/product/ProductForm";

const Wrapper = styled.section`
  padding: 2em;
  border: 2px solid #039be5;
  border-radius: 10px;
  max-width: 450px;
`;


class products extends Component {

  componentDidMount() {
    this.props.dispatch(getProducts());
  }

  sendForm = product => {
    this.props.dispatch(addProduct(product));
  };

  deleteProduct = productId => {
    this.props.dispatch(deleteProduct(productId));
  };

  render() {
    let products = null;
    var that = this;
    if (this.props.products.data) {
      products = this.props.products.data.map(function(product, index) {
        return (
          <Box key={index} flexGrow={1} marginX={1} width={250}>
            <Product
              className="Product"
              name={product.name}
              amount={product.amount}
              calories={product.calories}
              unit={product.unit}
              id={product._id}
              key={product._id}
              deleteProduct={that.deleteProduct}
            />
          </Box>
        );
      });
    }

    return (
      <div>
        <Grid
          container
          alignContent="center"
          justify="center"
          direction="column"
        >
          <h2>Formatka do dodawania produktu</h2>
          <Wrapper>
            <ProductForm sendForm={this.sendForm} />
          </Wrapper>
        </Grid>

        <h2>Lista produktow</h2>
        {this.props.products.downloading ? (
          <div className="loader">
            <CircularProgress size={50} />
          </div>
        ) : (
          <Box display="flex" flexWrap="wrap">
            {products}
          </Box>
        )}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { products: state.products };
}
export default connect(mapStateToProps)(products);
