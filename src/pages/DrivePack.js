import React from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Input, Label, Icon, Text, Image, List, Item } from "../components/elements"; 
import {day,  month, year, hours, minutes, seconds, formattedDate} from "../components/Timezone";
import { LabelField } from "../components/fields";
import { CardLayout, CardHeader } from "../components/cards";
import Breadcrumb from "../components/Breadcrumb";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/productUpload.json";
import {useEffect, useState } from "react";
import {getStorage, ref as ref_storage, uploadBytes, getDownloadURL} from  "firebase/storage";
import { getDatabase, onValue, push, ref, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';

function DrivePack() {
    const db = getDatabase();
    const storage = getStorage();
    const navigate=useNavigate();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [DrivePackData, setDrivePackData]= useState({DrivePackData:[]});
    const [uploadFile, setUploadFile] = useState('image upload');
    const [DrivePackType, setDrivePackType]= useState('Add DrivePack');
    const [DrivePackID, setDrivePackID]=useState(null);
    const [Operatorname, setOperatorname]=useState();
    const [TitleName, setTitleName]=useState('');
    const [Discription, setDiscription]=useState('');
    const [Amount, setAmount]=useState('');
    const [DrivePackimage, setDrivePackimage]=useState(null);


    useEffect(()=>{
//All_DrivePack Load
onValue(ref(db, 'All_DrivePack'), snapshot=>{
    const records = [];
    snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
    });
setDrivePackData({DrivePackData: records})
});
    },[db, navigate]);
const uploadBangImgaeFile=(e)=>{
setUploadFile(e.target.files[0].name);
const storageRef = ref_storage(storage, 'uploads/'+Date.now());
uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
  getDownloadURL(storageRef).then((url) => {
setDrivePackimage(url);
  })
});
};
const submitbank=()=>{
if(TitleName&&Discription&&Amount&&DrivePackimage){
const newIdRef = push(ref(db)).key;
const DrivePackPath = DrivePackID?DrivePackID:newIdRef;
  update(ref(db, 'All_DrivePack/'+DrivePackPath), {
    amount: parseFloat(Amount),
    branchname: "",
    categoryid: "",
    createddate: formattedDate,
    date: {date: month, day: day, hours: hours, minutes: minutes, seconds: seconds, month: month, year: year,  time: Date.now(), timezoneOffset : -360},
    discription: Discription,
    downloadlink: "",
    fullname: "",
    operatorname: Operatorname,
    optionalfiled: "",
    password: "",
    paymenttype: "drivepack",
    productimageurl: DrivePackimage,
    pushid: DrivePackPath,
    requesttype: "mainbalance",
    status: "completed",
    title: TitleName,
    transecbdid: "",
    transecnumber: "",
    transectionid: "",
    useremail: "",
    userid: "",
    username: ""
  }).then(()=>{
    setDrivePackType('Add DrivePack');
        setDrivePackID(null);
        setTitleName('');
        setDiscription('');
        setAmount('');
        setOperatorname('');
        setDrivePackimage(null);
        setUploadFile('image uploa');
  });  
}};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ "DrivePack" }>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={7}>
                    <CardLayout>
                        <CardHeader title="DrivePack List"   />
                  <Row>
        
     <List className="mc-notify-list">
        {DrivePackData.DrivePackData.map((item, index)=>{
            return(

        <Item className="mc-notify-item" key={ index }>
        <Box className="mc-notify-media">
     <Image src={item.productimageurl} alt={ 'avatar' } />
      </Box>
      <Box className="mc-notify-meta statefonteser-hkj">
      <Text as="small"><Text as="b">Title:</Text> {item.title}</Text>
      <Text as="small"> <Text as="b">Amount:</Text> {item.amount}৳</Text>
      <Text as="small"><Text as="b">Network:</Text> {item.operatorname}</Text>
       </Box>
    <div className="col-4 d-flex justify-content-end">
   <div className="mc-table-action">
    <button className="material-icons edit" title="Edit" 
    onClick={e=>{
        setDrivePackType('Edit DrivePack');
        setDrivePackID(item.pushid);
        setTitleName(item.title);
        setDiscription(item.discription);
        setAmount(item.amount);
        setOperatorname(item.operatorname);
        setDrivePackimage(item.productimageurl);
        setUploadFile(item.operatorname);
    }}
    >edit</button>
    <button type="button" onClick={e=>{
        remove(ref(db, 'All_DrivePack/'+item.pushid))
    }} className="material-icons delete">delete</button></div>
      </div>
       </Item>
        )
    })}
    </List>
                  </Row>
                    </CardLayout>
                </Col>
                <Col xl={5}>
                    <CardLayout className="mb-4">
                        <CardHeader title={DrivePackType}  />
                        <Row>
                            <Col xl={12}>
                            <Box className="mc-product-upload-organize mb-4">
                                    <LabelField label="Select Your Operater" 
                                    option={['Grameen', 'Airtel', 'Robi', 'Banglalink', 'Teletalk']}
                                    value={Operatorname}
                                    onChange={e=>setOperatorname(e.target.value)} fieldSize="w-100 h-sm" />
                                    
                                </Box>

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
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Amount"
                                    value={Amount}
                                    onChange={e=>setAmount(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                
                                <Box className="mc-product-upload-file">
                                <Input type="file" id="product" onChange={uploadBangImgaeFile} />
                                <Label htmlFor="product">{DrivePackimage?<img src={DrivePackimage} width={'85px'} alt="" />:<Icon type="collections" />}
                                <Text>{ uploadFile }</Text></Label>
                            </Box>

                            <Box className="mc-product-upload-organize mb-4">
                                    <Button className="mc-btn primary w-100 h-sm mt-4" onClick={submitbank}>Submit</Button>
                                </Box>
                            </Col>
                        </Row>
                    </CardLayout>
          
                </Col>
            </Row>
        </PageLayout>
    )
}

export default DrivePack