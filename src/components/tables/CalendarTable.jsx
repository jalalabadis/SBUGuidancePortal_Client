import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Table, Thead, Tbody, Th, Tr, Td } from "../elements/Table";
import { Button,  Box} from "../elements";
import LabelField from "../fields/LabelField";
import Cookies  from 'js-cookie';
import axios from "axios";
import { toast } from "react-toastify";
import LabelTextarea from "../fields/LabelTextarea";
import { formatTime } from "../../engine/formatTime";

export default function CalendarTable({ thead, tbody, tbodyuser, fillterValues, updatedcalendarData }) {
    const [data, setData] = useState([]);
    const [ProductData, setProductData] = React.useState("");
    const [studentData, setStudentDataData] = React.useState(null);
    const [viewModal, setViewModal] = React.useState(false);
    const [viewTable, setViewTable] = React.useState(false);
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
const updateeventsdata=()=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/calendar/update`, {token: cookie, ProductData})
    .then(res=>{
        console.log(res.data);
        updatedcalendarData(res.data);
        setViewModal(false);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

  };
///Delete User
const deleteUset=(calendarID)=>{
    const cookie = Cookies.get('AuthToken');
    axios.post(`${process.env.REACT_APP_SERVER}/calendar/delete`, {token: cookie, calendarID})
    .then(res=>{
        console.log(res.data);
        updatedcalendarData(res.data);
})
.catch(err=>{
        toast(err.response?.data?.Message)
  });

};

      ////attended StudentDatas
      const handelattendedStudentdata=(calendarID)=>{
        setViewTable(true);
        axios.post(`${process.env.REACT_APP_SERVER}/calendar/attended`, {calendarID})
        .then(res=>{
            console.log(res.data[0]?.submission);
            setStudentDataData(res.data[0]?.submission);
    })
    .catch(err=>{
            toast(err.response?.data?.Message)
      });
    
      };

return (
      <div className='content-mart'>
  <p>Calendar</p>
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
                            <Td title={ item.time }>{ item.date }<br/>{ formatTime(item.time) }</Td>
                            <Td title={ item.title }>{ item.title }</Td>
                            
                            <Td title={ item.description }>{ item.description }</Td>

                            <Td><button onClick={e=> handelattendedStudentdata(item._id)}>{ item.submission.length }
                                </button></Td>
                            <Td>{tbodyuser- item.submission.length }</Td>
                            
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
                  
                    <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="text" label="Title" 
                                  value={ProductData.title}
                                  onChange={e=>handleInputChange('title', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>

                     <Box className="mc-product-upload-organize mb-4">
                      <LabelTextarea type="text" label="Description"
                                  value={ProductData.description}
                                  onChange={e=>handleInputChange('description', e.target.value)} fieldSize="w-100 h-lg" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="date" label="Date"
                                  value={ProductData.date}
                                  onChange={e=>handleInputChange('date', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>
                     <Box className="mc-product-upload-organize mb-4">
                      <LabelField type="time" label="Time"
                                  value={ProductData.time}
                                  onChange={e=>handleInputChange('time', e.target.value)} fieldSize="w-100 h-sm" />
                     </Box>


                     <Box className="mc-product-upload-organize mb-4">
              <Button className="mc-btn primary w-100 h-sm mt-4" onClick={updateeventsdata}>Submit</Button>
                  </Box>
                </Box>
                </Modal.Body>
            </Modal>

            <Modal show={ viewTable } onHide={()=> setViewTable(false, setStudentDataData())}>
            <Modal.Header closeButton style={{margin: '0', padding: '10px 10px 0 0' }}/>
            <Modal.Body className={'costomize-popup-hkjs'}>
                <Box>

{studentData!==null&&
    <Box className="mc-table-responsive mt-4">
                <table className="mc-table tablecustopmy-poly">
                <thead className="mc-table-head kljjj_tables">
                    <tr>
                            <th>Name</th>
                            <th>Number</th>
                            <th>Section</th>
                            <th>Email</th>
                
                    </tr>
                </thead>
                <tbody className="mc-table-body even">
                    {studentData?.sort((a, b) => b.Mstimer - a.Mstimer).map((item, index) => (
                        <tr key={ index }> 
                        <td>{item.userName}</td>
                        <td>{item.Number}</td>
                        <td>{item.Section}</td>
                        <td>{item.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </Box>}

                </Box>
                </Modal.Body>
            </Modal>



        </Box>
        </div>
    )
}