import React, { useState } from 'react'
import ButtonLang from './ButtonLang';
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import useDarkMode from "./ButtonTheme";
import {GiSun, GiWineBottle} from "react-icons/gi";
import {RxHamburgerMenu, RxMoon, RxCross1} from "react-icons/rx";




const Nav = () => {

    const [colorTheme,setTheme] =useDarkMode();

    const { t} = useTranslation();
    let Links =[

        {name: t("service"),link:"/service"},
        {name:t("about"),link:"/about"},
        {name:t("contact"),link:"/contact"},
    ];
    let [open,setOpen]=useState(false);


    return (
        //fixed
        <div className='dark:bg-darkNav bg-lightNav dark:text-darkTxt text-lightTxt shadow-md w-full relative top-0 left-0  transition-all duration-500 '>
            <div className=' md:flex items-center justify-between py-3 px-7 lg:px-20 2xl:px-44 '>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] '>
                    <span className='text-3xl text-indigo-600 mr-1 pt-0'>
                        <GiWineBottle size={32}/>

                    </span>
                    <Link to={'/'}>Eurocave</Link>

                </div>


                <div onClick={()=>setOpen(!open)} className=' dark:invert-0  text-3xl absolute right-8 top-3.5 cursor-pointer md:hidden'>
                    {
                        open?<RxCross1 className={""}/>:<RxHamburgerMenu className={""}/>
                    }
                </div>

                <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[5] left-0 w-full md:w-auto md:pl-0 pl-9 transisiton duration-500 ease-in ${open ? 'top- dark:bg-darkNav bg-lightNav':'top-[-490px]'}`}>
                    {
                        Links.map((link)=>(
                            <li key={link.name} className='md:ml-6 text-xl md:my-0 my-7'>
                                <Link to={link.link}  className=' hover:text-gray-400 '>{link.name.toUpperCase()}</Link>
                            </li>
                        ))
                    }
                    <div className={"flex flex-wrap"}>
                        <ButtonLang/>
                        <div onClick={()=> setTheme(colorTheme)} className={" flex items-center justify-center "}>

                            {colorTheme === 'light'?
                                (<RxMoon size={32} className={"m-1 "}/>) :
                                (<GiSun size={32} className={"m-1 "}/>)}

                        </div>
                    </div>

                </ul>


            </div>
        </div>
    )
}

export default Nav