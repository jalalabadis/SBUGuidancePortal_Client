import React from "react";
import { Dropdown } from "react-bootstrap";
import { DuelText, RoundAvatar } from "..";
import { Anchor } from "../elements";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown({ name, username, image }) {
    const navigate = useNavigate()
    return (
        <Dropdown className="mc-header-user">
            <Dropdown.Toggle className="mc-dropdown-toggle">
                <RoundAvatar src={ image } alt="avatar" size="xs" />
                <DuelText title={ name } descrip={ username } size="xs" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                
            <Anchor
                        icon={'privacy_tip'}
                        text={'reset password'}
                        href={'/forgot-password'}
                        className="mc-dropdown-menu"

                    />
                    <Anchor
                        icon={'lock'}
                        text={'logout'}
                        onClick={e=>auth.signOut().then(()=>{
                            navigate('/');
                            })}
                        className="mc-dropdown-menu"
                    />
                
            </Dropdown.Menu>
        </Dropdown>
    )
}