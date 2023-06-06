import { RxCross2 } from "react-icons/rx";
import React, { useState } from "react";
import {useContextProvider, Vitrage} from "../assets/Data";
import {useTranslation} from "react-i18next";

interface Material {
    name: string;
    coef: string;
    thickness?: string; // Added optional property for thickness
}

export default function AddMatModal({ setAddMatModal }: { setAddMatModal: Function }) {

    const {t} = useTranslation()
    const context = useContextProvider();
    const {
        wallMaterial,
        addWallMaterial,
        insMaterial,
        addInsMaterial,
        vitrage,
        addVitrage,
        what
    } = context;
    const [newMaterial, setNewMaterial] = useState<Material>({
        name: "",
        coef: "",
        thickness: "" // Initialized thickness with an empty string
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewMaterial((prevMaterial) => ({ ...prevMaterial, [name]: value }));
    };

    const addMaterial = () => {
        switch (what) {
            case "win": {
                if (newMaterial.name && newMaterial.coef && newMaterial.thickness) {
                    const vitrageMaterial: Vitrage = {
                        name: newMaterial.name,
                        thickness: newMaterial.thickness,
                        coef: newMaterial.coef,
                    };
                    addVitrage(vitrageMaterial);
                }
                break;
            }
            case "ins": {
                addInsMaterial(newMaterial);
                break;
            }
            default: {
                addWallMaterial(newMaterial);
                break;
            }
        }
        setAddMatModal(false);
    };

    return (
        <div className={" bg-lightModule bg-darkModule absolute inset-0 flex justify-center items-center z-20 m-auto h-1/2 w-5/6 xl:w-1/2 "}>
            <div className="relative h-full w-full overflow-y-auto border-4 border-red-500 flex flex-col justify-center items-center  ">
                <button
                    className={"absolute top-0 right-0 "}
                    onClick={() => {
                        setAddMatModal(false);
                    }}
                >
                    <RxCross2 className={"m-1"} />
                </button>


                <p className={"text-2xl"}>{t("newMat")}</p>


                <table>
                    <tbody>
                    <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                        <h1 className={"mx-2 overflow-clip"}>{t("name")}:</h1>
                    </td>
                    <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                        <input
                            className={" px-2 text-black w-full"}
                            type="text"
                            name="name"
                            value={newMaterial.name}
                            onChange={handleInputChange}
                            placeholder="Enter name"
                        />
                    </td>
                    <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                        <span className={"px-2 flex justify-center"}>cm</span>
                    </td>


                    <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                        <h1 className={"mx-2 overflow-clip"}>{t("coef")}:</h1>
                    </td>
                    <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                        <input
                            className={" px-2 text-black w-full"}
                            type="number"
                            name="coef"
                            value={newMaterial.coef}
                            onChange={handleInputChange}
                            placeholder="Enter coef"
                        />
                    </td>
                    <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                        <span className={"px-2 flex justify-center"}>cm</span>
                    </td>



                    {what === "win" && (
                        <>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                <h1 className={"mx-2 overflow-clip"}>{t("thickness")}:</h1>
                            </td>
                            <td className={"border-2 border-lightDivi  dark:border-darkDivi"}>
                                <input
                                    className={" px-2 text-black w-full"}
                                    type="number"
                                    name="coef"
                                    value={newMaterial.thickness}
                                    onChange={handleInputChange}
                                    placeholder="Enter coef"
                                />
                            </td>
                            <td className={"border-2 border-lightDivi dark:border-darkDivi"}>
                                <span className={"px-2 flex justify-center"}>cm</span>
                            </td>
                        </>
                    )}


                    </tbody>
                </table>
                <button className={"absolute bottom-0 right-0 bg-lightButton  m-2 px-5 py-2 text-xl md:text-2xl "} onClick={addMaterial}>{t("add")}</button>
            </div>
        </div>
    );
}
