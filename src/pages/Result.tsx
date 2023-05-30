import React from 'react';
import {insMaterial, Room, wallMaterial} from "../assets/Data";

function calculatePolygonSurfaceArea(sideLengths: number[]): number | string {
    // Check if the number of side lengths is sufficient to form a polygon
    if (sideLengths.length < 3) {
        return "Invalid input. A polygon must have at least 3 side lengths.";
    }

    // Check if the number of side lengths matches the number of vertices
    const numSides: number = sideLengths.length;
    const numVertices: number = numSides;
    if (numSides !== numVertices) {
        return "Invalid input. The number of side lengths must match the number of vertices.";
    }

    // Calculate the surface area using the triangulation method
    let totalArea: number = 0;
    for (let i = 1; i < numVertices - 1; i++) {
        const sideA: number = sideLengths[0];
        const sideB: number = sideLengths[i];
        const sideC: number = sideLengths[i + 1];

        const semiperimeter: number = (sideA + sideB + sideC) / 2;
        const triangleArea: number = Math.sqrt(
            semiperimeter *
            (semiperimeter - sideA) *
            (semiperimeter - sideB) *
            (semiperimeter - sideC)
        );

        totalArea += triangleArea;
    }

    return totalArea;
}

function getSurface(item:any){
    return item.length * item.height;
}

let wallSurface = 0;
let wallThickness = 0;
let wallConductivity = 0;
let wallInsThickness = 0;
let wallInsConductivity = 0;
let wallCoef =0 ;
let wallLoss =0;

let internalCoef = 10;
let externalCoef = 10;
let globalCoef = 0;

let windowSurface = 0;
let windowThickness = 0;
let windowConductivity = 0;


let doorSurface = 0;

let finalSurface = 0;
let finalLoss =0;

function calc(room:Room){
    room.walls.forEach((wall)=>{

        wallSurface = getSurface(wall);
        wallConductivity = parseInt(wallMaterial.find((item) => item.name === wall.info.mat)!.coef);
        wallThickness = wall.info.thickness!;
        wallInsConductivity = parseInt(insMaterial.find((item) => item.name === wall.info.insMat)!.coef);
        wallInsThickness = wall.info.insThick!;

        wallCoef =1/( 1/(wallThickness/(wallConductivity*1000)) + 1/(wallInsThickness/(wallInsConductivity*1000)));

        globalCoef = 1/(1/wallCoef+1/externalCoef+1/internalCoef)


        wall.windows.forEach((window)=>{
            windowThickness = window.info.thickness!;
            wallCoef += 1/(windowThickness)
            windowConductivity = parseInt(insMaterial.find((item) => item.name === window.info.insMat)!.coef);
            windowSurface += getSurface(window);
        })


        wall.doors.forEach((door)=>{
            doorSurface += getSurface(door);
        })

        finalSurface = wallSurface - windowSurface - doorSurface;
        wallLoss += globalCoef*finalSurface


    })
    return(
        <div>
            {wallConductivity}
        </div>
    )
}
