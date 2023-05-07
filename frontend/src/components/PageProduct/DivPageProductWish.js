import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';

const DivProduct = ({currentItems}) => {

    let navigate = useNavigate();

    const authTokens = sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null;

    const list_menu = {
        "sofa-da"                  :"Phòng khách",
        "sofa-vai"                 :"Phòng khách",
        "sofa-giuong"              :"Phòng khách",
        "ban-tra"                  :"Phòng khách",
        "ghe-thu-gian"             :"Phòng khách",
        "tu-ke"                    :"Phòng khách",
        "ban-an-thong-minh-mo-rong":"Phòng ăn",
        "ghe-an"                   :"Phòng ăn",
        "phong-ngu-nguoi-lon"      :"Phòng ngủ",
        "phong-ngu-tre-em"         :"Phòng ngủ",
        "tuong-trang-tri"          :"Trang trí và gia dụng",
        "tranh-khung-anh"          :"Trang trí và gia dụng",
        "lo-trang-tri"             :"Trang trí và gia dụng",
        "den-trang-tri"            :"Trang trí và gia dụng",
        "tham"                     :"Trang trí và gia dụng",
        "goi-tua-sofa"             :"Trang trí và gia dụng",
        "guong-trang-tri"          :"Trang trí và gia dụng",
        "hoa-gia"                  :"Trang trí và gia dụng",
        "do-dung-ban-an"           :"Trang trí và gia dụng",

    };

    const list_cate = {
        "1":"Sofa da",
        "2":"Sofa vải",
        "3":"Sofa giường",
        "4":"Bàn trà",
        "5":"Ghế thư giãn",
        "6":"Tủ - Kệ",
        "7":"Bàn ăn thông minh mở rộng",
        "8":"Ghế ăn",
        "9":"Phòng ngủ người lớn",
        "10":"Phòng ngủ trẻ em",
        "11":"Tượng trang trí",
        "12":"Tranh - Khung ảnh",
        "13":"Lọ trang trí",
        "14":"Đèn trang trí",
        "15":"Thảm",
        "16":"Gối tựa sofa",
        "17":"Gương trang trí",
        "18":"Hoa giả",
        "19":"Đồ dùng bàn ăn" 
    };

    let formatName = (name) =>{
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
    };

    async function deleteItemWishList(item, auth_token){
        let response = await fetch('/api/deleteItemWishList/', {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(auth_token.access_token)
            },
            body: JSON.stringify(item)
        })

        if(response.status === 401){
            alert("Hết phiên đăng nhập vui lòng đăng nhập lại!");
            navigate("/accounts/login/");
        }else if(response.status === 200){
            window.location.reload();
        }
    }

    let handleDeleteItem = (item) =>{
        deleteItemWishList(item,authTokens);
    }

    return (
        <>
            {currentItems.map((item,index) => {
                return <div key={index} className='product-item col-6 col-md-3 col-sm-4 text-center'>
                        <div className='product-item-inner'>
                            <Link to={"/products/"+formatName(list_menu[formatName(list_cate[item.category])])+"/"+formatName(list_cate[item.category])+"/"+item.product_code}>
                                <span className='delete-item' onClick={(event) =>{event.preventDefault();event.stopPropagation(); handleDeleteItem(item);}}>
                                    <i class="fa-regular fa-circle-xmark"></i>
                                </span>
                                <img src={item["image"]} alt="product-img"></img>
                                <div className='item-content mt-2'>
                                    <div className='title d-flex justify-content-between'>
                                        <p className='product-name text-start'>{item["name"]}</p>
                                        <span>
                                            <i className="fa-regular fa-heart"></i>
                                        </span>
                                    </div>
                                    <p className='price text-end mb-2'>{item["price"].toLocaleString('en-US') + "₫"}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
            })}   
        </>
    )
}

function DivPageProductWish({ itemsPerPage, items }) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <DivProduct currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default DivPageProductWish
