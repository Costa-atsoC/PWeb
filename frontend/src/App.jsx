import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Main from "./Pages/Main"
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute"
import HeaderMain from "./Components/HeaderMain/HeaderMain";
import Profile from "./Pages/Profile";
import Ingredients from "./Pages/Ingredients";
import Admin from "./Pages/Admin"
import AddIngredient from "./Pages/AddIngredient"

import "./App.css"
import api from "./api/api";

const token = localStorage.getItem("Token");
const config = { headers: {Authorization: `Bearer ${token}`} };

function App() {
  const [user, setUser] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try{
        const res = await api.post("/userInfo", config);
        setUser(res.data);
      }catch(error){
        console.log(error)
      }
    }
    if(token != null)
      getData();
    
  }, [])


  return user || token === null ? (
    <BrowserRouter>
        <Routes>
          <Route path="/begin" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Ingredients />} />
            <Route path="/addIngredient" element={<AddIngredient />} />
            <Route path="/main" element={<HeaderMain />} />
            <Route 
              path="/profile/:username" 
              element={<Profile user ={user} />} 
            />
             <Route path="/admin" element={<Admin user ={user}/>} /> 
          </Route>
        </Routes>
    </BrowserRouter>)  : (<h1>LOADING...</h1>)
 
}

export default App;