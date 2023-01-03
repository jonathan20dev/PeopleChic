import React from 'react'
import { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const AddCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        nombre: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = ({ target }) => {
        const productObj = { ...category, [target.name]: target.value };
        setCategory(productObj);
    };

    const addCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        //add product to firebase database
        try {
            const docRef = await collection(db, "categoria");
            await addDoc(docRef, { ...category });
            toast.success("Category added succesfuly");
            setLoading(false);
            navigate("/dashboard/all-products");
        } catch (err) {
            setLoading(false);
            toast.error("Category not added");
        }
    };

    const cancelButton = () => {
        setLoading(false);
        navigate("/dashboard/all-products");
    }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {loading ? (
                            <h4 className="py-5">Loading...</h4>
                        ) : (
                            <>
                                <h4 className="mb-4">Add Category</h4>
                                <Form onSubmit={addCategory}>
                                    <FormGroup className="form__group">
                                        <span>Category name</span>
                                        <input
                                            type="text"
                                            name="nombre"
                                            required
                                            placeholder="Vestido..."
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <button type="submit" className="buy__btn">
                                        Add Category
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
            <hr/>
            <hr/>
        </section>
    );
};

export { AddCategory }