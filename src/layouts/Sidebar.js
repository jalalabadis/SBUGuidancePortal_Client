import React, { useContext} from "react";
import { MultipleMenu } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";
import { eventActivetyData } from "../engine/eventActivety";


export default function Sidebar({Database, updatedcalendarData}) {
    const { drawer } = useContext(DrawerContext);
    const data = {
        "admin": [
          Database?.userData && {
            "title": "Profile",
            "menu": [
              {
                "profile": {
                  "avater": `https://dummyimage.com/80x80/555555/ffffff&text=${Database?.userData?.email?.split('@')[0]}`,
                  "Username": Database?.userData.userName,
                  "UserID": Database?.userData.Number,
                  "Department": `${Database?.userData.Section}, 
                                  ${Database?.userData.Course} & 
                                  ${Database?.userData.Department}`
                }
              }
            ]
          },
          {
            "title": "Calendar of Activities",
            "menu": [
              { "events": eventActivetyData(Database?.calendarData), "profile_data": Database?.userData }
            ]
          },
          Database?.userData?.type==='student' && {
            "title": "Book an Appointment",
            "menu": [
              { "Appointment": true }
            ]
          },
          Database?.userData?.type==='student' && {
            "title": "Clearance of Requirements",
            "menu": [
              { "Requirements": Database?.userData.Notice }
            ]
          }
        ].filter(Boolean), // Filter out undefined items
        "button": { "icon": "lock", "text": "logout" }
      };
    return (
        <Section as="aside" className={`mc-sidebar thin-scrolling ${ drawer ? "active" : "" }`}>
            <MultipleMenu data={data.admin} updatedcalendarData={updatedcalendarData}  />
        </Section>
    )
}