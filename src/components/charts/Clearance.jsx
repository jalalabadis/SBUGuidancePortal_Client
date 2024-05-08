import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { Modal } from "react-bootstrap";
import { Button, Box} from "../elements";
import Cookies  from 'js-cookie';
import axios from "axios";
import { toast } from "react-toastify";
import LabelTextarea from "../fields/LabelTextarea";

function Clearance({userdata}) {
  const [clearanceUser, setClearanceUser]=useState();
  const [studentId, setstudentID]=useState('');
  const [viewModal, setViewModal] = React.useState(false);

  ///Input changes
const handleInputChange = (index, value) => {
  const newFormValues = { ...clearanceUser };
  newFormValues[index] = value;
  setClearanceUser(newFormValues);
};

const handelSearches=()=>{
 const searchStudent = userdata?.filter(item=> item.email===studentId);
 setClearanceUser(searchStudent[0]);
 console.log(searchStudent)
}

/////Notice Update
const updateClearancedata=()=>{
  const cookie = Cookies.get('AuthToken');
  axios.post(`${process.env.REACT_APP_SERVER}/student/notice`, {token: cookie, clearanceUser})
  .then(res=>{
      console.log(res.data);
      setViewModal(false);
})
.catch(err=>{
      toast(err.response?.data?.Message)
});

};
  return (

    <div className='content-mart'>
    <p>Clearance of Requirements</p>
    <hr />
    <div className="container mt-5">
  <div className="row">

    <div className="col-md-6 mb-6">

    <div className="search">
  <FaSearch className='fa fa-search' onClick={handelSearches}/>
  <input value={studentId} onChange={e=> setstudentID(e.target.value)} placeholder="Type student email..."/>
</div>

    </div>
    <div className="col-md-6 mb-6">
        </div></div>

<div className="clearanesf_hjk_card  mt-2">

  {clearanceUser?
 <div className="row">
 <div className="col-md-4 mb-4">
 <div className="card-body">
   <div className="d-flex align-items-center" style={{gap: '15px'}}>
     <img src={`https://dummyimage.com/80x80/555555/ffffff&text=${clearanceUser?.email?.split('@')[0]}`} className="rounded-circle img-fluid" style={{width: '55px'}} alt="Profile ss"/>
    <div>
    <p className="card-title">{clearanceUser.userName}</p>
          <p className="card-text">{clearanceUser.Number}</p>
       </div>
         </div>
                 <p className="card-text">{clearanceUser.Department}</p>
             </div>
        </div> 
        
        <div className="col-md-8 mb-8">
            <div className="claranxer_notice">
            <div className="claranxer_haders">
<h5>Notice:</h5> 
<button onClick={e=> setViewModal(true)} style={{background: '#51A24F' , color: 'white', padding: '10px 20px', borderRadius: '6px'}}>Edit</button>
            </div>
<div className="claranxer_detailes mt-3">
  {clearanceUser.Notice?clearanceUser.Notice:"Clearance Notice.."}
</div>
            </div>
     
        </div> </div>:
        <div>No user Found</div>}

        
        </div> </div>
        
        
        <Modal show={ viewModal } onHide={()=> setViewModal(false)}>
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
                  
                    

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelTextarea type="text" label="Description"
                                  value={clearanceUser?.Notice}
                                  onChange={e=>handleInputChange('Notice', e.target.value)} fieldSize="w-100 h-100" />
                     </Box>
                     


                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={updateClearancedata}>Submit</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>
        </div>
  )
}

export default Clearance