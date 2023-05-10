
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