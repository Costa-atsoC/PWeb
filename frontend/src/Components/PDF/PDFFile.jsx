import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",

  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey"
  }
});

const PDFFile = ({name, type, photo}) => {

  return (
    <Document>
          <Page>
            <Text style={styles.title} fixed>{name}</Text>
            <Image style={styles.image} src={photo} />
            <Text style={styles.text}>
            {type}
            </Text>
            
        </Page>
    </Document>
  );
};

export default PDFFile;