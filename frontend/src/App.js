import{
  HashRouter as HRouter,
  Route,
  Routes,
} from "react-router-dom";

import './assets/css/style.css';
import Header from './components/Header';
// import NodeListPage from './pages/NodeListPage';
// import NotePage from "./pages/NotePage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/Account/LoginPage";
import RegisterPage from "./pages/Account/RegisterPage";
import UserPage from "./pages/Account/UserPage";
import NavBar from "./components/NavBar";
import RecoverPasswordPage from "./pages/Account/RecoverPasswordPage";

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
          </Routes>
        </div>
      </div>
    </HRouter>
  );
}

export default App;
