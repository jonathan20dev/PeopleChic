import '../styles/shop.css'
import { Helmet } from "../components/Helmet/Helmet";
import { CommonSection } from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { useEffect, useState, useRef } from 'react';
import { ProductsList } from '../components/UI/ProductsList'
import { useGetData } from "../custom-hooks/useGetData";

const Shop = () => {
  const {data: products} = useGetData('productos')
  const {data: categoriesData} = useGetData('categoria')
  const [productsData, setProductsData] = useState([])
  const sortBox = useRef('')
  
  const handleFilter = ({target}) => {
    if (target.value === 'all'){
      setProductsData(products)
    } else {
      const filteredProducts = products.filter(item => item.category === target.value)
      setProductsData(filteredProducts)
    }
    sortBox.current.value = 'default'
  }
  
  const handleSearch = ({target}) => {
    const searchedProducts = products.filter(item => item.productName.toLocaleLowerCase().includes(target.value))
    setProductsData(searchedProducts)
  }
  const handleSort = ({target}) => {
    if (target.value === 'lowset price'){
      const sortedProducts = [...productsData].sort((a, b) => {
        return Number(a.price) - Number(b.price)
      })
      setProductsData(sortedProducts)
    } else if (target.value === 'highest price') {
      const sortedProducts = [...productsData].sort((a, b) => {
        return Number(b.price) - Number(a.price)
      })
      setProductsData(sortedProducts)
    }
  }

  useEffect(() => {
    setProductsData(products)
  }, [products])

  
  return (
    <Helmet title="Shop">
      <CommonSection title="Productos" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6" className='filter__column'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Categorías</option>
                  <option value="all">Todo</option>
                  {categoriesData.map((el,index) =>{ 
                  return(
                      <option value={el.nombre} key={index} style={{textTransform: "capitalize"}}>{el.nombre}</option>
                  )})}
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className='filter__column text-end'>
              <div className="filter__widget">
                <select onChange={handleSort} ref={sortBox}>
                  <option value='default'>Ordenar por</option>
                  <option value="highest price">Precios altos</option>
                  <option value="lowset price">Precios bajos</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input type="text" placeholder="Buscar..." onChange={handleSearch}/>
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container className='pt-0'>
          <Row>
            {
              productsData.length === 0 ? <h1 className='text-center fs-4'>No se encontraron productos!</h1> : <ProductsList data={productsData}/>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export { Shop };
