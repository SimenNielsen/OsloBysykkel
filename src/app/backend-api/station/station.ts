export class Station implements StationStatus, StationInformation {
    name: string;
    address: string;
    lat: number;
    lon: number;
    capacity: number;
    is_installed: boolean;
    is_renting: boolean;
    num_bikes_available: number;
    num_docks_available: number;
    num_bikes_disabled?: number;
    last_reported: number;
    is_returning: boolean;
    station_id: number;
    cross_street?: string;
    region_id?: string;
    post_code?: number;
    rental_methods: StationPaymentOption[];

    constructor(status : StationStatus, information : StationInformation){
        this.station_id = information.station_id;
        this.name = information.name;
        this.address = information.address;
        this.cross_street = information.cross_street;
        this.region_id = information.region_id;
        this.post_code = information.post_code;
        this.rental_methods = information.rental_methods;
        this.lat = information.lat;
        this.lon = information.lon;
        this.capacity = information.capacity;
        this.is_installed = status.is_installed;
        this.is_renting = status.is_renting;
        this.num_bikes_available = status.num_bikes_available;
        this.num_docks_available = status.num_docks_available;
        this.num_bikes_disabled = status.num_bikes_disabled;
        this.last_reported = status.last_reported;
        this.is_returning = status.is_returning;
    }
}