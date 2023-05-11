import React, {useState, useEffect} from 'react';
import { PayPalButton } from "react-paypal-button-v2";

const Cart = () => {
    const [proInCart, setProInCart]  = useState(localStorage.getItem('cart-pro') ? JSON.parse(localStorage.getItem('cart-pro')) : null);
    const [listQuantity, setListQuantity] = useState([]);

    let countPro = ()=>{
        let sum = 0;
        if(proInCart !== null)
            proInCart.map(pro => sum += Number(pro[1]));
        return sum;
    }

    let totalPrice = ()=>{
        let sum = 0;
        if(proInCart !== null)
            proInCart.map(pro => sum += pro[1]*pro[0].price);
        return sum;
    }

    let handleChangeQuantity = (_quantity,index) =>{
        proInCart.map((pro,idx) => listQuantity[idx] = pro[1]);
        listQuantity[index] = _quantity;
        console.log(JSON.stringify(listQuantity));
    }

    let handleUpdateCart = ()=>{    
        listQuantity.map((_quantity, idx) => proInCart[idx][1] = _quantity);
        localStorage.setItem('cart-pro',JSON.stringify(proInCart));
        window.location.reload();
    }

    const paypalOptions = {
        clientId:"AWUKbrr2Jn0lge4O0yqiyR3vlYF4AwCjItV9nUixOuPhLcduUZCD1NKTEyMsCvDlBWReyvfCKZ-sVPw-",
        currency: "USD"
    }

    const onSuccess = () => {
        // Xử lý khi thanh toán thành công
        console.log("Success!");
    };

    const onCancel = () => {
        // Xử lý khi người dùng huỷ thanh toán
        console.log("Cancel!");
    };

    const onError = () => {
        // Xử lý khi xảy ra lỗi
    };

    return (
        <div className='display-cart'>
            <div className='container'>
                <h3>Giỏ hàng của tôi</h3>
                <div className='row mb-3'>
                    <div className='col-12 col-lg-9'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-5'>
                                    <p>{countPro()} sản phẩm</p>
                                </div>
                                <div className='col-4'>
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
                                                    <div className='row'>
                                                        <div className='col-5'>
                                                            <img src={pro[0].image} alt={pro[0].product_code+pro[0].name}/>
                                                        </div>
                                                        <div className='col-7'>
                                                            <i><b>{pro[0].name}</b></i><br/>
                                                            <small>Size: {pro[0].size}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='col-4'>
                                                <p>{new Intl.NumberFormat('en-VN', { thousandSeparator: "," }).format(pro[0].price)}₫</p>
                                            </div>
                                            <div className='col-3'>
                                                <input type='number' defaultValue={pro[1]} min="0" max={pro[0].quantity} onChange={(e) =>{e.preventDefault();handleChangeQuantity(e.target.value,index)}}/>
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
                            <div className='d-flex justify-content-between align-items-center border-bottom'>
                                <b>Tổng cộng:</b>
                                <p>{new Intl.NumberFormat('en-VN', { thousandSeparator: "," }).format(totalPrice() * 1.02)}₫</p>
                            </div>
                            <div className='mt-4'>
                                <PayPalButton
                                    amount={(totalPrice()*1.02 / 23470)}
                                    options={paypalOptions}
                                    onSuccess={onSuccess}
                                    onCancel={onCancel}
                                    onError={onError}
                                    />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
