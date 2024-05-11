import React  from "react";
import Main from "./Mian";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { DrawerProvider } from "../context/Drawer";

export default function PageLayout({Database, updatedcalendarData, children }) {
    return (
        <DrawerProvider>
            <Header Database={Database} />
            <Sidebar Database={Database} updatedcalendarData={updatedcalendarData} />
            <Main>
                    { children }
            </Main>
        </DrawerProvider>
    )
}