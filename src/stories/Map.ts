export type Marker = {
    name: string;
    lat: number;
    lon: number;
}

export type Map = {
    name: string;
    backgroundImage: string;
    markers: Marker[];
}
