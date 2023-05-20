import React, {useState} from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';

import {Room, Doors, Wall, Ceiling, Floor, floorMaterial, Info, Window, insMaterial, wallMaterial} from "../assets/Data";
import {BsPlusCircle,BsInfoCircle} from "react-icons/bs";
import {RxCross1} from "react-icons/rx";
import {GiDoorway, GiStoneWall, GiWindow} from "react-icons/gi";
import Modal from "../components/Modal";




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

    type AddDoorButtonProps = {
        onAddDoor: () => void;
    };

    type AddWindowButtonProps = {
        onAddWindow: () => void;
    };
    const AddDoorButton = ({ onAddDoor }: AddDoorButtonProps) => {
        return <button className={"flex flex-row"} onClick={onAddDoor}>
            {t("add_door")}
            <BsPlusCircle  className={"m-1"}/>
        </button>;
    };

    const AddWindowButton = ({ onAddWindow }: AddWindowButtonProps) => {
        return <button className={"flex flex-row"} onClick={onAddWindow}>
            {t("add_win")}
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
                    [name]: name === 'mat' || name === 'insMat' ? value : Number(value),
                },
            };
            return {
                ...prevRoom,
                walls,
            };
        });
    };

    const handleDoorInfoChange = (
        wallIndex: number,
        doorIndex: number,
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        wallIndex -= 1;
        const { name, value } = e.target;
        setRoom((prevRoom) => {
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
                        height: 10,
                        length:0,
                        width: 10,
                        thickness: 0,
                        mat: "expanded_polystyrene" ,
                        matThick: 10,
                        insMat: "without_Insulation",
                        insThick: 10,
                    },
                    doors:[],
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
                    height: 10,
                    length:0,
                    width: 10,
                    thickness: 0,
                    mat: "expanded_polystyrene" ,
                    matThick: 10,
                    insMat: "without_Insulation",
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


    const deleteWall = (wallIndex: number) => {
        setRoom(prevRoom => {
            const walls = [...prevRoom.walls];
            walls.splice(wallIndex, 1);
            return { ...prevRoom, walls };
        });
    };

    const deleteWin = (winIndex: number) => {
        setRoom(prevRoom => {
            const walls = [...prevRoom.walls];
            const windows = [...walls[wallIndex-1].windows];
            windows.splice(winIndex, 1);
            walls[wallIndex-1] = {
                ...walls[wallIndex-1],
                windows,
            };
            return { ...prevRoom, walls };
        });
    };

    const deleteDoor = (doorIndex: number) => {
        setRoom(prevRoom => {
            const walls = [...prevRoom.walls];
            const doors = [...walls[wallIndex-1].doors];
            doors.splice(doorIndex, 1);
            walls[wallIndex-1] = {
                ...walls[wallIndex-1],
                doors,
            };
            return { ...prevRoom, walls };
        });
    };


    const addDoor = (wallIndex: number) => {
        setRoom((prevRoom) => {
            const walls = [...prevRoom.walls];
            const doors = [...walls[wallIndex].doors];
            doors.push({
                info: {
                    height: 10,
                    length:0,
                    width: 10,
                    thickness: 0,
                    mat: "expanded_polystyrene" ,
                    matThick: 10,
                    insMat: "without_Insulation",
                    insThick: 10,
                },
            });
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

    const wall = room.walls;
    const wallIndex = room.walls.length  ;
    const curWall = room.walls[wallIndex-1];

    const wallsToRender = room.walls.slice(0, -1);
    const winToRender = wall.length===0 ? [] : curWall.windows.slice(0,-1);
    const doorsToRender = wall.length===0 ? [] : curWall.doors.slice(0,-1);


    const [openModal,setModal] = useState(false);

    const[moreInfo,setMoreInfo] = useState<Doors[]|Window[]>([])
    {/*
        const wallSurface = curWall.info.height! * curWall.info.length!;
    */}




    return (
        <div className="m-4 sm:m-8 md:m-10 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 text-lightTxt dark:text-darkTxt">
            {openModal && <Modal setOpenModal={setModal} arrayToDisplay={moreInfo}/>}

            <div className={"flex flex-col justify-center bg-lightModule dark:bg-darkModule"}>


                {wallIndex !== 0 ? <div className={" "} >
                    <h1 className={"flex justify-center text-2xl md:text-4xl"} > <GiStoneWall className={"m-1"}/>{t("wall")} {room.walls.length}</h1>
                    <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>

                    <div className={"grid grid-cols-1 gap-1.5 mx-3"}>

                        <table className={"table-auto border-separate border-spacing-y-2  "}>
                            <tbody  >

                            <tr >
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("height")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black w-full" }
                                        type="number"
                                        name="height"
                                        value={wall[wallIndex-1].info.height}
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
                                    <h1 className={"mx-2 overflow-clip"}>{t("material")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <select
                                        className={"text-black max-sm:h-12 w-full"}
                                        name="mat"
                                        value={room.walls[wallIndex-1].info.mat}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    >
                                        {wallMaterial.map((material, index) => (
                                            <option key={index} value={material.name} >
                                                {t(material.name)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}></span>
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
                                    <h1 className={"mx-2 overflow-clip"}>{t("insMat")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <select
                                        className={"text-black max-sm:h-12 w-full"}
                                        name="insMat"
                                        value={room.walls[wallIndex-1].info.insMat}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    >
                                        {insMaterial.map((insMataterial, index) => (
                                            <option key={index} value={insMataterial.name} >
                                                {t(insMataterial.name)}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}></span>
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






                            </tbody>
                        </table>





                        <div className={`flex flex-row-reverse`}>
                            <AddWindowButton onAddWindow={() => addWindow(wallIndex-1)} />
                            <span className={"w-5"}/>
                            <AddDoorButton onAddDoor={() => addDoor(wallIndex-1)} />
                        </div>


                        { curWall.doors.length !== 0 ?
                            <>
                                <h1 className={"flex justify-center text-2xl md:text-4xl"} ><GiDoorway className={"m-1"}/>{t("door")} {curWall.doors.length}</h1>
                                <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>
                                <table className={"table-auto border-separate border-spacing-y-2"}>

                                    <tbody  >

                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("height")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" w-full px-2 text-black " }
                                                type="number"
                                                name="height"

                                                value={curWall.doors[curWall.doors.length-1].info.height}
                                                onChange={(e) =>handleDoorInfoChange(wallIndex, curWall.doors.length-1, e)}
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
                                                className={" w-full px-2 text-black " }
                                                type="number"
                                                name="width"

                                                value={curWall.doors[curWall.doors.length-1].info.width}
                                                onChange={(e) =>handleDoorInfoChange(wallIndex, curWall.doors.length-1, e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>


                                    </tbody>

                                </table>


                                {
                                    doorsToRender.length>0 ?
                                        <div>
                                            <div className={"flex flex-wrqp overflow-x-auto "}>
                                                {doorsToRender.map((door, index) => (
                                                    <div key={index} className={"relative m-2 p-2 h-1/4 bg-lightInfo dark:bg-darkInfo columns-3"}>
                                                        <GiDoorway className={"m-1 dark:invert-0"}/>
                                                        {index+1}
                                                        <RxCross1 onClick={()=> deleteDoor(index)} className={"absolute top-0 right-0 mr-2 mt-2"}/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        :
                                        null
                                }
                            </>

                            :
                            null
                        }

                        { curWall.windows.length !== 0 ?
                            <>
                                <h1 className={"flex justify-center text-2xl md:text-4xl"} ><GiWindow className={"m-1"}/>{t("win")} {curWall.windows.length}</h1>
                                <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>
                                <table className={"table-auto border-separate border-spacing-y-2"}>

                                    <tbody  >

                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("height")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" w-full px-2 text-black " }
                                                type="number"
                                                name="height"

                                                value={curWall.windows[curWall.windows.length-1].info.height}
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
                                                value={curWall.windows[curWall.windows.length-1].info.width}
                                                onChange={(e) => handleWindowInfoChange(wallIndex, curWall.windows.length-1, e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>
                                    {/*
                                    <tr >
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black w-full" }
                                                type="number"
                                                name="thickness"
                                                value={wall[wallIndex-1].windows.info.thickness}
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
*/}
                                    </tbody>


                                </table>

                                {
                                    winToRender.length>0 ?
                                        <div>
                                            <div className={"flex flex-wrqp overflow-x-auto "}>
                                                {winToRender.map((win, index) => (
                                                    <div key={index} className={"relative m-2 p-2 h-1/4 bg-lightInfo dark:bg-darkInfo columns-3"}>
                                                        <GiWindow className={"m-1 dark:invert-0"}/>
                                                        {index+1}
                                                        <RxCross1 onClick={()=> deleteWin(index)} className={"absolute top-0 right-0 mr-2 mt-2"}/>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        :
                                        null
                                }

                            </>

                            :
                            null
                        }



                    </div>
                    <br/>



                    <hr className={"bg-lightHR dark:bg-darkHR  mx-4"}/>
                </div> : null}




                <div className={`flex flex-row-reverse`}>
                    <AddWallButton onAddWall={addWall} />

                </div>
            </div>


            {wallsToRender.length >0 ?
                <div className={"h-full bg-lightModule dark:bg-darkModule relative"}>
                    <br/>
                    <div className={" absolute inset-0 overflow-auto"}>
                        {wallsToRender.map((wall, index) => (
                            <div key={index} className={"relative m-2 p-2 h-1/3 bg-lightInfo dark:bg-darkInfo grid grid-cols-3"}>
                                <div>
                                    <p className={"text-2xl flex flex-wrap "}> <GiStoneWall className={"mr-2 m-1"}/>Wall {index+1} </p>
                                    <p>
                                        {t("height")}: {wall.info.height}
                                        <br/>
                                        {t("width")}: {wall.info.width}
                                        <br/>
                                        {t("material")}: {t(wall.info.mat!)}
                                        <br/>
                                    </p>
                                </div>
                                <div onClick={()=> {
                                    setModal(true);
                                    setMoreInfo(wall.doors);
                                }}>
                                    <p className={`text-2xl flex flex-wrap  ${wall.doors.length===0? 'invisible':'' } `}> <GiDoorway className={"mr-2 m-1"}/>{room.walls[index].doors.length} Doors <BsInfoCircle className={"m-1"}/></p>
                                </div>


                                <div onClick={()=> {
                                    setModal(true);
                                    setMoreInfo(wall.windows);
                                }} aria-disabled={true}>
                                    <p className={`text-2xl flex flex-wrap  ${wall.windows.length===0? 'invisible':'' } `}> <GiWindow className={"mr-2 m-1"}/>{room.walls[index].windows.length} Windows<BsInfoCircle className={"m-1"}/></p>
                                </div>

                                <RxCross1 onClick={()=> deleteWall(index)} className={"absolute top-0 right-0 mr-2 mt-2"}/>
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
