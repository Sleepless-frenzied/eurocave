import React from 'react'
import {Room, useContextProvider,} from "../assets/Data";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import AddMatModal from "../components/AddMatModal";
import {FaTemperatureHigh} from "react-icons/fa";


export default function NotWall({setNotWall}: any) {

    const {t} = useTranslation();
    const context = useContextProvider();
    const {
        room,
        setRoom, insMaterial, wallMaterial, vitrage, setWhat, openAddMatModal,
        setAddMatModal,
    } = context;


    const handleFloorInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setRoom((prevRoom: Room) => ({
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
        const {name, value} = e.target;
        setRoom((prevRoom: Room) => ({
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
        const {name, value} = e.target;
        setRoom((prevRoom: Room) => ({
            ...prevRoom,
            [name]: Number(value),
        }));
    };

    //const [openres, setres] = useState(false);


    console.log(room);
    return (


        <div className={" h-full bg-light dark:bg-dark w-full p-6 text-lightTxt flex justify-center items-center "}>
            {/*openres && <Result room={room}/>*/}
            {openAddMatModal && <AddMatModal setAddMatModal={setAddMatModal}/>}


            <div className={""}>
                <div className=" w-full grid grid-cols-1 sm:grid-cols-2  sm:gap-4">
                    {/*<button
                        className={"absolute top-0 right-0 "}
                        onClick={() => {
                            setNotWall(false);
                        }}
                    >
                        <RxCross2 className={"m-1 text-red-500 text-2xl"}/>
                    </button>*/}


                    <div>
                        <h1 className={"flex justify-center text-2xl md:text-4xl"}>{t("floor")}</h1>
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
                                        value={room.floor.info.mat}
                                        onChange={(e) => handleFloorInfoChange(e)}
                                    >
                                        {wallMaterial.map((material, index) => (
                                            <option key={index} value={material.name}>
                                                {t(material.name)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                        <span onClick={() => {
                                            setWhat("wall");
                                            setAddMatModal(true);
                                        }} className={"px-2 flex justify-center"}>+</span>
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
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                        <span onClick={() => {
                                            setWhat("ins");
                                            setAddMatModal(true);
                                        }} className={"px-2 flex justify-center"}>+</span>
                                </td>
                            </tr>

                            {
                                room.floor.info.insMat === "without_Insulation" ? <></> :
                                    <tr>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("ins_thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black max-lg:h-12 w-full"}
                                                type="number"
                                                name="insThick"
                                                value={room.floor.info.insThick}
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

                    <div>
                        <h1 className={"flex justify-center text-2xl md:text-4xl"}>{t("ceiling")}</h1>
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

                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                        <span onClick={() => {
                                            setWhat("wall");
                                            setAddMatModal(true);
                                        }} className={"px-2 flex justify-center"}>+</span>
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
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                        <span onClick={() => {
                                            setWhat("ins");
                                            setAddMatModal(true);
                                        }} className={"px-2 flex justify-center"}>+</span>
                                </td>
                            </tr>

                            {
                                room.ceiling.info.insMat === "without_Insulation" ? <></> :
                                    <tr>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("ins_thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black max-lg:h-12 w-full"}
                                                type="number"
                                                name="insThick"
                                                value={room.ceiling.info.insThick}
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

                <div className={"flex flex-col  items-center"}>
                    <h1 className={"flex justify-center text-2xl md:text-4xl"}>
                        <FaTemperatureHigh className={"m-1"}/>
                        {t("temp")}
                    </h1>
                    <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>

                    <table className={"table-auto border-separate border-spacing-y-2"}>
                        <tbody>


                        <tr>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                <h1 className={"mx-2 overflow-clip"}>{t("temperature")}: </h1>
                            </td>
                            <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                <input
                                    className={" px-2 text-black max-lg:h-12 w-full"}
                                    type="number"
                                    name="tempExt"
                                    value={room.tempExt}
                                    onChange={handleTemperatureChange}
                                />
                            </td>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                <span className={"px-2 flex justify-center"}>C°</span>
                            </td>
                        </tr>
                        <tr>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                <h1 className={"mx-2 overflow-clip"}>{t("desired_temperature")}:</h1>
                            </td>
                            <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                <input
                                    className={" px-2 text-black max-lg:h-12 w-full"}
                                    type="number"
                                    name="tempInt"
                                    value={room.tempInt}
                                    onChange={handleTemperatureChange}
                                />
                            </td>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                <span className={"px-2 flex justify-center"}>C°</span>
                            </td>
                        </tr>


                        </tbody>
                    </table>

                </div>
                <div className={"flex flex-col items-end"}>
                    <Link to={"/result"}
                          className={` items-end place-self-end bg-lightButton  m-2 px-4 py-3 text-xl md:text-2xl `}
                          onClick={() => {
                              localStorage.setItem('redirectProps', JSON.stringify(room));
                          }}>
                        Calcul
                    </Link>
                </div>
            </div>


        </div>
    )
}