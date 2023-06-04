import React from 'react'
import { Row } from 'reactstrap';

import { useNavigate } from 'react-router-dom'

import { TextField } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import api from './../../api/api'
import './AddIngredients.css'

const BtnChange = styled(Button)<ButtonProps>(() => ({
  width: '50%',
  color: '#618C03',
  marginBottom: '2%',
}))

interface data{
  name: string,
  type: string,
  photo?: string,
  calories: number
}

const AddIngredient: React.FC = () => {
  const [name, setName] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");
  const [photo, setPhoto] = React.useState<string | undefined>();
  const [calories, setCalories] = React.useState<number>(0.0);

  const navigate = useNavigate();

  const sendIngredients = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{ 
      const info:data ={name, type ,photo ,calories};
      const res = await api.post("/ingredients/addCheck", info);
      console.log(res);
      if(res.status === 200){
        console.log("Ingredient added")
        navigate("/", {replace: true});
      }else{
        console.log("Ingredient not added")
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  return (
    <center>
      <div className='addIngredient__container'>
        <div>
          <h2 className='addIngredient__container__Head'> Add ingredients</h2>
        </div>

        <hr />
        
        <div className='addIngredient__InfoBox'>
          <form onSubmit={sendIngredients}>
            <Row><TextField required fullWidth type='text' label='Name' onChange={(e:any) => setName(e.target.value)}/></Row>
            <br />
            <Row className='addIngredient__InfoBox__Two'>
              <TextField required fullWidth type='text' label='Calories' onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCalories(parseFloat(e.target.value))}/>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Type"
                    onChange={handleChange}
                  >
                    <MenuItem value={'Fruit'}>Fruit</MenuItem>
                    <MenuItem value={'Vegetable'}>Vegetable</MenuItem>
                    <MenuItem value={'Fantasy'}>Fantasy</MenuItem>
                  </Select>
                </FormControl>
            </Row>
            <br />
            <BtnChange type='submit'>Submit</BtnChange>
          </form>
        </div>
      </div>
    </center>
  )
}

export default AddIngredient