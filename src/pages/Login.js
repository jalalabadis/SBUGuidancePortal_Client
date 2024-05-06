import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import {day,  month, year, hours, minutes, seconds, formattedDate} from "../components/Timezone";
import { useNavigate } from 'react-router-dom';
import { Box, Form, Heading, Button,  Image } from "../components/elements";
import IconField from "../components/fields/IconField";
import Logo from "../components/Logo";
import data from "../data/master-admin/Adminlogin.json";
import { child, get, getDatabase, ref, update } from 'firebase/database';


function Login() {
const db= getDatabase();
const navigate = useNavigate();
const [formValues, setFormValues] = useState({});
const [errorMessage, setErrorMessage]=useState('no');
const [buttonSign, setButtonSign]=useState(false);

///Input changes
const handleInputChange = (index, value) => {
    const newFormValues = { ...formValues };
    newFormValues[index] = value;
    setFormValues(newFormValues);
  };

///use Effect
useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
    get(child(ref(db), "Client_Accounts/"+user.uid)).then(snapshot=>{
        if(snapshot.exists()){
          console.log('user Alredy exists');
          navigate('/dashboard');
        }
        else{
          const email = formValues.email?formValues.email:"";
        update(ref(db, "Client_Accounts/"+user.uid), {
          acountlname: "",
          useremail: user.email?user.email:email,
          mobilenumber: "",
          userid: user.uid,
          userType: "admin",
          status: true,
          countryname: "",
          pin: "",
          creater: "",
          accounnt_created: formattedDate,
          date: {date: month, day: day, hours: hours, minutes: minutes, seconds: seconds, month: month, year: year,  time: Date.now(), timezoneOffset : -360},
          balance: 0,
          commission: 0,
          falaxiload: 0,
          deviceid:"",
          devicelock: true,
          devicetoken: "",
        }).then(()=>navigate('/dashboard'));
        }
})
}
});
    },[db, navigate, formValues.email]);

const signinHandel =()=>{
  setButtonSign(true);
const email = formValues.email?formValues.email:false;
const password = formValues.password?formValues.password:false;
signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    const formValuesencode = btoa(JSON.stringify(formValues));
    localStorage.setItem("AuthKey", formValuesencode);
    })
    .catch((error) => {
  var errors = error.message.replace(/\(|\)|\/|Firebase:|Error|auth/g, '');
  setErrorMessage(errors);
  setButtonSign(false);
})
};
  return (
    <Box className="mc-auth">
    <Image
        src={ data?.pattern.src } 
        alt={ data?.pattern.alt }
        className="mc-auth-pattern"  
    />
    <Box className="mc-auth-group">
        <Logo 
            src = { data?.logo.src }
            alt = { data?.logo.alt }
            href = { '/' }
            className = "mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">{ data?.title }</Heading>
        <Form className="mc-auth-form">
{errorMessage!=='no'?
  <article className="message is-danger">
  <div className="message-body">{errorMessage}</div>
  </article>
  :<></>}

            {data?.input.map((item, index) => (
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
            className={`mc-auth-btn disabled ${data?.button.fieldSize}`} type={ data?.button.type } disabled={buttonSign}> 
           {buttonSign?"Loding...": data?.button.text}</Button>
            
        </Form>
      
    </Box>
</Box>
  )
}

export default Login