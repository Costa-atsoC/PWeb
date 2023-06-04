import React from 'react'
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute: React.FC = () => {
  const token:string | null = localStorage.getItem('Token')

  return (
    token ? <Outlet /> : <Navigate to="/begin" />
  )
}

export default ProtectedRoute;