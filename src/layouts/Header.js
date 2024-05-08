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
                        image={`https://dummyimage.com/80x80/555555/ffffff&text=${Database.Database?.userData?.email?.split('@')[0]}`}
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

