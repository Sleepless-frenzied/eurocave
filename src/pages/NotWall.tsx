import React, {useState} from 'react'
import {RxCross2} from "react-icons/rx";
import {insMaterial, Room, wallMaterial} from "../assets/Data";
import {useTranslation} from "react-i18next";
import {GiStoneWall} from "react-icons/gi";
import Calc from "./Result";
import Result from "./Result";
import {Link} from "react-router-dom";



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


    const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setRoom((prevRoom:Room) => ({
            ...prevRoom,
            [name]: Number(value),
        }));
    };

    //const [openres, setres] = useState(false);



    return(

        <div className={"  bg-light dark:bg-dark absolute inset-0  z-10 p-6 h-full w-full "}>
            {/*openres && <Result room={room}/>*/}

            <Link to={"/result"}
                  className={`absolute bottom-0 right-0 bg-lightButton  m-2 px-4 py-3 text-xl md:text-2xl `}
                  onClick={()=>{localStorage.setItem('redirectProps', JSON.stringify(room));}}>
                Calcul
            </Link>

            <div className={"m"}>
                <div className="relative h-full w-full columns-2">
                    <button
                        className={"absolute top-0 right-0 "}
                        onClick={() => {
                            setNotWall(false);
                        }}
                    >
                        <RxCross2 className={"m-1 text-red-500 text-2xl"}/>
                    </button>


                    <div>
                        <h1 className={"flex justify-center text-2xl md:text-4xl"}><GiStoneWall
                            className={"m-1"}/>{t("floor")}</h1>
                        <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>
                        <table className={"table-auto border-separate border-spacing-y-2  "}>


                            <tbody>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("material")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <select
                                        className={"text-black max-sm:h-12 w-full"}
                                        name="mat"
                                        value={room.floor.info.insMat}
                                        onChange={(e) => handleFloorInfoChange(e)}
                                    >
                                        {wallMaterial.map((material, index) => (
                                            <option key={index} value={material.name}>
                                                {t(material.name)}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                            </tr>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("mat_thickness")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black max-lg:h-12 w-full"}
                                        type="number"
                                        name="matThick"
                                        value={room.floor.info.matThick}
                                        onChange={(e) => handleFloorInfoChange(e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>mm</span>
                                </td>
                            </tr>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("insulation")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
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
                                </td>
                            </tr>

                            {
                                room.floor.info.insMat === "without_Insulation" ? <></>:
                                    <tr>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("ins_thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black max-lg:h-12 w-full"}
                                                type="number"
                                                name="insThick"
                                                value={room.floor.info.insMat}
                                                onChange={(e) => handleFloorInfoChange(e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>
                            }



                            </tbody>

                        </table>
                    </div>

                    <div >
                        <h1 className={"flex justify-center text-2xl md:text-4xl"}><GiStoneWall
                            className={"m-1"}/>{t("ceiling")}</h1>
                        <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>
                        <table className={"table-auto border-separate border-spacing-y-2  "}>


                            <tbody>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("material")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <select
                                        className={"text-black max-sm:h-12 w-full"}
                                        name="mat"
                                        value={room.ceiling.info.mat}
                                        onChange={(e) => handleCeilingInfoChange(e)}
                                    >
                                        {wallMaterial.map((material, index) => (
                                            <option key={index} value={material.name}>
                                                {t(material.name)}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                            </tr>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("mat_thickness")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black max-lg:h-12 w-full"}
                                        type="number"
                                        name="matThick"
                                        value={room.ceiling.info.matThick}
                                        onChange={(e) => handleCeilingInfoChange(e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>mm</span>
                                </td>
                            </tr>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("insulation")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <select
                                        className={"text-black max-sm:h-12 w-full"}
                                        name="insMat"
                                        value={room.ceiling.info.insMat}
                                        onChange={(e) => handleCeilingInfoChange(e)}
                                    >
                                        {insMaterial.map((insMataterial, index) => (
                                            <option key={index} value={insMataterial.name}>
                                                {t(insMataterial.name)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>

                            {
                                room.ceiling.info.insMat === "without_Insulation" ? <></>:
                                    <tr>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("ins_thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black max-lg:h-12 w-full"}
                                                type="number"
                                                name="insThick"
                                                value={room.ceiling.info.insMat}
                                                onChange={(e) => handleCeilingInfoChange(e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>
                            }



                            </tbody>

                        </table>
                    </div>


                </div>
                <br/>
                <div className={"flex flex-col  items-center"}>
                    <table className={"table-auto border-separate border-spacing-y-2"}>
                        <tbody>
                        <tr>
                            <td className={"border-2 border-lightDivi "}>
                                <span className={" px-2"}>Température ext: </span>
                            </td>
                            <td className={"border-2 border-lightDivi "}>
                                <input
                                    className={" px-2"}
                                type="number"
                                name="tempExt"
                                value={room.tempExt}
                                onChange={handleTemperatureChange}
                                />
                            </td>
                            <td className={"border-2 border-lightDivi "}>
                                <span className={" px-2"} >C°</span>
                            </td>
                        </tr>
                        <tr>
                            <td className={"border-2 border-lightDivi "}>
                                <span className={" px-2"} >Desired Temperature: </span>
                            </td>
                            <td className={"border-2 border-lightDivi "}>
                                <input
                                    className={" px-2"}
                                    type="number"
                                    name="tempInt"
                                    value={room.tempInt}
                                    onChange={handleTemperatureChange}
                                />
                            </td>
                            <td className={"border-2 border-lightDivi "}>
                                <span className={" px-2"}>C°</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    )
}