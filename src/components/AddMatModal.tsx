import {RxCross2} from "react-icons/rx";
import {vitrage} from "../assets/Data";
import React from "react";

export default function AddMatModal({list,setAddMatModal}:any,IsWindow: boolean = false){
    
    return(
        <div className={" bg-lightModule bg-darkModule absolute inset-0 flex justify-center items-center z-10 m-auto h-1/2 w-5/6 xl:w-1/2 "}>
            <div className="relative h-full w-full overflow-y-auto border-4 border-red-500  ">
                <button
                    className={"absolute top-0 right-0 "}
                    onClick={() => {
                        setAddMatModal(false);
                    }}
                >
                    <RxCross2 className={"m-1"}/>
                </button>




            </div>
        </div>
    )
}