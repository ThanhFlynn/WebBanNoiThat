import React, {useEffect} from 'react'
import { PayPalButton } from 'react-paypal-button-v2'

const PaypalButton = (price) => {

    const paypalOptions = {
        clientId:"AfWQvJ7Oc_0s_KbUFQQqxHWHbGl4xXA2C_LpL_a0JfGiYjkMguQSo19_XxtdySgFrT-FjfS8qnohM85E",
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
        <PayPalButton 
            amount={Number(price.price).toFixed(2)}
            options={paypalOptions}
            onSuccess={onSuccess}
            onCancel={onCancel}
            onError={onError}/>
    )
}

export default PaypalButton
