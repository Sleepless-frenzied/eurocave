import React, {useState} from 'react';
import '../App.css';
import { useTranslation } from 'react-i18next';

import {FaBeer,} from 'react-icons/fa';
import {Room, Wall, Ceiling, Floor, floorMaterial, Info,Window} from "../assets/Data";
import Select from 'react-select';



function Home() {
    const { t} = useTranslation();

    const initialRoom: Room = {
        walls: [
        ],
    };

    type AddWallButtonProps = {
        onAddWall: () => void;
    };
    const AddWallButton = ({ onAddWall }: AddWallButtonProps) => {
        return <button className={" bg-lightButton dark:bg-darkButton  m-2 px-4 py-3 text-xl md:text-2xl w-max"} onClick={onAddWall}>Add Wall</button>;
    };

    type AddWindowButtonProps = {
        onAddWindow: () => void;
    };

    const AddWindowButton = ({ onAddWindow }: AddWindowButtonProps) => {
        return <button onClick={onAddWindow}>Add Window</button>;
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
                    length: 0,
                    width: 0,
                    thickness: 0 ,
                    mat: "" ,
                    matThick: 0,
                    insMat: "",
                    insThick: 0 ,
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





    return (
        <div className=" m-8 md:m-14 grid grid-cols-2 gap-4 ">
            <div className={"flex flex-col justify-center bg-red-500"}>


                {wallIndex !== 0 ? <div className={" "} >
                    <h1 className={"flex justify-center text-2xl md:text-4xl"} >Wall {room.walls.length}</h1>
                    <hr className={"bg-lightHR dark:bg-darkHR my-2 mx-4"}/>
                    <div className={"grid grid-cols-1 gap-1.5 mx-3"}>
                        <div className={"divide-x-2 divide-dark md:text-lg flex justify-between border-2 border-darkDivi "}>
                            <h1 className={"mx-2"}>Length:</h1>
                            <input
                                className={" w-full px-2 text-black " }
                                type="number"
                                name="length"
                                value={wall[wallIndex-1].info.length}
                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                            />
                            <span className={"px-2"}>mm</span>
                        </div>
                        <div className={"divide-x-2 divide-dark md:text-lg flex justify-between border-2 border-darkDivi "}>
                            <h1 className={"mx-2"}>Width:</h1>
                            <input
                                className={" w-full px-2 text-black " }
                                type="number"
                                name="width"
                                value={wall[wallIndex-1].info.width}
                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                            />
                            <span className={"px-2"}>mm</span>
                        </div>
                        <div className={"divide-x-2 divide-dark md:text-lg flex justify-between border-2 border-darkDivi "}>
                            <h1 className={"mx-2"}>Thickness:</h1>
                            <input
                                className={" w-full px-2 text-black " }
                                type="number"
                                name="height"
                                value={wall[wallIndex-1].info.thickness}
                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                            />
                            <span className={"px-2"}>mm</span>
                        </div>
                        <div className={"divide-x-2 divide-dark md:text-lg flex justify-between border-2 border-darkDivi "}>
                            <h1 className={"mx-2"}>Materiel thickness:</h1>
                            <input
                                className={" w-full px-2 text-black " }
                                type="number"
                                name="matThick"
                                value={wall[wallIndex-1].info.matThick}
                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                            />
                            <span className={"px-2"}>mm</span>
                        </div>
                        <div className={"divide-x-2 divide-dark md:text-lg flex justify-between border-2 border-darkDivi "}>
                            <h1 className={"mx-2"}>Insulation thickness:</h1>
                            <input
                                className={" w-full px-2 text-black " }
                                type="number"
                                name="insThick"
                                value={wall[wallIndex-1].info.insThick}
                                onChange={(e) => handleWallInfoChange(wallIndex, e)}
                            />
                            <span className={"px-2"}>mm</span>
                        </div>



                        <select
                            className={"text-black"}
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



                    </div>
                    <br/>
                    <hr className={"bg-lightHR dark:bg-darkHR  mx-4"}/>
                </div> : <></>}



                <div className={`flex flex-row-reverse`}>
                    <AddWallButton onAddWall={addWall}/>

                </div>
            </div>


            <div className={"h-full bg-red-500 relative"}>
                <div className={"absolute inset-0 overflow-y-scroll"}>
                    {room.walls.map((wall, index) => (
                        <div className={"m-2 p-2 h-1/4 bg-red-400"}>
                            <p>Wall {index+1}</p>
                            <p>
                                Hauteur: {wall.info.length}
                                <br/>
                                Largeur: {wall.info.width}
                                <br/>
                                Epaisseur: {wall.info.width}

                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Home;
