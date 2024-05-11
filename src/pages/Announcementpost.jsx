import React, { useEffect, useState } from 'react';
import PageLayout from "../layouts/PageLayout";
import {useUserData, useAllcalendarData, useAllannouncementData} from '../Database';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import { Breadcrumb } from '../components';
import CardLayout from '../components/cards/CardLayout';

function Announcementpost() {
    const {id}=useParams();
    const userData = useUserData();
    const allcalendarDatas = useAllcalendarData();
    const [calendarData, setCalendarData ]= useState();
    const allannouncementDatas = useAllannouncementData();
    const currentAnnouncement = allannouncementDatas?.filter(item=> item._id===id);
    

    useEffect(()=>{
      setCalendarData(allcalendarDatas);
      },[allcalendarDatas]);
  
  
    /////Calender Data Onchange
    const updatedcalendarData = (newData) => {
      setCalendarData(newData);
    };
  
  return (
    <PageLayout 
    Database={{userData, calendarData}} updatedcalendarData={updatedcalendarData}
    >
      <Row>
                <Col xl={12}>
          <Breadcrumb title={"Announcement"}>
      
          
                    </Breadcrumb>
                </Col>
                <Col xl={12}>
<CardLayout>
        {currentAnnouncement?.length>0?
        <div className='mt-1' style={{display: 'flex', flexDirection: "column", alignItems: 'center', minHeight: '100vh'}}>
 
 <img src={`${process.env.REACT_APP_SERVER}/uploads/${currentAnnouncement[0].thumbnail}`} alt=""  style={{width: "320px", height: "320px"}}/>
 
 <h2 className='mt-2'>{currentAnnouncement[0].title}</h2>
<span className='mt-2'>{currentAnnouncement[0].description}</span>
        </div>:
        <div className='mt-1' style={{display: 'flex', justifyContent: 'center', minHeight: '100vh'}}>
        <h5>Announcement Not Nound</h5>   
        </div>
        }
       </CardLayout>
</Col>
                </Row>
       

        </PageLayout>
  )
}

export default Announcementpost