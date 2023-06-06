import React, { createContext, useState, ReactNode } from 'react';

export const floorMaterial =[
    {name: "expanded_polystyrene", coef: ""},
    {name: "extruded_polystyrene", coef: ""},
    {name: "polyurethane", coef: ""},
    {name: "concrete_only", coef: ""},
    {name: "brick_only", coef: ""},
    {name: "clay", coef: ""},

];


export const ceilingMaterial =[
    {name: "expanded_polystyrene", coef: ""},
    {name: "extruded_polystyrene", coef: ""},
    {name: "polyurethane", coef: ""},
    {name: "concrete_only", coef: ""},
    {name: "brick_only", coef: ""},
    {name: "clay", coef: ""},
];


/*export const wallMaterial=[
    {name: "bA13_(gypsum_board)", coef: "0,416"},
    {name: "concrete", coef: "1,8"},
    {name: "cellular_concrete", coef: "0,25"},
    {name: "wood", coef: "0,2"},
    {name: "hollow_brick", coef: "0,45"},
    {name: "hollow_brick_(Large)_20cm", coef: "0,266"},
    {name: "hollow_brick_20cm", coef: "0,45"},
    {name: "solid_brick", coef: "1,17"},
    {name: "cement", coef: "1,75"},
    {name: "rubble", coef: "0,95"},
    {name: "stone", coef: "1,8"},
    {name: "plaster", coef: "0,37"},
    {name: "siporex", coef: "0,129"},
    {name: "dry earth", coef: "0,345"},
]


export const insMaterial=[
    {name: "without_Insulation", coef: "0,01"},
    {name: "airflex_(10mm)", coef: "0,0017"},
    {name: "asbestos", coef: "0,08"},
    {name: "wood", coef: "0,2"},
    {name: "depron:_polystyrene_foam", coef: "0,035"},
    {name: "eFISOL_TMS", coef: "0,025"},
    {name: "wood_wool", coef: "0,041"},
    {name: "glass_wool", coef: "0,041"},
    {name: "polyurethane_foam", coef: "0,025"},
    {name: "expanded_polystyrene", coef: "0,044"},
    {name: "extruded_polystyrene", coef: "0,028"},
    {name: "dry_earth", coef: "0,345"},
    {name: "tri_Iso_super_9_(20mm)", coef: "0,004"},
]


export const vitrage=[
    {name:"Simple vitrage",thickness:"1",coef:"0,78"},
    {name:"VITRAGE 4 x 6 x 4 (K = 3.3)",thickness:"14",coef:"0,046"},
    {name:"VITRAGE 4 x 8 x 4 (K = 3.1)",thickness:"16",coef:"0,049"},
    {name:"VITRAGE 4 x 10 x 4 (K = 3)",thickness:"18",coef:"0,054"},
    {name:"VITRAGE 4 x 12 x 4 (K = 2.9)",thickness:"20",coef:"0,058"},
    {name:"VITRAGE 4 x 16 x 4 (K = 2.8)",thickness:"24",coef:"0,067"},
    {name:"VITRAGE 6 x 20 x 6 (K = 1,1) ",thickness:"32",coef:"0,035"},
    {name:"VITRAGE 6 x 12 x 6 Argon",thickness:"24",coef:"0,016"},
]
*/


export const desiredTemperature = [
    { label: "12 C°" },
    { label: "13 C°" },
    { label: "14 C°" },
    { label: "15 C°" },
    { label: "16 C°" },
];

export type Room = {
    walls: Wall[];
    floor: Floor;
    ceiling: Ceiling;
    tempInt: number;
    tempExt: number;
};

export type Info = {
    height: number | undefined,
    length: number | undefined,
    width: number| undefined;
    thickness: number | undefined,
    mat: string | undefined
    matThick: number | undefined;
    insMat: string | undefined
    insThick: number | undefined;
}


export type Ceiling = {
    info: Info;
}

export type Floor = {
    info: Info;
}
export type Wall = {
    info: Info;
    windows: Window[];
    doors :Doors[];
};
export type Doors={
    info:Info;
}

export type Window = {
    info: Info;
}



/*
export const [wallMat, setWallMaterial] = useState(wallMaterial);
export const [winMat, setWinMaterial] = useState(vitrage);
export const [insMat, setInsMat] = useState(insMaterial);
export const [what , setWhat] = useState("wall");
*/


type WallMaterial = {
    name: string;
    coef: string;
};

type InsMaterial = {
    name: string;
    coef: string;
};

export type Vitrage = {
    name: string;
    thickness: string;
    coef: string;
};

type ContextType = {
    wallMaterial: WallMaterial[];
    addWallMaterial: (material: WallMaterial) => void;
    insMaterial: InsMaterial[];
    addInsMaterial: (material: InsMaterial) => void;
    vitrage: Vitrage[];
    addVitrage: (material: Vitrage) => void;
    what:string;
    setWhat: (value: string) => void;
    openAddMatModal:boolean;
    setAddMatModal:(value:boolean)=>void;
};
const Context = createContext<ContextType>({} as ContextType);

type ProviderProps = {
    children: ReactNode;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
    const [wallMaterial, setWallMaterial] = useState<WallMaterial[]>([
        {name: "bA13_(gypsum_board)", coef: "0,416"},
        {name: "concrete", coef: "1,8"},
        {name: "cellular_concrete", coef: "0,25"},
        {name: "wood", coef: "0,2"},
        {name: "hollow_brick", coef: "0,45"},
        {name: "hollow_brick_(Large)_20cm", coef: "0,266"},
        {name: "hollow_brick_20cm", coef: "0,45"},
        {name: "solid_brick", coef: "1,17"},
        {name: "cement", coef: "1,75"},
        {name: "rubble", coef: "0,95"},
        {name: "stone", coef: "1,8"},
        {name: "plaster", coef: "0,37"},
        {name: "siporex", coef: "0,129"},
        {name: "dry earth", coef: "0,345"},
    ]);
    const [insMaterial, setInsMaterial] = useState<InsMaterial[]>([
        {name: "without_Insulation", coef: "0,01"},
        {name: "airflex_(10mm)", coef: "0,0017"},
        {name: "asbestos", coef: "0,08"},
        {name: "wood", coef: "0,2"},
        {name: "depron:_polystyrene_foam", coef: "0,035"},
        {name: "eFISOL_TMS", coef: "0,025"},
        {name: "wood_wool", coef: "0,041"},
        {name: "glass_wool", coef: "0,041"},
        {name: "polyurethane_foam", coef: "0,025"},
        {name: "expanded_polystyrene", coef: "0,044"},
        {name: "extruded_polystyrene", coef: "0,028"},
        {name: "dry_earth", coef: "0,345"},
        {name: "tri_Iso_super_9_(20mm)", coef: "0,004"},
    ]);

    const [vitrage, setVitrage] = useState<Vitrage[]>([
        {name:"Simple vitrage",thickness:"1",coef:"0,78"},
        {name:"VITRAGE 4 x 6 x 4 (K = 3.3)",thickness:"14",coef:"0,046"},
        {name:"VITRAGE 4 x 8 x 4 (K = 3.1)",thickness:"16",coef:"0,049"},
        {name:"VITRAGE 4 x 10 x 4 (K = 3)",thickness:"18",coef:"0,054"},
        {name:"VITRAGE 4 x 12 x 4 (K = 2.9)",thickness:"20",coef:"0,058"},
        {name:"VITRAGE 4 x 16 x 4 (K = 2.8)",thickness:"24",coef:"0,067"},
        {name:"VITRAGE 6 x 20 x 6 (K = 1,1) ",thickness:"32",coef:"0,035"},
        {name:"VITRAGE 6 x 12 x 6 Argon",thickness:"24",coef:"0,016"},
    ]);

    const [what,setWhat]= useState("")


    const [openAddMatModal, setAddMatModal] = useState(false);


    const addWallMaterial = (material: WallMaterial) => {
        setWallMaterial((prevMaterials) => [...prevMaterials, material]);
    };

    const addInsMaterial = (material: InsMaterial) => {
        setInsMaterial((prevMaterials) => [...prevMaterials, material]);
    };

    const addVitrage = (material: Vitrage) => {
        setVitrage((prevMaterials) => [...prevMaterials, material]);
    };


    return (
        <Context.Provider
            value={{
                wallMaterial,
                addWallMaterial,
                insMaterial,
                addInsMaterial,
                vitrage,
                addVitrage,
                what,
                setWhat,
                openAddMatModal,
                setAddMatModal,
            }}
        >
            {children}
        </Context.Provider>
    );
};

const useContextProvider = () => React.useContext(Context);

export { Provider, useContextProvider };
