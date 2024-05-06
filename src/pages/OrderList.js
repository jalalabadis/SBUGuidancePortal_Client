import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Item, Anchor } from "../components/elements";
import { CardLayout } from "../components/cards";
import { Breadcrumb, Pagination } from "../components";
import OrdersTable from "../components/tables/OrdersTable";
import LabelField from "../components/fields/LabelField";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/orderList.json";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';
import { child, get, getDatabase, ref } from "firebase/database";

export default function OrderList() {
    const db = getDatabase();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [pendingPaymentData, setPendingPaymentData]=useState([]);
    const [fillterValues, setFillterValues]=useState({
        "show_by": "100 row",
        "type_by": "All",
        "status_by": "pending",
        "search_by": ""
    });



///Filter Input changes
const handleFillter_InputChange = (index, value) => {
    const newFormValues = { ...fillterValues };
    newFormValues[index] = value;
    setFillterValues(newFormValues);
  };


////Panding Payment data
useEffect(() => {
  const usersRef = ref(db, 'Client_Accounts');
  const filterPaymentData = PaymentData.filter(item => item.status?.toLowerCase().includes('pending'));
  const promises = filterPaymentData.map((post) => {
    const userId = post.userid;
    const agentID = post.agentid;
const userPromise = userId ? get(child(usersRef, `${userId}`)).catch(() => "") : Promise.resolve("");
const agentPromise = agentID ? get(child(usersRef, `${agentID}`)).catch(() => "") : Promise.resolve("");
    return Promise.all([userPromise, agentPromise]).then(([userSnapshot, agentSnapshot]) => {
      const user = userSnapshot!==""?userSnapshot.val():null;
      const agent = agentSnapshot!==""?agentSnapshot.val():null;
      post.user = user;
      post.agent = agent;
      return post;
    });
  });

   // Wait for all promises to resolve
   Promise.all(promises).then((OrderWithUserData) => {
   setPendingPaymentData(OrderWithUserData);
  });
}, [db, PaymentData]);



 const table =    {"thead": ["Email", "Type", "Status", "Balance", "User balance", "Payment Type", "Agent", "Phone", "action"]};
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
                <Col xl={12}>
                    <CardLayout>
                        <Row xs={1} sm={3} className="mb-4">
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
                        {PaymentData?
                        <OrdersTable 
                            thead = { table.thead}
                            tbody = { pendingPaymentData }
                            fillterValues = { fillterValues }
                        />
                        :
                        <></>
}
                        <Pagination
                        item1={fillterValues.show_by.replace('row', '')}
                        item2={PaymentData?.length}
                        />
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}