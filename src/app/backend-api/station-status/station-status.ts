export interface StationStatusData{
    stations: StationStatus[];
}
export interface StationStatusResponse {
    last_updated: number;
    data: StationStatusData;
}
export interface StationStatus{
    is_installed: boolean;
    is_renting: boolean;
    num_bikes_available: number;
    num_docks_available: number;
    num_bikes_disabled?: number;
    last_reported: number;
    is_returning: boolean;
    station_id: number;
}