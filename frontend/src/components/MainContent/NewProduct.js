import React, {useState, useEffect} from 'react'

const NewProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    },[])

    let getProducts = async() =>{
        let response = await fetch("/api/getProducts/");
        let data = await response.json();
        data.sort(function(a,b){
            return Date.parse(a["updated"]) - Date.parse(b["updated"]);
        });
        let product_item = [];
        for(let i=0; i<8; ++i)
            product_item[i] = data[i];
        setProducts(product_item);
    }
    
    return (
        <div className="container newproducts mb-5">
            <h2>Sản phẩm mới nhất</h2>
            <div className='row mt-4'>
                {products.map((item,index) => {
                    return <div key={index} className='product-item col-6 col-md-3 col-sm-4 text-center'>
                            <div className='product-item-inner'>
                                <img src={item["image"]} alt="product-img"></img>
                                <div className='item-content'>
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
