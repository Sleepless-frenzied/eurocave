import React from 'react'
import {RxCross2} from "react-icons/rx";
import {useTranslation} from "react-i18next";

function WinModal({room,setRoom,setWinModal}:any) {
    const { t} = useTranslation();
    return(
        <div className={"overflow-y-auto bg-red-500 absolute inset-0 flex justify-center items-center z-10 m-auto h-full w-full "}>
            <div className="relative h-full w-full ">
                <button
                    className={"absolute top-0 right-0 "}
                    onClick={() => {
                        setWinModal(false);
                    }}
                >
                    <RxCross2 className={"m-1"}/>
                </button>

            </div>
        </div>
    )
}

export default WinModal;