import React from "react";
import { Box, Anchor } from "../elements";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Logout({ data }) {
    const navigate =useNavigate();
    return (
        <Box className="mc-sidebar-logout text-center">
            <Anchor 
                onClick={e=>auth.signOut().then(()=>{
                navigate('/')
                })}
                icon = { data?.icon } 
                text = { data?.text } 
                className = "mc-btn primary sm"
            />
        </Box>
    )
}