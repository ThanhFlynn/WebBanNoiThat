import React from 'react'
import Banner from '../../components/MainContent/Banner'
import TopCategories from './TopCategories'

const HomePage = () => {
  return (
    <div className='main-content-inner'>
      <Banner />
      <TopCategories />
    </div>
  )
}

export default HomePage