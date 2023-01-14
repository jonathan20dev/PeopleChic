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
      width: "20%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 1 
    }, 
    tableCellRow: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 12,
      fontWeight: "bold",
      padding: "5px",
    },
    tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 8,
    },
    tableTitle: { 
      marginTop: 15, 
      marginBottom: 15,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 18,
    },
    total: { 
        marginTop: 15, 
        marginBottom: 3,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 15,
      }
  });

const DashboardPDF = ({orders, products}) => {

    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

    const handleReview = (array) => {
        if(array.length !== 0){
            const sumWithInitial = array.reduce(function(sum, review){sum = sum + review.rating; return sum;}, 0);
            return (sumWithInitial / array.length).toFixed(2)
        }
        return "Sin Reviews"
    }

  return (
    <Document>
    <Page style={styles.body}>
      <View style={styles.table}>
      <Text style={styles.tableTitle}>Reporte de Informe ({utc})</Text> 
        <View style={styles.tableRowHeader}> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Id</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Nombre</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Descripcion</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Precio</Text> 
          </View> 
          <View style={styles.tableCol}> 
            <Text style={styles.tableCellRow}>Promedio Reviews</Text> 
          </View> 
        </View>
        {products.map((item) => 
        <View key={item.id} style={styles.tableRow}>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.id}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.productName} ({item.category})</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.shortDesc}</Text> 
          </View>
          <View style={styles.tableCol}> 
            <Text style={styles.tableCell}>{item.price}</Text> 
          </View>
          <View style={styles.tableCol}> 
             <Text key={item.id} style={styles.tableCell}>{handleReview(item.reviews)}</Text> 
          </View>
        </View>
        )}  
      </View>
        <Text style={styles.total}>Ventas Totales: {orders.reduce((total, item) => total + item.cart.totalAmount, 0)}</Text>
        <Text style={styles.total}>Cantidad de Ordenes: {orders.length}</Text>
        <Text style={styles.total}>Cantidad de Productos: {products.length}</Text>
    </Page>
  </Document>
  )
}

export default DashboardPDF