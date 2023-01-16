import "../styles/home.css";
import heroImg from "../assets/images/dress.png";
import counterImg from "../assets/images/counter-timer-img.png";
import { Helmet } from "../components/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Services } from "../services/Services";
import { ProductsList } from "../components/UI/ProductsList";
import { Clock } from "../components/UI/Clock";
import { useGetData } from "../custom-hooks/useGetData";

const Home = () => {
  const {data: products, loading} = useGetData('productos')
  const {data: banner} = useGetData('banner')
  const year = new Date().getFullYear();

  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" mg="6">
              <div className="hero__content">
                <p className="hero__subtitle"> Tendencias {year}</p>
                <h2>Las mejores colecciones</h2>
                <p>
                Boutique de ropa para damas, especialistas en vestidos casuales, 
                de fiesta, gala, boda y graduaciones en tallas desde S a 6XL. En 
                nuestra tienda siempre encontraras un vestido que se adapte a ti. 
                </p>
                <motion.button whileHover={{ scale: 1.1 }} className="buy__btn">
                  <Link to="/shop">Comprar ahora</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg="6" mg="6">
              <div className="hero__img">
                <img src={heroImg} alt="" className="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title pb-5">Productos destacados</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold">cargando...</h5> :
              <ProductsList
              data={products.filter((item) => item.category === "Accesorios").slice(0, 4)}
            />
            }
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title pb-5">Vestidos de boda</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold">cargando...</h5> :
              <ProductsList
              data={products.filter((item) => item.subc === "boda").slice(0, 4)}
            />
            }
            
          </Row>
        </Container>
      </section>
      {
        banner[0]?.active && 
        <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="12" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">{banner[0]?.title}</h4>
                <h3 className="text-white fs-5 mb-2">{banner[0]?.subtitle}</h3>
              </div>
              <Clock />
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Vistar la tienda</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="12" className="text-end counter__img">
              <img  src={banner[0]?.imgUrl} alt="" />
            </Col>
          </Row>
        </Container>
      </section> 
      }
      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title pb-5">Vestidos de gala</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold">cargando...</h5> :
              <ProductsList
              data={products.filter((item) => item.subc === "gala").slice(0, 4)}
            />
            }
            
          </Row>
        </Container>
      </section>
      <section className="popular__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title pb-5">Vestidos para niñas</h2>
            </Col>
            {
              loading ? <h5 className="fw-bold">cargando...</h5> :
              <ProductsList
              data={products.filter((item) => item.subc === "niña")}
            />
            }
            
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export { Home };
