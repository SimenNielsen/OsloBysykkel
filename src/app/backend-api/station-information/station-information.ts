import { StationPaymentOption } from './station-payment-option/station-payment-option';

export interface StationInformationData{
    stations: StationInformation[];
}
export interface StationInformationResponse {
    last_updated: number;
    data: StationInformationData;
}
export interface StationInformation {
    station_id: number;
    name: string;
    address?: string;
    cross_street?: string;
    region_id?: string;
    post_code?: number;
    rental_methods: StationPaymentOption[];
    lat: number;
    lon: number;
    capacity: number;
}