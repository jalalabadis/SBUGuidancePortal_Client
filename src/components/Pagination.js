import React from "react";
import { Box, Icon, Item, List, Text } from "./elements";

export default function Pagination(props) {
    return (
        <Box className="mc-paginate">
            <Text className="mc-paginate-title">Showing <b>{props.item1}</b> of <b>{props.item2}</b> Results</Text>
            <List className="mc-paginate-list">
                <Item className="mc-paginate-item">
                    <Icon type="chevron_left" />
                </Item>
               
                <Item className="mc-paginate-item">
                    <Icon type="chevron_right" />
                </Item>
            </List>
        </Box>
    )
}