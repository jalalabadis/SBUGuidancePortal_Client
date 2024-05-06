import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Button, Icon, Text, Image } from "../elements";
import { useNavigate } from "react-router-dom";

export default function LanguageDropdown({ title, icon, addClass }) {
    const navigate = useNavigate();
    const [language, setLanguage] = useState(null);

    useEffect(()=>{
        setLanguage(localStorage.getItem("language"));
    },[]);
    return (
        <Dropdown title={ title }>
            <Dropdown.Toggle className={`mc-dropdown-toggle mc-header-icon ${ addClass }`}>
                <Icon type={ icon } />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                
                    <Button className={`mc-header-language ${ language ? ""  : "active" }`}
                    onClick={e=>{
                        setLanguage(false);
                        localStorage.removeItem("language");
                        navigate('/dashboard');
                    }}
                    >
                        <Image src={ 'images/flag/usa.webp' } alt="flag" />
                        <Text as="span">{ 'english' }</Text>
                    </Button>
                    <Button className={`mc-header-language ${ language ? "active"  : "" }`}
                    onClick={e=>{
                        setLanguage(true);
                        localStorage.setItem("language", true);
                        navigate('/dashboard');
                        }}>
                        <Image src={ 'images/flag/bangladesh.webp' } alt="flag" />
                        <Text as="span">{ 'Bangla' }</Text>
                    </Button>
            </Dropdown.Menu>
        </Dropdown>
    )
}