import React from 'react';
import {useContextProvider} from "../assets/Data";
import {useTranslation} from "react-i18next";


function calculateTriangleArea(a: number, b: number, c: number): number {
    const s = (a + b + c) / 2; // semi-perimeter
    return Math.sqrt(s * (s - a) * (s - b) * (s - c)); // Heron's formula
}

function calculatePolygonSurfaceArea(sideLengths: number[], numPoints: number): number {
    let totalArea = 0;
    const numTriangles = sideLengths.length - 2;

    for (let i = 0; i < numTriangles; i++) {
        const triangleArea = calculateTriangleArea(
            sideLengths[0],
            sideLengths[i + 1],
            sideLengths[i + 2]
        );
        totalArea += triangleArea;
    }

    return totalArea;

}

function calculateRectangleArea(lengths: number[]): number {
    if (lengths.length !== 4) {
        throw new Error("The array does not correspond to a valid rectangle or square.");
    }
    const length = Math.max(...lengths);
    const width = Math.min(...lengths);

    const area = length / 100 * width / 100;
    return area;
}

function getSurface(item: any) {
    return item.info.length / 100 * item.info.height / 100;
}

let Thickness = 0;
let Conductivity = 0;
let InsConductivity = 0;
let InsThickness = 0;
let Coef = 0;


let wallSurface = 0;
let wallCoef = 0;
let wallLoss = 0;

let windowSurface = 0;
let windowCoef = 0;
let windowLoss = 0;

let doorSurface = 0;
let doorCoef = 0;
let doorLoss = 0;

let internalCoef = 10;
let externalCoef = 10;
//Wall,Window,Door
let globalCoef = [0, 0, 0];


let finalSurface = 0;
let finalLoss = 0;


function useCalc(room: any) {


    finalLoss = 0;


    const wallsToRender = room?.walls;
    //?.slice(0, -1);

    const context = useContextProvider();
    const {insMaterial, wallMaterial, vitrage} = context;


    const getCoef = (Item: any, IsWindow: boolean = false): number => {
        if (IsWindow) {
            Thickness = parseFloat(vitrage.find((material: any) => material.name === Item.info.mat)!.thickness.replace(',', '.'));
            Conductivity = parseFloat(vitrage.find((material: any) => material.name === Item.info.mat)!.coef.replace(',', '.'));
        } else {
            Thickness = Item.info.matThick!;
            Conductivity = parseFloat(wallMaterial.find((material: any) => material.name === Item.info.mat)!.coef.replace(',', '.'));
            InsThickness = Item.info.insThick!;
            InsConductivity = parseFloat(insMaterial.find((material: any) => material.name === Item.info.insMat)!.coef.replace(',', '.'));
        }

        Coef = 1 / ((1 / (Conductivity / Thickness * 1000)) + (1 / (InsConductivity / InsThickness * 1000)));
        return Coef;
    };

    let idx = 0;
    console.log(wallsToRender)

    wallsToRender?.forEach((wall: any) => {
        wallSurface = getSurface(wall);

        wallCoef = getCoef(wall);

        globalCoef[0] = 1 / (1 / wallCoef + 1 / externalCoef + 1 / internalCoef)

        console.log("wall surface" + idx + ": " + wallSurface);
        console.log("wall coef" + idx + ": " + wallCoef);
        console.log("global wall coef" + idx + ": " + globalCoef[0]);


        wall?.windows?.forEach((window: any) => {
            const curWindowSurface = getSurface(window);
            windowSurface += curWindowSurface;

            windowCoef = getCoef(window, true);

            globalCoef[1] = 1 / (1 / windowCoef + 1 / externalCoef + 1 / internalCoef);
            console.log("global window coef" + window.key + ": " + globalCoef[1]);

            finalLoss += globalCoef[1] * curWindowSurface;

            //console.log(finalLoss);
        })
        wall?.doors?.forEach((door: any) => {
            const curDoorSurface = getSurface(door);
            doorSurface += curDoorSurface;

            doorCoef = getCoef(door);

            globalCoef[2] = 1 / (1 / doorCoef + 1 / externalCoef + 1 / internalCoef);

            finalLoss += globalCoef[2] * curDoorSurface;
            //console.log(finalLoss);

        })

        finalSurface = wallSurface - windowSurface - doorSurface;

        wallLoss = globalCoef[0] * finalSurface;


        finalLoss += wallLoss + windowLoss + doorLoss;
        //console.log(finalLoss);

        idx++;


    });


    const lengthArray: number[] = wallsToRender.map((wall: any) => wall.info?.length!);

    const roomSurface = calculateRectangleArea(lengthArray);
    console.log("Room surface" + ": " + roomSurface);
    const floorCoef = getCoef(room.floor);
    console.log("floor coef" + ": " + floorCoef);
    const floorGlobalCoef = 1 / (1 / floorCoef + 1 / externalCoef + 1 / internalCoef);
    finalLoss += floorGlobalCoef * roomSurface;

    const ceilingCoef = getCoef(room.ceiling);
    const ceilingGlobalCoef = 1 / (1 / ceilingCoef + 1 / externalCoef + 1 / internalCoef);


    finalLoss += ceilingGlobalCoef * roomSurface;

    console.log("c" + ": " + ceilingGlobalCoef);
    console.log("room" + ": " + roomSurface);
    console.log("FinalLoss" + ": " + finalLoss);


    const final = (finalLoss * (room.tempExt - room.tempInt)).toFixed(3);

    console.log("FinalFinal" + ": " + final);


    return final;
//room.tempExt-room.tempInt
}


export default function Result() {
    const redirectPropsString = localStorage.getItem('redirectProps');
    const room = redirectPropsString ? JSON.parse(redirectPropsString) : null;
    //console.log("try: "+calculatePolygonSurfaceArea([10, 10, 10, 10, 10],100))
    //console.log("try: "+calculatePolygonSurfaceArea([4, 5, 5, 4, 8],100))


    const {t} = useTranslation();

    return (

        <div
            className={"text-sm md:text-xl bg-light dark:bg-dark flex flex-col justify-center items-center h-full w-full p-6 text-justify "}>
            <div className={" text-xl md:text-8xl text-red-500 border-red-500 border-2 px-5 py-2"}>
                <p className={""}>
                    {t("necessary")}
                </p>
                <p className={"flex justify-center items-center text-justify "}>
                    {useCalc(room)}W
                </p>

            </div>
            <br/>
            <div className={"flex justify-between text-lightTxt w-full px-3 gap-2 divide-x-2 divide-dark"}>
                <p>
                    {t("device")}
                    <br/>
                    INOA 25
                    <br/>

                    INOA 50
                </p>
                <p>
                    {t("fridge")}
                    <br/>
                    600 Watts
                    <br/>
                    1200 Watts
                </p>
                <p className={""}>
                    {t("resistance")}
                    <br/>
                    650 Watts
                    <br/>
                    650 Watts
                </p>

            </div>
            <br/>
            <div className={"text-lightTxt "}>
                <p>{t("nota")}</p>
            </div>
        </div>

    )
}
