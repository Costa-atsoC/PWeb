import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Main from "./Pages/Main"

import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
