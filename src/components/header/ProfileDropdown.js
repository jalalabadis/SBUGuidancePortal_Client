import React from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText, RoundAvatar } from "..";
import { Anchor } from "../elements";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function ProfileDropdown({ name, username, image }) {
    const navigate = useNavigate();
    const hndelLogout= async()=>{
       await Cookies.remove('AuthToken');
         navigate('/login');
    };
    return (
        <Dropdown className="mc-header-user">
            <Dropdown.Toggle className="mc-dropdown-toggle">
                <RoundAvatar src={ image } alt="avatar" size="xs" />
                <DuelText title={ name } descrip={ username } size="xs" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                
            <Anchor
                        icon={'person'}
                        text={'Profile'}
                        href={'/profile'}
                        className="mc-dropdown-menu"

                    />
                    <Anchor
                        icon={'lock'}
                        text={'logout'}
                        onClick={hndelLogout}
                        className="mc-dropdown-menu"
                    />
                
            </Dropdown.Menu>
        </Dropdown>
    )
}