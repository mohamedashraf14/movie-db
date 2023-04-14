import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function FeaturedProducts() {
  const [Products, setProducts] = useState([])
  async function getProducts() {
    let {data} = await axios.get('https://route-ecommerce.onrender.com/api/v1/products')
    setProducts(data.data)
    console.log(data.data);
  }
  useEffect(() => {
    getProducts()
  
   
  }, [])
  
  return (
    <>
    <div className="container">
<div className="row">
{ Products.map((product)=> <div key={product._id} className=' col-md-2 px-3 py-3 '>
  <Link to={`/productdetails/${product._id}`}>
 <img src={product.imageCover} className=' w-100' alt="" />
 <span className=''>{product.category.name}</span>
<h3 className='h5'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
<div className=' d-flex justify-content-between'>
<span className=' text-muted'>{product.price} EGP</span>
<span> <i className=' fas fa-star '></i> {product.ratingsAverage} </span>
</div>
<button className=' btn w-100 h5 bg-danger '> Add +</button>

</Link>

</div>



) }






</div>





    </div>
    
    
    
    </>
  )
}
