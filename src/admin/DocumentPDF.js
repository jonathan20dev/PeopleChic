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

const DocumentPDF = ({orders}) => {

  var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

  return (
    <Document>
    <Page style={styles.body}>
      <View style={styles.table}>
      <Text style={styles.tableTitle}>Reporte de Ordenes Actuales ({utc})</Text> 
        <View style={styles.tableRowHeader}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Fecha</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Información de pago</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Producto</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Cantidad</Text> 
          </View> 
        </View>
        {orders.map((item) => 
        <View key={item.id} style={styles.tableRow}>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.date}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>órden: {item.id}</Text> 
            <Text style={styles.tableCell}>nombre: {item.billingInformation.name}</Text> 
            <Text style={styles.tableCell}>correo: {item.billingInformation.email}</Text>
            <Text style={styles.tableCell}>teléfono: {item.billingInformation.phoneNumber}</Text>
            <Text style={styles.tableCell}>país: {item.billingInformation.country}</Text>
            <Text style={styles.tableCell}>ciudad: {item.billingInformation.city}</Text>
            <Text style={styles.tableCell}>código postal: {item.billingInformation.zipCode}</Text>
            <Text style={styles.tableCell}>dirección: {item.billingInformation.streetAddress}</Text>
          </View>
          <View style={styles.tableCol}> 
            {item.cart.items.map((item) => (
                  <Text key={item.id} style={styles.tableCell}>{item.productName}|  {item.totalPrice+" col"}</Text> 
            ))}
          </View>
          <View style={styles.tableCol}> 
            {item.cart.items.map((item) => (
                <Text key={item.id} style={styles.tableCell}>{item.quantity}</Text>            
              ))}
          </View>
        </View>
        )}  
      </View>
    </Page>
  </Document>
  )
}

export default DocumentPDF