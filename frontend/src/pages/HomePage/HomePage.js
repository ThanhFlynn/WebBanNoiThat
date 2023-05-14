import React,{useState, useEffect} from 'react'
import Banner from '../../components/MainContent/Banner'
import TopCategories from '../../components/MainContent/TopCategories'
import NewProduct from '../../components/MainContent/NewProduct'
import ListItcon from '../../components/MainContent/ListItcon'
import TrendingStyles from '../../components/MainContent/TrendingStyles'
import ShopifySection from '../../components/MainContent/ShopifySection'
import Cookies from 'js-cookie';

const HomePage = () => {

  const [topproducts, setTopProducts] = useState([]);
  const [newproducts, setNewProducts] = useState([]);
  const csrftoken = Cookies.get('csrftoken');

  useEffect(() => {
    getTopProducts();
    getNewProducts();
  },[])

  let getTopProducts = async() =>{
    let response = await fetch("/api/getNewTopProducts/Top/", {
      headers: {
        'X-CSRFToken' : csrftoken
      }
    });
    let data = await response.json();
    setTopProducts(data);
  }

  let getNewProducts = async() =>{
    let response = await fetch("/api/getNewTopProducts/New/", {
      headers: {
        'X-CSRFToken' : csrftoken
      }
    });
    let data = await response.json();
    setNewProducts(data);
  }

  return (
    <div className='main-content-inner'>
      <Banner />
      <TopCategories pds={topproducts}/>
      <NewProduct pds={newproducts}/>
      <TrendingStyles />
      <ListItcon />
      <ShopifySection />
    </div>
  )
}

export default HomePage