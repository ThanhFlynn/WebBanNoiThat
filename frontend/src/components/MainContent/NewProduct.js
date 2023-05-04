import React, {useState, useEffect} from 'react'

const NewProduct = ({pds}) => {
    
    return (
        <div className="container newproducts">
            <h2>Sản phẩm mới nhất</h2>
            <div className='row mt-4'>
                {pds.map((item,index) => {
                    return <div key={index} className='product-item col-6 col-md-3 col-sm-4 text-center'>
                            <div className='product-item-inner'>
                                <img src={item["image"]} alt="product-img"></img>
                                <div className='item-content mt-2'>
                                    <div className='title d-flex justify-content-between'>
                                        <p className='product-name'>{item["name"]}</p>
                                        <i className="fa-regular fa-heart"></i>
                                    </div>
                                    <p className='price text-end mb-2'>{item["price"].toLocaleString('en-US') + "₫"}</p>
                                </div>
                            </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default NewProduct
