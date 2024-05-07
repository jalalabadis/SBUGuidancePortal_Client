import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Form,  Button } from "../components/elements";
import IconField from "../components/fields/IconField";
import Logo from "../components/Logo";
import data from "../data/master-admin/Adminlogin.json";
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {
const navigate = useNavigate();
const [formValues, setFormValues] = useState({});
const [buttonSign, setButtonSign]=useState(false);
const [regAdmin, setRegAdmin]=useState(false);

///Input changes
const handleInputChange = (index, value) => {
    const newFormValues = { ...formValues };
    newFormValues[index] = value;
    setFormValues(newFormValues);
  };

///use Effect
useEffect(()=>{
  const cookie = Cookies.get('AuthToken');
  if (cookie) {
    console.log(cookie);
    navigate('/');
  };
axios.post(`${process.env.REACT_APP_SERVER}/auth/all_user`)
.then(response=>{
 setRegAdmin(response.data);
})
.catch(err=>{
  console.log(err)
});
},[navigate, formValues.email]);


const signinHandel = (event) => {
  event.preventDefault()
  setButtonSign(true);
  const { username, email, password } = formValues;
  if (!email || !password || (regAdmin && !username)) {
    toast("Fill in all required information");
    setButtonSign(false);
    return;
  }
  const requestData = { email, password, username};
  const requestUrl = `${process.env.REACT_APP_SERVER}/auth/${regAdmin ? 'singup' : 'login'}`;

  axios.post(requestUrl, requestData)
    .then((res) => {
      console.log(res.data);
      if (res.data.token && res.data.type) {
        Cookies.set('AuthToken', res.data.token);
        navigate('/');
      } else {
        toast(res.data);
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonSign(false);
    });
};



  return (
    <Box className="mc-auth">
    <Box className="mc-auth-group">
        <Logo 
            src = { data?.logo.src }
            alt = { data?.logo.alt }
            href = { '/' }
            className = "mc-auth-logo"
        />


{regAdmin&&<div className='adminaalertynotices'>
Super Admin account was not found for the database. <br />
You need to register super admin account.
</div>}


        <Form className="mc-auth-form">

            {(regAdmin?data.inputreg:data.inputlogin).map((item, index) => (
                <IconField 
                    key = { index }
                    icon = { item.icon }
                    type = { item.type }
                    option = { item.option }
                    classes = { item.fieldSize }
                    placeholder = { item.placeholder }
                    passwordVisible = { item.passwordVisible }
                    onChange={(e) => handleInputChange(item.type, e.target.value)}
                />
            ))}
            <Button onClick={signinHandel} 
            className={`mc-auth-btn disabled h-sm`} type='"button' disabled={buttonSign}> 
           {buttonSign?"Loding...": (regAdmin?'Signup Super Admin':'sign in')}</Button>
        </Form>
      
    </Box>
    <ToastContainer/>
</Box>
  )
}

export default Login