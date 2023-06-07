import React, {FC, ReactNode} from "react";
import Nav from "./Nav";
import {useTranslation} from "react-i18next";


const Layout: FC<{ children: ReactNode }> = ({children}) => {
    const {t} = useTranslation()
    return (
        <div className="grid grid-rows-[4rem_1fr] h-screen">
            <Nav/>
            <main className="">
                {children}
            </main>
        </div>
    );
};

export default Layout;