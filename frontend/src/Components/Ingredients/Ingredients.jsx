import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Row } from "reactstrap"
import { TextField } from '@mui/material';

import PDFFile from '../PDF/PDFFile';
import { PDFDownloadLink } from "@react-pdf/renderer";

import "./Ingredients.css"
import api from "../../api/api";

function Ingredients() {
  const [ingredients, setIngredients] = React.useState([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const getIngredients = async () => {
      try{
        const res = await api.post("/ingredients");
        setIngredients(res.data);
      }catch(error){
        console.log(error)
      }
    }

    getIngredients();
    
  }, [])
  
  return ingredients.length > 0 ? (
    <>
      <center>
        <div className='Ingredient__Title'>
          <span>Ingredients</span>
          <TextField type='text' label='Search...' onChange={(e) => setSearch(e.target.value)} className='Ingredient__TextLabel'/>
        </div>
      </center>

      <Row className='Ingredient__Card' lg='12'>
        {(ingredients || []).filter((item) => {
          if(search === '')
            return item;
          else (item.Name.toLowerCase().includes(search.toLowerCase()))
            return item;
        }).map((item, index) => (
          <Box lg={{ maxWidth: 275 }} className='Ingredient__Box' key={index}>
            <PDFDownloadLink document={<PDFFile name={item.Name} type={item.Type} photo={require('./../../images/' + item.Photo)} />} fileName={item.Name + ".pdf"}>
              {/* {(({ loading }) => (loading ? 'Loading document...' :  */}
                <Card variant="outlined">
                  <CardContent >
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      {item.Name}
                    </Typography>
                    <img src={require('./../../images/' + item.Photo)} alt={item.Name} className='Ingredient__Box__Img'/>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item.Type}
                    </Typography>
                    <Typography variant="body2">
                      Number of likes:
                    </Typography>
                  </CardContent>
                </Card>
              {/* ))} */}
            </PDFDownloadLink>
          </Box>
        ))}
      </Row>
    </>
  ) : (<h1>Loading...</h1>)
}

export default Ingredients