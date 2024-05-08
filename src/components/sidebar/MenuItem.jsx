import React, { useState } from "react";
import {  Item, } from "../elements";
import { formatTime } from "../../engine/formatTime";
import Cookies  from 'js-cookie';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function MenuItem({ item }) {
    const [active, setActive] = React.useState(false);
    const [date, setDate]=useState();
    const [contact, setContact]=useState('');
    const [preferred, setPreferred]=useState('');

    const handleCheckboxChange = (value) => {
      setPreferred(preferred === value ? '' : value);
  };
    const handelsubmits=(event)=>{
      event.preventDefault();
      const cookie = Cookies.get('AuthToken');
      if(date&&contact&&preferred){
      axios.post(`${process.env.REACT_APP_SERVER}/appointment/submit`, {token: cookie, date,contact,preferred})
      .then(res=>{
          console.log(res.data);
          toast("Sucessfuly Submit Your Appointment");
          setDate();
          setContact('');
          setPreferred('');
  })
  .catch(err=>{
          toast(err.response?.data?.Message)
    });
  }
  else{
    toast("Fill all info");
  }
    };
    return (
        <Item className={`mc-sidebar-menu-item ${active ? "active" : ""}`} onClick = {()=> setActive(!active)}>
            {item.profile ?
            
             <div className="card-body">
                 <div className="d-flex align-items-center" style={{gap: '15px'}}>
                         <img src={item.profile.avater} className="rounded-circle img-fluid" style={{width: '55px'}} alt="Profile ff"/>
                     
                     <div>
                         <p className="card-title">{item.profile.Username}</p>
                         <p className="card-text">{item.profile.UserID}</p>
                     </div>
                 </div>
                 <p className="card-text">{item.profile.Department}</p>
             </div>
         
            :
            item.events?


<div className="event-calendar">
  {item.events?.map((item, index) => (
    <React.Fragment key={index}>
      {item.type === "spacer" && (
        <div className="spacer">
          {`${item.month} ${item.year}`} {/* Display month and year */}
        </div>
      )}
      {item.type === "event" && (
        <div className="full-evnrtd mb-1">
          <span className="date-container">
            <span className="date">{item.day}<span className="month">{item.weekname}</span></span>
          </span>
          <div className="event-list">
            <div className="event-container">
              <span className="detail-container">
                <span className="title">{item.title}</span>
                <span className="timertktys">{formatTime(item.time)}</span>
                <span className="description">{item.description}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  ))}
</div>











     

            :
            item.Appointment?
            

  <div className="row justify-content-center">
    <div className="col-md-12">
      <form onSubmit={handelsubmits}>
        <div className="form-group ">
          <label>Select Appointment Date:</label>
          <input value={date}
          onChange={e=> setDate(e.target.value)}
          type="date" className="form-control" id="date" name="date"/>
        </div>
        <div className="form-group mt-3">
          <label>Mobile Number:</label>
          <input value={contact}
         onChange={e=> setContact(e.target.value)}
          type="tel" className="form-control" id="mobile" name="mobile" placeholder="Enter your mobile number"/>
        </div>

        <div className="form-group mt-3 font-weight-bold">
          <label>Select Preferred Time of Day:</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>
                <input
                    checked={preferred === 'morning'} // Check if 'morning' is selected
                    onChange={() => handleCheckboxChange('morning')} // Set value to 'morning'
                    type="checkbox"
                    className="form-check-input"
                />
                Morning
            </span>
            <span>
                <input
                    checked={preferred === 'afternoon'} // Check if 'afternoon' is selected
                    onChange={() => handleCheckboxChange('afternoon')} // Set value to 'afternoon'
                    type="checkbox"
                    className="form-check-input"
                />
                Afternoon
            </span>
        </div>
        </div>
        <button type="submit" className="btn btn-secondary btn-block mt-3 w-100">Book Appointment</button>
      </form>
    </div>
  </div>

            :

            item.Requirements&&
             
            <div className="requirements_notice">
                {item.Requirements}

            </div>
            }
            <ToastContainer/>
        </Item>
    )
}