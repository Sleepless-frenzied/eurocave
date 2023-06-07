import React from "react";
import {RxCross2} from "react-icons/rx";
import {useTranslation} from "react-i18next";
import {useContextProvider} from "../assets/Data";


function Modal({setOpenModal, arrayToDisplay}: any, isWindow: boolean = false) {
    const {t} = useTranslation();
    const context = useContextProvider();
    const {insMaterial, wallMaterial, vitrage} = context;

    return (
        <div
            className={" bg-lightModule bg-darkModule absolute inset-0 flex justify-center items-center z-10 m-auto h-1/2 w-5/6 xl:w-1/2 "}>
            <div className="relative h-full w-full overflow-y-auto border-4 border-red-500  ">
                <button
                    className={"absolute top-0 right-0 "}
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    <RxCross2 className={"m-1"}/>
                </button>

                <br/>
                {arrayToDisplay.map((item: any, index: any) => (
                    <div key={index}
                         className={"relative text-black m-2 p-2 h-2/5 bg-lightInfo dark:bg-darkInfo top-3 columns-2"}>

                        {
                            isWindow ?
                                <div>{t("win")} {index}
                                    {
                                        item.matThick = vitrage.find((material) => material.name === item.info.mat)!.thickness}</div> :
                                <div>{t("door")} {index}</div>
                        }
                        <div className={"overflow-auto"}>
                            {t("height")}: {item.info.height}
                            <br/>
                            {t("length")}: {item.info.length}
                            <br/>
                            {t("material")}: {t(item.info.mat!)}
                            <br/>
                            {t("matThick")}: {item.info.matThick}
                            {
                                item.info.insMat === "without_Insulation" ? null :
                                    <>
                                        <br/>
                                        {t("material")}: {t(item.info.insMat!)}
                                        <br/>
                                        {t("matThick")}: {item.info.insThick}
                                    </>
                            }

                        </div>
                    </div>
                ))}


            </div>
        </div>
    );
}

export default Modal;