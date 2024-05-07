import React, {useEffect, useState } from 'react'
import PageLayout from "../layouts/PageLayout";
import {useTicketData,useNotificationsData, useUserData, useAlluserData} from '../Database';
import { About, Announcements, CardList, Clearance, ImageSlider, Inventory, Reminders } from '../components/charts';
import { AdminTable, AppointmentTable, CalendarTable, InventoryTable, StudentTable } from '../components/tables';


function Dashboard() {
    const userData = useUserData();
    const alluserDatas = useAlluserData();
    const [alluserData, setAlluserData ]= useState(alluserDatas);
    const PaymentData = [{useremail: "kkkkk", operatorname: "dkkd", amount: 20, status: "dd"}];
    const Tickets = useTicketData();
    const Notification = useNotificationsData();


useEffect(()=>{
setAlluserData(alluserDatas);
},[alluserDatas]);


    //** */
    const [fillterValues, setFillterValues]=useState({
        "show_by": "100 row",
        "type_by": "All",
        "status_by": "All",
        "search_by": ""
    });

///Filter Input changes
const handleFillter_InputChange = (index, value) => {
    const newFormValues = { ...fillterValues };
    newFormValues[index] = value;
    setFillterValues(newFormValues);
  };

    const table =    
    {"Appointment": ["Date", "Name", "Contact", "Status",  "action"],
    "inventory": ["Target", "To", "Status", "Title", "Notice", "action"],
    "Student": ["Name", "Number", "Section", "Course", "Department", "action"],
    "Admin": ["Name", "Number", "Department", "action"],
    "Calendar": ["Time", "Title", "Description", "action"]
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


    const updateAlluserData = (data) => {
        setAlluserData(prevData => [...prevData, data]);
    };

    const updatedData = (newData) => {
    setAlluserData(newData);
  };
  
    return (
    <PageLayout 
    Database={{userData,PaymentData,Tickets, Notification}}
    >

{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<ImageSlider slideImages={slideImages} />}
{userData?.type==='student'&&<Inventory/>}
{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<Announcements/>}
{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<About/>}
{(userData?.type==="admin"||userData?.type==="superadmin")&&<CardList userData={userData} alluserData={alluserData}
                    setAlluserData={updateAlluserData}/>}

{userData?.type==="admin"&&<AppointmentTable
  thead = { table.Appointment}
   tbody = { PaymentData }
   fillterValues = { fillterValues }
   />}

{userData?.type==="admin"&&<InventoryTable
  thead = { table.inventory}
   tbody = { PaymentData }
   fillterValues = { fillterValues }
   />}

{userData?.type==="superadmin"&&<StudentTable 
   thead = { table.Student}
   tbody = { alluserData }
   fillterValues = { fillterValues }
   updatedData={updatedData}
   />}

{userData?.type==="superadmin"&&<AdminTable
   thead = { table.Admin}
   tbody = { PaymentData }
   fillterValues = { fillterValues }
   />}

{userData?.type==="superadmin"&&<CalendarTable
   thead = { table.Calendar}
   tbody = { PaymentData }
   fillterValues = { fillterValues }
   />}

{userData?.type==="admin"&&<Clearance/>}

{userData?.type==="admin"&&<Reminders/>}

        </PageLayout>
  )
}

export default Dashboard