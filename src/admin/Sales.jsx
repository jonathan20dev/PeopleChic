import React, {useState, useEffect} from "react";
import { Col, Container, Row } from "reactstrap";
import { useGetData } from "../custom-hooks/useGetData";
import '../styles/shop.css';
import "../styles/orders.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesPDF from "./SalesPDF";

const Sales = () => {

  const { data: orders, loading } = useGetData("orders");
  const monthArray = orders.map(order => {
    return {month: order.date.split(" ")[1], billingInformation: order.billingInformation, cart: order.cart, completed: order.completed, id: order.id}
  })

  // Join repeated months
  const unique = Array.from(new Set(monthArray.map(item => item.month)));

  console.log(unique)

  const handlePorcent = (amount, actualMonth) => {
      const amountLastMonth = monthArray.map(order => order.month.indexOf(actualMonth))
      const amountLastMonth2 = amountLastMonth.indexOf(0)
      if (amountLastMonth2 === 0){
        return (0)
      }else{
        const orderPosition = monthArray[amountLastMonth2 - 1]
        console.log("Mes actual: "+amount)
        console.log("Mes pasado: "+orderPosition.cart.totalAmount)
        return ((amount - orderPosition.cart.totalAmount) / orderPosition.cart.totalAmount * 100).toFixed(2)
      }
  }

  return (
    <section>
    <Container>
      <Row>
        <Col lg="12">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Mes</th>
                  <th>Ventas</th>
                  <th>Crecimiento</th>
                  <th>Ganancia porcentual</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-4">Cargando...</td>
                  </tr>
                ) : (
                    monthArray.map((item) => (
                      <tr key={item.id}>
                        <td>{item.month}</td>
                        <td>
                          <ul className="orders__billing-list">
                            {item.cart.items.map(product => 
                                <li key={product.id}>
                                  <div>{product.quantity}x {product.productName} <br></br> <strong>{"Total: "+product.totalPrice}</strong></div> 
                                </li>
                            )
                          }
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li key={item.id}>{item.cart.totalAmount}</li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li key={item.id}>{handlePorcent(item.cart.totalAmount, item.month)}%</li>
                          </ul>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
              <PDFDownloadLink document={<SalesPDF orders={monthArray} fileName="Ordenes.pdf"/>}><button style={{float: "right"}} className="btn btn-primary">Descargar Informe de Ventas</button></PDFDownloadLink>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default Sales