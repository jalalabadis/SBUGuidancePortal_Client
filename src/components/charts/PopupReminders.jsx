import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap';
import Box from './../elements/Box';
import  Cookies  from 'js-cookie';
import axios from 'axios';
import { getTimeLeft } from '../../engine/timeLeft';

function PopupReminders() {
    const [remindersData, setRemindersData]=useState();
    const [viewModal, setViewModal] = useState(false);

    useEffect(()=>{
        const cookie = Cookies.get('reminders');
       
        axios.post(`${process.env.REACT_APP_SERVER}/reminders`)
        .then(res=>{
            if(res.data?.Mstimer){
                setRemindersData(res.data);
                    if(res.data?.Mstimer!==parseFloat(cookie)){
                        setViewModal(true);
                    }
                
            }
            
      })
      .catch(err=>{
            console.log(err.response?.data?.Message)
      });
      },[]);

      const handelHidePopup=()=>{
      setViewModal(false);
      Cookies.set('reminders', remindersData?.Mstimer);
      }
  return (
    <Modal show={ viewModal } onHide={handelHidePopup} >
    <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
    <Modal.Body className={'costomize-popup-hkjs2'}>
        <Box>
       
    <div className="container poport_remainers" style={{background: "white"}}>
    <img src="/images/logo.webp" alt="" style={{width: "85px"}}/>
<h5 className='popresss_kkksssss'>{remindersData?.title}</h5>

<span className='ssespan'>{remindersData?.description}</span>

<h4 className='leftssespan'>{getTimeLeft(remindersData?.time)}</h4>

</div>

</Box>
        </Modal.Body>
            </Modal>
          
          
  )
}

export default PopupReminders