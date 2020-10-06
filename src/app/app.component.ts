import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './backend-api/api.service';
import { Station } from './backend-api/station/station';
import { ActivityChartOptions } from './activity-chart-options'
import { SeriesOptionsType } from 'highcharts';

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
  activeStation: BehaviorSubject<Station> = new BehaviorSubject(null);
  chart : Chart;
  constructor(private api : ApiService){
  }
  ngOnInit(){
    this.api.getStations().then(
      (stations : Station[]) => {
        this.updateStations(stations);
      }
    );
    this.activeStation.subscribe(
      (station: Station) => {
        this.postActiveStation(station);
      }
    )
  }
  updateStations(stations){
    this.stations = stations;
    //ask for browser permission to get location of user to find the closest station
    this.navigator.geolocation.getCurrentPosition(this.updateClosestStation.bind(this));
  }
  setActiveStation(station){
    this.activeStation.next(station);
  }
  updateClosestStation(position: Position){
    let closestStation = this.stations[0];
    let closestDiff = getPositionDistance(closestStation.lat, position.coords.latitude) + getPositionDistance(closestStation.lon, position.coords.longitude);
    for(let i = 1; i < this.stations.length; i++){
      let posDiff = getPositionDistance(this.stations[i].lat, position.coords.latitude) + getPositionDistance(this.stations[i].lon, position.coords.longitude);
      if(posDiff < closestDiff && this.stations[i].num_bikes_available > 0){
        closestStation = this.stations[i];
        closestDiff = posDiff;
      }
    }
    this.activeStation.next(closestStation);
  }
  postActiveStation(station: Station){
    if(!station) return;
    this.mapCenter = {lat: station.lat, lng: station.lon};
    let options = ActivityChartOptions;
    options["title"]["text"] = `${station.name} aktivitet September 2020`
    options["series"] = [
      {
        name: 'Utgående',
        data: station.activity.out
      },
      {
        name: 'Innkommende',
        data: station.activity.in
      }
    ]
    this.chart = new Chart(options);
  }
}
function getPositionDistance(pos1: number, pos2: number){
  return Math.abs(pos1 - pos2);
}
