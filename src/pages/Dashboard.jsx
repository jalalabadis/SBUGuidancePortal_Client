import React, {useEffect, useState } from 'react'
import PageLayout from "../layouts/PageLayout";
import {useUserData, useAlluserData, useAllcalendarData} from '../Database';
import { About, Announcements, CardList, Clearance, ImageSlider, Inventory, Reminders } from '../components/charts';
import { AdminTable, AppointmentTable, CalendarTable, InventoryTable, StudentTable } from '../components/tables';


function Dashboard() {
    const userData = useUserData();
    const alluserDatas = useAlluserData();
    const allcalendarDatas = useAllcalendarData();
    const [alluserData, setAlluserData ]= useState();
    const [calendarData, setCalendarData ]= useState();
    const PaymentData = [{useremail: "kkkkk", operatorname: "dkkd", amount: 20, status: "dd"}];


useEffect(()=>{
setAlluserData(alluserDatas);
setCalendarData(allcalendarDatas);
},[alluserDatas, allcalendarDatas]);









// Sort the data by date
allcalendarDatas?.sort((a, b) => new Date(a.date) - new Date(b.date));

// Initialize variables to keep track of current month and year
let currentMonth = '';
let currentYear = '';

// Mapping of month numbers to month names
const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// Array to hold prepared data
const preparedData = [];

// Function to get weekday name from date
function getWeekdayName(dateString) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateString);
    return days[date.getDay()];
}

// Iterate through the sorted data
allcalendarDatas?.forEach(event => {
    const { title, description, time, date } = event;
    const [year, month, day] = date.split('-');
    const monthYear = `${month}-${year}`;
    const weekname = getWeekdayName(date);

    // Check if month has changed
    if (monthYear !== `${currentMonth}-${currentYear}`) {
        // Add spacer for new month
        preparedData.push({ type: 'spacer', month: monthNames[parseInt(month) - 1], year });
        currentMonth = month;
        currentYear = year;
    }

    // Add event data
    preparedData.push({ type: 'event', title, description, time, date, weekname, day });
});























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

    const updateAllcalendarData = (data) => {
      setCalendarData(prevData => [...prevData, data]);
  };

  ///////User Data Onchange
    const updatedData = (newData) => {
    setAlluserData(newData);
  };
  
  /////Calender Data Onchange
  const updatedcalendarData = (newData) => {
    setCalendarData(newData);
  };
    return (
    <PageLayout 
    Database={{userData,PaymentData, preparedData}}
    >

{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<ImageSlider slideImages={slideImages} />}
{userData?.type==='student'&&<Inventory/>}
{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<Announcements/>}
{(userData?.type!=="admin"&&userData?.type!=="superadmin")&&<About/>}
{(userData?.type==="admin"||userData?.type==="superadmin")&&<CardList userData={userData} alluserData={alluserData}
                    setAlluserData={updateAlluserData} setCalendarData={updateAllcalendarData}/>}

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
   tbody = { alluserData }
   fillterValues = { fillterValues }
   updatedData={updatedData}
   />}

{userData?.type==="superadmin"&&<CalendarTable
   thead = { table.Calendar}
   tbody = { calendarData }
   fillterValues = { fillterValues }
   updatedcalendarData={updatedcalendarData}
   />}

{userData?.type==="admin"&&<Clearance/>}

{userData?.type==="admin"&&<Reminders/>}

        </PageLayout>
  )
}

export default Dashboard