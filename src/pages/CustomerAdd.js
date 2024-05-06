import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import {getDatabase, ref, update} from "firebase/database"
import {day,  month, year, hours, minutes, seconds, formattedDate} from "../components/Timezone";
import { Box, Text, Form, Image, Button, Anchor, Heading, Input, Label } from "../components/elements";
import IconField from "../components/fields/IconField";
import Logo from "../components/Logo";
import data from "../data//master-admin/CustomerAdd.json";
import { useNavigate } from "react-router-dom";


function CustomerAdd() {
    const db= getDatabase();
    const navigate =useNavigate();
    const [userID, setUserID]=useState(null);
    const [formValues, setFormValues] = useState({});
    const [statusType, setStatusType] = useState(true);
    const [errorMessage, setErrorMessage]=useState('no');
    const [buttonReg, setButtonReg]=useState(false);

///Input changes
const handleInputChange = (index, value) => {
    const newFormValues = { ...formValues };
    newFormValues[index] = value;
    setFormValues(newFormValues);
  };


  //UseEffect
  useEffect(()=>{
  onAuthStateChanged(auth, user=>{
  if(user){
  setUserID(user.uid);
  }
  else{
    navigate('/');
  }
  });
  },[navigate]);

  const add_customers =(event)=>{
    setButtonReg(true);
    event.preventDefault();
    const acountname = formValues.acountname?formValues.acountname:false;
    const acountlname = formValues.acountlname?formValues.acountlname:false;
    const email = formValues.email?formValues.email:false;
    const phone = formValues.phone?formValues.phone:false;
    const password = formValues.password?formValues.password:false;
    const pin = formValues.pin?formValues.pin:false;
    const userType = formValues.userType?formValues.userType:false;
    const Country = formValues.country?formValues.country:false;
    const commission = formValues.commission ? parseFloat(formValues.commission) : 0;
    const balance = formValues.balance ? parseFloat(formValues.balance) : 0;
if(acountname&&acountlname&&email&&password&&phone&&pin&&userType&&Country){
 createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
update(ref(db, "Client_Accounts/"+userCredential.user.uid), {
    acountname: acountname,
    acountlname: acountlname,
    useremail: userCredential.user.email?userCredential.user.email:email,
    mobilenumber: phone,
    userid: userCredential.user.uid,
    userType: userType,
    status: statusType==='true'?true:false,
    countryname: Country,
    pin: pin,
    creater: userID,
    accounnt_created: formattedDate,
    date: {date: month, day: day, hours: hours, minutes: minutes, seconds: seconds, month: month, year: year,  time: Date.now(), timezoneOffset : -360},
    balance: balance,
    commission: commission,
    falaxiload: 0,
    deviceid:"",
    devicelock: true,
    devicetoken: "",
})
.then(()=>{
    auth.signOut().then(() => {
        if(localStorage.getItem('AuthKey')){
            var AdminAuth =  atob(localStorage.getItem('AuthKey'));
            var AdminAuthJson= JSON.parse(AdminAuth);
            signInWithEmailAndPassword(auth, AdminAuthJson.email, AdminAuthJson.password)
            .then((userCredential) => {
                navigate('/user-list');
            })
            .catch((error) => {
                navigate('/dashboard');
            });
        }
        else{
            navigate('/dashboard');
        }  
      });
    
})
.catch((error) => {
console.log(error)
});
    })
    .catch((error) => {
  var errors = error.message.replace(/\(|\)|\/|Firebase:|Error|auth/g, '');
  setErrorMessage(errors);
  setButtonReg(false);
    })
        }

  }
  
  return (
    <Box className="mc-register">
    <Box className="mc-register-banner">
        <Image 
            className="mc-register-banner-pattern" 
            src={ data?.pattern.src } 
            alt={ data?.pattern.alt } 
        />
        <Box className="mc-register-banner-content">
            <Heading as="h2" className="mc-register-banner-title">{ data?.title.banner }</Heading>
            <Text as="p" className="mc-register-banner-descrip">{ data?.descrip }</Text>
            <Anchor 
                icon = { data?.anchor.icon } 
                text = { data?.anchor.text } 
                href = { data?.anchor.path }
                className = "mc-btn primary" 
            />
        </Box>
    </Box>
    <Form className="mc-register-form">
        <Logo 
            src = { data?.logo.src } 
            alt = { data?.logo.alt } 
            href = { data?.logo.path } 
            className = "mc-auth-logo"
        />
        <Heading as="h4" className="mc-auth-title">{ data?.title.from }</Heading>

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
                activeOption= {item.activeOption}
                option = { item.option }
                classes = { item.fieldSize }
                placeholder = { item.placeholder }
                passwordVisible = { item.passwordVisible }
                onChange={(e) => handleInputChange(item.fileID, e.target.value)}
            />
        ))}
        
        <Box className="mc-auth-checkbox" style={{textAlign: 'center'}}>
            <Input type="radio" name="checkbox" id="checkbox"  value={true} onChange={e=>setStatusType(e.target.value)} />
            <Label text='Active 'htmlFor="checkbox" />
            <Input type="radio" name="checkbox" value={false}  id="checkbox2" onChange={e=>setStatusType(e.target.value)} />
            <Label text='Daeactive' htmlFor="checkbox2" />
        </Box>
        <Button onClick={add_customers} 
        className={`mc-auth-btn ${data?.button.fieldSize}`} type={ data?.button.type } disabled={buttonReg}>
            {buttonReg?"Loding...": data?.button.text}</Button>
    </Form>
</Box>
  )
}

export default CustomerAdd