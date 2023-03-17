import "../styles/productDetails.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, getDoc } from 'firebase/firestore'
import { toast } from "react-toastify";
import { setDoc } from "firebase/firestore";

const EditCategory = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [categoria, setCategoria] = useState({
        nombre: ''
    })

    useEffect(() => {
        const docRef = doc(db, 'categoria', id)
        const getCategory = async () => {
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setCategoria(docSnap.data())
            } else {
                toast.error('Sin categorías!')
            }
        }
        getCategory()
    }, [])

    const editProduct = async (e) => {
        e.preventDefault();
        setLoading(true);
        //add product to firebase database
        try {
            await setDoc(doc(db, "categoria", id), categoria);
            toast.success("Categoría modificado exitosamente!");
            setLoading(false);
            navigate("/dashboard/add-categories");
        } catch (err) {
            setLoading(false);
            toast.error("No se pudo modificar");
        }
    };

    const cancelButton = () => {
        setLoading(false);
        navigate("/dashboard/add-categories");
    }

    const handleChange = ({ target }) => {
        const categoryObj = { ...categoria, [target.name]: target.value };
        setCategoria(categoryObj);
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {loading ? (
                            <h4 className="py-5">Loading...</h4>
                        ) : (
                            <>
                                <h4 className="mb-4">{categoria.nombre}</h4>
                                <Form onSubmit={editProduct}>
                                    <FormGroup className="form__group">
                                        <span>Nombre de la categoría</span>
                                        <input
                                            type="text"
                                            name="nombre"
                                            style={{textTransform: "capitalize"}}
                                            required
                                            value={categoria.nombre}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <button type="submit" className="buy__btn">
                                        Editar categoría
                                    </button>
                                    <button onClick={cancelButton} className="buy__btn">
                                        Cancelar
                                    </button>
                                </Form>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export {EditCategory}