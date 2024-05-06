import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { Input } from '../elements';
import { FaSearch } from "react-icons/fa";

function Clearance() {
  return (

    <div className='content-mart'>
    <p>Clearance of Requirements</p>
    <hr />
    <div class="container mt-5">
  <div class="row">

    <div class="col-md-6 mb-6">

    <div class="search">
  <FaSearch className='fa fa-search'/>
  <input placeholder="Type student Number..."/>
</div>

    </div>
    <div class="col-md-6 mb-6">
        </div></div>

<div className="clearanesf_hjk_card  mt-2">
 <div class="row">
 <div class="col-md-4 mb-4">
 <div class="card-body">
   <div class="d-flex align-items-center" style={{gap: '15px'}}>
     <img src={"http://placehold.it/300x300"} class="rounded-circle img-fluid" style={{width: '55px'}} alt="Profile Image"/>
    <div>
    <p class="card-title">{"item.profile.Username"}</p>
          <p class="card-text">{"item.profile.UserID"}</p>
       </div>
         </div>
                 <p class="card-text">{"item.profile.Department"}</p>
             </div>
        </div> 
        
        <div class="col-md-8 mb-8">
            <div className="claranxer_notice">
            <div className="claranxer_haders">
<h5>Notice:</h5> 
<button style={{background: '#51A24F' , color: 'white', padding: '10px 20px', borderRadius: '6px'}}>Edit</button>
            </div>
<div className="claranxer_detailes mt-3">
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
</div>
            </div>
     
        </div> </div>

        
        </div> </div></div>
  )
}

export default Clearance