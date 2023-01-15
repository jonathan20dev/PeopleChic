import "../styles/productDetails.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import React from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import { doc, getDoc } from 'firebase/firestore'
import { toast } from "react-toastify";
import {setDoc } from "firebase/firestore";
import { useGetData } from "../custom-hooks/useGetData"


const EditProduct = () => {
    const navigate = useNavigate();
    const [loading2, setLoading2] = useState(false);
    const { id } = useParams();
    const [product, setProduct] = useState({
        imgUrl: '',
        productName: '',
        price: 0,
        avgRating: 0,
        reviews: [],
        description: '',
        shortDesc: '',
        category: ''
    })
    const {data: categoriesData, loading} = useGetData('categoria')

    useEffect(() => {
        const docRef = doc(db, 'productos', id)
        const getProduct = async () => {
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setProduct(docSnap.data())
            } else {
                toast.error('Sin productos!')
            }
        }
        getProduct()
    }, [])

    const editProduct = async (e) => {
        e.preventDefault();
        setLoading2(true);
        //add product to firebase database
        try {
            await setDoc(doc(db, "productos", id), product);
            toast.success("Producto añadido exitosamente");
            setLoading2(false);
            navigate("/dashboard/all-products");
        } catch (err) {
            setLoading2(false);
            toast.error("Producto no modificado!");
        }
    };

    const cancelButton = () => {
        setLoading2(false);
        navigate("/dashboard/all-products");
    }

    const handleChange = ({ target }) => {
        const productObj = { ...product, [target.name]: target.value };
        setProduct(productObj);
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {(loading2 && loading) ? (
                            <h4 className="py-5">Loading...</h4>
                        ) : (
                            <>
                                <h4 className="mb-4">{product.productName}</h4>
                                <Form onSubmit={editProduct}>
                                    <FormGroup className="form__group">
                                        <span>Nombre del producto</span>
                                        <input
                                            type="text"
                                            name="productName"
                                            required
                                            value={product.productName}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Short Description</span>
                                        <input
                                            type="text"
                                            name="shortDesc"
                                            required
                                            value={product.shortDesc}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup className="form__group">
                                        <span>Description</span>
                                        <input
                                            type="text"
                                            name="description"
                                            required
                                            value={product.description}
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <div className="d-flex align-items-center justify-content-between gap-5">
                                        <FormGroup className="form__group w-50">
                                            <span>Price</span>
                                            <input
                                                type="text"
                                                name="price"
                                                required
                                                value={product.price}
                                                onChange={handleChange}
                                            />
                                        </FormGroup>
                                        <FormGroup className="form__group w-50">
                                            <span>Category</span>
                                            <select
                                                name="category"
                                                className="w-100 p-2"
                                                style={{textTransform: "capitalize"}}
                                                onChange={handleChange}
                                            >
                                                {categoriesData.map((el,index) =>{ 
                                                return(
                                                    <option value={el.nombre} key={index} style={{textTransform: "capitalize"}}>{el.nombre}</option>
                                                )})}
                                            </select>
                                        </FormGroup>
                                    </div>
                                    <button type="submit" className="buy__btn">
                                        Editar producto
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

export { EditProduct }