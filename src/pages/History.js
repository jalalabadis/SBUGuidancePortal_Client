import React,{ useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Item, Anchor } from "../components/elements";
import { CardLayout } from "../components/cards";
import { Breadcrumb, Pagination } from "../components";
import LabelField from "../components/fields/LabelField";
import PageLayout from "../layouts/PageLayout";
import data from "../data/master/ecommerce.json";
import {useUserData,usePaymentData,useTicketData,useNotificationsData} from '../Database';
import HistoryTable from "../components/tables/HistoryTable";


export default function History() {
    const userData = useUserData();
    const PaymentData = usePaymentData();
    const Tickets = useTicketData();
    const Notification = useNotificationsData();
    //** */
    const [fillterValues, setFillterValues]=useState({
        "show_by": "100 row",
        "type_by": "All",
        "status_by": "All",
        "search_by": ""
    });



///Filter Input changes
const handleFillter_InputChange = (index, value) => {
    const newFormValues = { ...fillterValues };
    newFormValues[index] = value;
    setFillterValues(newFormValues);
  };

    
  const fillterValuesData = [
    { "label": "show by", "fileID": "show_by", "option": ["100 row", "200 row", "300 row"] },
    { "label": "TYPE by", "fileID": "type_by", "option": ["All", "Balance", "Falaxiload"] },
    { "label": "status by", "fileID": "status_by", "option": ["All", "completed", "pending", "canceled"] },
    { "label": "search by", "fileID": "search_by", "type": "search", "placeholder": "Search by email" }
];
 const table =    {"thead": ["Email", "Type", "Status", "Balance", "Phone", "action"]};
    return (
        <PageLayout Database={{userData,PaymentData,Tickets, Notification}}>
            <Row>
                <Col xl={12}>
                    <CardLayout>
                        <Breadcrumb title={ 'History' }>
                            {data?.breadcrumb.map((item, index) => (
                                <Item key={ index } className="mc-breadcrumb-item">
                                    {item.path ? <Anchor className="mc-breadcrumb-link" href={ item.path }>{ item.text }</Anchor> : 'History' }
                                </Item>
                            ))}
                        </Breadcrumb>
                    </CardLayout>
                </Col>
                <Col xl={12}>
                    <CardLayout>
                        <Row xs={1} sm={4} className="mb-4">
                            {fillterValuesData.map((item, index)=> (
                                <Col key={index}>
                                    <LabelField 
                                        type = { item.type }
                                        label = { item.label }
                                        option = { item.option }
                                        placeholder = { item.placeholder }
                                        labelDir = "label-col"
                                        fieldSize = "w-100 h-sm"
                                        onChange={(e) => handleFillter_InputChange(item.fileID, e.target.value)}
                                    /> 
                                </Col>
                            ))}
                        </Row>
                        {PaymentData?
                        <HistoryTable 
                            thead = { table.thead}
                            tbody = { PaymentData }
                            fillterValues = { fillterValues }
                        />
                        :
                        <></>
}
                        <Pagination
                        item1={fillterValues.show_by.replace('row', '')}
                        item2={PaymentData?.length}
                        />
                    </CardLayout>
                </Col>
            </Row>
        </PageLayout>
    );
}