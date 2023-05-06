import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
);

const NavBar = () => {

  const [menus,setMenus] = useState([]);
  const [categories,setCategories] = useState([]);

  useEffect(() => {
    getMenu();
    getCategories();
  },[])

  let getMenu = async() =>{
    let response = await fetch('/api/getMenus/');
    let data = await response.json();
    setMenus(data);
  }
  let getCategories = async() =>{
    let response = await fetch('/api/getCategories/');
    let data = await response.json();
    setCategories(data);
  }

  let createMenu = (name) =>{
    let str="";
    str = name.toLowerCase();
    str = str.trim();
    str = str.replaceAll(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replaceAll(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replaceAll(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replaceAll(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replaceAll(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replaceAll(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replaceAll(/đ/g, "d");
    str = str.replaceAll("-"," ");
    str = str.replaceAll("   "," ");
    str = str.replaceAll("  "," ");
    str = str.replaceAll(" ","-");
    return str;
  }

  async function handleClick(){
    await delay(1);
    window.location.reload();
  }

  return (
    <ul className='nav-menu'>
      {menus.map((menu,index) => (
        <li className='room' key={index}>
          <Link to={"/products/"+createMenu(menu.name)} className='nav-title' onClick={handleClick}>{menu.name}</Link>
          <div className='nav-dropdown'>
            {categories.filter(category => category.menu === menu.id).map((category, index) => (
              <Link to={"/products/"+createMenu(menu.name)+"/"+createMenu(category.name)} key={index} onClick={handleClick}>{category.name}</Link>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NavBar
