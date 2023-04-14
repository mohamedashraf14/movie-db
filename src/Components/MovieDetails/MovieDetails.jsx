import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
  let{id,mediaType} =useParams()
  const [details, setdetails] = useState([])
  async function getDetails(id,mediaType){
let {data}= await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=462059d15e13b157ed737763f4c41ead`)
setdetails(data)
console.log(data);
  }
  useEffect(() => {
   getDetails(id,mediaType)
  }, [])
  
  return (
   <>
   <div className="row">
<div className=' col-md-3'>
<div>
{details.poster_path?<img className=' w-100' src={'https://image.tmdb.org/t/p/w500'+details.poster_path} alt="" />:<img className=' w-100' src={'https://image.tmdb.org/t/p/w500'+details.profile_path} alt="" />}
</div>
</div>
<div className=' col-md-9 d-flex align-items-center py-3'>
  <div className>
<h2>{details.title}{details.name}</h2>
<p className=' text-muted my-3'>{details.overview} {details.biography}</p>
{details.vote_average?<h4 >Vote Avarage :  {details.vote_average}</h4>:''}
{details.vote_count?<h4 >Vote Count :  {details.vote_count}</h4>:''}

</div>

</div>


   </div>
   
   </>
  )
}
