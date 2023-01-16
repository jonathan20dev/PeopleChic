import { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useGetData } from "../custom-hooks/useGetData"


const AddProducts = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    shortDesc: "",
    description: "",
    category: "chair",
    price: 0,
    imgUrl: null,
    reviews: [],
    avgRating: 0,
  });
  const [loading2, setLoading2] = useState(false);
  const {data: categoriesData, loading} = useGetData('categoria')

  const handleChange = ({ target }) => {
    const productObj = { ...product, [target.name]: target.value };
    setProduct(productObj);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading2(true);
    //add product to firebase database
    try {
      const docRef = await collection(db, "productos");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + product.imgUrl.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, product.imgUrl);
      uploadTask.on("state_changed",
        (snapshot) => { },
        (error) => {
          toast.error("Imagen no cargada");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, { ...product, imgUrl: downloadURL });
            toast.success("Producto añadido exitosamente!");
          });
        }
      );
      setLoading2(false);
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading2(false);
      toast.error("No se pudo agregar el producto");
    }
  };

  const cancelButton = () => {
    setLoading2(false);
    navigate("/dashboard/all-products");
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            {(loading2 && loading) ? (
              <h4 className="py-5">cargando...</h4>
            ) : (
              <>
                <h4 className="mb-4">Añadir producto</h4>
                <Form onSubmit={addProduct}>
                  <FormGroup className="form__group">
                    <span>Nombre del producto</span>
                    <input
                      type="text"
                      name="productName"
                      required
                      placeholder="Vestido de boda..."
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Pequeña descripción</span>
                    <input
                      type="text"
                      name="shortDesc"
                      required
                      placeholder="Vestido para boda civíl..."
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <span>Descipción</span>
                    <input
                      type="text"
                      name="description"
                      required
                      placeholder="Hermoso y ajustable..."
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-between gap-5">
                    <FormGroup className="form__group w-50">
                      <span>Precio</span>
                      <input
                        type="text"
                        name="price"
                        required
                        placeholder="₡5000"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup className="form__group w-50">
                      <span>Categoría</span>
                      <select
                        name="category"
                        className="w-100 p-2"
                        style={{textTransform: "capitalize"}}
                        onChange={handleChange}
                      >
                        {categoriesData.map((el,index) =>{ 
                          return(
                            <option value={el.nombre} key={index} style={{textTransform: "capitalize"}}>{el.nombre}</option>
                          )}
                          
                          )}
                      </select>
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup className="form__group">
                      <span>Imagen del producto</span>
                      <input
                        type="file"
                        name="imgUrl"
                        accept="image/*"
                        required
                        onChange={({ target }) =>
                          setProduct({ ...product, imgUrl: target.files[0] })
                        }
                      />
                    </FormGroup>
                  </div>
                  <button type="submit" className="buy__btn">
                    Añadir producto
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
  );
};

export { AddProducts };
