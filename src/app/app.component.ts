import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './backend-api/api.service';
import { Station } from './backend-api/station/station';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'oslobysykkel';
  stations: Station[] = []
  mapCenter: google.maps.LatLngLiteral;
  mapZoom = 13;
  mapOptions: google.maps.MapOptions = {
    minZoom: 10,
    disableDefaultUI:true
  };
  navigator : Navigator = window.navigator;
  activeStation: BehaviorSubject<Station>;
  constructor(private api : ApiService){
  }
  ngOnInit(){
    console.log("calling api");
    this.api.getStations().then(
      (stations : Station[]) => {
        this.updateStations(stations);
      }
    );
    this.activeStation = new BehaviorSubject(null);
    this.activeStation.subscribe(
      (station: Station) => {
        console.log("station active updated");
        this.postActiveStation(station);
      }
    )
  }
  updateStations(stations){
    console.log(stations);
    this.stations = stations;
    //ask for browser permission to get location of user to find the closest station
    this.navigator.geolocation.getCurrentPosition(this.updateClosestStation.bind(this));
  }
  setActiveStation(station){
    this.activeStation.next(station);
  }
  updateClosestStation(position: Position){
    console.log("test");
    let closestStation = this.stations[0];
    let closestDiff = getPositionDistance(closestStation.lat, position.coords.latitude) + getPositionDistance(closestStation.lon, position.coords.longitude);
    for(let i = 1; i < this.stations.length; i++){
      let posDiff = getPositionDistance(this.stations[i].lat, position.coords.latitude) + getPositionDistance(this.stations[i].lon, position.coords.longitude);
      if(posDiff < closestDiff && this.stations[i].num_bikes_available > 0){
        console.log(posDiff);
        closestStation = this.stations[i];
        closestDiff = posDiff;
      }
    }
    this.activeStation.next(closestStation);
  }
  postActiveStation(station: Station){
    this.mapCenter = station ? {lat: station.lat, lng: station.lon} : {lat: 59.91118372188379, lng: 10.730034556850455};
    console.log(station);
  }
}
function getPositionDistance(pos1: number, pos2: number){
  return Math.abs(pos1 - pos2);
}
