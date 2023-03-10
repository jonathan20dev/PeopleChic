import "./header.css";
import logo from "../../assets/images/logo2.png";
import userIcon from "../../assets/images/user-icon.png";
import { Container, Row } from "reactstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useSelector } from "react-redux";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Tienda",
  },
  {
    path: "cart",
    display: "Carro",
  },
];

const Header = () => {
  const menuRef = useRef(null)
  const profileActionsRef = useRef(null)
  const menuToggle = () => menuRef.current.classList.toggle('active__menu')
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const navigate = useNavigate()
  const navigateToCart = () => {
    navigate('/cart')
  }
  const toggleProfileActions = () => {
    profileActionsRef.current.classList.toggle('show__profileActions')
  }

  return (
    <header className="header sticky__header" >
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>People Chic</h1>
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li className="nav__item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="nav__icons">
              <span className="cart__icon" onClick={navigateToCart}>
                <i className="ri-shopping-cart-2-line"></i>
                <span className='badge'>{totalQuantity}</span>
              </span>
              <div className="profile">
                <motion.img whileTap={{scale:1.2}} src={userIcon} alt="" onClick={toggleProfileActions}/>
                <div className="profile__actions" ref={profileActionsRef} onClick={toggleProfileActions}>
                  <div className="d-flex align-items-center justify-content-center flex-column">
                    <Link to='/dashboard'>Dashboard</Link>
                  </div>
                </div>
              </div>
              <div className="mobile__menu">
              <span onClick={menuToggle}>
                <i className="ri-menu-line"></i>
              </span>
            </div>
            </div>
            
          </div>
        </Row>
      </Container>
    </header>
  );
};

export { Header };
