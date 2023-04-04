import Navigationbar from "./navigationbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import './layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout-flex">
      {/* <aside className="h-screen sticky top-0">
        <Sidebar />
      </aside> */}
      <main className='main-container'>
        <div className="main-div">
          {/* <Navigationbar /> */}
          {/* <Outlet /> */}
          {children}
        </div>
      </main>
    </div>
  );
}

export default Layout;