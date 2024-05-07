import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button,  Text, Box, Heading} from "../elements";
import axios from 'axios';
import LabelTextarea from '../fields/LabelTextarea';
import LabelField from "../fields/LabelField";
import  Cookies  from 'js-cookie';
import { toast } from "react-toastify";

export default function InventoryTable({ thead, tbody, fillterValues, updatedinventoryData }) {
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
const updateinventorydata=()=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/inventory/update`, {token: cookie, ProductData})
    .then(res=>{
        console.log(res.data);
        updatedinventoryData(res.data);
        setViewModal(false);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

  };

  ///Delete User
const deleteUset=(inventoryID)=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/inventory/delete`, {token: cookie, inventoryID})
    .then(res=>{
        console.log(res.data);
        updatedinventoryData(res.data);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

};

    return (
      <div className='content-mart'>
  <p>Inventory</p>
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
                            <Td title={ item.target }>{ item.target }</Td>
                            <Td title={ item.to }>{ item.to }</Td>
                            <Td title={ item.notice }>{ item.notice }</Td>
                            <Td className="text-end">
                                <Box className="mc-table-action ">
                                    <button  style={{background: "#59E970", padding: "12px"}}
                                    onClick={()=> setViewModal(true, setProductData(item))}>Edit
                                    </button>
                                    <button  style={{background: "#F61919", padding: "12px"}}
                                    onClick={()=>  deleteUset(item._id)}>Delete
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
                <Box className="mc-product-upload-organize mb-4">
                                    <LabelField label="Target" 
                                    option={['Student', 'Section', 'Department']}
                                    value={ProductData.target}
                                    onChange={e=>handleInputChange('target', e.target.value)} fieldSize="w-100 h-sm" />
                                    
                                </Box>



                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label={ProductData.target==="Student"?"Student Number":ProductData.target==="Section"?"Section Name":"Department Name"}
                                  value={ProductData.to}
                                  onChange={e=>handleInputChange('to', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelTextarea type="text" label="notice"
                                  value={ProductData.notice}
                                  onChange={e=>handleInputChange('notice', e.target.value)} fieldSize="w-100 h-100" />
                     </Box>
                     
                    


                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={updateinventorydata}>Add Inventory</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>




        </Box>
        </div>
    )
}