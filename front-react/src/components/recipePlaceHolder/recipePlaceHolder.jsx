import React from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import  ContentLoader  from 'react-content-loader'
import './recipePlaceHolder.css'

const recipePlaceHolder = () => {
    return (
        <ContentLoader 
        speed={2}
        width={430}
        height={280}
        viewBox="0 0 430 280"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="43" y="154" rx="3" ry="3" width="77" height="31" /> 
        <rect x="42" y="98" rx="3" ry="3" width="50" height="31" /> 
        <rect x="180" y="3" rx="0" ry="0" width="190" height="81" /> 
        <rect x="42" y="5" rx="0" ry="0" width="110" height="30" /> 
        <rect x="42" y="50" rx="0" ry="0" width="111" height="26" /> 
        <rect x="104" y="98" rx="3" ry="3" width="50" height="31" /> 
        <rect x="162" y="153" rx="3" ry="3" width="89" height="31" /> 
        <rect x="290" y="154" rx="3" ry="3" width="77" height="31" />
      </ContentLoader>
    )
}

export default recipePlaceHolder
