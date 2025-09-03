export const URL_COG_SERVER = "http://localhost:8000";
export const URL_BACKEND_SERVER = "http://localhost:3001";

export const DEFAULT_CENTER: [number, number] = [-21.170876, 55.286604];
export const DEFAULT_ZOOM = 18;

export type Layer = {
    name: string;
    url: string;
    group: string;
};

export type COGServerResponse = {
    id: string;
    url: string;
    name: string;
    attribution: string;
};

export type LinkType = {
    link: string;
    name: string;
};

export type EdnaDataType = {
    place: string;
    GPSLatitude: string;
    GPSLongitude: string;
    date: string;
    description: string;
    thumbnail: string;
    publication: LinkType;
    data: LinkType;
};
