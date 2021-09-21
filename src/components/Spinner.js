import React from 'react'
import spinner from './ajax-loader.gif'

function Spinner() {
    return (
        <div className="text-center my-4">
            <img src={spinner} alt="spinner" />           
        </div>
    )
}


export default Spinner
