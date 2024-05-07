import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { Box, Button, Heading } from '../elements';
import LabelField from './../fields/LabelField';
import {ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import LabelTextarea from '../fields/LabelTextarea';

function CardList({userData, alluserData, setAlluserData, setCalendarData}) {
  const [studentName, setStudentName]=useState('');
  const [studentNumber, setStudentNumber]=useState('');
  const [studentSection, setStudentSection]=useState('');
  const [studentCourse, setStudentCourse]=useState('');
  const [studentDepartment, setStudentDepartment]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [viewModal, setViewModal] = React.useState(false);
  const [adminAdd, setAdminAdd] = React.useState(false);
  const [calenderModal, setCalenderModal]=useState(false);
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');
  const [preferredDate, setPreferredDate]=useState('');
    const [preferredTime, setPreferredTime]=useState('');

  ////Add New Student/Admin
  const submitUserdata=()=>{
    const requestUrl = `${process.env.REACT_APP_SERVER}/${adminAdd ? 'admin' : 'student'}/add`;
    if (!studentName || !studentNumber || (!adminAdd && !studentSection) || (!adminAdd && !studentCourse) || !studentDepartment || !email || !password) {
      toast("Fill in all required information");
      return;
    }
    
  axios.post(requestUrl, {studentName, studentNumber, studentSection, studentCourse, studentDepartment, email, password})
  .then(response=>{
    if(response.data.result){
      setAlluserData(response.data.result);
   setViewModal(false);
    }
    else{
      toast(response.data);
    }
  })
  .catch(err=>{
    console.log(err)
  });
  };


///////Addd Calender Data
const submiteventsdata=()=>{
  if(title&&description&&preferredDate&&preferredTime){
    const requestUrl = `${process.env.REACT_APP_SERVER}/calendar/add`;
  axios.post(requestUrl, {title,description,preferredDate,preferredTime})
  .then(response=>{
    if(response.data.result){
      setCalendarData(response.data.result);
      setCalenderModal(false);
    }
    else{
      toast(response.data);
    }
  })
  .catch(err=>{
    console.log(err)
  });
}
else{
  toast("fill all info");
}
}




  return (
    <div className="container mt-5">
  <div className="row">

  <div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Total Student:  {alluserData?.filter(item=> item.type==='student').length}</span> 
        <FaPlus onClick={e=> {setViewModal(true); setAdminAdd(false)}} />
        </div>
        </div> 
        </div>
        
        <div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Total Announcements:  500</span> 
        <FaPlus />
        </div>
        </div> 
        </div> 

      {userData?.type==="admin"&&<div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Inventory:  500</span> 
        <FaPlus />
        </div>
        </div> 
        </div> }

        {userData?.type==="admin"&&
         <div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>TAppointment Pending:  500</span> 
        </div>
        </div> 
        </div> }

        {userData?.type==="superadmin"&& <div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Total Admin:  {alluserData?.filter(item=> item.type==='admin').length}</span> 
        <FaPlus onClick={e=> {setViewModal(true); setAdminAdd(true)}}/>
        </div>
        </div> 
        </div>}

        {userData?.type==="superadmin"&& <div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Total Calendar:  500</span> 
        <FaPlus onClick={e=>setCalenderModal(true)} />
        </div>
        </div> 
        </div>}
        
        </div> 
        
        

        <Modal show={ viewModal } onHide={()=> setViewModal(false)} >
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
                  
                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label={adminAdd?"Admin Name":"Student Name"} 
                                  value={studentName}
                                  onChange={e=>setStudentName(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="number" label={adminAdd?"Admin Number":"Student Number"} 
                                  value={studentNumber}
                                  onChange={e=>setStudentNumber(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     {!adminAdd&&<Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Section" 
                                  value={studentSection}
                                  onChange={e=>setStudentSection(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>}
                     {!adminAdd&&<Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Course" 
                                  value={studentCourse}
                                  onChange={e=>setStudentCourse(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>}

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Department" 
                                  value={studentDepartment}
                                  onChange={e=>setStudentDepartment(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="email" label="Email" 
                                  value={email}
                                  onChange={e=>setEmail(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Password" 
                                  value={password}
                                  onChange={e=>setPassword(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>


                     
                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={submitUserdata}>{adminAdd?"Add Admin":"Add Student"}</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>






            <Modal show={ calenderModal } onHide={()=> setCalenderModal(false)} >
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
                  
                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Title" 
                                  value={title}
                                  onChange={e=>setTitle(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelTextarea type="text" label="Description"
                                  value={description}
                                  onChange={e=>setDescription(e.target.value)} fieldSize="w-100 h-100" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="date" label="Date"
                                  value={preferredDate}
                                  onChange={e=>setPreferredDate(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="time" label="Time"
                                  value={preferredTime}
                                  onChange={e=>setPreferredTime(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>


                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={submiteventsdata}>Submit</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>









        <ToastContainer/>
        </div>
  )
}

export default CardList