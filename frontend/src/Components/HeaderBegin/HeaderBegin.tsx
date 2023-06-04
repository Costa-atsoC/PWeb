import { Row, Col, Container } from 'reactstrap'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import BtnChange from './../styles/style';
import './HeaderBegin.css'

const HeaderBegin: React.FC = () => {  
  const navigate = useNavigate();
  
  return (
    <Container fluid>
      <Row className='HeaderBegin' lg="12">
        <Col lg="1">
          <Button onClick={() => navigate('/', {replace: true})} className='HeaderBegin__Btn'>
            <img src={require("./../../images/logo.png")} alt="logo" width="100%"/>
          </Button>
        </Col>
        <Col lg="8">
          
        </Col>
        <Col lg="3" className='HeaderBegin__Col3'>
          <BtnChange onClick={() => navigate('/login', {replace: true})}>Login</BtnChange>
          <BtnChange onClick={() => navigate('/register', {replace: true})}>Register</BtnChange>
        </Col>
      </Row>
    </Container>
  )
}

export default HeaderBegin