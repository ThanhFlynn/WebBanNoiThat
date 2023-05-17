import React from 'react'
import { PayPalButton } from 'react-paypal-button-v2'
import Cookies from 'js-cookie';

const PaypalButton = ({price,pro}) => {

    const csrftoken = Cookies.get('csrftoken');
    let authTokens = sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null;

    const paypalOptions = {
        clientId:"AfWQvJ7Oc_0s_KbUFQQqxHWHbGl4xXA2C_LpL_a0JfGiYjkMguQSo19_XxtdySgFrT-FjfS8qnohM85E",
        currency: "USD"
    }

    const onSuccess = () => {
        fetch("/api/createOrder/",{
            method: "POST",
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(authTokens.access_token),
                'X-CSRFToken' : csrftoken
            },
            body: JSON.stringify(pro)
        })
        .then(response => {
            if(response.ok){
                alert("Thanh toán thành công");
                localStorage.removeItem('cart-pro');
                window.location.reload();
                return response.json();
            }
            throw new Error('Something went wrong');
        })
        .then(data => console.log(data))
        .catch((error)=>{
            console.log(error)
        });
    };

    const onCancel = () => {
        // Xử lý khi người dùng huỷ thanh toán
        console.log("Cancel!");
    };

    const onError = () => {
        // Xử lý khi xảy ra lỗi
    };

    return (
        <PayPalButton
            amount={Number(price).toFixed(2)}
            options={paypalOptions}
            onSuccess={onSuccess}
            onCancel={onCancel}
            onError={onError}/>
    )
}

export default PaypalButton
