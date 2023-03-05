import { SpaceProps } from "../map/geography";

export type Marker = {
    name: string;
    lat: number;
    lon: number;
}

export type Map = {
    name: string;
    backgroundImage: string;
    extent: SpaceProps;
    markers: Marker[];
}
