import React, { useEffect, useState } from 'react';
import { Modal} from "react-bootstrap";
import { Button, Box} from "../elements";
import LabelField from "../fields/LabelField";
import Cookies  from 'js-cookie';
import axios from "axios";
import { toast } from "react-toastify";
import LabelTextarea from "../fields/LabelTextarea";
import { getTimeLeft } from './../../engine/timeLeft';

function Reminders() {
const [remindersData, setRemindersData]=useState(
  {title: "Pop-up Reminders Title",
  description: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
   time: '10/11/2024',
   status: "active"
  });
const [viewModal, setViewModal] = React.useState(false);

useEffect(()=>{
  const cookie = Cookies.get('AuthToken');
  axios.post(`${process.env.REACT_APP_SERVER}/reminders`, {token: cookie})
  .then(res=>{
    if(res.data){
      setRemindersData(res.data);
      setViewModal(false);
    }
})
.catch(err=>{
      toast(err.response?.data?.Message)
});
},[]);
    ///Input changes
    const handleInputChange = (index, value) => {
      const newFormValues = { ...remindersData };
      newFormValues[index] = value;
      setRemindersData(newFormValues);
    };


    const updateRemindersdata =()=>{
      const cookie = Cookies.get('AuthToken');
      axios.post(`${process.env.REACT_APP_SERVER}/reminders/update`, {token: cookie, remindersData})
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
    <p>Pop-up Reminders</p>
    <hr />
    <div className="container poport_remainers mt-5">
  <button onClick={e=>setViewModal(true)} className='popr_remainers_editor'  style={{background: '#51A24F' , color: 'white', padding: '10px 20px', borderRadius: '6px'}}>Edit</button>

<h5>{remindersData?.title}</h5>

<span>{remindersData.description}</span>

<h4>{getTimeLeft(remindersData?.time)}</h4>

<div className='popr_remainers_stattus'>{remindersData?.status}</div>
</div>



<Modal show={ viewModal } onHide={()=> setViewModal(false)}>
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
               



                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label={"Title"}
                                  value={remindersData.title}
                                  onChange={e=>handleInputChange('title', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelTextarea type="text" label="Description"
                                  value={remindersData.description}
                                  onChange={e=>handleInputChange('description', e.target.value)} fieldSize="w-100 h-lg" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="date" label="Time"
                                  value={remindersData.time}
                                  onChange={e=>handleInputChange('time', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     
                     <Box className="mc-product-upload-organize mb-4">
                                    <LabelField label="Status" 
                                    option={['Active', 'Deactive']}
                                    value={remindersData.status}
                                    onChange={e=>handleInputChange('status', e.target.value)} fieldSize="w-100 h-sm" />
                                    
                                </Box>


                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={updateRemindersdata}>Update Pop-up Reminders</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>

</div>
  )
}

export default Reminders