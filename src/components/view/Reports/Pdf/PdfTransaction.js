import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import logo from '../../../../images/logo-black.png';


// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
      },
      author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
      },
      subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
      },
      text: {
        margin: 12,
        fontSize: 12,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
      },
      image: {
        marginVertical: 15,
        marginHorizontal: 100,
      },
      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
  });


const PdfTransaction = () => {
    return (
        <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Section #1</Text>
            <Text style={styles.text}>Hereeee</Text>
          </View>
          <View style={styles.section}>
            <Text>Section #2</Text>
          </View>
        </Page>
      </Document>
    )
}

export default PdfTransaction;