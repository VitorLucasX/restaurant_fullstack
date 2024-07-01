import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { smoothScrollTo } from '../../utils/smoothScroll';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [activeMenu, setActiveMenu] = useState("home");

    const {getTotalCartAmount, token, setToken} = useContext(StoreContext)

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token")
        setToken("");
        navigate("/")
    }

    const menuToSectionId = {
        'home': 'home',
        'menu': 'explore-menu',
        'app-mobile': 'app-download',
        'contato': 'footer'
    };

    const handleMenuClick = (menuName) => {
        setActiveMenu(menuName);
        const sectionId = menuToSectionId[menuName];
        if (sectionId) smoothScrollTo(sectionId);
    };

    return (
        <nav className='navbar' id='home'>
            <Link to="/"><img src={assets.logo} alt="Logo" className='navbar__logo'/></Link>
            <ul className="navbar__menu">
                {['home', 'menu', 'app-mobile', 'contato'].map((menu) => (
                    <Link key={menu} 
                          onClick={() => handleMenuClick(menu)} 
                          className={`navbar__menu-item ${activeMenu === menu ? 'navbar__menu-item--active' : ''}`}>
                        {menu.charAt(0).toUpperCase() + menu.slice(1)}
                    </Link>
                ))}
            </ul>
            <div className="navbar__right">
                <div className="navbar__icon-basket">
                    <Link to="/cart"><img src={assets.basket_icon} alt="Basket Icon" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "navbar__icon-basket-dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)} className="navbar__login-button">Fazer Login</button>
                :  <div className='navbar-profile'> 
                        <img src={assets.profile_icon} alt="" />
                        <ul className="nav-profile-dropdown">
                            <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Pedidos</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Sair</p></li>
                        </ul>
                    </div>}
            </div>
        </nav>
    );
}

export default Navbar;
