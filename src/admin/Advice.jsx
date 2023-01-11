import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";

const Advice = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    asunto: "",
    mensaje: ""
});

const handleChange = ({ target }) => {
  const productObj = { ...category, [target.name]: target.value };
  setCategory(productObj);
};

  const sendMessage = ()=> {
    navigate("/home");
    toast.success("¡Mensaje enviado! Gracias.");
  }

  const cancelButton = () => {
    navigate("/home");
  }

  return (
    <section>
            <Container>
                <Row>
                    <Col lg="12">
                            <>
                                <h4 className="mb-4">Mencionanos tús sugerencias o dudas</h4>
                                <Form onSubmit={sendMessage}>
                                    <FormGroup className="form__group">
                                        <span>Asunto</span>
                                        <input
                                            type="text"
                                            name="asunto"
                                            required
                                            placeholder="No entiendo cómo funciona..."
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Mensaje</span>
                                        <textarea
                                            type="text"
                                            name="mensaje"
                                            required
                                            placeholder="Detalles del mensaje..."
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <button type="submit" className="buy__btn">
                                        Enviar
                                    </button>
                                    <button onClick={cancelButton} className="buy__btn">
                                        Cancelar
                                    </button>
                                </Form>
                            </>
                    </Col>
                </Row>
            </Container>
            <hr />
            </section>
  )
}

export {Advice}