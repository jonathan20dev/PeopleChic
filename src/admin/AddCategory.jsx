import React from 'react'
import { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../custom-hooks/useGetData"

const AddCategory = () => {
    const { data: productsData, loading } = useGetData('categoria')
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        nombre: "",
    });
    const [loading2, setLoading2] = useState(false);

    const handleChange = ({ target }) => {
        const productObj = { ...category, [target.name]: target.value };
        setCategory(productObj);
    };

    const addCategory = async (e) => {
        e.preventDefault();
        setLoading2(true);
        //add product to firebase database
        try {
            const docRef = await collection(db, "categoria");
            await addDoc(docRef, { ...category });
            toast.success("¡Categoría añadida exitosamente!");
            setLoading2(false);
            navigate("/dashboard/all-products");
        } catch (err) {
            setLoading2(false);
            toast.error("Categoría no añadida");
        }
    };

    const cancelButton = () => {
        setLoading2(false);
        navigate("/dashboard/all-products");
    }

    const editProduct = (id) => {
        navigate("/dashboard/edit-category/"+id);
      }

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="12">
                        {loading2 ? (
                            <h4 className="py-5">Cargando...</h4>
                        ) : (
                            <>
                                <h4 className="mb-4">Nueva categoría</h4>
                                <Form onSubmit={addCategory}>
                                    <FormGroup className="form__group">
                                        <span>Nombre de la categoría</span>
                                        <input
                                            type="text"
                                            name="nombre"
                                            required
                                            placeholder="Vestido..."
                                            onChange={handleChange}
                                        />
                                    </FormGroup>
                                    <button type="submit" className="buy__btn">
                                        Añadir categoría
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
            <hr />
            <hr />
            <section>
      <Container>
        <Row>
          <Col lg='12'>
          <h4 className="mb-4">Todas las categorías</h4>
            <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? <tr><td className="py-4">Cargando...</td></tr> :
                  productsData.map(item => 
                    <tr key={item.id}>
                      <td style={{textTransform: "capitalize"}}>{item.nombre}</td>
                      <td>
                      <button className="btn btn-primary" onClick={() => editProduct(item.id)}>
                          <i style={{color: '#fff'}} className="ri-edit-line"></i>
                        </button>
                      </td>
                    </tr>
                    )
                }
              </tbody>
            </table>
            </div>
          </Col>
        </Row>
      </Container>
    </section>

        </section>
    );
};

export { AddCategory }