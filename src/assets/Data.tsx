
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

export const wallMaterial=[
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



export const desiredTemperature = [
    { label: "12 C°" },
    { label: "13 C°" },
    { label: "14 C°" },
    { label: "15 C°" },
    { label: "16 C°" },
];

export type Room = {
    walls: Wall[];
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
};

export type Window = {
    info: Info;
}