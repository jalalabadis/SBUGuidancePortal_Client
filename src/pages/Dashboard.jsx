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


function Dashboard() {
    const userData = useUserData();
    const alluserDatas = useAlluserData();
    const allcalendarDatas = useAllcalendarData();
    const allannouncementDatas = useAllannouncementData();
    const allinventoryDatas = useAllInventoryData();
    const allappointmentDatas = useAllappointmentData();
    const [alluserData, setAlluserData ]= useState();
    const [calendarData, setCalendarData ]= useState();
    const [announcementData, setAnnouncementData ]= useState();
    const [inventoryData, setInventoryData ]= useState();
    const [appointmentData, setAppointmentData ]= useState();
    const preparedData = eventActivetyData(allcalendarDatas);
    const IndividualInventory = allinventoryDatas?.filter(item=> parseFloat(item.to)===userData?.Number || item.to===userData?.Section|| item.to===userData?.Department);

useEffect(()=>{
setAlluserData(alluserDatas);
setCalendarData(allcalendarDatas);
setAnnouncementData(allannouncementDatas);
setInventoryData(allinventoryDatas);
setAppointmentData(allappointmentDatas);
},[alluserDatas, allcalendarDatas, allannouncementDatas, allinventoryDatas, allappointmentDatas]);



    //** */
    const fillterValues={"show_by": "100 row","type_by": "All","status_by": "All","search_by": ""};
    const table =    
    {"Appointment": ["Date", "Name", "Contact", "Status",  "action"],
    "inventory": ["Target", "To",  "Notice", "action"],
    "Student": ["Name", "Number", "Section", "Course", "Department", "action"],
    "Admin": ["Name", "Number", "Department", "action"],
    "Calendar": ["Time", "Title", "Description", "action"],
    "Announcement": ["Thumbnail", "Title", "Description", "action"]
    };
  
   const slideImages = [
        {
          url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Slide 1'
        },
        {
          url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
          caption: 'Slide 2'
        },
        {
          url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
          caption: 'Slide 3'
        },
      ];




      /////////

    const updateAlluserData = (data) => {
        setAlluserData(prevData => [...prevData, data]);
    };

    const updateAllcalendarData = (data) => {
      setCalendarData(prevData => [...prevData, data]);
  };

  const updateAllannouncementData = (data) => {
    setAnnouncementData(prevData => [...prevData, data]);
};

const updateinventoryData = (data) => {
  setInventoryData(prevData => [...prevData, data]);
};

  ///////User Data Onchange
    const updatedData = (newData) => {
    setAlluserData(newData);
  };
  
  /////Calender Data Onchange
  const updatedcalendarData = (newData) => {
    setCalendarData(newData);
  };

  /////Announcement Data Onchange
  const updatedannouncementData = (newData) => {
    setAnnouncementData(newData);
  };

   /////inventory Data Onchange
   const updatedinventoryData = (newData) => {
    setInventoryData(newData);
  };

     /////appointment Data Onchange
     const updatedappointmentData = (newData) => {
      setAppointmentData(newData);
    };
    return (
    <PageLayout 
    Database={{userData, preparedData}}
    >

{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<ImageSlider slideImages={slideImages} />}
{userData?.type==='student'&&<Inventory data={IndividualInventory}/>}
{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<Announcements data={announcementData} />}
{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<About/>}
{userData?.type==='student'&&<PopupReminders />}

{(userData?.type==="admin"||userData?.type==="superadmin")&&<CardList userData={userData}
 alluserData={alluserData} setAlluserData={updateAlluserData} 
 calendarData={calendarData} setCalendarData={updateAllcalendarData}
 announcementData={announcementData} setAnnouncementData={updateAllannouncementData}
 inventoryData={inventoryData} setInventoryData={updateinventoryData}

 />}

{userData?.type==="admin"&&<AppointmentTable
  thead = { table.Appointment}
   tbody = { appointmentData }
   fillterValues = { fillterValues }
   updatedappointmentData={updatedappointmentData}
   />}

{userData?.type==="admin"&&<InventoryTable
  thead = { table.inventory}
   tbody = {inventoryData }
   fillterValues = { fillterValues }
   updatedinventoryData={updatedinventoryData}
   />}

{(userData?.type==="superadmin"||userData?.type==='admin')&&<StudentTable 
   thead = { table.Student}
   tbody = { alluserData }
   userData={userData}
   fillterValues = { fillterValues }
   updatedData={updatedData}
   />}

{userData?.type==="superadmin"&&<AdminTable
   thead = { table.Admin}
   tbody = { alluserData }
   fillterValues = { fillterValues }
   updatedData={updatedData}
   />}

{(userData?.type==="superadmin"||userData?.type==='admin')&&<AnnouncementTable 
   thead = { table.Announcement}
   tbody = { announcementData }
   fillterValues = { fillterValues }
   updatedannouncementData={updatedannouncementData}
   />}

{userData?.type==="superadmin"&&<CalendarTable
   thead = { table.Calendar}
   tbody = { calendarData }
   fillterValues = { fillterValues }
   updatedcalendarData={updatedcalendarData}
   />}

{userData?.type==="admin"&&<Clearance userdata={alluserData}/>}

{userData?.type==="admin"&&<Reminders/>}

        </PageLayout>
  )
}

export default Dashboard