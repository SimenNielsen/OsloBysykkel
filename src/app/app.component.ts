import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApiService } from './backend-api/api.service';
import { RelativeStation, Station } from './backend-api/station/station';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'oslobysykkel';
  stations: Station[] = []

  activityOptions: BehaviorSubject<any> = new BehaviorSubject({});

  mapCenter: google.maps.LatLngLiteral = {lat: 59.925488, lng: 10.746058};
  mapZoom = 13;
  mapOptions: google.maps.MapOptions = {
    minZoom: 10,
    disableDefaultUI:true
  };
  navigator : Navigator = window.navigator;
  activeStation: BehaviorSubject<RelativeStation> = new BehaviorSubject(null);
  closestStation: BehaviorSubject<RelativeStation> = new BehaviorSubject(null);
  userPosition: BehaviorSubject<Position> = new BehaviorSubject(null); // coordinates of the user. only availabe if user agrees access through browser.
  constructor(private api : ApiService){
  }
  ngOnInit(){
    this.api.getStations().then(
      (stations : Station[]) => {
        this.updateStations(stations);
      }
    );
    this.activeStation.subscribe(
      (station: RelativeStation) => {
        this.postActiveStation(station);
      }
    )
    this.userPosition.subscribe(
      (pos: Position) => {
        if(!pos) return; 
        this.updateClosestStation(pos);
        if(this.activeStation.value){
          this.activeStation.value.distance = this.getStationDistanceToUser(this.activeStation.value.station, pos);
        }
      }
    )
  }
  updateStations(stations){
    this.stations = stations;
    //ask for browser permission to get location of user to find the closest station
    this.navigator.geolocation.getCurrentPosition(this.updateUserPosition.bind(this));
  }
  setActiveStation(station: Station){
    let distance = this.getStationDistanceToUser(station, this.userPosition.value);
    this.activeStation.next({station: station, distance: Math.floor(distance)});
  }
  updateUserPosition(position: Position){
    this.userPosition.next(position);
  }
  updateClosestStation(position: Position){
    let closestStation = this.stations[0];
    let meterDiff = this.getStationDistanceToUser(closestStation, position);
    let closestDiffKM = meterDiff;
    for(let i = 1; i < this.stations.length; i++){
      meterDiff = this.getStationDistanceToUser(this.stations[i], position);
      if(meterDiff < closestDiffKM && this.stations[i].num_bikes_available > 0){
        closestStation = this.stations[i];
        closestDiffKM = meterDiff;
      }
    }
    this.closestStation.next({station:closestStation, distance: Math.floor(closestDiffKM) });
  }
  /*
  Function to calculate distance between 2 points on earth
  Source: https://www.movable-type.co.uk/scripts/latlong.html
  */
  getStationDistanceToUser(station: Station, pos: Position): number{
    if(!(station && pos)) return null
    const R = 6371e3; // metres
    const φ1 = station.lat * Math.PI/180; // φ, λ in radians
    const φ2 = pos.coords.latitude * Math.PI/180;
    const Δφ = (pos.coords.latitude-station.lat) * Math.PI/180;
    const Δλ = (pos.coords.longitude-station.lon) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
  }
  postActiveStation(activeStation: RelativeStation){
    if(!activeStation) return;
    this.mapCenter = {lat: activeStation.station.lat, lng: activeStation.station.lon};
    let options = {
      'title': {
        'text': `${activeStation.station.name} aktivitet September 2020`,
      },
      'series': [
        {
          name: 'Utgående',
          data: activeStation.station.activity.out
        },
        {
          name: 'Innkommende',
          data: activeStation.station.activity.in
        }
      ]
    };
    this.activityOptions.next(options)
  }
}