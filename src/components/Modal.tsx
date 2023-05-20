import React from "react";
import {RxCross1, RxCross2} from "react-icons/rx";
import {GiDoorway, GiStoneWall, GiWindow} from "react-icons/gi";
import {useTranslation} from "react-i18next";



function Modal({setOpenModal, arrayToDisplay}:any) {
    const { t} = useTranslation();
    return (
        <div className={"overflow-y-auto bg-red-500 absolute inset-0 flex justify-center items-center z-10 m-auto h-1/2 w-5/6 xl:w-1/2 "}>
            <div className="relative h-full w-full ">
                <button
                    className={"absolute top-0 right-0 "}
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    <RxCross2 className={"m-1"}/>
                </button>
                <br/>
                { arrayToDisplay.map((item:any, index:any) => (
                    <div key={index} className={"relative text-black m-2 p-2 h-1/3 bg-lightInfo dark:bg-darkInfo grid grid-cols-3"}>
                        <div>
                            {t("height")}: {item.info.height}
                            <br/>
                            {t("width")}: {item.info.width}
                            <br/>
                            {t("material")}: {t(item.info.mat!)}
                            <br/>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default Modal;