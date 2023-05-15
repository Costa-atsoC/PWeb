import React from 'react'
import { Row} from 'reactstrap'
import { Button, Checkbox, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import './Register.css'
import api from "./../../api/api"

interface data{
  username: string,
  email: string,
  password: string,
  confirmPassword: string,
  coffe: boolean
}

const Register = () => {
  const [username, setUsername] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');
  const [coffe, setCoffe] = React.useState<boolean>(false);

  const navigate = useNavigate();

  async function sendRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const dados:data = {username, email , password, confirmPassword, coffe};

    try{
      const res = await api.post("/register", dados);
      switch(res.data){
        case "1":
          alert("Passwords does not match!");
          break;
        case "2":
          alert("Username or email already exist!");
          break;
        case "3":
          alert("Invalid email format!");
          break;
        case "4":
          navigate("/login", { replace: true });
          break;
        case "5":
          alert("Error inserting!");
          break;
        case "6":
          alert("Error!");
      }
    }catch(error){
      console.log(error)
    }
  }


  return (
    <center>
      <div className='Register__Container'>
        <div>
          <h2 className='Register__Container__Head'> Register</h2>
        </div>
        <hr />
        <div className='Register__Container__Body'>
          <form onSubmit={sendRegister}>
            <Row><TextField required fullWidth type='text' label='Username' onChange={(e) => setUsername(e.target.value)}/></Row>
            <br />
            <Row><TextField required fullWidth type='text' label='Email' onChange={(e) => setEmail(e.target.value)}/></Row>
            <br />
            <Row><TextField required fullWidth type='password' label='Password' onChange={(e) => setPassword(e.target.value)}/></Row>
            <br />
            <Row><TextField required fullWidth type='password' label='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)}/></Row>
            <Checkbox onChange={() => setCoffe(!coffe)}/>Do you like cofee?
            <br />
            <Button type='submit'>Register</Button>
          </form>
        </div>
      </div>  
    </center>
  )
}

export default Register