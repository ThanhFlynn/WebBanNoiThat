import{
  HashRouter as HRouter,
  Route,
  Routes,
} from "react-router-dom";

// import './assets/css/App.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import Header from './components/Header';
import * as bootstrap from './assets/js/bootstrap.min.js';
// import NodeListPage from './pages/NodeListPage';
import NotePage from "./pages/NotePage";

function App() {
  return (
    <HRouter>
      <div className="container-fluid">
        <Header />
        <div>
          <Routes>
            {/* <Route path="/" exact element={<NodeListPage />} />
            <Route path="/note/:nodeId"  element={<NotePage />} /> */}
          </Routes>
        </div>
      </div>
    </HRouter>
  );
}

export default App;
