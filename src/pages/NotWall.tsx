import React from 'react'
import {RxCross2} from "react-icons/rx";
import {insMaterial, Room} from "../assets/Data";
import {useTranslation} from "react-i18next";


export default function NotWall({room,setRoom,setNotWall}:any) {

    const { t} = useTranslation();


    const handleFloorInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRoom((prevRoom:Room) => ({
            ...prevRoom,
            floor: {
                ...prevRoom.floor,
                info: {
                    ...prevRoom.floor.info,
                    [name]: name === 'mat' || name === 'insMat' ? value : Number(value),
                },
            },
        }));
    };


    const handleCeilingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setRoom((prevRoom:Room) => ({
            ...prevRoom,
            ceiling: {
                ...prevRoom.ceiling,
                info: {
                    ...prevRoom.ceiling.info,
                    [name]: name === 'mat' || name === 'insMat' ? value : Number(value),
                },
            },
        }));
    };

    return(
        <div className={"overflow-y-auto bg-red-500 absolute inset-0 flex justify-center items-center z-10 m-auto h-full w-full "}>
            <div className="relative h-full w-full ">
                <button
                    className={"absolute top-0 right-0 "}
                    onClick={() => {
                        setNotWall(false);
                    }}
                >
                    <RxCross2 className={"m-1"}/>
                </button>

                <select
                    className={"text-black max-sm:h-12 w-full"}
                    name="insMat"
                    value={room.floor.info.insMat}
                    onChange={(e) => handleFloorInfoChange(e)}
                >
                    {insMaterial.map((insMataterial, index) => (
                        <option key={index} value={insMataterial.name}>
                            {t(insMataterial.name)}
                        </option>
                    ))}
                </select>




                


            </div>
        </div>
    )
}