import React, {FC, ReactNode} from "react";
import Nav from "./Nav";
import {useTranslation} from "react-i18next";
import {SiReact, SiTailwindcss} from "react-icons/si";


const Layout: FC<{ children: ReactNode }> = ({children}) => {
    const {t} = useTranslation()
    return (
        <main className="relative h-[calc(100vh-10rem)]">
            {/*<Nav/>


            <div className={"h-full"}>

            </div>
            */}



            <Nav/>
            {children}

            {/*<footer className={"bg-lightModule dark:bg-darkModule  text-center w-full fixed inset-x-0 bottom-0"}>
                <p className={" p-2 flex flex-row justify-center "}>{t("made_with")} React<SiReact
                    className={"m-1 w-min text-blue-600"}/>, Tailwind<SiTailwindcss
                    className={"m-1 w-min text-blue-400"}/> & 💖</p>
            </footer>*/}

        </main>
    );
};

export default Layout;