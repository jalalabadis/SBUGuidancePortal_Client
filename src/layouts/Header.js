import React, { useContext, useState, useRef } from 'react';
import { LanguageDropdown, WidgetDropdown, ProfileDropdown } from '../components/header';
import { Button, Section, Box, Input } from "../components/elements";
import { DrawerContext } from '../context/Drawer';
import { ThemeContext } from '../context/Themes';
import { Logo } from '../components';
import data from "../data/master/header.json";
import { useNavigate } from 'react-router-dom';

export default function Header(Database) {
    const navigate = useNavigate();
    const { drawer, toggleDrawer } = useContext(DrawerContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const searchRef = useRef();
    const [scroll, setScroll] = useState("fixed");
    const [search, setSearch] = useState("");
    ///Payment Data
    const PendingPayment =Database.Database?.PaymentData?.filter(item=>item.status==='pending').length<=9?
    "0"+Database.Database?.PaymentData?.filter(item=>item.status==='pending').length:"9+";
    const PaymentITEM = Database.Database?.PaymentData?.filter(item=>item.status==='pending').map(item=>{return {
        ...item,
        product: {
            "images": ["images/tools/sendicon.png"],
        },
        path: "/order-list"
    }});
    const PendingPaymentData =   {
        "icon": "shopping_cart", 
        "title": "Shopping",  
        "addClass": "cart",   
        "badge": { "text": PendingPayment, "variant": "primary" },
        "dropdown": {
            "title": "Orders",
            "button": { 
                "path": "/order-list", 
                "label": "view all order" 
            },
            "items": PaymentITEM
        }
    };

     ///Tickets Data
     const TicketsCount =Database.Database?.Tickets?.length<=9?
     "0"+Database.Database?.Tickets?.length:"9+";
     const TicketsITEM = Database.Database?.Tickets?.map(item=>{return {
        ...item,
        product: {
            "images": ["/images/logo.webp"],
        },
        path: "/ticket"
    }});
     const TicketsData =   {
         "icon": "email", 
         "title": "Message",  
         "addClass": "cart",   
         "badge": { "text": TicketsCount, "variant": "primary" },
         "dropdown": {
             "title": "Tickets",
             "button": { 
                 "path": "/ticket", 
                 "label": "view all tickets" 
             },
             "items": TicketsITEM
         }
     };

       ///Notification Data
       const NotificationCount =Database.Database?.Notification?.length<=9?
       "0"+Database.Database?.Notification?.length:"9+";
       const NotificationITEM = Database.Database?.Notification?.map(item=>{return {
        ...item,
        product: {
            "images": [item.image],
        },
        path: "/notification"
    }});
       const NotificationData =   {
           "icon": "notifications", 
           "title": "notification",  
           "addClass": "cart",   
           "badge": { "text": NotificationCount, "variant": "primary" },
           "dropdown": {
               "title": "Notifications",
               "button": { 
                   "path": "/notification", 
                   "label": "view all notifications" 
               },
               "items": NotificationITEM
           }
       };

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 0) setScroll("sticky");
        else setScroll("fixed");
    });

    document.addEventListener('mousedown', (event) => {
        if (!searchRef.current?.contains(event.target)) {
            setSearch("");
        }
    });
    return (
        <Section as="header" className={`mc-header ${ scroll }`}>
            <Logo 
                src = { data?.logo.src }
                alt = { data?.logo.alt }
                name = { data?.logo.name }
                href = { data?.logo.path } 
            />
            <Box className="mc-header-group">
                <Box className="mc-header-left">
                    <Button 
                        icon={ data?.search.icon } 
                        className="mc-header-icon search" 
                        onClick={()=> setSearch("show")}
                    />
                    <Button 
                        icon={ drawer ? "menu_open" : "menu" } 
                        className="mc-header-icon toggle" 
                        onClick={ toggleDrawer } 
                    />
                 
                </Box>
                <Box className="mc-header-right">
                    <Button 
                        icon={ theme }
                        title={ data.theme.title }
                        onClick={ toggleTheme }
                        className={`mc-header-icon ${ data.theme.addClass }`}
                    />
                 
                    
                 
                    {Database.Database?.userData?
                    <ProfileDropdown 
                        name={ Database.Database?.userData?.userName }
                        image={ data.profile.image }
                        username={"@"+ Database.Database?.userData?.email?.split('@')[0] }
                        dropdown={ data.profile.dropdown }
                    />:
                     <button onClick={()=>navigate('/login')}
                      className='login_buttoslk' style={{background: "#DEDDDD"}}>Login</button>}
                </Box>
                
               
            </Box>
        </Section>
    );
}

