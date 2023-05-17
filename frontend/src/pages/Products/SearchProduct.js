import React, {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom'
import DivPageProductWish from '../../components/PageProduct/DivPageProductWish';
import Cookies from 'js-cookie';

const SearchProduct = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [listPro, setListPro] = useState([]);
    const csrftoken = Cookies.get('csrftoken');

    useEffect(() =>{
        fetch('/api/search?keyword='+searchParams.get('keyword'), {
            headers: {
                'X-CSRFToken' : csrftoken
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            setListPro(data);
        })
    },[])

    return (
        <div className='search-product'>
            <div className='container'>
                <div className='row'>
                    <h2>Kết quả tìm kiếm</h2>
                    {listPro.length === 0? (
                        <p>Không tìm thấy sản phẩm phù hợp</p>
                    ):(
                        <DivPageProductWish itemsPerPage={12} items={listPro}/>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SearchProduct
