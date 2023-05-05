import React,{useState, useEffect} from 'react'
import Banner from '../../components/MainContent/Banner'
import TopCategories from '../../components/MainContent/TopCategories'
import NewProduct from '../../components/MainContent/NewProduct'
import ListItcon from '../../components/MainContent/ListItcon'
import TrendingStyles from '../../components/MainContent/TrendingStyles'
import ShopifySection from '../../components/MainContent/ShopifySection'

const HomePage = () => {

  const [topproducts, setTopProducts] = useState([]);
  const [newproducts, setNewProducts] = useState([]);

  useEffect(() => {
    getProducts();
  },[])

  let getProducts = async() =>{
      let response = await fetch("/api/getProducts/");
      let data = await response.json();
      getTopProduct(data);
      getNewProduct(data);
  }

  let getTopProduct = (products) =>{
    let data = products;
    data.sort(function(a,b){
      return b["purchases"] - a["purchases"];
    });
    let product_item = [];
    for(let i=0; i<6; ++i)
        product_item[i] = data[i];
    setTopProducts(product_item);
  }

  let getNewProduct = (products) =>{
    let data = products;
    data.sort(function(a,b){
        return Date.parse(a["updated"]) - Date.parse(b["updated"]);
    });
    let product_item = [];
    for(let i=0; i<8; ++i)
      product_item[i] = data[i];
    setNewProducts(product_item);
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