import React, {useState} from 'react'
import { Label, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';


import api from "./../../api/api"

import './Login.css'

const BtnChange = styled(Button)<ButtonProps>(() => ({
  width: '50%',
  color: '#618C03',
  marginBottom: '2%',
}))

interface data{
  username: string,
  password: string
}


const Login: React.FC = ()  => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const sendLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try{
      const info:data = {username, password};

      const res = await api.post("/login", info);
      console.log(res);
      switch(res.data.Status){
        case "1":
          localStorage.setItem("Token", res.data.Token);
          navigate("/", {replace: true});
          break;
        case "2":
          alert("Invalid username or password!");
          break;
        case "3":
          alert("Error!");
          break;
      }
    }catch(error){
      console.log(error)
    }
  }

  return(
    <center>
      <div className='Register__Container'>
        <div>
          <h2 className='Register__Container__Head'> Login</h2>
        </div>
        
        <hr />

        <div className='Register__Container__Body'>
          <form onSubmit={sendLogin}>
            <Row><TextField required fullWidth type='text' label='Username or email' onChange={(e:any) => setUsername(e.target.value)}/></Row>
            <br />
            <Row><TextField required fullWidth type='password' label='Password' onChange={(e:any) => setPassword(e.target.value)} /></Row>
            <br />
            <Label></Label>
            <Row className='Login__Body__BtnRow'>
              <BtnChange type='submit'>Login</BtnChange>
              <BtnChange onClick={() => navigate('/', {replace: true})}>Cancel</BtnChange>
            </Row>
          </form>
        </div>
      </div>
    </center>
  )
}

export default Login