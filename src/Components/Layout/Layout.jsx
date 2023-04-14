import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData , setuserData}) {
  let navigate = useNavigate()
  function logout(){
    setuserData(null)
localStorage.removeItem('userToken')
navigate('/Login')

  }
  return <>
    <Navbar userData={userData} logout={logout} />
    <div className="container">
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
