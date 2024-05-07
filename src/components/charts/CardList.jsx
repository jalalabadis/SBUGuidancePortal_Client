import React, { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa6";
import { Box, Button, Heading, Icon, Input, Label, Text  } from '../elements';
import LabelField from './../fields/LabelField';
import {ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import LabelTextarea from '../fields/LabelTextarea';
import Cookies  from 'js-cookie';

function CardList({userData, alluserData, setAlluserData, calendarData, setCalendarData,
  announcementData, setAnnouncementData, inventoryData, setInventoryData
}) {
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
  const [announcementModal, setAnnouncementModal]=useState(false);
  const [inventoryModal, setInventoryModal]=useState(false);
  const [title, setTitle]=useState('');
  const [description, setDescription]=useState('');
  const [preferredDate, setPreferredDate]=useState('');
    const [preferredTime, setPreferredTime]=useState('');
    const [uploadFile, setUploadFile] = useState('image upload');
    const [AnnouncementImageShow, setAnnouncementImageShow]=useState(null);
    const [AnnouncementImage, setAnnouncementImage]=useState(null);
    const [target, setTarget]=useState('Student');
    const [toInventory, setToInventory]=useState('');
    const [notice, setNotice]=useState('');

  ////Add New Student/Admin
  const submitUserdata=()=>{
    const cookie = Cookies.get('AuthToken');
    const requestUrl = `${process.env.REACT_APP_SERVER}/${adminAdd ? 'admin' : 'student'}/add`;
    if (!studentName || !studentNumber || (!adminAdd && !studentSection) || (!adminAdd && !studentCourse) || !studentDepartment || !email || !password) {
      toast("Fill in all required information");
      return;
    }
    
  axios.post(requestUrl, {token: cookie,  studentName, studentNumber, studentSection, studentCourse, studentDepartment, email, password})
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
  const cookie = Cookies.get('AuthToken');
  if(title&&description&&preferredDate&&preferredTime){
    const requestUrl = `${process.env.REACT_APP_SERVER}/calendar/add`;
  axios.post(requestUrl, {token: cookie, title,description,preferredDate,preferredTime})
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

///////Add Annoucment
const uploadImgaeFile=(e)=>{
  setAnnouncementImage(e.target.files[0]);
  if (e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = () => {
      setAnnouncementImageShow(reader.result);
    }
    reader.readAsDataURL(e.target.files[0]);
  }
  };
const submitAnnouncementdata=()=>{
  const cookie = Cookies.get('AuthToken');
  if(title&&description&&AnnouncementImage){
    const formData = new FormData();
    formData.append('title', title);
  formData.append('description', description);
  formData.append('file', AnnouncementImage);
  formData.append('token', cookie);
    const requestUrl = `${process.env.REACT_APP_SERVER}/announcement/add`;
  axios.post(requestUrl, formData)
  .then(response=>{
    if(response.data.result){
      setAnnouncementData(response.data.result);
      setAnnouncementModal(false);
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

};



///////Addd inventory Data 
const submitinventorydata=()=>{
  const cookie = Cookies.get('AuthToken');
  if(target&&toInventory&&notice){
    const requestUrl = `${process.env.REACT_APP_SERVER}/inventory/add`;
  axios.post(requestUrl, {token: cookie, target,toInventory,notice})
  .then(response=>{
    if(response.data.result){
      setInventoryData(response.data.result);
      setInventoryModal(false);
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
        <span>Total Announcements:  {announcementData?.length}</span> 
        <FaPlus onClick={()=> setAnnouncementModal(true)} />
        </div>
        </div> 
        </div> 

      {userData?.type==="admin"&&<div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Inventory:  {inventoryData?.length}</span> 
        <FaPlus onClick={()=>setInventoryModal(true)} />
        </div>
        </div> 
        </div> }

        {userData?.type==="admin"&&
         <div className="col-md-6 mb-6">
      <div className="card ">
        <div className="cardlisjkj">
        <span>Appointment Pending:  500</span> 
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
        <span>Total Calendar:  {calendarData?.length}</span> 
        <FaPlus onClick={e=>setCalenderModal(true)} />
        </div>
        </div> 
        </div>}
        
        </div> 
        
        
        {/* User Model */}

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





{/* Calendar Model */}
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




{/* Anmoucement Model */}


<Modal show={ announcementModal } onHide={()=> setAnnouncementModal(false)} >
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
                  
                <Box className="mc-product-upload-file mb-4">
                                <Input type="file" id="product" onChange={uploadImgaeFile} />
                                <Label htmlFor="product">{AnnouncementImageShow?<img src={AnnouncementImageShow} width={'85px'} alt="" />:<Icon type="collections" />}
                                <Text>{ uploadFile }</Text></Label>
                            </Box>

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
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={submitAnnouncementdata}>Add Announcement</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>



{/* Inventory Model */}


<Modal show={ inventoryModal } onHide={()=> setInventoryModal(false)} >
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField label="Target" 
                                    option={['Student', 'Section', 'Department']}
                                    value={target}
                                    onChange={e=>setTarget(e.target.value)} fieldSize="w-100 h-sm" />
                                    
                                </Box>



                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label={target==="Student"?"Student Number":target==="Section"?"Section Name":"Department Name"}
                                  value={toInventory}
                                  onChange={e=>setToInventory(e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelTextarea type="text" label="notice"
                                  value={notice}
                                  onChange={e=>setNotice(e.target.value)} fieldSize="w-100 h-100" />
                     </Box>
                     
                    


                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={submitinventorydata}>Add Inventory</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>


        <ToastContainer/>
        </div>
  )
}

export default CardList