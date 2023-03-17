import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  const navigate = useNavigate()
  const year = new Date().getFullYear();

  const adviceButton = () => {
    navigate("/advice");
}


  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="mb-3" lg="3">
            <div className="logo">
              <div>
                <h1 className="text-white">People chic</h1>
              </div>
            </div>
            <p className="footer__text mt-4">
              Cualquier duda o sugerencia con respecto al sitio web, nos la puedes comunicar por <button onClick={adviceButton} className="btn btn-primary btn-sm">aqui</button>
            </p>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Categorias Top</h4>
              <ListGroup className="mb-3">
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Articulos</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Vestidos</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Blusas</Link>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0">
                  <Link to="#">Cortinas</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Contacto</h4>
              <ListGroup className="footer__contact">
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-map-pin-line"></i>
                  </span>
                  <p>Río Cuarto, Alajuela, Costa Rica</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-phone-line"></i>
                  </span>
                  <p>+(506) 8414-8249</p>
                </ListGroupItem>
                <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-2">
                  <span>
                    <i className="ri-mail-line"></i>
                  </span>
                  <p>people-chic-store@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg="3">
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Ubicación</h4>
              <p className="mb-2">Río cuarto, al lado de la librería Danés</p>
              <div className="mb-3">
                <div className="mapouter">
                  <div className="gmap_canvas">
                    <iframe
                      style={{width:"100%", height:"200px"}}
                      id="gmap_canvas"
                      src="https://maps.google.com/maps?q=rio%20cuarto,%20%20libreria%20danes&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="12">
            <p className="footer__copyright">
              Copyright {year}. developed by Kimberly Vargas. All rights
              reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export { Footer };
