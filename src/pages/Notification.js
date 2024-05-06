import React,{useState } from "react";
import {Box, Icon, Text, Item, Anchor, Input, Label, Button } from "../components/elements";
import {day,  month, year, hours, minutes, seconds, formattedDate} from "../components/Timezone";
import { Row, Col } from "react-bootstrap";
import { LabelField } from "../components/fields";
import { CardLayout, CardHeader } from "../components/cards";
import Breadcrumb from "../components/Breadcrumb";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/notification.json";
import {getStorage, ref as ref_storage, uploadBytes, getDownloadURL} from  "firebase/storage";
import { getDatabase, push, ref, remove, update } from "firebase/database";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';

export default function Notification() {
    const db = getDatabase();
    const storage = getStorage();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [uploadFile, setUploadFile] = useState('image upload');
    const [TitleName, setTitleName]=useState('');
    const [Discription, setDiscription]=useState('');
    const [NotifyImg, setNotifyImg]=useState(null);

const uploadBangImgaeFile=(e)=>{
setUploadFile(e.target.files[0].name);
const storageRef = ref_storage(storage, 'uploads/'+Date.now());
uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
  getDownloadURL(storageRef).then((url) => {
setNotifyImg(url);
  })
});
};
const handelAddNotify=()=>{
if(TitleName&&Discription&&NotifyImg){
const newIdRef = push(ref(db)).key;
  update(ref(db, 'AllNotifications/'+newIdRef), {
    datestemp: formattedDate,
    date: {date: month, day: day, hours: hours, minutes: minutes, seconds: seconds, month: month, year: year,  time: Date.now(), timezoneOffset : -360},
    discription: Discription,
    image: NotifyImg,
    pushid: newIdRef,
    title: TitleName,
  }).then(()=>{
        setTitleName('');
        setDiscription('');
        setNotifyImg(null);
        setUploadFile('image uploa');
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
                        <CardHeader title="Add Notification"   />
                        <Row>
                            <Col xl={12}>
                     

                            <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Title Name"
                                    value={TitleName}
                                    onChange={e=>setTitleName(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Discription" 
                                    value={Discription}
                                    onChange={e=>setDiscription(e.target.value)}
                                     fieldSize="w-100 h-sm" />
                                    
                                </Box>
                             
                                
                                <Box className="mc-product-upload-file">
                                <Input type="file" id="product" onChange={uploadBangImgaeFile} />
                                <Label htmlFor="product">{NotifyImg?<img src={NotifyImg} width={'85px'} alt="" />:<Icon type="collections" />}
                                <Text>{ uploadFile }</Text></Label>
                            </Box>

                            <Box className="mc-product-upload-organize mb-4">
                                    <Button className="mc-btn primary w-100 h-sm mt-4" onClick={handelAddNotify}>Submit</Button>
                                </Box>
                            </Col>
                        </Row>
                    </CardLayout>
                    </Col>


    <Col xl={7}>
 <CardLayout>
 <CardHeader title="all notification"  />
 <Row>
        {Notification.map((item, index)=>{
            return(
        <div className="card" key={index}>
        <div className="row align-items-center mb-2">
       
        <div className="col-12 d-flex position-relative">
        <img className="card-full-img" src={item.image} alt="card-img" />
        <div className="mc-table-action deletebuttonsd-full-imghk">
    <button type="button" onClick={e=>{
       remove(ref(db, "AllNotifications/"+item.pushid))
    }} className="material-icons delete">delete</button></div>
        </div>

<div className="col-12 ">

<Text as="span" className={'d-flex justify-content-left'}>
    <Text as="b">{ item.title }</Text>
    <Text as="small" className={'popupsd-rights'}>{ item.datestemp}</Text>
    </Text> 
    <div className={'d-flex justify-content-left'}>
    <Text as="small" className={'text-center'}>{ item.discription}</Text>
    </div>

 </div>
      </div>
    </div>
        )
    })}
  </Row>
 </CardLayout>
</Col> </Row>
        </PageLayout>
    )
}