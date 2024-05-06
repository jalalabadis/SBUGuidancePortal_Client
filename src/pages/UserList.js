import React from "react";
import { Row, Col } from "react-bootstrap";
import { Anchor, Item } from "../components/elements";
import { CardLayout, CardHeader, FloatCard } from "../components/cards";
import { Breadcrumb, Pagination } from "../components";
import LabelField from "../components/fields/LabelField";
import UsersTable from "../components/tables/UsersTable";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/userList.json";
import { useState } from "react";
import { useEffect } from "react";
import {getDatabase, onValue, ref } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';

export default function UserList() {
    const db = getDatabase();
    const navigate=useNavigate();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [AlluserData, setAllUserData]=useState({AlluserData:[]});
    const [userFloat, setUserFloat]=useState({userFloat:[]});
    const [fillterValues, setFillterValues]=useState({
        "show_by": "100 row",
        "type_by": "All",
        "status_by": "All",
        "search_by": ""
    });



///Filter Input changes
const handleFillter_InputChange = (index, value) => {
    const newFormValues = { ...fillterValues };
    newFormValues[index] = value;
    setFillterValues(newFormValues);
  };

    
useEffect(()=>{
///AllUser Data Lod
onValue(ref(db, 'Client_Accounts'), snapshot=>{
if(snapshot.exists()){
    const records = [];
snapshot.forEach(childsnapshot=>{
   records.push(childsnapshot.val()); 
});
records.forEach(item=>{
item.role = item.userType==="user"?"Globle":'Agent';
item.action = {
    "edit": "edit",
    "view": "visibility",
    "block": "block"
};
item.created = item.accounnt_created;
item.email = item.useremail
});
const recordsFilter = records.filter(item=>item.userType?.toLowerCase().includes("user") || item.userType?.toLowerCase().includes("agent"));
setAllUserData({AlluserData: recordsFilter});

setUserFloat({userFloat: [{ "title": "Global", "digit": records.filter(item=>item.userType?.toLowerCase().includes("user")).length, "icon": "check_circle", "variant": "lg purple" }, 
{ "title": "All", "digit": recordsFilter.length, "icon": "check_circle", "variant": "lg green" },
{ "title": "Agent", "digit": records.filter(item=>item.userType?.toLowerCase().includes("agent")).length, "icon": "check_circle", "variant": "lg red" }]})
}
})
 },[db, navigate]);

 const table =    {"thead": ["User", "Type", "Status", "Balance", "created", "action"]};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ data?.pageTitle }>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                {userFloat.userFloat.map((item, index) => (
                    <Col xl={4} key={ index }>
                        <FloatCard 
                            variant={ item.variant }
                            digit={ item.digit }
                            title={ item.title }
                            icon={ item.icon }
                        />
                    </Col>
                ))}
                <Col xl={12}>
                    <CardLayout>
                        <CardHeader title={ data?.cardTitle } />
                        <Row xs={1} sm={4} className="mb-4">
                            {data?.filter.map((item, index)=> (
                                <Col key={index}>
                                    <LabelField 
                                        type = { item.type }
                                        label = { item.label }
                                        option = { item.option }
                                        placeholder = { item.placeholder }
                                        labelDir = "label-col"
                                        fieldSize = "w-100 h-sm"
                                        onChange={(e) => handleFillter_InputChange(item.fileID, e.target.value)}
                                    /> 
                                </Col>
                            ))}
                        </Row>
                        {AlluserData.AlluserData.length!==0?
                        <UsersTable 
                            thead = { table.thead}
                            tbody = { AlluserData.AlluserData }
                            fillterValues = { fillterValues }
                        />
                        :
                        <></>
}
                        <Pagination
                        item1={fillterValues.show_by.replace('row', '')}
                        item2={AlluserData.AlluserData.length}
                        />
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}