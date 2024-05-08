import React, { useState, useEffect } from "react";
import { Modal} from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button,   Box} from "../elements";
import LabelField from "../fields/LabelField";
import Cookies  from 'js-cookie';
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminTable({ thead, tbody, fillterValues, updatedData }) {
    const [data, setData] = useState([]);
    const [ProductData, setProductData] = React.useState("");
    const [viewModal, setViewModal] = React.useState(false);

    useEffect(()=> {
        setData(tbody); 
    }, [tbody]);

    ///Input changes
const handleInputChange = (index, value) => {
    const newFormValues = { ...ProductData };
    newFormValues[index] = value;
    setProductData(newFormValues);
  };

    ////Edit User
const submitUserdata=()=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/student/update`, {token: cookie, ProductData})
    .then(res=>{
        console.log(res.data);
        updatedData(res.data);
        setViewModal(false);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

  };
///Delete User
const deleteUset=(userID)=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/student/delete`, {token: cookie, userID})
    .then(res=>{
        console.log(res.data);
        updatedData(res.data);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

};

    return (
      <div className='content-mart'>
  <p>Admin</p>
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
                    {data?.filter(item=> item.type==='admin').sort((a, b) => b.Mstimer - a.Mstimer).map((item, index) => (
                        <Tr key={ index }> 
                            <Td title={ item.userName }>{ item.userName }</Td>
                            <Td title={ item.Number }>{ item.Number }</Td>
                            
                            <Td title={ item.Department }>{ item.Department}</Td>
                            <Td className="text-end">
                                <Box className="mc-table-action ">
                                    <button  style={{background: "#59E970", padding: "12px"}}
                                    onClick={()=> setViewModal(true, setProductData({ ...item, newpassword: "" }))}>Edit
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

           


            <Modal show={ viewModal } onHide={()=> setViewModal(false)} >
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
                  
                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Name" 
                                  value={ProductData.userName}
                                  onChange={(e) => handleInputChange('userName', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                    
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="number" label="Number" 
                                  value={ProductData.Number}
                                  onChange={e=>handleInputChange('Number', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                    

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Department" 
                                  value={ProductData.Department}
                                  onChange={e=>handleInputChange('Department', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="email" label="Email" 
                                  value={ProductData.email}
                                  onChange={e=>handleInputChange('email', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="New Password" 
                                  value={ProductData.newpassword}
                                  onChange={e=>handleInputChange('newpassword', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     
                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={submitUserdata}>Update</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>




        </Box>
        </div>
    )
}