import React from "react";
import { Row, Col } from "react-bootstrap";
import {day,  month, year, hours, minutes, seconds} from "../components/Timezone";
import { Box, Anchor, Button, Input, Label, Icon, Text } from "../components/elements"; 
import { LabelField } from "../components/fields";
import { CardLayout, CardHeader } from "../components/cards";
import Breadcrumb from "../components/Breadcrumb";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/productUpload.json";
import {useEffect, useState } from "react";
import {getStorage, ref as ref_storage, uploadBytes, getDownloadURL} from  "firebase/storage";
import {  getDatabase, onValue, push, ref, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';


function Wallet() {
    const db = getDatabase();
    const storage = getStorage();
    const navigate=useNavigate();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [WalletData, setWalletData]= useState({WalletData:[]});
    const [uploadFile, setUploadFile] = useState('image upload');
    const [walletType, setWalletType]= useState('Add Wallet');
    const [WalletID, setWalletID]=useState(null);
    const [AccountType, setAccountType]=useState('');
    const [Account, setAccount]=useState('');
    const [Name, setName]=useState('');
    const [Bankimage, setBankimage]=useState(null);


useEffect(()=>{
//All Wallet Data Load
onValue(ref(db, 'DepositBd'), snapshot=>{
    const records = [];
    snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
    });
setWalletData({WalletData: records})
});
    },[db, navigate]);
const uploadBangImgaeFile=(e)=>{
setUploadFile(e.target.files[0].name);
const storageRef = ref_storage(storage, 'BanksImages/'+Date.now());
uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
  getDownloadURL(storageRef).then((url) => {
setBankimage(url);
  })
});
};
const submitbank=()=>{
if(AccountType&&Account&&Bankimage){
const newIdRef = push(ref(db)).key;
const WalletPath = WalletID?WalletID:newIdRef;
  update(ref(db, 'DepositBd/'+WalletPath), {
    account_name: AccountType,
    account_number: Account,
    country_name: Name,
    bankimage: Bankimage,
    date: {date: month, day: day, hours: hours, minutes: minutes, seconds: seconds, month: month, year: year,  time: Date.now(), timezoneOffset : -360},
    gatewayid: WalletPath
  }).then(()=>{
    setWalletType('Add Wallet');
        setWalletID(null);
        setAccountType('');
        setAccount('');
        setName('');
        setBankimage(null);
        setUploadFile('image uploa');
  });
}
else{
    
}  
};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ "Wallet" }>
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
                        <CardHeader title="Wallet List"  />
                  <Row>
        {WalletData.WalletData.map((item, index)=>{
            return(

        
        <div className="card" key={index}>
        <div className="row align-items-center">
       
        <div className="col-3 col-md-2 d-flex">
        <img className="card-img" src={item.bankimage} alt="card-img" />
       
        </div>
      
      <div className="col-6 col-md-6">
      <div className="card-date" style={{textAlign: 'left'}}> 
      <span>{item.account_name}</span><br/> 
      {item.account_number}
       </div>
      </div>
     
      <div className="col-3 col-md-4 d-flex justify-content-end">
   <div className="mc-table-action">
    <button className="material-icons edit" title="Edit" 
    onClick={e=>{
        setWalletType('Edit Wallet');
        setWalletID(item.gatewayid);
        setAccountType(item.account_name);
        setAccount(item.account_number);
        setName(item.country_name);
        setBankimage(item.bankimage);
        setUploadFile(item.account_name);
    }}
    >edit</button>
    <button type="button" onClick={e=>{
        remove(ref(db, 'DepositBd/'+item.gatewayid))
    }} className="material-icons delete">delete</button></div>
      </div>
      </div>
    </div>
        )
    })}
                  </Row>
                    </CardLayout>
                </Col>
                <Col xl={5}>
                    <CardLayout className="mb-4">
                        <CardHeader title={walletType}   />
                        <Row>
                            <Col xl={12}>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Accout Type" 
                                    value={AccountType}
                                    onChange={e=>setAccountType(e.target.value)} fieldSize="w-100 h-sm" />
                                    
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Account" 
                                    value={Account}
                                    onChange={e=>setAccount(e.target.value)}
                                     fieldSize="w-100 h-sm" />
                                    
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Name"
                                    value={Name}
                                    onChange={e=>setName(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                
                                <Box className="mc-product-upload-file">
                                <Input type="file" id="product" onChange={uploadBangImgaeFile} />
                                <Label htmlFor="product">{Bankimage?<img src={Bankimage} width={'85px'} alt="" />:<Icon type="collections" />}
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

export default Wallet