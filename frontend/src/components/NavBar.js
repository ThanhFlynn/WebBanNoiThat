import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

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
  return (
    <ul className='nav-menu'>
      {menus.map((menu,index) => (
        <li className='room' key={index}>
          <Link to="#" className='nav-title'>{menu.name}</Link>
          <div className='nav-dropdown'>
            {categories.filter(category => category.menu === menu.id).map((category, index) => (
              <a href='#' key={index}>{category.name}</a>
            ))}
          </div>
        </li>
      ))}
    </ul>
  )
}

export default NavBar
