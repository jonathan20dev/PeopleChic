import React, { useEffect, useState } from "react";
import { Col, Container, Row, Form, FormGroup } from "reactstrap";
import { db, storage } from "../firebase.config";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useGetData } from "../custom-hooks/useGetData";
import { toast } from "react-toastify";

const BannerConfig = () => {
  const {data: bannerData} = useGetData('banner')
  const today = new Date().toISOString().split('T')[0]
  const [banner, setBanner] = useState({
    id: '',
    title: "",
    subtitle: "",
    expirationDate: "",
    imgUrl: "",
    active: true
  });

  const handleChange = ({ target }) => {
    const bannerObj = { ...banner, [target.name]: target.value };
    setBanner(bannerObj);
  };

  const deactivateBanner = async(status) => {
    const docRef = doc(db, 'banner', banner.id)
    await updateDoc(docRef, {active: !status});
  };

  const editBanner = async(e) => {
    e.preventDefault();
    //add product to firebase database
    try {
      const docRef = await doc(db, "banner", banner.id);
      const storageRef = ref(
        storage,
        `bannerImages/${Date.now() + banner.imgUrl.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, banner.imgUrl);
      uploadTask.on("state_changed",
        (snapshot) => {},
        (error) => {
          toast.error("Imagen no cargada");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await setDoc(docRef, { ...banner, imgUrl: downloadURL, active: true });
          });
        }
      );
      toast.success("Banner editado exitosamente");
    } catch (err) {
      toast.error("Banner no editado");
    }
  };

  useEffect(() => {
    setBanner(bannerData[0])
  }, [bannerData])

  return (
    <section>
      <Container>
        <Row>
          <Col lg="12">
            <h4 className="mb-4">Editar Banner</h4>
            <Form onSubmit={editBanner}>
              <FormGroup className="form__group">
                <span>Titulo</span>
                <input
                  required    
                  type="text"
                  name="title"
                  placeholder={banner?.title}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>SubTitulo</span>
                <input
                  required
                  type="text"
                  name="subtitle"
                  placeholder={banner?.subtitle}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Expiration date</span>
                <input
                  required
                  type="date"
                  name="expirationDate"
                  min={today}
                  max={'2150-01-01'}
                  defaultValue={banner?.expirationDate}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="form__group">
                <span>Imagen para el banner</span>
                <input
                  required
                  type="file"
                  accept="image/*"
                  name="imgUrl"
                  onChange={({ target }) =>
                    setBanner({ ...banner, imgUrl: target.files[0] })
                  }
                />
              </FormGroup>
              <div className="d-flex w-100 justify-content-between">
              <button type="submit" className="buy__btn mt-0">
                  Guardar
                </button>
                <button
                  type="button"
                  className={`btn btn-${banner?.active ? 'primary' : 'danger'}`}
                  onClick={() => {deactivateBanner(banner.active)}}
                >
                  {
                    banner?.active ? 'Activo' : 'Desactivado'
                  }
                </button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export { BannerConfig };
