import React,{useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {Box,  Text, Item, Anchor,  Button, Heading} from "../components/elements";
import { formattedDate} from "../components/Timezone";
import { Row, Col } from "react-bootstrap";
import { LabelField } from "../components/fields";
import { CardLayout, CardHeader } from "../components/cards";
import Breadcrumb from "../components/Breadcrumb";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/commission.json";
import { getDatabase, onValue, ref, update } from "firebase/database";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';

export default function Commission() {
    const db = getDatabase();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [CommissionData, setCommissionData]=useState([]);
    const [Deposit, setDeposit]=useState(0);
    const [Bkash, setBkash]=useState(0);
    const [Nagad, setNagad]=useState(0);
    const [Rocket, setRocket]=useState(0);
    const [BankTransfer, setBankTransfer]=useState(0);
    const [USDWallet, setUSDWallet]=useState(0);
    const [Falaxiload, setFalaxiload]=useState(0);

    useEffect(()=>{
onValue(ref(db, 'Commissions'), snapshot=>{
    setCommissionData(snapshot.val());
setDeposit(snapshot.val()?.Deposit?snapshot.val()?.Deposit:0);
setBkash(snapshot.val()?.Bkash?snapshot.val()?.Bkash:0);
setNagad(snapshot.val()?.Nagad?snapshot.val()?.Nagad:0);
setRocket(snapshot.val()?.Rocket?snapshot.val()?.Rocket:0);
setBankTransfer(snapshot.val()?.BankTransfer?snapshot.val()?.DBankTransfer:0);
setUSDWallet(snapshot.val()?.USDWallet?snapshot.val()?.USDWallet:0);
setFalaxiload(snapshot.val()?.Falaxiload?snapshot.val()?.Falaxiload:0);
});
},[db]);

const handelUpdateCommission=()=>{
if(Deposit>=0&&Bkash>=0&&Nagad>=0&&Rocket>=0&&BankTransfer>=0&&USDWallet>=0&&Falaxiload>=0){
  update(ref(db, 'Commissions'), {
    datestemp: formattedDate,
    Deposit: parseFloat(Deposit),
    Bkash: parseFloat(Bkash),
    Nagad: parseFloat(Nagad),
    Rocket: parseFloat(Rocket),
    BankTransfer: parseFloat(BankTransfer),
    USDWallet: parseFloat(USDWallet),
    Falaxiload: parseFloat(Falaxiload)
  }); 
}
};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>
                <Col xl={12}>
            <CardLayout className="mb-4">
                <Breadcrumb title={ data?.pageTitle }>
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))}
                </Breadcrumb>
            </CardLayout>
            </Col>
         
            <Col xl={5}>
                    <CardLayout className="mb-4">
                        <CardHeader title="Update Commission"   />
                        <Row>
                            <Col xl={12}>
                     

                            <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="number" label="Deposit"
                                    value={Deposit}
                                    onChange={e=>setDeposit(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="number" label="Bkash" 
                                    value={Bkash}
                                    onChange={e=>setBkash(e.target.value)}
                                     fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="number" label="Nagad"
                                    value={Nagad}
                                    onChange={e=>setNagad(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="number" label="Rocket" 
                                    value={Rocket}
                                    onChange={e=>setRocket(e.target.value)}
                                     fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="number" label="Bank Transfer" 
                                    value={BankTransfer}
                                    onChange={e=>setBankTransfer(e.target.value)}
                                     fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="number" label="USD Wallet"
                                    value={USDWallet}
                                    onChange={e=>setUSDWallet(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="number" label="Falaxiload"
                                    value={Falaxiload}
                                    onChange={e=>setFalaxiload(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                            <Box className="mc-product-upload-organize mb-4">
                                    <Button className="mc-btn primary w-100 h-sm mt-4" onClick={handelUpdateCommission}>Submit</Button>
                                </Box>
                            </Col>
                        </Row>
                    </CardLayout>
                    </Col>


    <Col xl={7}>
 <CardLayout>
 <Box className="mc-card-header">
   <Heading as="h4" className="mc-card-title">all Commission</Heading> 
  <Anchor><Text as="small" className={'popupsd-rights'}>{CommissionData?.datestemp?CommissionData.datestemp:false}</Text></Anchor> 
</Box>
 <Row>  
<Form.Group className="form-group inline mb-4">
<Form.Label className="popupsd-lefts">Deposit </Form.Label>
<Form.Label className="popupsd-rights">{CommissionData?.Deposit?CommissionData.Deposit:0}%</Form.Label>
</Form.Group>
<Form.Group className="form-group inline mb-4">
<Form.Label className="popupsd-lefts">Bkash </Form.Label>
<Form.Label className="popupsd-rights">{CommissionData?.Bkash?CommissionData.Bkash:0}%</Form.Label>
</Form.Group>
<Form.Group className="form-group inline mb-4">
<Form.Label className="popupsd-lefts">Nagad </Form.Label>
<Form.Label className="popupsd-rights">{CommissionData?.Nagad?CommissionData.Nagad:0}%</Form.Label>
</Form.Group>
<Form.Group className="form-group inline mb-4">
<Form.Label className="popupsd-lefts">Rocket </Form.Label>
<Form.Label className="popupsd-rights">{CommissionData?.Rocket?CommissionData.Rocket:0}%</Form.Label>
</Form.Group>
<Form.Group className="form-group inline mb-4">
<Form.Label className="popupsd-lefts">Bank Transfer </Form.Label>
<Form.Label className="popupsd-rights">{CommissionData?.BankTransfer?CommissionData.BankTransfer:0}%</Form.Label>
</Form.Group>
<Form.Group className="form-group inline mb-4">
<Form.Label className="popupsd-lefts">USD Wallet </Form.Label>
<Form.Label className="popupsd-rights">{CommissionData?.USDWallet?CommissionData.USDWallet:0}%</Form.Label>
</Form.Group>
<Form.Group className="form-group inline mb-4">
<Form.Label className="popupsd-lefts">Falaxiload</Form.Label>
<Form.Label className="popupsd-rights">{CommissionData?.Falaxiload?CommissionData.Falaxiload:0}%</Form.Label>
</Form.Group>  
  </Row>
 </CardLayout>
</Col> </Row>
        </PageLayout>
    )
}