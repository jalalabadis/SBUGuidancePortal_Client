import React, { useState } from "react";
import { Box, Form, Heading, Button, Anchor, Image, Text } from "../components/elements";
import IconField from "../components/fields/IconField";
import Logo from "../components/Logo";
import data from "../data/master/forgot.json";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { Alert } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

export default function ForgotPassword() {
    const [email, setEmail]=useState('');
    const [sucesssMessage, setSucessMessage]=useState(false);
    const [errorMessage, setErrorMessage]=useState('no');
    const handelresetpas=()=>{
        sendPasswordResetEmail(auth, email)
        .then(() => {
          setSucessMessage(true);
        })
        .catch((error) => {
            var errors = error.message.replace(/\(|\)|\/|Firebase:|Error|auth/g, '');
            setErrorMessage(errors);
        });
    }
    return (
        <Box className="mc-auth">
            <Image 
                className="mc-auth-pattern" 
                src={ data?.pattern.src } 
                alt={ data?.pattern.alt } 
            />

          
            <Box className="mc-auth-group">
                <Logo 
                    src = { data?.logo.src }
                    alt = { data?.logo.alt }
                    href = { data?.logo.path }
                    className = "mc-auth-logo"
                />
                <Heading as="h4" className="mc-auth-title">{ data?.title }</Heading>
{errorMessage!=='no'?
 <Box className="mc-card">
 <CardHeader title="bootstrap alerts" />
<Alert  variant='warning' dismissible>{ errorMessage }</Alert>
</Box>
:<></>}
  {sucesssMessage?
             <Box className="mc-card">
             <CardHeader title="bootstrap alerts" />
            <Alert  variant='primary' dismissible>Send Your Password Reset Email</Alert>
            </Box>
            :
                <Form className="mc-auth-form">
                    {data?.input.map((item, index) => (
                        <IconField 
                            key = { index }
                            icon = { item.icon }
                            type = { item.type }
                            classes = { item.fieldSize }
                            placeholder = { item.placeholder }
                            passwordVisible = { item.passwordVisible }
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                        />
                    ))}
                    <Button onClick={handelresetpas} className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type }>{ data?.button.text }</Button>
                </Form>
}
                <Box className="mc-auth-navigate">
                    <Text as="span">{ data?.navigate.title }</Text>
                    <Anchor href={ data?.navigate.path }>{ data?.navigate.text }</Anchor>
                </Box>
            </Box>

        </Box>
                    
    );
}