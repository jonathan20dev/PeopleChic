import React from "react";
import { Col, Container, Row } from "reactstrap";
import { useGetData } from "../custom-hooks/useGetData";
import { db } from "../firebase.config";
import { updateDoc, doc } from "firebase/firestore";
import "../styles/orders.css";

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
            <button style={{ float: "left" }} className="btn btn-primary mb-5">
              Descargar Ordenes
            </button>
          <Col lg="12">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Informacion</th>
                    <th>Productos</th>
                    <th>Cantidad</th>
                    <th>Precios</th>
                    <th>Monto Neto</th>
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
                              <div>Orden:</div> {item.id}
                            </li>
                            <li>
                              <div>Nombre:</div> {item.billingInformation.name}
                            </li>
                            <li>
                              <div>Email:</div> {item.billingInformation.email}
                            </li>
                            <li>
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
                            </li>
                            <li>
                              <div>Ciudad:</div> {item.billingInformation.city}
                            </li>
                            <li>
                              <div>Codigo Postal:</div>{" "}
                              {item.billingInformation.zipCode}
                            </li>
                            <li>
                              <div>Dirección:</div>{" "}
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
                              <li key={item.id}>₡{item.totalPrice}</li>
                            ))}
                          </ul>
                        </td>
                        <td>₡{item.cart.totalAmount}</td>
                        <td>
                          <button
                            className={`btn btn-${
                              item.completed ? "primary" : "danger"
                            }`}
                            onClick={() => {
                              handleComplete(item.id, item.completed);
                            }}
                          >
                            {item.completed ? "completado" : "incompletado"}
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
