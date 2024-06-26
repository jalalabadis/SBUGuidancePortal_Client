import React, {useEffect, useState } from 'react'
import PageLayout from "../layouts/PageLayout";
import {useUserData, useAlluserData, useAllcalendarData, useAllannouncementData} from '../Database';
import { About, Announcements, CardList, Clearance, ImageSlider, Inventory, Reminders } from '../components/charts';
import { AdminTable, AppointmentTable, CalendarTable, InventoryTable, StudentTable } from '../components/tables';
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
    "Calendar": ["Time", "Title", "Description", "Attended", "Not attended", "action"],
    "Announcement": ["Thumbnail", "Title", "Description", "action"]
    };
  
   const slideImages = [
        {
          url: '/images/banner/banner1.jpg',
          caption: 'Slide 1'
        },
        {
          url: '/images/banner/banner2.jpg',
          caption: 'Slide 2'
        },
        {
          url: '/images/banner/banner3.jpg',
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
    Database={{userData, calendarData}} updatedcalendarData={updatedcalendarData}
    >

{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<ImageSlider slideImages={slideImages} />}
{(userData?.type==='student'&&IndividualInventory?.length>0)&&<Inventory data={IndividualInventory}/>}
{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<Announcements data={announcementData} />}
{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<About/>}
{userData?.type==='student'&&<PopupReminders />}

{(userData?.type==="admin"||userData?.type==="superadmin")&&<CardList userData={userData}
 alluserData={alluserData} setAlluserData={updateAlluserData} 
 calendarData={calendarData} setCalendarData={updateAllcalendarData}
 announcementData={announcementData} setAnnouncementData={updateAllannouncementData}
 inventoryData={inventoryData} setInventoryData={updateinventoryData}
 appointmentData={appointmentData}

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
   tbodyuser = {alluserData?.filter(item=> item.type==='student').length}
   fillterValues = { fillterValues }
   updatedcalendarData={updatedcalendarData}
   />}

{userData?.type==="admin"&&<Clearance userdata={alluserData}/>}

{userData?.type==="admin"&&<Reminders/>}

        </PageLayout>
  )
}

export default Dashboard