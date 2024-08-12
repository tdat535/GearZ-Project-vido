import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CSSProperties } from "react";
import './BodyCSS.css';

interface ItemMenu {
  icon: string;
  text: string;
  href: string;
}

export interface CurrentUser {
  username: string;
  password: string;
}

const sideBarCss: CSSProperties = {
  borderRight: '5px solid #ddd',
  backgroundColor: '#212529',
  padding: '10px',
  boxSizing: 'border-box',
  width: "230px",
  height: "100vh",
  color: "white", 
};

const menuItemCss: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '4px',
};

const linkCSS: CSSProperties = {
  textDecoration: 'none', 
  color: 'inherit'
};

function BodyApp() {
  const sideBar: ItemMenu[] = [
    {
      icon: 'fa-solid fa-home',
      text: 'Dashboard',
      href: 'home',
    },
    {
      icon: 'fa-solid fa-list',
      text: 'Categorys',
      href: 'categorys',
    },
    {
      icon: 'fa-solid fa-cart-shopping',
      text: 'Orders',
      href: 'orders',
    },
    {
      icon: 'fa-solid fa-user-tie',
      text: 'Admins',
      href: 'admin',
    },
    {
      icon: 'bi bi-people-fill',
      text: 'Customers',
      href: 'customers',
    },
    {
      icon: 'bi bi-house-lock-fill',
      text: 'Storage',
      href: 'Storage',
    },
    {
      icon: 'bi bi-box-arrow-left',
      text: 'Logout',
      href: '/',
    },

  ];

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (text: string) => {
    setActiveMenu(text === activeMenu ? null : text);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3" style={sideBarCss}>
          <ul>
            {sideBar.map((element) => (
              <li key={element.text} className="mb-2" style={{listStyleType: "none"}}>
                <div className="itemMenu" style={menuItemCss}>
                  <i className={element.icon} style={{ marginRight: '10px' }}></i>
                  <Link to={element.href} onClick={() => handleMenuClick(element.text)} style={linkCSS}>
                    {element.text}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-9" style={{margin: "12px 0px 0px 4px", width:"83%"}}>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  ) 
}


export default BodyApp;
