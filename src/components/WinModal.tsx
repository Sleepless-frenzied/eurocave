import React from 'react'
import {useTranslation} from "react-i18next";
import {GiCheckMark, GiWindow} from "react-icons/gi";
import {Room, useContextProvider,} from "../assets/Data";

function WinModal({setRoom, curWall, wallIndex, setWinModal}: any) {
    const {t} = useTranslation();

    const context = useContextProvider();
    const {insMaterial, wallMaterial, vitrage, setWhat, setAddMatModal, openAddMatModal} = context;


    const handleWindowInfoChange = (
        wallIndex: number,
        windowIndex: number,
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        wallIndex -= 1;
        const {name, value} = e.target;
        setRoom((prevRoom: Room) => {
            const walls = [...prevRoom.walls];
            const windows = [...walls[wallIndex].windows];
            windows[windowIndex] = {
                ...windows[windowIndex],
                info: {
                    ...windows[windowIndex].info,
                    [name]: name === 'mat' || name === 'insMat' ? value : Number(value),
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


    return (
        <div
            className={" overflow-y-auto bg-lightModule dark:bg-darkModule absolute inset-0 flex justify-center items-center z-10 m-auto h-full w-full "}>
            <div className="relative h-full w-full ">
                <button
                    className={"absolute bottom-0 right-0 bg-lightButton dark:bg-darkButton px-6 py-3 m-3 flex flex-wrap"}
                    onClick={() => {
                        setWinModal(false);
                        console.log(curWall.windows.info)
                    }}
                >
                    {t("validate")}
                    <GiCheckMark className={"m-1"}/>
                </button>

                <div className={"grid grid-cols-1 gap-1.5 mx-3"}>
                    <h1 className={"flex justify-center text-2xl md:text-4xl"}><GiWindow
                        className={"m-1"}/>{t("win")} {curWall.windows.length}</h1>
                    <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>
                    <table className={"table-auto border-separate border-spacing-y-2"}>

                        <tbody>

                        <tr>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                <h1 className={"mx-2 overflow-clip"}>{t("height")}:</h1>
                            </td>
                            <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                <input
                                    className={" w-full px-2 text-black "}
                                    type="number"
                                    name="height"

                                    value={curWall.windows[curWall.windows.length - 1].info.height}
                                    onChange={(e) => handleWindowInfoChange(wallIndex, curWall.windows.length - 1, e)}
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
                                    value={curWall.windows[curWall.windows.length - 1].info.length}
                                    onChange={(e) => handleWindowInfoChange(wallIndex, curWall.windows.length - 1, e)}
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
                                    value={curWall.windows[curWall.windows.length - 1].info.mat}
                                    onChange={(e) => handleWindowInfoChange(wallIndex, curWall.windows.length - 1, e)}
                                >
                                    {vitrage.map((material, index) => (
                                        <option key={index} value={material.name}>
                                            {t(material.name)}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                        <span onClick={() => {
                                            setWhat("win");
                                            setAddMatModal(true);
                                        }} className={"px-2 flex justify-center"}>+</span>
                            </td>

                        </tr>


                        {/*
                        <tr>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                <h1 className={"mx-2 overflow-clip"}>{t("material")}:</h1>
                            </td>
                            <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                <select
                                    className={"text-black max-sm:h-12 w-full"}
                                    name="mat"
                                    value={curWall.windows[curWall.windows.length - 1].info.mat}
                                    onChange={(e) => handleWindowInfoChange(wallIndex, curWall.windows.length - 1, e)}
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
                                    value={curWall.windows[curWall.windows.length - 1].info.matThick}
                                    onChange={(e) =>  handleWindowInfoChange(wallIndex, curWall.windows.length - 1, e)}
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
                                    value={curWall.windows[curWall.windows.length - 1].info.insMat}
                                    onChange={(e) => handleWindowInfoChange(wallIndex, curWall.windows.length - 1, e)}
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
                            curWall.windows[curWall.windows.length - 1].info.insMat === "without_Insulation"?<></>:
                                <tr>
                                    <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                        <h1 className={"mx-2 overflow-clip"}>{t("ins_thickness")}:</h1>
                                    </td>
                                    <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                        <input
                                            className={" px-2 text-black max-lg:h-12 w-full"}
                                            type="number"
                                            name="insThick"
                                            value={curWall.windows[curWall.windows.length - 1].info.insThick}
                                            onChange={(e) =>  handleWindowInfoChange(wallIndex, curWall.windows.length - 1, e)}
                                        />
                                    </td>
                                    <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                        <span className={"px-2 flex justify-center"}>mm</span>
                                    </td>
                                </tr>
                        }

                        */}


                        </tbody>


                    </table>
                </div>

                <br/>
                <hr className={"bg-lightHR dark:bg-darkHR  mx-4"}/>
            </div>

        </div>

    )
}

export default WinModal;