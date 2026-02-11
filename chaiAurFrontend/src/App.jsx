import { Outlet } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Sidebar from "./components/common/Sidebar.jsx";
import './App.css'; 

const App = () => { 
  return (
    <div className="app-layout">
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default App;
