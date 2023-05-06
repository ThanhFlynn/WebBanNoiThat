import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ProductDetail from './ProductDetail';
import ProductCate from './ProductCate';
import ProductMenu from './ProductMenu';

const ProductsPage = () => {

    let { menus,categories,proid }= useParams();

    const list_menu = {
        "phong-khach": 1,
        "phong-an":2,
        "phong-ngu":3,
        "trang-tri-va-gia-dung":4,
        "thiet-ke-noi-that":5,
        "blog-tu-van":6,
        "san-pham-khuyen-mai":7
    };

    const list_cate = {
        "sofa-da": 1,
        "sofa-vai": 2,
        "sofa-giuong": 3,
        "ban-tra": 4,
        "ghe-thu-gian": 5,
        "tu-ke": 6,
        "ban-an-thong-minh-mo-rong": 7,
        "ghe-an": 8,
        "phong-ngu-nguoi-lon": 9,
        "phong-ngu-tre-em": 10,
        "tuong-trang-tri": 11,
        "tranh-khung-anh": 12,
        "lo-trang-tri": 13,
        "den-trang-tri": 14,
        "tham": 15,
        "goi-tua-sofa": 16,
        "guong-trang-tri": 17,
        "hoa-gia": 18,
        "do-dung-ban-an": 19
    };

    return (
        <div className='product-page'>
            {proid ? (
                <ProductDetail menu_id={list_menu[menus]} cate_id={list_cate[categories]} pro_code={proid}/>
            ) : (
                categories ? (
                    <ProductCate menu_id={list_menu[menus]} cate_id={list_cate[categories]}/>
                ):(
                    menus ? (
                        <ProductMenu menu_id={list_menu[menus]}/>
                    ):null
                )
            )}
        </div>
    )
}

export default ProductsPage
