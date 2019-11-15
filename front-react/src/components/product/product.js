import React from 'react'
import './product.css'
const Product = (props) => {
    return (
        <div className='Product'>
            <h3>{props.name}</h3>
        </div>
    )
}

export default Product;
