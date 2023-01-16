import { Container, Row, Col } from "reactstrap"
import { useGetData } from '../custom-hooks/useGetData'
import '../styles/dashboard.css'
import "../styles/orders.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DashboardPDF from "./DashboardPDF";

const Dashboard = () => {
  const {data: products} = useGetData('productos')
  const {data: orders} = useGetData('orders')

  return (
    <>
    <section>
      <Container>
        <Row>
          <Col className="lg-3 dashboard__box">
            <div className="revenue__box">
              <h5>Total en ventas</h5>
              <span>${orders.reduce((total, item) => total + item.cart.totalAmount, 0)}</span>
            </div>
          </Col>
          <Col className="lg-3 dashboard__box">
            <div className="orders__box">
              <h5>Ordenes</h5>
              <span>{orders.length}</span>
            </div>
          </Col>
          <Col className="lg-3 dashboard__box">
            <div className="products__box">
              <h5>Productos totales</h5>
              <span>{products.length}</span>
            </div>
          </Col>
        </Row>
        <PDFDownloadLink document={<DashboardPDF orders={orders} products={products} fileName="Ordenes.pdf"/>}><button style={{float: "right"}} className="btn btn-primary">Descargar Informe</button></PDFDownloadLink>
      </Container>
    </section>
    </>
  )
}

export {Dashboard}