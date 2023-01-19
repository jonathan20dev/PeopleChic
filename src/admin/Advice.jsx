import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import emailjs from 'emailjs-com';

const Advice = () => {
  const form = useRef();
  const navigate = useNavigate();

const sendEmail = (e) => {
  e.preventDefault();

  emailjs.sendForm('service_kqp0pok', 'template_e8pv3al', form.current, 'ovlpfHhr7YE6zhNqs')

    e.target.reset()
    navigate("/home");
    toast.success("¡Mensaje enviado! Gracias.");  
};


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
                                <form ref={form} onSubmit={sendEmail}>
                                    <div className="form__group">
                                        <span>Asunto</span>
                                        <input
                                            type="text"
                                            name="asunto"
                                            required
                                            placeholder="No entiendo cómo funciona..."
                                        />
                                    </div>
                                    <div className="form__group">
                                        <span>Mensaje</span>
                                        <textarea
                                            type="text"
                                            name="mensaje"
                                            required
                                            placeholder="Detalles del mensaje..."
                                        />
                                    </div>
                                    <button type="submit" className="buy__btn">
                                        Enviar
                                    </button>
                                    <button onClick={cancelButton} className="buy__btn">
                                        Cancelar
                                    </button>
                                </form>
                            </>
                    </Col>
                </Row>
            </Container>
            <hr />
            </section>
  )
}

export {Advice}