import React from "react";
import { List, Item, Anchor, Button, Fieldset } from "../elements";

export default function MenuItem({ item }) {
    const [active, setActive] = React.useState(false);
    return (
        <Item className={`mc-sidebar-menu-item ${active ? "active" : ""}`} onClick = {()=> setActive(!active)}>
            {item.profile ?
            
             <div class="card-body">
                 <div class="d-flex align-items-center" style={{gap: '15px'}}>
                         <img src={item.profile.avater} class="rounded-circle img-fluid" style={{width: '55px'}} alt="Profile Image"/>
                     
                     <div>
                         <p class="card-title">{item.profile.Username}</p>
                         <p class="card-text">{item.profile.UserID}</p>
                     </div>
                 </div>
                 <p class="card-text">{item.profile.Department}</p>
             </div>
         
            :
            item.events?
          <div className="event-calendar">
    
  <div class="spacer">May 2024</div>
  <div className="full-evnrtd">
  <span class="date-container">
 <span class="date">31<span class="month">may</span></span>
  </span>
  <div class="event-list">
      <div class="event-container">
        <span class="detail-container">
          <span class="title">lindenrs rket lindertyss juuytt</span>
          <span className="timertktys">12:50pm</span>
        <span class="description">Every other Sunday </span>
        </span>
      </div> </div>
      </div>

      <div class="spacer">May 2024</div>
  <div className="full-evnrtd">
  <span class="date-container">
 <span class="date">31<span class="month">may</span></span>
  </span>
  <div class="event-list">
      <div class="event-container">
        <span class="detail-container">
          <span class="title">Eid Ul adaha holly</span>
          <span className="timertktys">12:50pm</span>
        <span class="description">Every other Sunday </span>
        </span>
      </div> </div>
      </div>



      <div class="spacer"></div>
  <div className="full-evnrtd">
  <span class="date-container">
 <span class="date">31<span class="month">may</span></span>
  </span>
  <div class="event-list">
      <div class="event-container">
        <span class="detail-container">
          <span class="title">lindenrs rket lindertyss juuytt uyy</span>
          <span className="timertktys">12:50pm</span>
        <span class="description">Every other Sunday </span>
        </span>
      </div> </div>
      </div>
    
   
    
      </div>

            :
            item.Appointment?
            

  <div class="row justify-content-center">
    <div class="col-md-12">
      <form>
        <div class="form-group ">
          <label>Select Appointment Date:</label>
          <input type="date" class="form-control" id="date" name="date"/>
        </div>
        <div class="form-group mt-3">
          <label>Mobile Number:</label>
          <input type="tel" class="form-control" id="mobile" name="mobile" placeholder="Enter your mobile number"/>
        </div>

        <div class="form-group mt-3 font-weight-bold">
          <label>Select Preferred Time of Day:</label>
         <div style={{display: 'flex', gap: '12px'}}>
        <span><input type="checkbox" class="form-check-input" /> Morning</span> 
        <span><input type="checkbox" class="form-check-input" /> Afternoon</span> 
         </div>
        </div>
        <button type="submit" class="btn btn-secondary btn-block mt-3 w-100">Book Appointment</button>
      </form>
    </div>
  </div>

            :

            item.Requirements&&
             
            <div className="requirements_notice">
                {item.Requirements}

            </div>
            }
        </Item>
    )
}