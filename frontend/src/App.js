import{
  HashRouter as HRouter,
  Route,
  Routes,
} from "react-router-dom";

import './assets/css/style.css';
import Header from './components/Header';
// import NodeListPage from './pages/NodeListPage';
// import NotePage from "./pages/NotePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Account/LoginPage";
import RegisterPage from "./pages/Account/RegisterPage";
import UserPage from "./pages/Account/UserPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <HRouter>
      <div className="wrapper">
        <Header />
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/accounts/" element={<UserPage />} />
            <Route path="/accounts/:accountAction/" element={<UserPage />} />
            <Route path="/accounts/login/" element={<LoginPage />} />
            <Route path="/accounts/register/" element={<RegisterPage />} />
          </Routes>
        </div>
      </div>
    </HRouter>
  );
}

export default App;
