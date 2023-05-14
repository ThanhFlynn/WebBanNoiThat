import{
  HashRouter as HRouter,
  Route,
  Routes,
} from "react-router-dom";

import './assets/css/style.css';
import Header from './components/Header';
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/Products/ProductsPage";
import LoginPage from "./pages/Account/LoginPage";
import RegisterPage from "./pages/Account/RegisterPage";
import UserPage from "./pages/Account/UserPage";
import NavBar from "./components/NavBar";
import RecoverPasswordPage from "./pages/Account/RecoverPasswordPage";
import Footer from './components/Footer';
import Cart from "./pages/Cart/Cart";
import SearchProduct from "./pages/Products/SearchProduct";
import Page404 from "./pages/Page404";

function App() {
  return (
    <HRouter>
      <div className="wrapper">
        <Header />
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/accounts">
              <Route index element={<UserPage />} />
              <Route path=":accountAction" element={<UserPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="recoverPassword/:sid" element={<RecoverPasswordPage />} />
            </Route>
            <Route path="/products/:menus">
              <Route index element={<ProductsPage />} />
              <Route path=":categories">
                <Route index element={<ProductsPage />} />
                <Route path=":proid" element={<ProductsPage />} />
              </Route>
            </Route>
            <Route path="/cart" exact element={<Cart />}/>
            <Route path="/search" exact element={<SearchProduct />}/>
            <Route path="*" element={<Page404 />}/>
          </Routes>
        </div>
        <Footer />
      </div>
    </HRouter>
  );
}

export default App;
