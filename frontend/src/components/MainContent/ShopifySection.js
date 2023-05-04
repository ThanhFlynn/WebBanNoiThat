import React from 'react'

const ShopifySection = () => {
    return (
        <div className='shopify-section'>
            <div className='container'>
                <div className='row text-center'>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 shopify-item'>
                        <img src='https://www.2modern.com/cdn/shop/files/cash_800c0c5c-a721-44cb-8c87-e44408e89670_40x.png?v=1617154692' alt='shopify-item-1'></img>
                        <p>100% PRICE MATCH GUARANTEE</p>
                    </div>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 shopify-item'>
                        <img src='https://www.2modern.com/cdn/shop/files/refund_9e73b429-e588-48f6-ade0-a1c31b160844_40x.png?v=1617154704' alt='shopify-item-2'></img>
                        <p>EASY 30 DAY RETURN POLICY</p>
                    </div>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 shopify-item'>
                        <img src='https://www.2modern.com/cdn/shop/files/shipping_40x.png?v=1617154609' alt='shopify-item-3'></img>
                        <p>FREE SHIPPING OVER $50</p>
                    </div>
                </div>
            </div>        
        </div>
    )
}

export default ShopifySection
