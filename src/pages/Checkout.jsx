import "../styles/checkout.css";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import { db } from "../firebase.config";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import sinpeLogo from '../assets/images/sinpe-logo.png'
import bacLogo from '../assets/images/bac-bank-transfer.png'
import countrydata from '../assets/data/tbl_country.json'
import statedata from '../assets/data/tbl_state.json'
import citydata from '../assets/data/tbl_city.json'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState()
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [billingInfo, setBilllingInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    streetAddress: "",
  });

  const handleChange = ({ target }) => {
    const billingObj = { ...billingInfo, [target.name]: target.value };
    setBilllingInfo(billingObj);
  };

  const handleOrder = async () => {
    
    if (
      billingInfo.name &&
      billingInfo.email &&
      billingInfo.phoneNumber &&
      billingInfo.country &&
      billingInfo.state &&
      billingInfo.zipCode &&
      billingInfo.streetAddress &&
      paymentMethod
    ) {
      if (totalQty === 0) {
        toast.warning("No hay productos en tú carrito!");
      } else {
        const docRef = await collection(db, "orders");
        const today = new Date().toDateString();
        await addDoc(docRef, {
          date: today,
          billingInformation: billingInfo,
          cart: { items: cartItems, totalAmount: totalAmount },
          completed: false,
        });
        cartItems.map((item) => {
          dispatch(cartActions.deleteItem(item.id));
        });
        navigate(`/payment/${paymentMethod}`);
      }
    } else {
      toast.warning("Rellena toda la información!");
    }
  };

  const handleCountry = ({ target }) => {
    const valores = target.value.split(',')
    const billingObj = { ...billingInfo, country: valores[1] };
    setBilllingInfo(billingObj);

    const countryStates = statedata.filter(state => state.country_id === valores[0])
    setStates(countryStates)
    setCities([])
  }

  const handleState = ({ target }) => {
    const valores = target.value.split(',')
    const billingObj = { ...billingInfo, state: valores[1] };
    setBilllingInfo(billingObj);

    const stateCities = citydata.filter(city => city.state_id === valores[0])
    setCities(stateCities)
  }

  const handleCity = ({ target }) => {
    const valores = target.value.split(',')
    const billingObj = { ...billingInfo, city: valores[1] };
    setBilllingInfo(billingObj);
  }

  return (
    <Helmet title="Checkout">
      <CommonSection title="Pago" />
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Información de facturación</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Nombre"
                    name="name"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    name="email"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Número de teléfono"
                    name="phoneNumber"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <select name="country" onChange={handleCountry}>
                    <option value="">País</option>
                    {
                      countrydata.map((country) => (
                        <option value={[country.country_id, country.country_name]} key={country.country_id}>{country.country_name}</option>
                      ))
                    }
                  </select>
                </FormGroup>
                <FormGroup className="form__group">
                <select name="state" onChange={handleState}>
                    <option value="">Estado</option>
                    {
                      states.map((state) => (
                        <option value={[state.state_id, state.state_name]} key={state.state_id}>{state.state_name}</option>
                      ))
                    }
                </select>
                </FormGroup>
                <FormGroup className="form__group">
                <select name="city" onChange={handleCity}>
                    <option value="">Ciudad</option>
                    {
                      cities.map((city) => (
                        <option value={[city.city_id, city.city_name]} key={city.city_id}>{city.city_name}</option>
                      ))
                    }
                </select>
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="number"
                    placeholder="Código postal"
                    name="zipCode"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="Dirección exacta"
                    name="streetAddress"
                    onChange={handleChange}
                  />
                </FormGroup>
                <h6 className="mb-4 fw-bold mt-5">Elige tu método de pago</h6>
                <FormGroup className="w-100 payment__method" style={{background: paymentMethod === 'SINPE Movil' ? '#d6e5fb' : ''}} onClick={() => setPaymentMethod('SINPE Movil')}>
                  <div className="d-flex gap-3">
                    <img src={sinpeLogo} alt="" />
                    <h6>SINPE</h6>
                  </div>
                </FormGroup>
                <FormGroup className="w-100 payment__method" style={{background: paymentMethod === 'Bank Transfer' ? '#d6e5fb' : ''}} onClick={() => setPaymentMethod('Bank Transfer')}>
                  <div className="d-flex gap-3" >
                    <img src={bacLogo} alt="" />
                    <h6>Transferencia bancaria</h6>
                  </div>
                </FormGroup>
              </Form>
            </Col>
            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Cantidad total:{" "}
                  <span>
                    {totalQty} {totalQty > 1 ? "productos" : "producto"}
                  </span>
                </h6>
                <h6>
                  Subtotal: <span>₡{totalAmount}</span>
                </h6>
                <h6>
                  <span>
                  Envío: <br />
                  Envío gratuito
                  </span>
                  <span>₡0</span>
                </h6>
                <h4>
                  Costo total: <span>₡{totalAmount}</span>
                </h4>
                <button
                  className="buy__btn auth__btn w-100"
                  onClick={handleOrder}
                >
                  Realizar pedido
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export { Checkout };
