import React, {useState} from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';

import {Room, Wall, Ceiling, Floor, floorMaterial, Info,Window} from "../assets/Data";
import {BsPlusCircle} from "react-icons/bs";




function Home() {
    const { t} = useTranslation();

    const initialRoom: Room = {
        walls: [],
    };

    type AddWallButtonProps = {
        onAddWall: () => void;
    };
    const AddWallButton = ({ onAddWall }: AddWallButtonProps) => {
        return <button className={" bg-lightButton dark:bg-darkButton  m-2 px-4 py-3 text-xl md:text-2xl w-max"} onClick={onAddWall}>{t("add_wall")}</button>;
    };

    type AddWindowButtonProps = {
        onAddWindow: () => void;
    };

    const AddWindowButton = ({ onAddWindow }: AddWindowButtonProps) => {
        return <button className={"flex flex-row"} onClick={onAddWindow}>
            Add Window
            <BsPlusCircle  className={"m-1"}/>
        </button>;
    };

    const [room, setRoom] = useState(initialRoom);

    const handleWallInfoChange = (
        wallIndex: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        wallIndex -= 1;
        const { name, value } = e.target;
        setRoom((prevRoom) => {
            const walls = [...prevRoom.walls];
            walls[wallIndex] = {
                ...walls[wallIndex],
                info: {
                    ...walls[wallIndex].info,
                    [name]: name === 'mat' || name === 'insmat' ? value : Number(value),
                },
            };
            return {
                ...prevRoom,
                walls,
            };
        });
    };



    const handleWindowInfoChange = (
        wallIndex: number,
        windowIndex: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        wallIndex -= 1;
        const { name, value } = e.target;
        setRoom((prevRoom) => {
            const walls = [...prevRoom.walls];
            const windows = [...walls[wallIndex].windows];
            windows[windowIndex] = {
                ...windows[windowIndex],
                info: {
                    ...windows[windowIndex].info,
                    [name]: Number(value),
                },
            };
            walls[wallIndex] = {
                ...walls[wallIndex],
                windows,
            };
            return {
                ...prevRoom,
                walls,
            };
        });
    };



    const addWall = () => {
        setRoom((prevRoom) => ({
            walls: [
                ...prevRoom.walls,
                {
                    info: {
                        length: 10,
                        width: 10,
                        thickness: 10,
                        mat: "expanded_polystyrene" ,
                        matThick: 10,
                        insMat: "expanded_polystyrene",
                        insThick: 10,
                    },
                    windows: [],
                },
            ],

        }));
        console.log(room);
    };

    const addWindow = (wallIndex: number) => {
        setRoom((prevRoom) => {
            const walls = [...prevRoom.walls];
            const windows = [...walls[wallIndex].windows];
            windows.push({
                info: {
                    length: 10,
                    width: 10,
                    thickness: 10,
                    mat: "expanded_polystyrene" ,
                    matThick: 10,
                    insMat: "expanded_polystyrene",
                    insThick: 10,
                },
            });
            walls[wallIndex] = {
                ...walls[wallIndex],
                windows,
            };
            return {
                ...prevRoom,
                walls,
            };
        });
    };

    const wall = room.walls;
    const wallIndex = room.walls.length  ;
    const curWall = room.walls[wallIndex-1];









    return (
        <div className="m-4 sm:m-8 md:m-10 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 text-lightTxt dark:text-darkTxt">
            <div className={"flex flex-col justify-center bg-lightModule dark:bg-darkModule"}>


                {wallIndex !== 0 ? <div className={" "} >
                    <h1 className={"flex justify-center text-2xl md:text-4xl"} >{t("wall")} {room.walls.length}</h1>
                    <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>

                    <div className={"grid grid-cols-1 gap-1.5 mx-3"}>

                        <table className={"table-auto border-separate border-spacing-y-2  "}>
                            <tbody  >

                            <tr >
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("length")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black w-full" }
                                        type="number"
                                        name="length"
                                        value={wall[wallIndex-1].info.length}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>mm</span>
                                </td>
                            </tr>

                            <tr >
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("width")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black w-full" }
                                        type="number"
                                        name="width"
                                        value={wall[wallIndex-1].info.width}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>mm</span>
                                </td>
                            </tr>

                            <tr >
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("thickness")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black w-full" }
                                        type="number"
                                        name="thickness"
                                        value={wall[wallIndex-1].info.thickness}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>mm</span>
                                </td>
                            </tr>

                            <tr >
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("ins_thickness")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black max-lg:h-12 w-full" }
                                        type="number"
                                        name="insThick"
                                        value={wall[wallIndex-1].info.insThick}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>mm</span>
                                </td>
                            </tr>

                            <tr >
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("mat_thickness")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black max-lg:h-12 w-full" }
                                        type="number"
                                        name="matThick"
                                        value={wall[wallIndex-1].info.matThick}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>mm</span>
                                </td>
                            </tr>

                            <tr >
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("material")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <select
                                        className={"text-black max-sm:h-12 w-full"}
                                        name="mat"
                                        value={room.walls[wallIndex-1].info.mat}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    >
                                        {floorMaterial.map((material, index) => (
                                            <option key={index} value={material.name} >
                                                {t(material.name)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>mm</span>
                                </td>
                            </tr>



                            </tbody>
                        </table>





                        <div className={`flex flex-row-reverse`}>
                            <AddWindowButton onAddWindow={() => addWindow(wallIndex-1)} />
                        </div>

                        { curWall.windows.length !== 0 ?
                            <>
                                <h1 className={"flex justify-center text-2xl md:text-4xl"} >{t("win")} {curWall.windows.length}</h1>
                                <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>
                                <table className={"table-auto border-separate border-spacing-y-2"}>

                                    <tbody  >

                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("length")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" w-full px-2 text-black " }
                                                type="number"
                                                name="length"

                                                value={curWall.windows[curWall.windows.length-1].info.length}
                                                onChange={(e) =>handleWindowInfoChange(wallIndex, curWall.windows.length-1, e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>

                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("width")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black w-full" }
                                                type="number"
                                                name="width"
                                                value={wall[wallIndex-1].info.width}
                                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>

                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black w-full" }
                                                type="number"
                                                name="thickness"
                                                value={wall[wallIndex-1].info.thickness}
                                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>
                                    {/*
                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("ins_thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black max-lg:h-12 w-full" }
                                                type="number"
                                                name="insThick"
                                                value={wall[wallIndex-1].info.insThick}
                                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>

                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("mat_thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black max-lg:h-12 w-full" }
                                                type="number"
                                                name="matThick"
                                                value={wall[wallIndex-1].info.matThick}
                                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>

                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("material")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <select
                                                className={"text-black max-sm:h-12 w-full"}
                                                name="mat"
                                                value={room.walls[wallIndex-1].info.mat}
                                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                            >
                                                {floorMaterial.map((material, index) => (
                                                    <option key={index} value={material.name} >
                                                        {t(material.name)}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>
*/}


                                    </tbody>

                                </table>
                            </>

                            :
                            null
                        }



                    </div>
                    <br/>



                    <hr className={"bg-lightHR dark:bg-darkHR  mx-4"}/>
                </div> : null}




                <div className={`flex flex-row-reverse`}>
                    <AddWallButton onAddWall={addWall}/>

                </div>
            </div>


            {room.walls.length >1 ?
                <div className={"h-full bg-lightModule dark:bg-darkModule relative"}>
                    <div className={" absolute inset-0 overflow-auto"}>
                        {room.walls.map((wall, index) => (
                            <div className={"m-2 p-2 h-1/4 bg-lightInfo dark:bg-darkInfo columns-2"}>
                                <p className={"text-2xl"}>Wall {index+1}</p>
                                <p>
                                    {t("length")}: {wall.info.length}
                                    <br/>
                                    {t("width")}: {wall.info.width}
                                    <br/>
                                    {t("thickness")}: {wall.info.thickness}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
                :
                null
            }




        </div>
    );
}

export default Home;
