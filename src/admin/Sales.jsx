import React, {useState, useRef} from "react";
import { Col, Container, Row } from "reactstrap";
import { useGetData } from "../custom-hooks/useGetData";
import '../styles/shop.css';
import "../styles/orders.css";
import { DateRange } from 'react-date-range'

import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const Sales = () => {

  const { data: orders, loading } = useGetData("orders");
  const [select, setSelect] = useState("Dia")

  const [convertDaysFilter, setConvertDaysFilter] = useState([])
  const [convertMonth, setConvertMonth] = useState([])
  const [convertYear, setConvertYear] = useState([])
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  // open close
  const [open, setOpen] = useState(false)

  const convertTimestampDay = (date) => {
      let myDate = date.toLocaleDateString()
      myDate = myDate.replaceAll('/', '-')
      return myDate
  }

  const convertDays = orders.map(order => {
    return {type: "day", month: order.date.split(" ")[1], date: new Date(order.date+" GMT"), billingInformation: order.billingInformation, cart: order.cart, completed: order.completed, id: order.id}
  })

  const handleConvertMonth = () => {
    var output = Object.values(convertDays.reduce((dict, item) => {
      const { date } = item;
      const key = `${date.getMonth()+1}-${date.getFullYear()}`;
      const value = dict[key] || {type: "month", month : date.getMonth()+1, year : date.getFullYear(), orders : [] };
      value.orders.push(item);
      return { ...dict, [key] : value };
      
    }, {}))

    setConvertMonth(output)
  }

  const handleConvertYear = () => {
    var output = Object.values(convertDays.reduce((dict, item) => {
      const { date } = item;
      const key = `${date.getFullYear()}`;
      const value = dict[key] || {type: "year", year : date.getFullYear(), orders : [] };
      value.orders.push(item);
      return { ...dict, [key] : value };
      
    }, {}))

    setConvertYear(output)
  }

  const handleFilter = ({target}) => {
    if(target.value === "Dia"){
      setSelect(target.value)
    }else if(target.value === "Mes"){
      setSelect(target.value)
      handleConvertMonth()
    }else{
      setSelect(target.value)
      handleConvertYear()
    }
  }

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('es-ES', { month: 'long' });
  }

  const handlePorcent = (amount, actualMonth) => {
    if(select === "Dia"){
        const amountLastMonth = convertDays.map(order => order.month.indexOf(actualMonth))
        const amountLastMonth2 = amountLastMonth.indexOf(0)
        if (amountLastMonth2 === 0){
          return 0
        }else{
          const orderPosition = convertDays[amountLastMonth2 - 1]
          return ((amount - orderPosition.cart.totalAmount) / orderPosition.cart.totalAmount * 100).toFixed(2)
        }
    }else if(select === "Mes"){
        const amountLastMonth = convertMonth.findIndex(object => {
          return object.month === actualMonth;
        })
        if (amountLastMonth === 0){
          return 0
        }else{
          const orderPosition = convertMonth[amountLastMonth - 1]
          const totalOrderPosition = orderPosition.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0)
          return ((amount - totalOrderPosition) / totalOrderPosition * 100).toFixed(2)
        }
    }else{
        const amountLastYear = convertYear.findIndex(object => {
          return object.year === actualMonth;
        })
        if (amountLastYear === 0){
          return 0
        }else{
          const orderPosition = convertYear[amountLastYear - 1]
          const totalOrderPosition = orderPosition.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0)
          return ((amount - totalOrderPosition) / totalOrderPosition * 100).toFixed(2)
        }
    }
  }

  const handleSearchDates = () => {
      setOpen(false)
      const beginDate = range[0].startDate
      const lastDate = range[0].endDate
      console.log(convertDays)
      const daysFliter = convertDays.filter((item) => {
        return item.date.getTime() >= beginDate.getTime() &&
               item.date.getTime() <= lastDate.getTime();
      })
      setConvertDaysFilter(daysFliter)
  }

  const handleClear = () => {
    setConvertDaysFilter([])
    setOpen(false)
    setRange([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ])
  }

  return (
    <section>
    <Container>
      <Row>
        <Col lg="12">
          <div className="table-responsive">
          <div style={{visibility: select === "Dia" ? "visible" : "hidden"}} className="calendarWrap">
            <input
              style={{width: "250px", textAlign: "center"}}
              value={convertDaysFilter.length !== 0 ? `${format(range[0].startDate, "MM/dd/yyyy")} hasta ${format(range[0].endDate, "MM/dd/yyyy")}` : "Sin fechas seleccionadas"}
              readOnly
              className="inputBox"
              onClick={ () => setOpen(open => !open) }
            /><button onClick={() => handleSearchDates()} style={{marginLeft: "5px", height: "29px", background: "rgb(61, 145, 255)", color: "#fff", border: "none", width: "75px", borderRadius: "5px", fontWeight: "500"}}>Aplicar</button><button onClick={() => handleClear()} style={{marginLeft: "5px", height: "29px", background: "rgb(61, 145, 255)", color: "#fff", border: "none", width: "75px", borderRadius: "5px", fontWeight: "500"}}>Limpiar</button>

            <div style={{position: "absolute"}}>
              {open && 
                <DateRange
                  onChange={item => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="vertical"
                  className="calendarElement"
                />
              }
            </div>

            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <div className="filter__widget__select">
                      <select onChange={handleFilter}>
                        <option value="Dia">Dia</option>
                        <option value="Mes">Mes</option>
                        <option value="Año">Año</option>
                      </select>
                    </div>
                  </th>
                  <th>Productos</th>
                  <th>Ventas</th>
                  <th>Porcentaje de Ganancia</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-4">Cargando...</td>
                  </tr>
                ) : (
                  select === "Dia" ? 
                  // Por Dia
                  convertDaysFilter.length === 0 ? convertDays.map((item, index) => (
                      <tr key={index}>
                        <td>{convertTimestampDay(item.date)}</td>
                        <td>
                          <ul className="orders__billing-list">
                            {item.cart.items.map(product => 
                                <li key={product.id}>
                                  <div>{product.quantity}x {product.productName} <br></br> <strong>{"Total: "+product.totalPrice}</strong></div> 
                                </li>
                            )
                          }
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li key={item.id}>{item.cart.totalAmount}</li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li key={item.id} style={{color: handlePorcent(item.cart.totalAmount, item.month) < 0 ? "red" : "green"}}>
                              {handlePorcent(item.cart.totalAmount, item.month)}{handlePorcent(item.cart.totalAmount, item.month) > 0 ? 
                              <i className="ri-arrow-up-fill"></i> : 
                              handlePorcent(item.cart.totalAmount, item.month) 
                              !== 0 && <i className="ri-arrow-down-fill"></i>}
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))
                    :
                    convertDaysFilter.map((item, index) => (
                      <tr key={index}>
                        <td>{convertTimestampDay(item.date)}</td>
                        <td>
                          <ul className="orders__billing-list">
                            {item.cart.items.map(product => 
                                <li key={product.id}>
                                  <div>{product.quantity}x {product.productName} <br></br> <strong>{"Total: "+product.totalPrice}</strong></div> 
                                </li>
                            )
                          }
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li key={item.id}>{item.cart.totalAmount}</li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li key={item.id} style={{color: handlePorcent(item.cart.totalAmount, item.month) < 0 ? "red" : "green"}}>
                              {handlePorcent(item.cart.totalAmount, item.month)}{handlePorcent(item.cart.totalAmount, item.month) > 0 ? 
                              <i className="ri-arrow-up-fill"></i> : 
                              handlePorcent(item.cart.totalAmount, item.month) 
                              !== 0 && <i className="ri-arrow-down-fill"></i>}
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))
                    :
                    select === "Mes" ? 
                    // Por Mes
                      convertMonth.map((item, index) => (
                        <tr key={index}>
                          <td>{getMonthName(item.month)}</td>
                          <td>
                            <ul className="orders__billing-list">
                              {item.orders.map(product => 
                              product.cart.items.map((item2, index) => 
                                <li key={index}>
                                  <div>{item2.quantity}x {item2.productName} <br></br> <strong>{"Total: "+item2.totalPrice}</strong></div> 
                                </li>
                              )
                              )
                            }
                            </ul>
                          </td>
                          <td>
                            <ul>
                              <li key={item.index}>{item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0)}</li>
                            </ul>
                          </td>
                          <td>
                            <ul>
                              <li key={item.id} style={{color: handlePorcent(item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0), item.month) < 0 ? "red" : "green"}}>
                                {handlePorcent(item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0), item.month)}
                                {handlePorcent(item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0), item.month) > 0 ? 
                                <i className="ri-arrow-up-fill"></i> : handlePorcent(item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0), item.month) 
                                !== 0 && <i className="ri-arrow-down-fill"></i>}
                              </li>                            
                            </ul>
                          </td>
                        </tr>
                      ))
                    :
                    // Por año
                    convertYear.map((item, index) => (
                      <tr key={index}>
                        <td>{item.year}</td>
                        <td>
                          <ul className="orders__billing-list">
                            {item.orders.map(product => 
                            product.cart.items.map((item2, index) => 
                                <li key={index}>
                                  <div>{item2.quantity}x {item2.productName} <br></br> <strong>{"Total: "+item2.totalPrice}</strong></div> 
                                </li>
                            )
                            )
                          }
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li key={item.id}>{item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0)}</li>
                          </ul>
                        </td>
                        <td>
                          <ul>
                            <li key={item.id} style={{color: handlePorcent(item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0), item.year) < 0 ? "red" : "green"}}>
                              {handlePorcent(item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0), item.year)}
                              {handlePorcent(item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0), item.year) > 0 ? 
                              <i className="ri-arrow-up-fill"></i> : handlePorcent(item.orders.reduce(function(sum, order){sum = sum + order.cart.totalAmount; return sum;}, 0), item.year) 
                              !== 0 && <i className="ri-arrow-down-fill"></i>}
                            </li>
                          </ul>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
              <button style={{float: "right"}} className="btn btn-primary">Descargar Informe de Ventas</button>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
  )
}

export default Sales