import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute(x) {
  if (localStorage.getItem('userToken')==null){
return <Navigate to={"/Login"} />
  }
  else return x.children
}