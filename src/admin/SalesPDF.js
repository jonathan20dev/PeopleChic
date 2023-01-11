import React from 'react'
import { StyleSheet, Text, View, Document, Page } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: "solid", 
  }, 
  tableRowHeader: { 
    margin: "auto", 
    flexDirection: "row",
    backgroundColor: "#0a1d37",
    color: "#fff"
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row",
  }, 
  tableCol: { 
    width: "25%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 1 
  }, 
  tableCellRow: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 15,
    fontWeight: "bold",
    padding: "5px",
  },
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 15,
  },
  tableCellSales: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10,
  },
  tableTitle: { 
    marginTop: 15, 
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  }
});

const SalesPDF = ({orders}) => {

  var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

  const handlePorcent = (amount, actualMonth) => {
    const amountLastMonth = orders.map(order => order.month.indexOf(actualMonth))
    const amountLastMonth2 = amountLastMonth.indexOf(0)
    if (amountLastMonth2 === 0){
      return (0)
    }else{
      const orderPosition = orders[amountLastMonth2 - 1]
      return ((amount - orderPosition.cart.totalAmount) / orderPosition.cart.totalAmount * 100).toFixed(2)
    }
}

  return (
    <Document>
    <Page style={styles.body}>
      <View style={styles.table}>
      <Text style={styles.tableTitle}>Reporte de Ventas Actuales ({utc})</Text> 
        <View style={styles.tableRowHeader}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Month</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Sales</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Ganancia</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Porcentaje de Ganancia</Text> 
          </View> 
        </View>
        {orders.map((item) => 
        <View key={item.id} style={styles.tableRow}>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.month}</Text> 
          </View>
          <View style={styles.tableCol}>
            {item.cart.items.map(product => 
                <Text key={product.id} style={styles.tableCellSales}>{product.quantity}x {product.productName} {"Total: "+product.totalPrice}</Text> 
             )}                
            </View>
          <View style={styles.tableCol}> 
            <Text key={item.id} style={styles.tableCell}>{item.cart.totalAmount}</Text> 
          </View>
          <View style={styles.tableCol}> 
             <Text key={item.id} style={styles.tableCell}>{handlePorcent(item.cart.totalAmount, item.month)}%</Text>            
          </View>
        </View>
        )}  
      </View>
    </Page>
  </Document>
  )
}

export default SalesPDF