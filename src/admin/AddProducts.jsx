import { useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { toast } from "react-toastify";
import { db, storage } from "../firebase.config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    const productObj = { ...product, [target.name]: target.value };
    setProduct(productObj);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    //add product to firebase database
    try {
      const docRef = await collection(db, "productos");
      const storageRef = ref(
        storage,
        `productImages/${Date.now() + product.imgUrl.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, product.imgUrl);
      uploadTask.on("state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Image not uploaded");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(docRef, { ...product, imgUrl: downloadURL });
            toast.success("Product added succesfuly");
          });
        }
      );
      setLoading(false);
      navigate("/dashboard/all-products");
    } catch (err) {
      setLoading(false);
      toast.error("Product not added");
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
                        placeholder="$299"
                        onChange={handleChange}
                      />
                    </FormGroup>
                    <FormGroup className="form__group w-50">
                      <span>Categoría</span>
                      <select
                        name="category"
                        className="w-100 p-2"
                        onChange={handleChange}
                      >
                        <option value="chair">Chair</option>
                        <option value="sofa">Sofa</option>
                        <option value="mobile">Mobile</option>
                        <option value="watch">Watch</option>
                        <option value="wireless">Wireless</option>
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
