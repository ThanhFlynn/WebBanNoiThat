import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const ProductDetail = ({menu_id, cate_id, pro_code}) => {

    const list_menu = {
        "1":"Phòng khách",
        "2":"Phòng ăn",
        "3":"Phòng ngủ",
        "4":"Trang trí và gia dụng",
        "5":"Thiết kế nội thất",
        "6":"Blog tư vấn",
        "7":"Sản phẩm khuyến mại"
    };

    const list_cate = {
        "1":"Sofa da",
        "2":"Sofa vải",
        "3":"Sofa giường",
        "4":"Bàn trà",
        "5":"Ghế thư giãn",
        "6":"Tủ - Kệ",
        "7":"Bàn ăn thông minh mở rộng",
        "8":"Ghế ăn",
        "9":"Phòng ngủ người lớn",
        "10":"Phòng ngủ trẻ em",
        "11":"Tượng trang trí",
        "12":"Tranh - Khung ảnh",
        "13":"Lọ trang trí",
        "14":"Đèn trang trí",
        "15":"Thảm",
        "16":"Gối tựa sofa",
        "17":"Gương trang trí",
        "18":"Hoa giả",
        "19":"Đồ dùng bàn ăn" 
    };

    let formatName = (name) =>{
        let str="";
        str = name.toLowerCase();
        str = str.trim();
        str = str.replaceAll(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replaceAll(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replaceAll(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replaceAll(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replaceAll(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replaceAll(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replaceAll(/đ/g, "d");
        str = str.replaceAll("-"," ");
        str = str.replaceAll("   "," ");
        str = str.replaceAll("  "," ");
        str = str.replaceAll(" ","-");
        return str;
    };

    const [product, setProduct] = useState({});

    useEffect(() =>{
        getProduct();
    },[]);

    let getProduct = async() =>{
        let response = await fetch('/api/getProductDetail?menu_id='+menu_id+'&cate_id='+cate_id+'&pro_code='+pro_code);
        let data = await response.json();
        setProduct(data);
        console.log(data);
    }

    const description_content = "<p>"+product.description+"</p>";

    return (
        <div className='product-detail'>
            <div className='container'>
                <div className='row'>
                    <div className='product-breadcrum mb-3'>
                        <ul className='d-flex'>
                            <li>
                                <Link to={"/"}>Trang chủ / </Link>
                            </li>
                            <li>
                                <Link to={"/products/"+formatName(list_menu[menu_id])}>{list_menu[menu_id]} / </Link>
                            </li>
                            <li>
                                <Link to={"/products/"+formatName(list_menu[menu_id])+"/"+formatName(list_cate[cate_id])}>{list_cate[cate_id]} / </Link>
                            </li>
                            <li>
                                <strong>{product.name}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className='display-product'>
                        <div className='container'>
                            <div className='row'>
                                <div className='display-product-img col-12 col-md-6'>
                                    <img src={product.image} alt={product.product_code} />
                                </div>
                                <div className='display-product-content col-12 col-md-6'>
                                    <h3>{product.name}</h3>
                                    <p>Mã SP: {product.product_code}</p>
                                    <p className='price'>{new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(product.price)}₫</p>
                                    <p><strong>Kích thước(cm) </strong>{product.size}</p>
                                    <p><strong>Chất liệu </strong>{product.material}</p>
                                    {product.material ? (
                                        <p><strong>Bảo hành </strong>{product.warranty}</p>
                                    ): null}
                                    <Link to='#'>Thêm vào giỏ</Link>
                                </div>
                            </div>
                        </div>            
                    </div>
                    {product.description ?(
                        <div className='display-description'>
                            <h3>Mô tả sản phẩm</h3>
                            <div className='description-content mt-3'
                                dangerouslySetInnerHTML={{__html: description_content}}
                            />
                        </div>
                    ):null}
                </div>
            </div>

        </div>
    )
}

export default ProductDetail