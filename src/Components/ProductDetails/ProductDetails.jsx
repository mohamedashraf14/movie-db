import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'


export default function ProductDetails() {
  const [ProductDetails, setProductDetails] = useState(null)
  let Params =useParams()
  async function getProductDetails(id) {
    let {data} = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDetails(data.data)
    console.log(data.data)
  }
  useEffect(() => {
    getProductDetails(Params.id)
  
    
  }, [])
  
  return (
   <>
   <div className=' container'>
<div className="row">
<div className=' col-md-4'>
  <img className='w-100' src={ProductDetails?.imageCover} alt="" />
</div>
<div className=' col-md-8'>
<h3>{ProductDetails?.title}</h3>
<p>{ProductDetails?.description}</p>
<div className=' d-flex justify-content-between'>
<span className=' text-muted'>{ProductDetails?.price} EGP</span>
<span> <i className=' fas fa-star '></i> {ProductDetails?.ratingsAverage} </span>
</div>
<button className=' btn w-100 h5 bg-danger '> Add +</button>

</div>



</div>





   </div>
   
   
   
   </>
  )
}
