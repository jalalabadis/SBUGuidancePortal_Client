import React from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Input, Label, Icon, Text } from "../components/elements"; 
import { CardLayout, CardHeader } from "../components/cards";
import Breadcrumb from "../components/Breadcrumb";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/productUpload.json";
import {useEffect, useState } from "react";
import {getStorage, ref as ref_storage, uploadBytes, getDownloadURL} from  "firebase/storage";
import { getDatabase, onValue, push, ref, remove, update } from "firebase/database";
import { useNavigate } from "react-router-dom";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';



function Banner() {
    const db = getDatabase();
    const storage = getStorage();
    const navigate=useNavigate();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [BannerData, setBannerData]= useState({BannerData:[]});
    const [uploadFile, setUploadFile] = useState('image upload');
    const [BannerImage, setBannerImage]=useState(null);


    useEffect(()=>{
///Catagory Data Lod
onValue(ref(db, 'Images'), snapshot=>{
    const records = [];
    snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
    });
setBannerData({BannerData: records})
});
    },[db, navigate]);
const uploadImgaeFile=(e)=>{
setUploadFile(e.target.files[0].name);
const storageRef = ref_storage(storage, 'uploads/'+Date.now());
uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
  getDownloadURL(storageRef).then((url) => {
setBannerImage(url);
  })
});
};
const addBannerhandel=()=>{
if(BannerImage){
const newIdRef = push(ref(db)).key;
  update(ref(db, 'Images/'+newIdRef), {
    imageurl: BannerImage,
    pushid: newIdRef
  }).then(()=>{
        setBannerImage(null);
        setUploadFile('image uploa');
  }); 
}
};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ "Banner" }>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>

                <Col xl={5}>
                    <CardLayout className="mb-4">
                        <CardHeader title={"Add Banner"}   />
                        <Row>
                            <Col xl={12}>
                              
                                <Box className="mc-product-upload-file">
                                <Input type="file" id="product" onChange={uploadImgaeFile} />
                                <Label htmlFor="product">{BannerImage?<img src={BannerImage} width={'85px'} alt="" />:<Icon type="collections" />}
                                <Text>{ uploadFile }</Text></Label>
                            </Box>

                            <Box className="mc-product-upload-organize mb-4">
                                    <Button className="mc-btn primary w-100 h-sm mt-4" onClick={addBannerhandel}>Add Banner</Button>
                                </Box>
                            </Col>
                        </Row>
                    </CardLayout>
          
                </Col>


                <Col xl={7}>
                    <CardLayout>
                        <CardHeader title="Banners"  />
    <Row>
        {BannerData.BannerData.map((item, index)=>{
            return(
        <div className="card" key={index}>
        <div className="row align-items-center">
       

        <div className="col-12 d-flex position-relative">
        <img className="card-full-img mb-1" src={item.imageurl} alt="card-img" />
        <div className="mc-table-action deletebuttonsd-full-imghk">
    <button type="button" onClick={e=>{
        remove(ref(db, 'Images/'+item.pushid))
    }} className="material-icons delete">delete</button></div>
        </div>
      </div>
    </div>
        )
    })}
  </Row>
                    </CardLayout>
                </Col>
           
            </Row>
        </PageLayout>
    )
}

export default Banner