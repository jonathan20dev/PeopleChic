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

  const handleComplete = async (id, status) => {
    const docRef = doc(db, "orders", id);
    await updateDoc(docRef, { completed: !status });
  };

  return (
    <section>
      <Container>
        <Row>
          <PDFDownloadLink
            document={<DocumentPDF orders={orders} fileName="Ordenes.pdf" />}
          >
            <button style={{ float: "left" }} className="btn btn-primary mb-5">
              Descargar Ordenes
            </button>
          </PDFDownloadLink>
          <Col lg="12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
<<<<<<< HEAD
                    <th>Informacion</th>
                    <th>Productos</th>
                    <th>Cantidad</th>
                    <th>Precios</th>
                    <th>Monto Neto</th>
=======
                    <th>Información de facturación</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio total</th>
                    <th>Importe total</th>
>>>>>>> d9cec9035d86021970aa6c15952897286a1470fe
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
<<<<<<< HEAD
                              <div>Orden:</div> {item.id}
=======
                              <div>Órden:</div> {item.id}
>>>>>>> d9cec9035d86021970aa6c15952897286a1470fe
                            </li>
                            <li>
                              <div>Nombre:</div> {item.billingInformation.name}
                            </li>
                            <li>
                              <div>Email:</div> {item.billingInformation.email}
                            </li>
                            <li>
<<<<<<< HEAD
                              <div>Telefono:</div>{" "}
                              {item.billingInformation.phoneNumber}
                            </li>
                            <li>
                              <div>Pais:</div>{" "}
                              {item.billingInformation.country}
                            </li>
                            <li>
                              <div>Provincia:</div>{" "}
                              {item.billingInformation.state}
=======
                              <div>Número de teléfono:</div>{" "}
                              {item.billingInformation.phoneNumber}
                            </li>
                            <li>
                              <div>Pais:</div> {item.billingInformation.country}
                            </li>
                            <li>
                              <div>Estado:</div> {item.billingInformation.state}
>>>>>>> d9cec9035d86021970aa6c15952897286a1470fe
                            </li>
                            <li>
                              <div>Ciudad:</div> {item.billingInformation.city}
                            </li>
                            <li>
<<<<<<< HEAD
                              <div>Codigo Postal:</div>{" "}
=======
                              <div>Código postal:</div>{" "}
>>>>>>> d9cec9035d86021970aa6c15952897286a1470fe
                              {item.billingInformation.zipCode}
                            </li>
                            <li>
                              <div>Direccion :</div>{" "}
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
<<<<<<< HEAD
                            {item.completed ? "completado" : "incompletado"}
=======
                            {item.completed ? "Completado" : "Incompleto"}
>>>>>>> d9cec9035d86021970aa6c15952897286a1470fe
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { Orders };
