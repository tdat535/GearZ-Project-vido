import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import './Header.css'
import Cart from "../modal/Cart";


class Header extends Component{
    render(): ReactNode {
        return(
            <nav className="navbar navbar-expand-sm fixed-top mb-0">
                <div className="container">

                    <Link to="/" className="navbar-brand">
                        GEARZ.
                    </Link>

                    {/* Phần responsive của header */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button> 
                    
                    {/* Phần 3 nút bên trái của header */}
                    <div className="collapse navbar-collapse left-cate" id="navbarNav" >
                        <ul className="navbar-nav nav-underline">
                            <li className="nav-item ">
                                <Link to="/" className="nav-link ">Trang chủ</Link>
                            </li>
                            <li className="nav-item  dropdown" style={{color: "black"}}> 
                                <Link to="/" 
                                className="nav-link dropdown-toggle" 
                                id="navbarDropdown" 
                                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Danh mục
                                </Link>

                                {/* Phần dropdown của danh mục */}
                                <ul className="dropdown-menu"
                                aria-labelledby="navbarDropdown"> 
                                    <li><Link to="category" className="dropdown-item">Tai nghe</Link></li>
                                    <li><Link to="category" className="dropdown-item">Bàn phím</Link></li>
                                    <li><Link to="category" className="dropdown-item">Chuột</Link></li>
                                    <li><Link to="category" className="dropdown-item">Màn hình</Link></li>
                                    <li><Link to="category" className="dropdown-item">Laptop</Link></li>
                                    <li><Link to="category" className="dropdown-item">Linh kiện PC</Link></li>
                                    <li><Link to="category" className="dropdown-item">Phụ kiện</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item ">
                                <Link to="/" className="nav-link ">Giới thiệu</Link>
                            </li>
                        </ul>
                    </div>


                    <form action="" method="get" className="d-flex searchBar">
                        <input type="text" className="form-control me-2" placeholder="Tìm kiếm..."/>
                        <button className="btn btn-outline-info"><i className="fa-solid fa-magnifying-glass"></i></button>
                    </form>

                    
                    <div className="d-flex right-cate-holder collapse navbar-collapse " id="right-cate">
                        <Cart /> {/* Giỏ hàng */}

                        <div className="notifyIcon right-cate">
                            <button className="btn btn-dark">
                                <i className="fa-solid fa-bell"></i>
                            </button>
                        </div>

                        <div className="accountIcon right-cate dropdown">
                            <button className="btn avatar btn-dark " id="accountDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                                <li className="dropdown-item">Đăng xuất</li>
                                <li className="dropdown-item">Cài đặt</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </nav>
        )
    }
}
export default Header;