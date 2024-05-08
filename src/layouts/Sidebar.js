import React, { useContext} from "react";
import { MultipleMenu, Logout } from "../components/sidebar";
import { DrawerContext } from "../context/Drawer";
import Section from "../components/elements/Section";


export default function Sidebar(Database) {
    const { drawer } = useContext(DrawerContext);
    console.log(Database.Database.userData)
    const data = {
        "admin": [
          Database.Database?.userData && {
            "title": "Profile",
            "menu": [
              {
                "profile": {
                  "avater": `https://dummyimage.com/80x80/555555/ffffff&text=${Database.Database?.userData?.email?.split('@')[0]}`,
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
              { "events": Database.Database.preparedData }
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
              { "Requirements": Database.Database.userData.Notice }
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