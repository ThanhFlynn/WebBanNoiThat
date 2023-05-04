import React,{useState, useEffect} from 'react'
import Banner from '../../components/MainContent/Banner'
import TopCategories from '../../components/MainContent/TopCategories'
import NewProduct from '../../components/MainContent/NewProduct'

const HomePage = () => {

  return (
    <div className='main-content-inner'>
      <Banner />
      <TopCategories />
      <NewProduct />
    </div>
  )
}

export default HomePage