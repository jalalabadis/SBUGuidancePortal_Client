import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Row, Col, Form } from "react-bootstrap";
import { Box,  Item, Anchor, Button} from "../components/elements";
import { LabelField } from "../components/fields";
import { Breadcrumb, DivideTitle } from "../components";
import CardLayout from "../components/cards/CardLayout";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/settings.json";
import { getDatabase, onValue, ref, update } from "firebase/database";
import { encrypt, decrypt } from "../supports/CriptoEncript";
import { useNavigate } from "react-router-dom";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';

export default function Settings() {
    const db = getDatabase();
    const navigate = useNavigate();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [ApiBlance, setApiBlance]=useState(0);
    const [TopupMethod, setTopupMethod]=useState();
    const [ApiUsername, setApiUsername]=useState('');
    const [ApiKey, setApiKey]=useState('');
    const [ApiUrl, setApiUrl]=useState('');
useEffect(()=>{
//TopupMethod
onValue(ref(db, 'TopupMethod'), snapshot=>{
    if(snapshot.exists()){
        setTopupMethod(snapshot.val().type);
    }
});

//API DATA
onValue(ref(db, 'AppSetting'), snapshot=>{
    if(snapshot.exists()){
setApiUsername(decrypt(snapshot.val().username));
setApiKey(decrypt(snapshot.val().key));
setApiUrl(decrypt(snapshot.val().url));
axios.post('https://irechargebd.com/api/balance', {
    "user" : decrypt(snapshot.val().username),
    "api_key" : decrypt(snapshot.val().key)
})
  .then(result=>{
    setApiBlance(result.data.balance)
});
    }
});
},[db, navigate]);

const handelTopupMethod =()=>{
update(ref(db, 'TopupMethod'), {
    type: TopupMethod==='api'?'manual':'api'
});
};

const updateApiData=()=>{
update(ref(db, "AppSetting"), {
key: encrypt(ApiKey),
url: encrypt(ApiUrl),
username:encrypt(ApiUsername)
});
};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <CardLayout className="mb-4">
                <Breadcrumb title={ data?.pageTitle }>
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))}
                </Breadcrumb>
            </CardLayout>
            <CardLayout className="p-sm-5">
                <Box className="mb-5">
                    <DivideTitle title="Api informations" className="mb-4" />
                    <Row>
                        <Col xl={12} className="ps-xl-5">
                            <Row>
                                <Col xl={12}>
                                <Form.Group className="form-group inline mb-4">
<Form.Label className="popupsd-lefts"> {"Balance: "+ApiBlance} ৳</Form.Label>
</Form.Group>
                                </Col>
                                <Col xl={12}><LabelField label="Api Username" type="text"
                                value={ApiUsername}
                                onChange={e=>setApiUsername(e.target.value)}
                                fieldSize="w-100 h-md" /></Col>
                                <Col xl={12}><LabelField label="Api Key" type="text"
                                 value={ApiKey}
                                 onChange={e=>setApiKey(e.target.value)}
                                 fieldSize="w-100 h-md" /></Col>
                                <Col xl={12}><LabelField label="Api Url" 
                                 value={ApiUrl}
                                 onChange={e=>setApiUrl(e.target.value)}
                                type="text" fieldSize="w-100 h-md" /></Col>

                        <div className="d-flex">
                        {TopupMethod?
                        <>
                        <Form.Check type="radio" name="checkbox4" className="me-3" label="Manual"
                        onClick={handelTopupMethod}
                        defaultChecked={TopupMethod==='manual'?true:false}/>
                        <Form.Check type="radio" name="checkbox4" className="mb-3" label="API"
                        onClick={handelTopupMethod}  
                        defaultChecked={TopupMethod==='api'?true:false} />
                        </>:
                          <></>}
                        </div>
                        <Button className="mc-btn primary" icon="verified" onClick={updateApiData} text="Update API Data" />
                            </Row>
                        </Col>
                    </Row>
                </Box>
             
               
            </CardLayout>
        </PageLayout>
    )
}