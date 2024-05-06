import React from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Input, Label, Icon, Text, Heading } from "../components/elements"; 
import {day,  month, year, hours, minutes, seconds, formattedDate} from "../components/Timezone";
import { encrypt, decrypt } from "../supports/CriptoEncript";
import { LabelField } from "../components/fields";
import { CardLayout, CardHeader, FloatCard } from "../components/cards";
import Breadcrumb from "../components/Breadcrumb";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/productUpload.json";
import {useEffect, useState } from "react";
import {getStorage, ref as ref_storage, uploadBytes, getDownloadURL} from  "firebase/storage";
import {  getDatabase, onValue, push, ref, remove, update } from "firebase/database";
import { Anchor2 } from "../components/elements/Anchor";
import { useNavigate } from "react-router-dom";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';



function Products() {
    const db = getDatabase();
    const storage = getStorage();
    const navigate=useNavigate();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [CategoryData, setCategoryData]= useState({CategoryData:[]});
    const [ProductData, setProductData]= useState({ProductData:[]});
    const [uploadFile, setUploadFile] = useState('image upload');
    const [selectCategoryData, setselectCategoryData]=useState(null);
    const [TitleName, setTitleName]=useState('');
    const [Discription, setDiscription]=useState('');
    const [Username, setUsername]=useState('');
    const [Password, setPassword]=useState('');
    const [Amount, setAmount]=useState(0);
    const [DownloadLink, setDownloadLink]=useState('');
    const [ProductImage, setProductImage]=useState(null);
    const [ProductTypes, setProductTypes]=useState('All');


    useEffect(()=>{
///Lod category Data
onValue(ref(db, 'Categories'), snapshot=>{
    const records = [];
    snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
    });
setCategoryData({CategoryData: records})
});

///Lod Product Data After Select Category
if(selectCategoryData){
    onValue(ref(db, 'All_Products/'+selectCategoryData.pushid), snapshot=>{
        const records = [];
        snapshot.forEach(childsnapshot=>{
    records.push(childsnapshot.val());
        });
    records.forEach(item=>{
      item.username = decrypt(item.username);
      item.password = decrypt(item.password);  
    })
    setProductData({ProductData: records})
    });      
}
    },[db, selectCategoryData, navigate, ProductTypes]);
const uploadImgaeFile=(e)=>{
setUploadFile(e.target.files[0].name);
const storageRef = ref_storage(storage, 'Products/'+Date.now());
uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
  getDownloadURL(storageRef).then((url) => {
setProductImage(url);
  })
});
};
const addProducthandel=()=>{
if(TitleName&&Discription&&Username&&Password&&DownloadLink&&ProductImage){
const newIdRef = push(ref(db)).key;
  update(ref(db, 'All_Products/'+selectCategoryData.pushid+'/'+newIdRef), {
    amount: parseFloat(Amount),
    branchname: "",
    categoryid: selectCategoryData.pushid,
    createddate: formattedDate,
    date: {date: month, day: day, hours: hours, minutes: minutes, seconds: seconds, month: month, year: year,  time: Date.now(), timezoneOffset : -360},
    discription: Discription,
    downloadlink: DownloadLink,
    fullname: "",
    operatorname: "product",
    optionalfiled: "",
    password: encrypt(Password),
    paymenttype: "product",
    productimageurl: ProductImage,
    pushid: newIdRef,
    requesttype: "mainbalance",
   status:"completed",
   title: TitleName,
  transecbdid:"",
  transecnumber:"",
  transectionid:"",
  useremail:"",
  userid: "",
  username: encrypt(Username)

  }).then(()=>{
       setAmount(0);
       setDiscription('');
       setDownloadLink('');
       setPassword('');
       setTitleName('');
       setUsername('');
        setProductImage(null);
        setUploadFile('image uploa');
  }); 
} 
};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>

            <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ "Product's" }>
                            {data?.breadcrumb.map((item, index) => (
                                <li key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                                </li>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
    
    {selectCategoryData?
<>

 <Col xl={7}>
                    <CardLayout>
    
<Box className="mc-card-header">
   <Heading as="h4" className="mc-card-title">{selectCategoryData.title+" Product's"}</Heading> 
  <Anchor onClick={e=>setselectCategoryData(null)}><Icon>close</Icon></Anchor> 
</Box>
 <Row>
 <Col xs={4} md={3} lg={3}
 onClick={e=>setProductTypes('All')}
 >
 <FloatCard 
variant={ 'sm blue' }
title={ 'All' }
/>
 </Col>
 <Col xs={4}  md={3} lg={3}
 onClick={e=>setProductTypes('Active')}
 >
 <FloatCard 
variant={ 'sm green' }
title={ 'Active' }
/>
 </Col>
 <Col xs={4}  md={3} lg={3}
 onClick={e=>setProductTypes('Deactive')}
 >
 <FloatCard 
variant={ 'sm yellow' }
title={ 'Deactive' }
/>
 </Col>
 </Row>
<br/>
<Row>
        {ProductData.ProductData.filter(item=>
        ProductTypes==='Active'?item.userid!=="":
        ProductTypes==='Deactive'?item.userid==="":
            true).map((item, index)=>{
            return(

        
        <div className="card" key={index}>
        <div className="row align-items-center mb-2">
       
        <div className="col-3 col-md-2 d-flex">
        <img className="card-img" src={item.productimageurl} alt="card-img" />
       
        </div>
      
      <div className="col-6 col-md-6">
      <div className="card-date" style={{textAlign: 'left'}}> 
      <Text as="small"><Text as="b">Brand:</Text> {item.title}</Text>
       <br/>
       <Text as="small"><Text as="b">User:</Text> {item.username} </Text>
      <br/>
      <Text as="small"><Text as="b">Pass:</Text> {item.password}</Text>
       <br/>
      <Text as="small"><Text as="b">App:</Text> <Anchor2 to={item.downloadlink} target="_blank">download</Anchor2></Text>
       </div>
      </div>
     
      <div className="col-3 col-md-4 d-flex justify-content-end">
   <div className="mc-table-action">
   <button type="button" onClick={e=>{
       remove(ref(db, 'All_Products/'+selectCategoryData.pushid+'/'+item.pushid))
    }} className="material-icons delete">delete</button>
 </div>
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
                        <CardHeader title={"Add Product"}   />
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
                                    onChange={e=>setDiscription(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Username" 
                                    value={Username}
                                    onChange={e=>setUsername(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Password" 
                                    value={Password}
                                    onChange={e=>setPassword(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Amount" 
                                    value={Amount}
                                    onChange={e=>setAmount(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Download Link" 
                                    value={DownloadLink}
                                    onChange={e=>setDownloadLink(e.target.value)} fieldSize="w-100 h-sm" />
                                </Box>
                                <Box className="mc-product-upload-file">
                                <Input type="file" id="product" onChange={uploadImgaeFile} />
                                <Label htmlFor="product">{ProductImage?<img src={ProductImage} width={'85px'} alt="" />:<Icon type="collections" />}
                                <Text>{ uploadFile }</Text></Label>
                            </Box>

                            <Box className="mc-product-upload-organize mb-4">
                                    <Button className="mc-btn primary w-100 h-sm mt-4" onClick={addProducthandel}>Add Product</Button>
                                </Box>
                            </Col>
                        </Row>
                    </CardLayout>
          
                </Col>
</>

:
<>
           
<Col xl={12}>
      <CardLayout>
   <CardHeader title="Select Categorie"   />
                  <Row>
        {CategoryData.CategoryData.map((item, index)=>{
            return(

        
        <div className="card" key={index}>
        <div className="row align-items-center">
       
        <div className="col-3 col-md-2 d-flex">
        <img className="card-img" src={item.imageurl} alt="card-img" />
       
        </div>
      
      <div className="col-6 col-md-6">
      <div className="card-date" style={{textAlign: 'left'}}> 
      <span>{item.title}</span>
       </div>
      </div>
     
      <div className="col-3 col-md-4 d-flex justify-content-end">
   <div className="mc-table-action">
   <button type="button" onClick={e=>{
       setselectCategoryData(item);
    }} className="material-icons download">add</button>
 </div>
      </div>
      </div>
    </div>
        )
    })}
                  </Row>
                    </CardLayout>
                </Col>
</>
}
               
            </Row>
        </PageLayout>
    )
}

export default Products