import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

const authTokens = sessionStorage.getItem('info-user-token') ? JSON.parse(sessionStorage.getItem('info-user-token')) : null;
const csrftoken = Cookies.get('csrftoken');

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

let checkContent = false;

class OrderCancel extends React.Component {

    state = {
        items: [],
        hasMore: true,
        start: 0
    };

    setUpdata = () => {
        fetch("/api/getConfirmOrder?fro="+this.state.start+"&to="+(this.state.start+3)+"&type=5",{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authentication':'Bearer ' + String(authTokens.access_token),
                'X-CSRFToken' : csrftoken
            }
        })
        .then((response) => response.json())
        .then(data => {
            if(data.length > 0){
                this.setState({
                    items: data,
                    hasMore: true
                });
                checkContent = true;
            }
            else{
                this.setState({
                    items: data,
                    hasMore: false
                });
                checkContent = false;
            }
        })
    };

    componentDidMount(){
        this.setUpdata();
    }

    fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1 secs
        this.state.start= this.state.start+3;
        setTimeout(() => {
            fetch("/api/getConfirmOrder?fro="+this.state.start+"&to="+(this.state.start+3)+"&type=5",{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'Authentication':'Bearer ' + String(authTokens.access_token),
                    'X-CSRFToken' : csrftoken
                }
            })
            .then((response) => response.json())
            .then(data => {
                if(data.length < 3)
                    this.setState({
                        items: this.state.items.concat(data),
                        hasMore: false,
                    });
                else {
                    this.setState({
                        items: this.state.items.concat(data),
                        hasMore: true
                    });
                }
            })
        }, 1000);
    };

    render() {
        return (
        <>
            {checkContent == true ? (
                <InfiniteScroll
                dataLength={this.state.items.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                loader={<h4 className="text-center">Loading...</h4>}
                >
                {this.state.items.map((i, index) => (
                    <div key={index} className="container-fluid my-3" style={{backgroundColor: "#eee", borderRadius: "10px"}}>
                        <div className="row py-3">
                            <div className="container-fluid">
                                <div className="row border-bottom">
                                    <div className="col-3">
                                        <Link to={"/products/"+formatName(list_menu[formatName(list_cate[i[1].category])])+"/"+formatName(list_cate[i[1].category])+"/"+i[1].product_code}>
                                            <img src={i[1]['image']} />
                                        </Link>
                                    </div>
                                    <div className="col-9">
                                        <i style={{fontSize: "18px",fontWeight: "700"}}>{i[1]['name']}</i>
                                        <div className="d-flex justify-content-between mt-2">
                                            <div>
                                                <p><b>Mã sản phẩm:</b> {i[1]['product_code']}</p>
                                                <p>x{i[0]['quantity']}</p>
                                            </div>
                                            <div>
                                                <p style={{color: "red"}}>{new Intl.NumberFormat('en-VN', { thousandSeparator: "," }).format(i[1].selling_price)}₫</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-end py-3">
                                    <p style={{color: "red"}} className="py-3"><span style={{color: "#000"}}>Thành tiền:</span> {new Intl.NumberFormat('en-VN', { thousandSeparator: "," }).format(i[1].selling_price * i[0]["quantity"] * 1.02)}₫</p>
                                    <Link to={"/products/"+formatName(list_menu[formatName(list_cate[i[1].category])])+"/"+formatName(list_cate[i[1].category])+"/"+i[1].product_code}
                                        style={{padding: "5px 10px", border: "1px solid #bbb", borderRadius:"5px"}}
                                        >
                                        Mua lại
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </InfiniteScroll>
            ):(
                <h3>Chưa có đơn hàng nào</h3>
            )}
        </>
        );
    }
}

export default OrderCancel