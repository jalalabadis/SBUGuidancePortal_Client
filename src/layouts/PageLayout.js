import React  from "react";
import Main from "./Mian";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { DrawerProvider } from "../context/Drawer";

export default function PageLayout({Database, children }) {
    return (
        <DrawerProvider>
            <Header Database={Database} />
            <Sidebar Database={Database} />
            <Main>
                    { children }
            </Main>
        </DrawerProvider>
    )
}