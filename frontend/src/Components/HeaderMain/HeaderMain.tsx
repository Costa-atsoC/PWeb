import React from 'react'
import { useNavigate } from 'react-router-dom'; 

import { Row, Col, Container } from 'reactstrap'
import Button from '@mui/material/Button';
import BusinessIcon from '@mui/icons-material/Business';
import CoffeeIcon from '@mui/icons-material/Coffee';

import api from '../../api/api';

import './HeaderMain.css'


const  HeaderMain: React.FC = () => {
  const [user, setUser] = React.useState<any>();
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [coffee, setCoffee] = React.useState<number>(0);
  const [imgCoffee, setImgCoffee] = React.useState<string>("");
  const navigate = useNavigate();

  const token = localStorage.getItem("Token");
  const config = { headers: {Authorization: `Bearer ${token}`} };


  const ab = { id: 1 };

  React.useEffect(() => {
    const getData = async () => {
      try{
        const res = await api.post("/userInfo", config);
        setUser(res.data);
        setCoffee(res.data.coffee);
        console.log(res.data);

        const res2 = await api.post('/admin', { id: res.data.id });
        if (res2.data === 1) {
          setIsAdmin(true);
        } else{
          setIsAdmin(false);
        }
      }catch(error){
        console.log(error)
      }
    }
    
    getData();
    
  }, []);
  
  const coffeAction = async () => {
      try {
        const res = await api.get("/coffee");
        console.log(res.data.file);
        setImgCoffee(res.data.file);
        window.open(imgCoffee, "_blank");
      } catch (error) {
        console.log(error);
      }
  }


  return user ? (
    <Container fluid>
      <Row className='HeaderBegin HeaderMain' lg="12">
        <Col lg="1">
          <Button onClick={() => navigate('/', {replace: true})} className='HeaderBegin__Btn'>
            <img src={require("./../../images/logo.png")} alt="logo"  width="100%"/>
          </Button>
        </Col>
        <Col lg="9">
        </Col>

        <Col lg="1">
          <Row className='HeaderMain__Col2__Row'>
            {coffee === 1 ? (
              <Col lg="6" className='HeaderMain__Col2'>
                <button className='HeaderMain__Icon' onClick={() => coffeAction()}>
                  <CoffeeIcon/>
                </button>
              </Col>
            ) : null}
            {isAdmin ? (
              <Col lg="6" className='HeaderMain__Col2'>
                <button className='HeaderMain__Icon' onClick={() => navigate("/admin", {replace: true})}>
                  <BusinessIcon/>
                </button>
              </Col>
            ) : null}
          </Row>
        </Col>

        <Col lg="1" className='HeaderMain__Col3'>
          <Row>
            <button className='HeaderMain__Img'>
              <img src={require("./../../images/default.png")} alt='profile' />
            </button>
          </Row>
        </Col>
      </Row>
    </Container>) : (<h1>Loading...</h1>)
  
}

export default HeaderMain