import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button,  Text, Box,  Input, Label} from "../elements";
import LabelField from "../fields/LabelField";
import Cookies  from 'js-cookie';
import axios from "axios";
import { toast } from "react-toastify";
import LabelTextarea from "../fields/LabelTextarea";

export default function AnnouncementTable({ thead, tbody, fillterValues, updatedannouncementData }) {
    const [data, setData] = useState([]);
    const [ProductData, setProductData] = React.useState("");
    const [viewModal, setViewModal] = React.useState(false);
    const [AnnouncementImageShow, setAnnouncementImageShow]=useState(null);
    const [AnnouncementImage, setAnnouncementImage]=useState(null);
    const uploadFile = 'image upload';

    useEffect(()=> {
        setData(tbody); 
    }, [tbody]);
///Input changes
const handleInputChange = (index, value) => {
    const newFormValues = { ...ProductData };
    newFormValues[index] = value;
    setProductData(newFormValues);
  };
      ////Edit Annoucment
      const uploadImgaeFile=(e)=>{
        setAnnouncementImage(e.target.files[0]);
        if (e.target.files[0]) {
          const reader = new FileReader();
          reader.onload = () => {
            setAnnouncementImageShow(reader.result);
          }
          reader.readAsDataURL(e.target.files[0]);
        }
        };
const updateeventsdata=()=>{
    const cookie = Cookies.get('AuthToken');
    const formData = new FormData();
  formData.append('_id',  ProductData._id);
  formData.append('title',  ProductData.title);
  formData.append('description',  ProductData.description);
  formData.append('thumbnail',  ProductData.thumbnail);
  formData.append('file', AnnouncementImage);
  formData.append('token', cookie);
    axios.post(`${process.env.REACT_APP_SERVER}/announcement/update`, formData)
    .then(res=>{
        setAnnouncementImage();
        setAnnouncementImageShow();
        updatedannouncementData(res.data);
        setViewModal(false);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

  };
///Delete User
const deleteUset=(announcementID)=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/announcement/delete`, {token: cookie, announcementID})
    .then(res=>{
        console.log(res.data);
        updatedannouncementData(res.data);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

};

return (
      <div className='content-mart'>
  <p>Announcement</p>
  <hr />
        <Box className="mc-table-responsive mt-5">
            <Table className="mc-table tablecustopmy-poly">
                <Thead className="mc-table-head kljjj_tables">
                    <Tr>
                        {thead.map((item, index) => (
                            <Th key={ index }>{ item }</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody className="mc-table-body even">
                    {data?.sort((a, b) => b.Mstimer - a.Mstimer).map((item, index) => (
                        <Tr key={ index }> 
                            <Td title={ item.time }>
                            <img src={`${process.env.REACT_APP_SERVER}/uploads/${item.thumbnail}`} alt="" style={{width: '80px', height: '80px'}}/></Td>
                            <Td title={ item.title }>{ item.title }</Td>
                            
                            <Td title={ item.description }>{ item.description }</Td>
                            
                            <Td className="text-end">
                                <Box className="mc-table-action ">
                                    <button  style={{background: "#59E970", padding: "12px"}}
                                    onClick={()=> setViewModal(true, setProductData(item))}>Edit
                                    </button>
                                    <button  style={{background: "#F61919", padding: "12px"}}
                                    onClick={()=> deleteUset(item._id)}>Delete
                                    </button>
                                </Box>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

           


            <Modal show={ viewModal } onHide={()=> setViewModal(false, setProductData(""))}>
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>

                <Box className="mc-product-upload-file mb-4">
                                <Input type="file" id="product" onChange={uploadImgaeFile} />
                                <Label htmlFor="product">
            <img src={AnnouncementImageShow?AnnouncementImageShow:
                      `${process.env.REACT_APP_SERVER}/uploads/${ProductData.thumbnail}`} width={'85px'} alt="" />
                                <Text>{ uploadFile }</Text></Label>
                </Box>
                  
                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Title" 
                                  value={ProductData.title}
                                  onChange={e=>handleInputChange('title', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelTextarea type="text" label="Description"
                                  value={ProductData.description}
                                  onChange={e=>handleInputChange('description', e.target.value)} fieldSize="w-100 h-100" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={updateeventsdata}>Submit</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>




        </Box>
        </div>
    )
}