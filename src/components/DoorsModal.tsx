import React from 'react'
import {RxCross2} from "react-icons/rx";
import {useTranslation} from "react-i18next";
import {Room} from "../assets/Data";


function DoorsModal({room,setRoom,setDoorsModal}:any) {
    const { t} = useTranslation();

    const handleDoorInfoChange = (
        wallIndex: number,
        doorIndex: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        wallIndex -= 1;
        const { name, value } = e.target;
        setRoom((prevRoom:Room) => {
            const walls = [...prevRoom.walls];
            const doors = [...walls[wallIndex].doors];
            doors[doorIndex] = {
                ...doors[doorIndex],
                info: {
                    ...doors[doorIndex].info,
                    [name]: Number(value),
                },
            };
            walls[wallIndex] = {
                ...walls[wallIndex],
                doors,
            };
            return {
                ...prevRoom,
                walls,
            };
        });
    };


    return(
        <div className={"overflow-y-auto bg-red-500 absolute inset-0 flex justify-center items-center z-10 m-auto h-full w-full "}>
            <div className="relative h-full w-full ">
                <button
                    className={"absolute top-0 right-0 "}
                    onClick={() => {
                        setDoorsModal(false);
                    }}
                >
                    <RxCross2 className={"m-1"}/>
                </button>

            </div>
        </div>
    )
}

export default DoorsModal;