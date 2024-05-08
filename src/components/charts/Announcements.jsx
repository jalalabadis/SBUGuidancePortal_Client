import React from 'react'
import { Link } from 'react-router-dom'

function Announcements({data}) {
  return (
    <div className='content-mart'>
  <p>Announcements</p>
  <hr />

  <div className="container mt-5">
  <div className="row">
{data?.map((item, index)=>{
  return(
    <div className="col-md-4 mb-4" key={index}>
          <Link className="card" to={`/announcement/${item._id}`}>
      <img src={`${process.env.REACT_APP_SERVER}/uploads/${item.thumbnail}`} className="card-img-top" alt="Post 1 Thumbnail"/>
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">
          {item.description}
        </p>
       
      </div>
    </Link>
  </div>
  )
})}
   



  </div>
</div>


  </div>
  )
}

export default Announcements