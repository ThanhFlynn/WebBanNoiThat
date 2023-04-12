import{
  HashRouter as HRouter,
  Route,
  Routes,
} from "react-router-dom";

import './assets/css/style.css';
import Header from './components/Header';
// import NodeListPage from './pages/NodeListPage';
// import NotePage from "./pages/NotePage";
import HomePage from "./components/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <HRouter>
      <div className="wrapper">
        <Header />
        <div className="main-content">
          <Routes>
            {/* <Route path="/" exact element={<NodeListPage />} />
            <Route path="/note/:nodeId"  element={<NotePage />} /> */}
            <Route path="/" exact element={<HomePage />} />
            <Route path="/accounts/login/" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </HRouter>
  );
}

export default App;
