import React from 'react';
import { useNavigate } from 'react-router-dom'; 

import { Row, Col, Container } from "reactstrap";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HomeIcon from '@mui/icons-material/Home';
import CheckIcon from '@mui/icons-material/Check';

import api from './../../api/api'

import "./Admin.css"
import AddIngredient from '../AddIngredient/AddIngredient';

interface dataUser{
  Id: number;
  Name: string;
  Email: string;
  Password: string;
  Coffe: boolean;
  Inicio: Date;
  Photo: string;
  Perfil: string;
}

interface dataIngredients{
  id: number;
  Name: string;
  Type: string;
  Photo: string;
  Calories: number;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Admin() {
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<dataUser | any>();
  const [ingredients, setIngredients] = React.useState<dataIngredients | any>();
  const [checkIngredients, setCheckIngredients] = React.useState<dataIngredients | any>();
  const [value, setValue] = React.useState(0);
  const [search, setSearch] = React.useState<string>('');
  const [flag, setFlag] = React.useState<boolean>(true);
  
  React.useEffect(() => {
    const getUsers = async () => {
      try{
        const res = await api.post("/userInfo/all");
        setUsers(res.data);
        setFlag(false);
      }catch(error){
        console.log(error)
      }
    }
    
    const getIngredients = async () => {
      try{
        const res = await api.post("/ingredients");
        setIngredients(res.data);
        setFlag(false);
      }catch(error){
        console.log(error)
      }
    }
    
    const getIngredientsCheck = async () => {
      try{
        const res = await api.post("/ingredients/check");
        if(res.status === 200){
          setCheckIngredients(res.data);
        } else{
          console.log("error");
        }
        
        setFlag(false);
      }catch(error){
        console.log(error)
      }
    }

    if(flag){
      getUsers();
      getIngredients();
      getIngredientsCheck();
    }

  }, [users, flag]);
  
  const handleChange = (event: React.SyntheticEvent, newValue: number) =>{
    setValue(newValue);
  }

  const deleteUser = async (id: number) => {
    try{
      await api.post("/userInfo/delete", {id});
      setFlag(true);
    }catch(error){
      console.log(error)
    }
  }

  const deleteIngredient = async (id: number) => {
    try{
      await api.post("/ingredients/remove", {id});
      setFlag(true);
    }catch(error){
      console.log(error)
    }
  }

  const handleCheck = async (id: number, op: number) => {
    if(op === 1){
      try{
        await api.post("/ingredients/add", {id});
      }catch(error){
        console.log(error)
      }
    }else if(op === 2){
      try{
        await api.post("/ingredients/removeCheck", {id});
      }catch(error){
        console.log(error)
      }
    }
    setFlag(true);
  }
  
  return users && ingredients ?  (
    <>
      <Container fluid>
        <Row className='HeaderBegin Admin__Header' lg="12">
          <Col lg="1">

          </Col>
          <Col lg="10">
            <center>
              <h1>BACKOFFICE</h1>
            </center>
          </Col>

          <Col lg="1" >
            <button onClick={() => navigate("/", {replace: true})} className='Admin__Tab1__Btn Admin__BTN'>
              <HomeIcon />
            </button>
          </Col>
        </Row>
      </Container>

      <center>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="Users" {...a11yProps(0)}/>
            <Tab label="Ingredients" {...a11yProps(1)} />
            <Tab label="Check" {...a11yProps(2)}/>
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <TextField type='text' label='Search...' onChange={(e) => setSearch(e.target.value)} style={{marginBottom: '2%', width: '50%'}}/>
          {(users || []).filter((item:any) => {
            if(users === '')
              return item;
            else if (item.Name.toLowerCase().includes(search.toLowerCase()))
            return item;
          }).map((item:dataUser, index: number) => (
            <Row key={index} className='Admin__Tab1__Row'>
              <Col lg="2" className='Admin__Tab1__Row__Center'>
                <img src={require("./../../images/" + item.Photo)} alt="photo" className='Admin__Tab1__Row__Img'/>
              </Col>

              <Col lg="2">

              </Col>

              <Col lg="2" className='Admin__Tab1__Row__Center'>
                {item.Name}
              </Col>

              <Col lg="5">
              
              </Col>

              <Col lg="1" className='Admin__Tab1__ColL'>
                <button className='Admin__Tab1__Btn' onClick={() => deleteUser(item.Id)}>
                  <DeleteOutlineIcon className='Admin__Tab1__Icon'/>
                </button>
              </Col>
            </Row>
          ))}
        </TabPanel>

        <TabPanel value={value} index={1}>
          <TextField type='text' label='Search...' onChange={(e) => setSearch(e.target.value)} style={{marginBottom: '2%', width: '50%'}}/>
          {(ingredients || []).filter((item:any) => {
            if(ingredients === '')
              return item;
            else if (item.Name.toLowerCase().includes(search.toLowerCase()))
            return item;
          }).map((item:dataIngredients, index: number) => (
            <Row key={index} className='Admin__Tab1__Row'>
              <Col lg="2" className='Admin__Tab1__Row__Center'>
                <img src={require("./../../images/" + item.Photo)} alt="photo" className='Admin__Tab1__Row__Img'/>
              </Col>

              <Col lg="2">

              </Col>

              <Col lg="2" className='Admin__Tab1__Row__Center'>
                {item.Name}
              </Col>

              <Col lg="5">
              
              </Col>

              <Col lg="1" className='Admin__Tab1__ColL'>
                <button className='Admin__Tab1__Btn' onClick={() => deleteIngredient(item.id)}>
                  <DeleteOutlineIcon className='Admin__Tab1__Icon'/>
                </button>
              </Col>
            </Row>
          ))}
        </TabPanel>

        <TabPanel value={value} index={2}>
          <TextField type='text' label='Search...' onChange={(e) => setSearch(e.target.value)} style={{marginBottom: '2%', width: '50%'}}/>
          {(checkIngredients || []).filter((item:any) => {
            if(ingredients === '')
              return item;
            else if (item.Name.toLowerCase().includes(search.toLowerCase()))
            return item;
          }).map((item:dataIngredients, index: number) => (
            <Row key={index} className='Admin__Tab1__Row'>
              <Col lg="2" className='Admin__Tab1__Row__Center'>
                <img src={require("./../../images/" + item.Photo)} alt="photo" className='Admin__Tab1__Row__Img'/>
              </Col>

              <Col lg="2">

              </Col>

              <Col lg="2" className='Admin__Tab1__Row__Center'>
                {item.Name}
              </Col>

              <Col lg="5">
              
              </Col>

              <Col lg="1" className='Admin__Tab1__ColL'>
                <button className='Admin__Tab1__Btn' onClick={() => handleCheck(item.id, 1)}>
                  <CheckIcon className='Admin__Tab1__Icon'/>
                </button>
                <button className='Admin__Tab1__Btn' onClick={() => handleCheck(item.id, 2)}>
                  <DeleteOutlineIcon className='Admin__Tab1__Icon'/>
                </button>
              </Col>
            </Row>
          ))}
        </TabPanel>
      </center>
    </>
  ) : (<h1>Loading...</h1>)
}

export default Admin