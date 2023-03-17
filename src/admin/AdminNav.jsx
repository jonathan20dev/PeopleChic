import { Container, Row } from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/adminNav.css";
import userIcon from "../assets/images/user-icon.png";

const admin__nav = [
  {
    display: "Dashboard",
    path: "/dashboard",
  },
  {
    display: "Productos",
    path: "/dashboard/all-products",
  },
  {
    display: "Órdenes",
    path: "/dashboard/orders",
  },
  {
    display: "Ventas",
    path: "/dashboard/sales",
  },
  {
    display: "Banner",
    path: "/dashboard/banner",
  },
];

const AdminNav = () => {
  const navigate = useNavigate()
  return (
    <>
      <header className="admin__header">
        <div className="admin__nav-top">
          <Container>
            <div className="admin__nav-wrapper-top">
              <div className="logo">
                <h2 style={{cursor: "pointer"}} onClick={() => navigate('/')}>PeopleChic</h2>
              </div>
              {/* <div className="search__box">
                <input type="text" placeholder="Search..." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div> */}
              <div className="admin__nav-top-right">
                <span>
                  <h6 style={{color: 'white'}} >Panel de administrador</h6>
                </span>
                <img src={userIcon} alt="" />
              </div>
            </div>
          </Container>
        </div>
      </header>
      <section className="admin__menu p-0">
        <Container>
          <Row>
            <div className="admin__navigation">
              <ul className="admin__menu-list">
                {admin__nav.map((item, index) => (
                  <li className="admin__menu-item" key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "active__admin-menu" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </Row>
        </Container>
      </section>
    </>
  );
};

export { AdminNav };
