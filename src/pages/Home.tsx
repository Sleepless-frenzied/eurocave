import React, {useState} from 'react';
import '../App.css';
import {useTranslation} from 'react-i18next';

import {Doors, Room, useContextProvider, Window} from "../assets/Data";
import {BsInfoCircle, BsPlusCircle} from "react-icons/bs";
import {RxCross1} from "react-icons/rx";
import {GiDoorway, GiStoneWall, GiWindow} from "react-icons/gi";
import Modal from "../components/Modal";
import {Link} from "react-router-dom";
import NotWall from "./NotWall";
import DoorsModal from "../components/DoorsModal";
import WinModal from "../components/WinModal";
import AddMatModal from "../components/AddMatModal";


function Home() {
    const {t} = useTranslation();
    const context = useContextProvider();
    const {
        room,
        setRoom, insMaterial, wallMaterial, vitrage, setWhat, setAddMatModal, openAddMatModal
    } = context;

    const [openModal, setModal] = useState(false);
    const [openDoorsModal, setDoorsModal] = useState(false);
    const [openWinModal, setWinModal] = useState(false);

    const [isWindow, setIsWindow] = useState(false);

    const [moreInfo, setMoreInfo] = useState<Doors[] | Window[]>([])
    const [openNotWall, setNotWall] = useState(false);


    type AddWallButtonProps = {
        onAddWall: () => void;
    };
    const AddWallButton = ({onAddWall}: AddWallButtonProps) => {
        return <button className={" bg-lightButton dark:bg-darkButton  m-2 px-4 py-3 text-xl md:text-2xl w-max"}
                       onClick={onAddWall}>{t("add_wall")}</button>;
    };

    type AddDoorButtonProps = {
        onAddDoor: () => void;
    };

    type AddWindowButtonProps = {
        onAddWindow: () => void;
    };
    const AddDoorButton = ({onAddDoor}: AddDoorButtonProps) => {
        return <button className={"flex flex-row"} onClick={() => {
            onAddDoor();
            setDoorsModal(true);
        }}>
            {t("add_door")}
            <BsPlusCircle className={"m-1"}/>
        </button>;
    };

    const AddWindowButton = ({onAddWindow}: AddWindowButtonProps) => {
        return <button className={"flex flex-row"} onClick={() => {
            onAddWindow();
            setWinModal(true);
        }}>
            {t("add_win")}
            <BsPlusCircle className={"m-1"}/>
        </button>;
    };

    const handleWallInfoChange = (
        wallIndex: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        wallIndex -= 1;
        const {name, value} = e.target;
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


    const addWall = () => {
        setRoom((prevRoom) => ({
            walls: [
                ...prevRoom.walls,
                {
                    info: {
                        height: 10,
                        length: 10,
                        width: 0,
                        thickness: 0,
                        mat: "bA13_(gypsum_board)",
                        matThick: 10,
                        insMat: "without_Insulation",
                        insThick: 10,
                    },
                    doors: [],
                    windows: [],
                },
            ],
            floor: prevRoom.floor,
            ceiling: prevRoom.ceiling,
            tempExt: prevRoom.tempExt,
            tempInt: prevRoom.tempInt,

        }));
        console.log(room);
    };

    const addDoor = (wallIndex: number) => {
        setRoom((prevRoom: Room) => {
            const walls = [...prevRoom.walls];
            const doors = [...walls[wallIndex].doors];
            doors.push({
                info: {
                    height: 10,
                    length: 10,
                    width: 0,
                    thickness: 0,
                    mat: "ebA13_(gypsum_board)",
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

    const addWindow = (wallIndex: number) => {
        setRoom((prevRoom) => {
            const walls = [...prevRoom.walls];
            const windows = [...walls[wallIndex].windows];
            windows.push({
                info: {
                    height: 10,
                    length: 10,
                    width: 0,
                    thickness: 0,
                    mat: "Simple vitrage",
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
            return {...prevRoom, walls};
        });
    };

    const deleteWin = (winIndex: number) => {
        setRoom(prevRoom => {
            const walls = [...prevRoom.walls];
            const windows = [...walls[wallIndex - 1].windows];
            windows.splice(winIndex, 1);
            walls[wallIndex - 1] = {
                ...walls[wallIndex - 1],
                windows,
            };
            return {...prevRoom, walls};
        });
    };

    const deleteDoor = (doorIndex: number) => {
        setRoom(prevRoom => {
            const walls = [...prevRoom.walls];
            const doors = [...walls[wallIndex - 1].doors];
            doors.splice(doorIndex, 1);
            walls[wallIndex - 1] = {
                ...walls[wallIndex - 1],
                doors,
            };
            return {...prevRoom, walls};
        });
    };


    const wall = room.walls;
    const wallIndex = room.walls.length;
    const curWall = room.walls[wallIndex - 1];

    const wallsToRender = room.walls.slice(0, -1);
    const winToRender = wall.length === 0 ? [] : curWall.windows.slice(0, -1);
    //const doorsToRender = wall.length===0 ? [] : curWall.doors.slice(0,-1);
    const {addWallMaterial} = useContextProvider();


    return (
        <div
            className={`h-full p-4 sm:p-8 md:p-10 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-4 text-lightTxt dark:text-darkTxt `}>
            {openModal && <Modal setOpenModal={setModal} arrayToDisplay={moreInfo} isWindow={isWindow}/>}
            {openNotWall && <NotWall room={room} setRoom={setRoom} setNotWall={setNotWall}/>}
            {openAddMatModal && <AddMatModal setAddMatModal={setAddMatModal}/>}

            <div className={`flex flex-col relative  justify-center bg-lightModule dark:bg-darkModule `}>


                {openDoorsModal && <DoorsModal room={room} setRoom={setRoom} curWall={curWall} wallIndex={wallIndex}
                                               setDoorsModal={setDoorsModal}/>}
                {openWinModal && <WinModal room={room} setRoom={setRoom} curWall={curWall} wallIndex={wallIndex}
                                           setWinModal={setWinModal}/>}
                {wallIndex !== 0 ? <div className={" "}>
                    <h1 className={"flex justify-center text-2xl md:text-4xl"}><GiStoneWall
                        className={"m-1"}/>{t("wall")} {room.walls.length}</h1>
                    <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>

                    <div className={"grid grid-cols-1 gap-1.5 mx-3"}>

                        <table className={"table-auto border-separate border-spacing-y-7  "}>
                            <tbody>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("height")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black w-full"}
                                        type="number"
                                        name="height"
                                        value={wall[wallIndex - 1].info.height}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>cm</span>
                                </td>
                            </tr>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("length")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <input
                                        className={" px-2 text-black w-full"}
                                        type="number"
                                        name="length"
                                        value={wall[wallIndex - 1].info.length}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                    />
                                </td>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <span className={"px-2 flex justify-center"}>cm</span>
                                </td>
                            </tr>

                            <tr>
                                <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                    <h1 className={"mx-2 overflow-clip"}>{t("material")}:</h1>
                                </td>
                                <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                    <select
                                        className={"text-black max-sm:h-12 w-full"}
                                        name="mat"
                                        value={room.walls[wallIndex - 1].info.mat}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
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
                                        value={wall[wallIndex - 1].info.matThick}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
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
                                        value={room.walls[wallIndex - 1].info.insMat}
                                        onChange={(e) => handleWallInfoChange(wallIndex, e)}
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
                                curWall.info.insMat === "without_Insulation" ? <></> :
                                    <tr>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <h1 className={"mx-2 overflow-clip"}>{t("ins_thickness")}:</h1>
                                        </td>
                                        <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                            <input
                                                className={" px-2 text-black max-lg:h-12 w-full"}
                                                type="number"
                                                name="insThick"
                                                value={wall[wallIndex - 1].info.insThick}
                                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                                            />
                                        </td>
                                        <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                            <span className={"px-2 flex justify-center"}>mm</span>
                                        </td>
                                    </tr>
                            }


                            </tbody>
                        </table>


                        <div className={`flex flex-row-reverse`}>
                            <AddWindowButton onAddWindow={() => addWindow(wallIndex - 1)}/>
                            <span className={"w-5"}/>
                            <AddDoorButton onAddDoor={() => addDoor(wallIndex - 1)}/>
                        </div>


                        {
                            wallIndex >= 0 ?
                                <div>
                                    <div className={"flex flex-wrap overflow-x-auto "}>
                                        {curWall.doors.map((door, index) => (
                                            <div key={index}
                                                 className={"relative m-2 p-2 h-1/4 bg-lightInfo dark:bg-darkInfo columns-3"}>
                                                <GiDoorway className={"m-1 dark:invert-0"}/>
                                                {index + 1}
                                                <RxCross1 onClick={() => deleteDoor(index)}
                                                          className={"absolute top-0 right-0 mr-2 mt-2"}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                null
                        }


                        {
                            wallIndex >= 0 ?
                                <div>

                                    <div className={"flex flex-wrap overflow-x-auto "}>
                                        {curWall.windows.map((door, index) => (
                                            <div key={index}
                                                 className={"relative m-2 p-2 h-1/4 bg-lightInfo dark:bg-darkInfo columns-3"}>
                                                <GiWindow className={"m-1 dark:invert-0"}/>
                                                {index + 1}
                                                <RxCross1 onClick={() => deleteDoor(index)}
                                                          className={"absolute top-0 right-0 mr-2 mt-2"}/>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                :
                                null
                        }


                    </div>

                    <hr className={"bg-lightHR dark:bg-darkHR  mx-4"}/>
                </div> : null}


                {
                    room.walls.length !== 4 ?
                        <div className={`  flex flex-col items-end`}>
                            <AddWallButton onAddWall={addWall}/>
                        </div> :
                        <Link to={"/NotWall"}
                              className={`flex flex-col items-center bg-lightButton mt-2 hover:bg-red-500 px-4 py-3 text-xl md:text-2xl `}
                            //onClick={()=>{localStorage.setItem('redirectProps', JSON.stringify(room));}}
                        >
                            Continue
                        </Link>
                }


            </div>


            {wallsToRender.length > 0 ?
                <div className={" bg-lightModule dark:bg-darkModule relative overflow-y-scroll"}>
                    <br/>
                    <div className={" absolute inset-0 p-2 grid grid-rows-3 gap-2"}>
                        {wallsToRender.map((wall, index) => (
                            <div key={index}
                                 className={"relative p-2 h-full bg-lightInfo dark:bg-darkInfo grid grid-cols-3 overflow-y-scroll"}>

                                <div>
                                    <p className={"text-2xl flex flex-wrap "}><GiStoneWall
                                        className={"mr-2 m-1"}/>{t("wall")} {index + 1}
                                    </p>
                                    <div className={"overflow-auto"}>
                                        {t("height")}: {wall.info.height}
                                        <br/>
                                        {t("length")}: {wall.info.length}
                                        <br/>
                                        {t("material")}: {t(wall.info.mat!)}
                                        <br/>
                                        {t("matThick")}: {wall.info.matThick}
                                        {
                                            wall.info.insMat === "without_Insulation" ? <></> :
                                                <>
                                                    <br/>
                                                    {t("material")}: {t(wall.info.insMat!)}
                                                    <br/>
                                                    {t("ins_thickness")}: {wall.info.insThick}
                                                </>
                                        }


                                    </div>

                                </div>
                                <button disabled={wall.doors.length === 0} onClick={() => {
                                    setModal(true);
                                    setMoreInfo(wall.doors);
                                    setIsWindow(false);
                                }}>
                                    <p className={`text-2xl flex flex-wrap  ${wall.doors.length === 0 ? 'invisible' : ''} `}>
                                        <GiDoorway
                                            className={"mr-2 m-1"}/>{room.walls[index].doors.length} {t("door")}
                                        <BsInfoCircle
                                            className={"m-1"}/></p>
                                </button>


                                <button disabled={wall.windows.length === 0} onClick={() => {
                                    setModal(true);
                                    setMoreInfo(wall.windows);
                                    setIsWindow(true);
                                }} aria-disabled={true}>
                                    <p className={`text-2xl flex flex-wrap  ${wall.windows.length === 0 ? 'invisible' : ''} `}>
                                        <GiWindow className={"mr-2 m-1"}/>{room.walls[index].windows.length} {t("win")}
                                        <BsInfoCircle className={"m-1"}/></p>
                                </button>

                                <RxCross1 onClick={() => deleteWall(index)}
                                          className={"absolute top-0 right-0 mr-2 mt-2"}/>
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
