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
    const data = {
        "admin": [
          Database.Database?.userData && {
            "title": "Profile",
            "menu": [
              {
                "profile": {
                  "avater": "http://placehold.it/300x300",
                  "Username": Database.Database.userData.userName,
                  "UserID": Database.Database.userData.Number,
                  "Department": `${Database.Database.userData.Section}, 
                                  ${Database.Database.userData.Course} & 
                                  ${Database.Database.userData.Department}`
                }
              }
            ]
          },
          {
            "title": "Calendar of Activities",
            "menu": [
              { "events": true }
            ]
          },
          Database.Database?.userData?.type==='student' && {
            "title": "Book an Appointment",
            "menu": [
              { "Appointment": true }
            ]
          },
          Database.Database?.userData?.type==='student' && {
            "title": "Clearance of Requirements",
            "menu": [
              { "Requirements": "kkkkjjjs" }
            ]
          }
        ].filter(Boolean), // Filter out undefined items
        "button": { "icon": "lock", "text": "logout" }
      };
    return (
        <Section as="aside" className={`mc-sidebar thin-scrolling ${ drawer ? "active" : "" }`}>
            <MultipleMenu data={data.admin}  />
        </Section>
    )
}