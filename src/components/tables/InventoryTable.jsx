import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button,  Text, Box, Heading} from "../elements";

export default function InventoryTable({ thead, tbody, fillterValues }) {
    const [data, setData] = useState([]);
    const [ProductData, setProductData] = React.useState("");
    const [viewModal, setViewModal] = React.useState(false);

    useEffect(()=> {
        setData(tbody); 
    }, [tbody]);

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
                    {data?.sort((a,b)=>b.date.time-a.date.time).filter(
                item=>item.useremail?.toLowerCase().includes(fillterValues.search_by) &&
                item.operatorname.includes(fillterValues.type_by.replace("All", "")) && 
                item.status?.toLowerCase().includes(fillterValues.status_by.replace("All", ""))).map((item, index) => (
                        <Tr key={ index }> 
                            <Td title={ item.useremail }>{ item.useremail }</Td>
                            <Td title={ item.operatorname }>{ item.operatorname }</Td>
                            <Td title={ item.operatorname }>{ item.operatorname }</Td>
                            <Td title={ item.amount }>{ item.amount.toFixed(2) }৳</Td>
                            <Td title={ item.status }>{ item.status }</Td>
                            <Td class="text-end">
                                <Box className="mc-table-action ">
                                    <button  style={{background: "#59E970", padding: "12px"}}
                                    onClick={()=> setViewModal(true, setProductData(item))}>Approve
                                    </button>
                                    <button  style={{background: "#F61919", padding: "12px"}}
                                    onClick={()=> setViewModal(true, setProductData(item))}>Cancel
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