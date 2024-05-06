import React from "react";
import { Dropdown } from "react-bootstrap";
import { Icon, Text, Box, Anchor, List, Item, Image, Heading } from "../elements";

export default function WidgetDropdown({ title, icon, addClass, badge, dropdown }) {
    return (
        <Dropdown className={ addClass }>
            <Dropdown.Toggle className="mc-dropdown-toggle mc-header-icon " title={ title }>
                <Icon type={ icon } />
                <Text as="sup" className={ badge?.variant }>{ badge?.text }</Text>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="mc-dropdown-paper">
                <Box className="mc-header-dropdown-group">
                    
                    <List className="mc-header-dropdown-list thin-scrolling">
                        {dropdown?.items.map((item, index) => (
                            <Item key={ index } className={`mc-header-dropdown-item ${ item?.addClass ? item?.addClass : "" }`}>
                                <Anchor className="mc-header-dropdown-content" href={ item?.path }>
                                    {item?.product &&
                                        <Box className="mc-header-dropdown-notify-media">
                                            {item?.product?.images.map((image, index) => (
                                                <Image key={ index } src={ image } alt="product" />
                                            ))}
                                            
                                        </Box>
                                    }
                                 
                                    {item?.notify &&
                                        <Box className="mc-header-dropdown-notify-media">
                                            <Image src={ item?.notify?.image } alt="avatar" />
                                            <Icon className={`material-icons ${ item?.notify?.variant }`}>{ item?.notify?.icon }</Icon>
                                        </Box>
                                    }
                                    <Box className="mc-header-dropdown-meta">
                                        <Heading as="h4">
                                            {item?.paymenttype && <Text as="cite">{item?.operatorname+" "+item?.paymenttype }</Text>}
                                            {item?.tickettype && <Text as="cite">{ item?.tickettype }</Text>}
                                            {item?.title && <Text as="cite">{ item?.title }</Text>}
                                        </Heading>
                                        {item?.amount && <Text as="cite">৳{ item?.amount }</Text>}
                                        {item?.message && <Text as="cite">{ item?.message }</Text>}
                                        {item?.discription && <Text as="cite">{ item?.discription }</Text>}
                                    </Box>
                                </Anchor>
                                {item?.addClass && item?.badge && <Text as="sup">{ item?.badge }</Text>}
                            </Item>
                        ))}
                    </List>
                    <Anchor href={ dropdown?.button?.path } className="mc-btn primary mc-header-dropdown-button" >
                        { dropdown?.button?.label }
                    </Anchor>
                </Box>
            </Dropdown.Menu>
        </Dropdown>
    )
}