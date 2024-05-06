import React from "react";
import { Image, List, Box, Text, Item, Anchor, Button} from "../components/elements";
import { CardLayout, CardHeader } from "../components/cards";
import Breadcrumb from "../components/Breadcrumb";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/notification.json";
import { getDatabase, ref, remove} from "firebase/database";
import { Modal, Form } from "react-bootstrap";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';

function Ticket() {
    const db = getDatabase();
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [editModal, setEditModal] = React.useState(false);
    const [editTicket, setEditTicket] = React.useState("");

    return (
        <>
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <CardLayout className="mb-4">
                <Breadcrumb title='ticket'>
                    {data?.breadcrumb.map((item, index) => (
                        <Item key={ index } className="mc-breadcrumb-item">
                            {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : item.text }
                        </Item>
                    ))}
                </Breadcrumb>
            </CardLayout>

         
             
          

            <CardLayout>
                <CardHeader title="all tickets"  />
                <List className="mc-notify-list">
                    {Tickets.map((item, index) => (
                        <Item className="mc-notify-item" key={ index }>
                                <Box className="mc-notify-media">
                                    <Image src={ '/images/logo.webp'} alt={ 'avatar' } />
                                </Box>
                                <Box className="mc-notify-meta">
                                    <Text as="small">{ item.useremail }</Text>
                                    <Text as="small">{ item.tickettype}</Text>
                                    <Text as="small">{ item.mobilenumver}</Text>
                                </Box>
                    
    <div className="col-4 d-flex justify-content-end">
   <div className="mc-table-action">
    <button className="material-icons view" title="visivility" 
    onClick={e=>{
        setEditModal(true);
        setEditTicket(item);
    }}
    >visibility</button>
    <button type="button" onClick={e=>{
        
        remove(ref(db, 'Tickets/'+item.ticketid))
    }} className="material-icons delete">delete</button></div>
      </div>
                        </Item>
                    ))}
                </List>
            </CardLayout>
            </PageLayout>



            <Modal show={ editModal } onHide={()=> setEditModal(false, setEditTicket(""))}>
                <Box className="mc-user-modal">
                    <br/>
                    <Text as="p">{ 'Customer information' }</Text>
                    
                    
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Email: {editTicket.useremail}</Form.Label>
                        
                    </Form.Group>
                    <Form.Group className="form-group inline mb-4">
                        <Form.Label>Ticket Type: {editTicket.tickettype}</Form.Label>
                        </Form.Group>

                        <Text as="p">{ 'Message Box' }</Text>
                    <Form.Group className="form-group inline">
                        <span>{editTicket.message}</span>
                            </Form.Group>
                    
                    <Modal.Footer>
                        <Button type="button" className="btn btn-secondary" onClick={()=> setEditModal(false)}>close popup</Button>
                          </Modal.Footer>
                </Box>
            </Modal>           
     </>
    )
  
}

export default Ticket