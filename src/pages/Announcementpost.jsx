import React, {useEffect, useState } from 'react'
import PageLayout from "../layouts/PageLayout";
import {useUserData, useAlluserData, useAllcalendarData, useAllannouncementData} from '../Database';
import { About, Announcements, CardList, Clearance, ImageSlider, Inventory, Reminders } from '../components/charts';
import { AdminTable, AppointmentTable, CalendarTable, InventoryTable, StudentTable } from '../components/tables';
import { eventActivetyData } from '../engine/eventActivety';
import AnnouncementTable from '../components/tables/AnnouncementTable';
import useAllInventoryData from '../Database/allInventoryData';
import useAllappointmentData from '../Database/allappointmentData';
import PopupReminders from './../components/charts/PopupReminders';
import { useParams } from 'react-router-dom';

function Announcementpost() {
    const {id}=useParams();
    const userData = useUserData();
    const allcalendarDatas = useAllcalendarData();
    const preparedData = eventActivetyData(allcalendarDatas);
    const allannouncementDatas = useAllannouncementData();
console.log(id)
    const currentAnnouncement = allannouncementDatas?.filter(item=> item._id===id)
    console.log(currentAnnouncement)
  return (
    <PageLayout 
    Database={{userData, preparedData}}
    >
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
       

        </PageLayout>
  )
}

export default Announcementpost