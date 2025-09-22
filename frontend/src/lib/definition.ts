import type { LucideProps } from "lucide-react";

export const DEFAULT_CENTER: [number, number] = [-21.170876, 55.286604];
export const DEFAULT_ZOOM = 18;

export const DEFAULT_SELECTED_PLATFORMS = ["ASV"];
export const DEFAULT_SELECTED_START_DATE = "2023-06-11";
export const DEFAULT_SELECTED_END_DATE = "2025-06-20";
export const DEFAULT_SELECTED_FRAMES_FIELDS = ["GPSLatitude", "GPSLongitude", "version_doi", "relative_file_path"];

export const ICON_SIZE: [number, number] = [30, 37.5]; // size of the icon
export const SHADOW_SIZE: [number, number] = [41, 41]; // size of the shadow
export const ICON_ANCHOR: [number, number] = [15, 37.5];
export const SHADOW_ANCHOR: [number, number] = [20.5, 41]; // point of the icon which will correspond to marker's location
export const POPUP_ANCHOR: [number, number] = [0, -30]; // point from which the popup should open relative to the iconAnchor

export const TOKEN_PAGE_EXPORTER = "token_page_exporter";
export const TOKEN_PAGE_ASV_EXPLORER = "token_page_asv_explorer";
export const TOKEN_PAGE_EXPLORER = "token_page_explorer";

export interface Item {
    id: string;
    name: string;
}

export interface DepositSearchTerms {
    platforms: string[];
    timeline: {
        min: string;
        max: string;
    };
}

export interface LinkItem {
    name: string;
    href: string;
    icon?: React.ComponentType<LucideProps>;
}

export interface TutorialStep {
    title: string;
    description: string;
    selector: string;
}

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
    description: string;
};

export type SpecieWithColor = { name: string; color: string };

export type COGFiltersASV = {
    species: SpecieWithColor[];
    years: number[];
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

export type GCRMNPointType = {
    id: number;
    mnemonic: string;
    label: string;
    latitude: number;
    longitude: number;
    creation_date: string;
    update_date: string;
};

export type Deposit = {
    doi: string;
    session_name: string;
    have_processed_data: boolean;
    have_processed_raw: boolean;
    session_date: string;
    alpha3_country_code: string;
    location: string;
    platform_type: string;
    deposit_linestring: {
        footprint_linestring: GeoJSON.LineString | null;
    };
    footprint: GeoJSON.Polygon | null;

    area: string | null;
    perimeter: string | null;
};

export const depositPlatformColorMap: Record<string, string> = {
    UAV: "cyan",
    ASV: "blue",
    SCUBA: "orange",
    PADDLE: "pink",
    UVC: "red",
    default: "gray",
};
