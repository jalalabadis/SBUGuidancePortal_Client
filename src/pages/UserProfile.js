import React, {useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {  Item,  Anchor } from "../components/elements";
import { Breadcrumb } from "../components";
import { CardLayout,  FloatCard, ActivityCard } from "../components/cards";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/userProfile.json";
import { useNavigate } from "react-router-dom";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';

export default function UserProfile() {
    const navigate=useNavigate();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [operatorname, setOperatorname]=useState("");
    const [PaymentStatust, setPaymentStatust]=useState("");

useEffect(()=>{

},[ navigate]);
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title="user profile">
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <Row>
                        {data?.float.map((item, index) => (
                            <Col md={2} lg={2} key={ index } onClick={e=>{
                            if(item.title==='All'){
                               setOperatorname("");
                               setPaymentStatust("");
                            }
                            else if(item.title==='Pending' ||item.title==='Canceled' ||item.title==='Complete'){
                            setPaymentStatust(item.digit);
                            }
                            else if(item.title==='Deposit' ||item.title==='Balance'){
                                setOperatorname(item.title);
                            }
                                }}>
                                <FloatCard 
                                    variant={ item.variant }
                                    title={ item.title }
                                    
                                />
                            </Col>
                        ))}
                        <Col xl={12}>
                            <ActivityCard 
                                style={{ height: "540px" }}
                                PaymentStatust = {PaymentStatust}
                                operatornames = {operatorname}
                                title={ data?.activity.title }
                                items={ data?.activity.items }
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </PageLayout>
    )
}