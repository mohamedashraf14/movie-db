
import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItem({item}) {
  return (
   <div className=' col-md-2'>
    <Link className=' text-decoration-none text-white' to={`/moviedetails/${item.id}/${item.media_type}`}>
<div className=' position-relative'> 
{item.poster_path?<img className=' w-100' src={'https://image.tmdb.org/t/p/w500'+item.poster_path} alt="" />:<img className=' w-100' src={'https://image.tmdb.org/t/p/w500'+item.profile_path} alt="" />}

<h3 className=' h5 text-white'>{item.title} {item.name}</h3>
{item.vote_average?<div className=' vote top-0 end-0 position-absolute p-1'>{item.vote_average.toFixed(1)}</div>:''}

</div>

</Link>

   </div>
  )
}
