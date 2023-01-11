import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useGetData } from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import "../styles/orders.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DocumentPDF from "./DocumentPDF";

const Orders = () => {
  const { data: orders, loading } = useGetData("orders");

  const handleComplete = async(id, status) => {
    const docRef = doc(db, 'orders', id)
    await updateDoc(docRef, {completed: !status});
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Información de facturación</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio total</th>
                    <th>Importe total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td className="py-4">Cargando...</td>
                    </tr>
                  ) : (
                    orders.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>
                          <ul className="orders__billing-list">
                            <li>
                              <div>Órden:</div> {item.id}
                            </li>
                            <li>
                              <div>Nombre:</div> {item.billingInformation.name}
                            </li>
                            <li>
                              <div>Email:</div> {item.billingInformation.email}
                            </li>
                            <li>
                              <div>Número de teléfono:</div>{" "}
                              {item.billingInformation.phoneNumber}
                            </li>
                            <li>
                              <div>Pais:</div>{" "}
                              {item.billingInformation.country}
                            </li>
                            <li>
                              <div>Estado:</div>{" "}
                              {item.billingInformation.state}
                            </li>
                            <li>
                              <div>Ciudad:</div> {item.billingInformation.city}
                            </li>
                            <li>
                              <div>Código postal:</div>{" "}
                              {item.billingInformation.zipCode}
                            </li>
                            <li>
                              <div>Street address:</div>{" "}
                              {item.billingInformation.streetAddress}
                            </li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {item.cart.items.map((item) => (
                              <li key={item.id}>{item.productName}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {item.cart.items.map((item) => (
                              <li key={item.id}>{item.quantity}</li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          <ul>
                            {item.cart.items.map((item) => (
                              <li key={item.id}>${item.totalPrice}</li>
                            ))}
                          </ul>
                        </td>
                        <td>${item.cart.totalAmount}</td>
                        <td>
                          <button
                            className={`btn btn-${
                              item.completed ? "primary" : "danger"
                            }`}
                            onClick={() => {
                              handleComplete(item.id, item.completed);
                            }}
                          >
                            {item.completed ? "Completado" : "Imcompleto"}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <PDFDownloadLink document={<DocumentPDF orders={orders} fileName="Ordenes.pdf"/>}><button style={{float: "right"}} className="btn btn-primary">Descargar Ordenes</button></PDFDownloadLink>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { Orders };
