import React, { useContext} from "react";
import { MultipleMenu, Logout } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";


export default function Sidebar(Database) {
    const language = localStorage.getItem("language");
    const PendingPayment =Database.Database.PaymentData?.filter(item=>item.status==='pending').length<=99?
    "0"+Database.Database.PaymentData?.filter(item=>item.status==='pending').length:"9+";
    const ALLTickets =Database.Database.Tickets?.length<=9?
    "0"+Database.Database.Tickets?.length:"9+";
    const ALLNotification =Database.Database.Notification?.length<=9?
    "0"+Database.Database.Notification?.length:"9+";

    const { drawer } = useContext(DrawerContext);
    const data =  {
        "admin": [
            {
                "title": "Profile",
                "menu": [
                    { "profile":
                        {
                        "avater": "http://placehold.it/300x300",
                        "Username": "Mrt Mahiya", 
                        "UserID": "01258987",
                         "Department": "Section, Course & Department" }
                    }
                ]
            },
            {
                "title": "Calendar of Activities",
                "menu": [
                    { "events": [
                        { "href": "/user-list", "text": language?"কাস্টমার তালিকা":"Customer List" },
                        { "href": "/customer-add", "text": language?"নতুন কাস্টমার":"Add Customer" }
                    ]
                    },
                ]
            },
            {
                "title": "Book an Appointment",
                "menu": [
                    {
                    "Appointment":true
                    }
                ]
            },
            {
                "title": "Clearance of Requirements",
                "menu": [
                    {
                        "Requirements": "kkkkjjjs"
                    }
                ]
            }
        ],
    
    
        "button": { "icon": "lock",  "text": "logout" }
    
    };
    return (
        <Section as="aside" className={`mc-sidebar thin-scrolling ${ drawer ? "active" : "" }`}>
            <MultipleMenu data={data.admin}  />
        </Section>
    )
}