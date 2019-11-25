import React from 'react'
import './product.css'
const Product = (props) => {
    return (
        <div className='product primary-3'>
            <h2>{props.name}</h2>
            <div className='product__content'>
                <div className='product__content__property'>
                    <h3>{props.amount}</h3>
                    <span>amount</span>
                </div>
                <div className='product__content__property'>
                    <h3>{props.calories}</h3>
                    <span>calories</span>
                </div>
                <div className='product__content__property'>
                    <h3>{props.unit}</h3>
                    <span>unit</span>
                </div>
            </div>
        </div>
    )
}

export default Product;
