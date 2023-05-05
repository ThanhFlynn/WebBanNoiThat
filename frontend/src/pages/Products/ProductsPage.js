import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const ProductsPage = () => {

    let { menus,categories,proid }= useParams();

    useEffect(() => {
        console.log(menus,categories,proid);
    },[])

    return (
        <div>
            <p>Hello</p>
        </div>
    )
}

export default ProductsPage
