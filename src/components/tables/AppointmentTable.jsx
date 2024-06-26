import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Box, Heading, Text} from "../elements";
import Cookies  from 'js-cookie';
import axios from "axios";
import { toast } from "react-toastify";

export default function AppointmentTable({ thead, tbody, fillterValues, updatedappointmentData }) {
    const [data, setData] = useState([]);
    const [ProductData, setProductData] = React.useState("");
    const [viewModal, setViewModal] = React.useState(false);

    useEffect(()=> {
        setData(tbody); 
    }, [tbody]);

    //////Appprove or cancl
const handelsubitapps=(itemID, status)=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/appointment/update`, {token: cookie, itemID, status})
    .then(res=>{
        console.log(res.data);
        updatedappointmentData(res.data);
})
.catch(err=>{
        toast(err.response?.data?.Message);
  });

};

///Delete app
const deleteUset=(appointmentID)=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/appointment/delete`, {token: cookie, appointmentID})
    .then(res=>{
        console.log(res.data);
        updatedappointmentData(res.data);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

};
    return (
      <div className='content-mart'>
  <p>Student Appointment</p>
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
                            <Td title={ item.date }>{ item.date }<br/>
                            {item.preferred}
                            </Td>
                            <Td title={ item.name }>{ item.name }</Td>
                            
                            <Td title={ item.contact }>{ item.contact }</Td>
                            <Td title={ item.status }><Text className={`mc-table-badge ${item.status==="Pending"? "purple" :item.status==="Approve"?"green":"red"}`}>
                                { item.status }</Text></Td>
                            <Td className="text-end">
                                {item.status==="Pending"?
                                <Box className="mc-table-action ">
                                    <button  style={{background: "#59E970", padding: "12px"}}
                                    onClick={()=> handelsubitapps(item._id, 'Approve')}>Approve
                                    </button>
                                    <button  style={{background: "#F61919", padding: "12px"}}
                                    onClick={()=>  handelsubitapps(item._id, 'Cancel')}>Cancel
                                    </button>
                                </Box>:
                                <Box className="mc-table-action ">
                                <button  style={{background: "#F61919", padding: "12px"}}
                                onClick={()=> deleteUset(item._id)}>Delete
                                </button>
                            </Box>
                            
                            }

                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

           


            <Modal show={ viewModal } onHide={()=> setViewModal(false, setProductData(""))}>
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>
                <center>
                    <Heading as="h4">Receipt Information</Heading>
                    <br/>
                     {ProductData.imageurl? <img src={ProductData.imageurl} width={'140px'} alt="" />:<></>}
                    </center>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label className="popupsd-lefts">Account </Form.Label>
                        <Form.Label className="popupsd-rights">
                        {ProductData.transectionid}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label className="popupsd-lefts">Amount </Form.Label>
                        <Form.Label className="popupsd-rights">
                        {ProductData.amount}
                        </Form.Label>
                    </Form.Group>
                    {ProductData.operatorname==="Bank Transfer"?
                    <>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label className="popupsd-lefts">Full Name</Form.Label>
                        <Form.Label className="popupsd-rights">
                        {ProductData.fullname}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label className="popupsd-lefts">Bank Nake: {ProductData.paymenttype}</Form.Label>
                        <Form.Label className="popupsd-rights"></Form.Label>
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label className="popupsd-lefts">Branch Name </Form.Label>
                        <Form.Label className="popupsd-rights">
                        {ProductData.branchname}
                        </Form.Label>
                    </Form.Group>
                    </>:
                    <></>}
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label className="popupsd-lefts">Type Pay </Form.Label>
                        <Form.Label className="popupsd-rights">
                        {ProductData.operatorname}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label className="popupsd-lefts">Mobile Number</Form.Label>
                        <Form.Label className="popupsd-rights">
                        {ProductData.transectionid}
                        </Form.Label>
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label className="popupsd-lefts">Date</Form.Label>
                        <Form.Label className="popupsd-rights">
                        {ProductData?(new Date(ProductData.date?.time)).toLocaleDateString():null}    
                        </Form.Label>
                  </Form.Group>
     
                </Box>
                </Modal.Body>
            </Modal>




        </Box>
        </div>
    )
}