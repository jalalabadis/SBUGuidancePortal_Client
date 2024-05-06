import React from "react";
import { Row, Col } from "react-bootstrap";
import { Box, Anchor, Button, Input, Label, Icon, Text } from "../components/elements"; 
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



function Category() {
    const db = getDatabase();
    const storage = getStorage();
    const navigate=useNavigate();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [CategoryData, setCategoryData]= useState({CategoryData:[]});
    const [uploadFile, setUploadFile] = useState('image upload');
    const [CategoriesName, setCategoriesName]=useState('');
    const [CategoryImage, setCategoryImage]=useState(null);


    useEffect(()=>{
///Catagory Data Lod
onValue(ref(db, 'Categories'), snapshot=>{
    const records = [];
    snapshot.forEach(childsnapshot=>{
records.push(childsnapshot.val());
    });
setCategoryData({CategoryData: records})
});
    },[db, navigate]);
const uploadImgaeFile=(e)=>{
setUploadFile(e.target.files[0].name);
const storageRef = ref_storage(storage, 'Category/'+Date.now());
uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
  getDownloadURL(storageRef).then((url) => {
setCategoryImage(url);
  })
});
};
const addCategoryhandel=()=>{
const newIdRef = push(ref(db)).key;
  update(ref(db, 'Categories/'+newIdRef), {
    title: CategoriesName,
    imageurl: CategoryImage,
    pushid: newIdRef
  }).then(()=>{
       setCategoriesName('');
        setCategoryImage(null);
        setUploadFile('image uploa');
  });  
};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ "Category" }>
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
                        <CardHeader title="Categories"  />
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
        remove(ref(db, 'Categories/'+item.pushid))
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
                        <CardHeader title={"Add Categorie"}   />
                        <Row>
                            <Col xl={12}>
                                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField type="text" label="Category Name" 
                                    value={CategoriesName}
                                    onChange={e=>setCategoriesName(e.target.value)} fieldSize="w-100 h-sm" />
                                    
                                </Box>
                              
                                <Box className="mc-product-upload-file">
                                <Input type="file" id="product" onChange={uploadImgaeFile} />
                                <Label htmlFor="product">{CategoryImage?<img src={CategoryImage} width={'85px'} alt="" />:<Icon type="collections" />}
                                <Text>{ uploadFile }</Text></Label>
                            </Box>

                            <Box className="mc-product-upload-organize mb-4">
                                    <Button className="mc-btn primary w-100 h-sm mt-4" onClick={addCategoryhandel}>Add Category</Button>
                                </Box>
                            </Col>
                        </Row>
                    </CardLayout>
          
                </Col>
            </Row>
        </PageLayout>
    )
}

export default Category