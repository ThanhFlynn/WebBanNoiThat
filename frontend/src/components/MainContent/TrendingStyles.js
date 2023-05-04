import React from 'react'

const TrendingStyles = () => {
    return (
        <div className='trending-style mt-5'>
            <div className='container'>
                <h2 className='text-center'>Trending Styles</h2>
                <div className='row mt-5'>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 trending-content'>
                        <img src='https://www.2modern.com/cdn/shop/files/homepage_3_up_midcentury_380x.jpg?v=1638814897' alt="trending-img-1"></img>
                        <div className='text-center mt-3'>
                            <p className='hp-section--3up__title'>Mid-Century Modern</p>
                            <p className='hp-section--3up__text'>Clean-lined designs offer refined forms and functional beauty for a timeless aesthetic.</p>
                        </div>
                    </div>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 trending-content'>
                        <img src='https://www.2modern.com/cdn/shop/files/homepage_3_up_scandi_380x.jpg?v=1638814897' alt='trending-img-2'></img>
                        <div className='text-center mt-3'>
                            <p className='hp-section--3up__title'>Scandinavian Design</p>
                            <p className='hp-section--3up__text'>Inspired designs crafted in the Nordic traditions of minimalism, simplistic beauty, and pure functionality.</p>
                        </div>
                    </div>
                    <div className='col-8 offset-2 col-md-4 offset-md-0 trending-content'>
                        <img src='https://www.2modern.com/cdn/shop/files/homepage_3_up_farmhouse_380x.jpg?v=1638907088' alt='trending-img-3'></img>
                        <div className='text-center mt-3'>
                            <p className='hp-section--3up__title'>Modern Farmhouse</p>
                            <p className='hp-section--3up__text'>Rustic sophistication meets casual elegance in farmhouse's fresh take on modern country inspired style.</p>
                        </div>
                    </div>
                </div>
            </div>       
        </div>
    )
}

export default TrendingStyles
