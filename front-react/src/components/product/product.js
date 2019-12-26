import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import './product.css'
const Product = (props) => {
    return (
        <div className='product primary-3'>
            <IconButton className="button__delete" aria-label="delete" onClick={()=>props.deleteProduct(props.id)} style={{borderRadius:'50%'}}>
                <HighlightOffOutlinedIcon color="secondary" style={{ fontSize: 30 }} />
            </IconButton>
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
