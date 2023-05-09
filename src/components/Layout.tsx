import React, {FC, ReactNode} from "react";
import Nav from "./Nav";


const Layout: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <main className="">
            {/*<Nav/>*/}
            <div className={""}>
                <Nav/>
                {children}
            </div>
        </main>
    );
};

export default Layout;