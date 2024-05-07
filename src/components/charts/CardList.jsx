import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { Box, Button, Heading } from '../elements';
import LabelField from './../fields/LabelField';
import {ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function CardList({userData, alluserData, setAlluserData}) {
  const [studentName, setStudentName]=useState('');
  const [studentNumber, setStudentNumber]=useState('');
  const [studentSection, setStudentSection]=useState('');
  const [studentCourse, setStudentCourse]=useState('');
  const [studentDepartment, setStudentDepartment]=useState('');
  const [email, setEmail]=useState('');
  const [password, setPassword]=useState('');
  const [viewModal, setViewModal] = React.useState(false);

  ////Add New Student
  const submitUserdata=()=>{
if(studentName&&studentNumber&&studentSection&&studentCourse&&studentDepartment&&email&&password){
  axios.post(`${process.env.REACT_APP_SERVER}/student/add`, {studentName, studentNumber, studentSection, studentCourse, studentDepartment, email, password})
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
}
else{
  toast("Fill all Info");
}
  };
  return (
    <div className="container mt-5">
  <div className="row">

  <div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Total Student:  {alluserData?.filter(item=> item.type==='student').length}</span> 
        <FaPlus onClick={e=> setViewModal(true)} />
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
        <span>Total Admin:  500</span> 
        <FaPlus />
        </div>
        </div> 
        </div>}

        {userData?.type==="superadmin"&& <div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Total Calendar:  500</span> 
        <FaPlus />
        </div>
        </div> 
        </div>}
        
        </div> 
        
        

        <Modal show={ viewModal } onHide={()=> setViewModal(false)} >
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
                  
                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Name" 
                                  value={studentName}
                                  onChange={e=>setStudentName(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="number" label="Number" 
                                  value={studentNumber}
                                  onChange={e=>setStudentNumber(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Section" 
                                  value={studentSection}
                                  onChange={e=>setStudentSection(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Course" 
                                  value={studentCourse}
                                  onChange={e=>setStudentCourse(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

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
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={submitUserdata}>Submit</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>
        <ToastContainer/>
        </div>
  )
}

export default CardList