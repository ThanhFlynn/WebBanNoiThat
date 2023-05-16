import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PaypalButton from './PaypalButton';

const Cart = () => {
    const [proInCart, setProInCart]  = useState(localStorage.getItem('cart-pro') ? JSON.parse(localStorage.getItem('cart-pro')) : null);
    const [listQuantity, setListQuantity] = useState([]);
    const [tygia, setTygia] = useState({});

    const list_menu = {
        "sofa-da"                  :"Phòng khách",
        "sofa-vai"                 :"Phòng khách",
        "sofa-giuong"              :"Phòng khách",
        "ban-tra"                  :"Phòng khách",
        "ghe-thu-gian"             :"Phòng khách",
        "tu-ke"                    :"Phòng khách",
        "ban-an-thong-minh-mo-rong":"Phòng ăn",
        "ghe-an"                   :"Phòng ăn",
        "phong-ngu-nguoi-lon"      :"Phòng ngủ",
        "phong-ngu-tre-em"         :"Phòng ngủ",
        "tuong-trang-tri"          :"Trang trí và gia dụng",
        "tranh-khung-anh"          :"Trang trí và gia dụng",
        "lo-trang-tri"             :"Trang trí và gia dụng",
        "den-trang-tri"            :"Trang trí và gia dụng",
        "tham"                     :"Trang trí và gia dụng",
        "goi-tua-sofa"             :"Trang trí và gia dụng",
        "guong-trang-tri"          :"Trang trí và gia dụng",
        "hoa-gia"                  :"Trang trí và gia dụng",
        "do-dung-ban-an"           :"Trang trí và gia dụng",

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

    let countPro = ()=>{
        let sum = 0;
        if(proInCart !== null)
            proInCart.map(pro => sum += Number(pro[1]));
        return sum;
    }

    let totalPrice = ()=>{
        let sum = 0;
        if(proInCart !== null)
            proInCart.map(pro => sum += pro[1]*pro[0].selling_price);
        return sum;
    }

    useEffect(()=>{
        fetch('https://api.exchangerate-api.com/v4/latest/VND')
        .then(response => response.json())
        .then(data => {setTygia(data["rates"]);})
    },[])

    let handleChangeQuantity = (_quantity,index) =>{
        proInCart.map((pro,idx) => listQuantity[idx] = pro[1]);
        if(Number(_quantity) <= proInCart[index][0].quantity)
            listQuantity[index] = Number(_quantity);
        else 
            listQuantity[index] = proInCart[index][0].quantity;
        proInCart.map((pro,idx) => pro[1] = Number(listQuantity[idx]));
        console.log(proInCart[index][0].quantity, _quantity,listQuantity);
    }

    let handleUpdateCart = ()=>{
        let pIC = proInCart.filter(pro=>{
            return pro[1] !==0;
        });
        localStorage.setItem('cart-pro',JSON.stringify(pIC));
        window.location.reload();
    }

    let handleDeletePro = (pro) =>{
        let pIC = proInCart.filter(pd=>{
            return pd[0].id !== pro[0].id;
        });
        localStorage.setItem('cart-pro',JSON.stringify(pIC));
        window.location.reload();
    }

    return (
        <div className='display-cart'>
            <div className='container'>
                <h3>Giỏ hàng của tôi</h3>
                {countPro() !== 0? (
                <div className='row mb-3'>
                    <div className='col-12 col-lg-9'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-5'>
                                    <p>{countPro()} sản phẩm</p>
                                </div>
                                <div className='col-3'>
                                    <p>Giá</p>
                                </div>
                                <div className='col-3'>
                                    <p>Số lượng</p>
                                </div>
                            </div>
                        </div>
                        {proInCart !== null ? (
                            <>
                                {proInCart.map((pro,index) => (
                                    <div className='container mb-4' key={index}>
                                        <div className='row'>
                                            <div className='col-5'>
                                                <div className='container'>
                                                    <Link to={"/products/"+formatName(list_menu[formatName(list_cate[pro[0].category])])+"/"+formatName(list_cate[pro[0].category])+"/"+pro[0].product_code} style={{margin: 0 + "!important",padding:0 + "!important"}}>
                                                        <div className='row'>
                                                            <div className='col-5'>
                                                                <img src={pro[0].image} alt={pro[0].product_code+pro[0].name}/>
                                                            </div>
                                                            <div className='col-7'>
                                                                <i><b>{pro[0].name}</b></i><br/>
                                                                <small>Size: {pro[0].size}</small>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className='col-3'>
                                                <p>{new Intl.NumberFormat('en-VN', { thousandSeparator: "," }).format(pro[0].selling_price)}₫</p>
                                            </div>
                                            <div className='col-3'>
                                                <input type='number' defaultValue={pro[1]} min="0" max={pro[0].quantity} onChange={(e) =>{e.preventDefault();handleChangeQuantity(e.target.value,index)}}/>
                                            </div>
                                            <div className='col-1'>
                                                <span onClick={(e) => {e.preventDefault(); if(window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) handleDeletePro(pro);}}>
                                                    <i class="fa-regular fa-circle-xmark" ></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        ) : null}
                        <div className='update-cart-btn mb-3'>
                            <button className='bg-success' onClick={(e) => {e.preventDefault();handleUpdateCart();}}>Cập nhật giỏ hàng</button>
                        </div>
                    </div>
                    <div className='col-12 col-lg-3 order-summary'>
                        <div className='order-summary-inner'>
                            <h6 className='border-bottom'>Tóm tắt đơn hàng</h6>
                            <div className='content'>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <b>Tổng phụ:</b>
                                    <p>{new Intl.NumberFormat('en-VN', { thousandSeparator: "," }).format(totalPrice())}₫</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-3 pb-3 border-bottom'>
                                    <b>Tiền ship:</b>
                                    <p>{new Intl.NumberFormat('en-VN', { thousandSeparator: "," }).format(totalPrice() *0.02)}₫</p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between align-items-center border-bottom py-2'>
                                <b>Tổng cộng:</b>
                                <p>{new Intl.NumberFormat('en-VN', { thousandSeparator: "," }).format(totalPrice() * 1.02)}₫</p>
                            </div>
                            <div className='mt-4'>
                                <PaypalButton price={totalPrice()*1.02 * tygia["USD"]}/>
                            </div>
                        </div>
                    </div>
                </div>
                ):(
                    <h4>Không có sản phẩm nào trong giỏ hàng</h4>
                )}
            </div>
        </div>
    )
}

export default Cart
