import React, {useState, useEffect} from 'react'
import OrderConfirm from './OrderConfirm';
import OrderDelivery from './OrderDelivery';
import OrderReceived from './OrderReceived';
import OrderCancel from './OrderCancel';

const OrderHistory = () => {

    const [choice, setChoice] = useState(1);
    const [state, setState] = useState([]);

    return (
        <>
            <div className='order-history'>
                <div className='container'>
                    <div className='row text-center order-history-header'>
                        <div className={choice === 1 ? 'col-3 nav-item active-choice' : 'col-3 nav-item'} onClick={(e) => {e.preventDefault();setChoice(1);}}>
                            Chờ xác nhận
                        </div>
                        <div className={choice === 2 ? 'col-3 nav-item active-choice' : 'col-3 nav-item'} onClick={(e) => {e.preventDefault();setChoice(2);}}>
                            Đang giao
                        </div>
                        <div className={choice === 3 ? 'col-3 nav-item active-choice' : 'col-3 nav-item'} onClick={(e) => {e.preventDefault();setChoice(3);}}>
                            Đã nhận
                        </div>
                        <div className={choice === 4 ? 'col-3 nav-item active-choice' : 'col-3 nav-item'} onClick={(e) => {e.preventDefault();setChoice(4);}}>
                            Đã hủy
                        </div>
                    </div>
                    {choice === 1 ? (
                        <div className='row order-history-content'>
                            <OrderConfirm />
                        </div>
                    ):(
                        choice === 2 ? (
                            <div className='row order-history-content'>
                                <OrderDelivery />
                            </div>
                        ):(
                            choice === 3 ? (
                                <div className='row order-history-content'>
                                    <OrderReceived />
                                </div>
                            ):(
                                choice === 4 ? (
                                    <div className='row order-history-content'>
                                        <OrderCancel />
                                    </div>
                                ): null
                            )
                        )
                    )}
                </div>
            </div>
        </>
    )
}

export default OrderHistory
