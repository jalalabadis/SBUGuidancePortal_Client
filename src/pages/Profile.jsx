import React, { useEffect, useState } from 'react';
import PageLayout from "../layouts/PageLayout";
import {useUserData, useAllcalendarData} from '../Database';
import { Col, Row } from 'react-bootstrap';
import { Breadcrumb } from '../components';
import CardLayout from '../components/cards/CardLayout';
import { eventActivetyData } from '../engine/eventActivety';
import { formatTime } from '../engine/formatTime';

function Profile() {
    const userData = useUserData();
    const allcalendarDatas = useAllcalendarData();
    const [calendarData, setCalendarData ]= useState();
    const userEvent = eventActivetyData(allcalendarDatas);

    
useEffect(()=>{
    setCalendarData(allcalendarDatas);
    },[allcalendarDatas]);


  /////Calender Data Onchange
  const updatedcalendarData = (newData) => {
    setCalendarData(newData);
  };

  return (
    <PageLayout 
    Database={{userData, calendarData}}  updatedcalendarData={updatedcalendarData}
    >
        <Row>
                <Col xl={12}>
          <Breadcrumb title={"My Activity"}>
      
          
                    </Breadcrumb>
                </Col>
                <Col xl={12}>
<CardLayout>
<div className="widget">
  <div className="widget-content">
    <div className="column-wrap">
      <div className="coloumn">
        <div className="activity">
      
        {userEvent?.map(monthData => {
    const monthYear = Object.keys(monthData)[0];
    const events = monthData[monthYear];
    events.sort((a, b) => a.Mstimer - b.Mstimer);

    return (
        <div className="activity-items" key={monthYear}>
            
          <div className="activity-item-wrap activity-date">
            <h4 className="activity-date">  {monthYear}</h4>
          </div>

          {events.map((eventitem, index) => (
          <div className="activity-item-wrap activity-call" key={index}>
            <div className="activity-item-badge"><i className="aroicon-entity-groups"></i></div>
            <div className="activity-item">
              <div className="activity-item-meta">
                <div className="activity-user activity-ismember">{eventitem.title&&eventitem.title[0]}</div>
                <p className="activity-summary"><strong>{eventitem.title}</strong></p>
              <p className="activity-timestamp">{eventitem.month} {eventitem.day} at {formatTime(eventitem.time)}</p>
              </div>
              <div className="activity-item-details">
                <p>{eventitem.description}</p>
                {eventitem.submission.includes(userData?._id)?
              <p><strong style={{color: 'green'}}>You have attended it</strong></p>:
              <p><strong style={{color: 'red'}}>You have Not attended it</strong></p>
                }
              </div>
            </div>
          </div>))}
       
          
        </div> );
  })}
        </div>
      </div>
    </div>
  </div>
</div>



</CardLayout>
</Col>
                </Row>
       

        </PageLayout>
  )
}

export default Profile