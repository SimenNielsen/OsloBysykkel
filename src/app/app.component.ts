import { Component, OnInit } from '@angular/core';
import { ApiService } from './backend-api/api.service';
import { Station } from './backend-api/station/station';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'oslobysykkel';
  stations: Station[] = []
  center: google.maps.LatLngLiteral;
  constructor(private api : ApiService){
  }
  ngOnInit(){
    console.log("calling api");
    this.api.getStations().then(
      (stations : Station[]) => {
        console.log(stations);
        this.stations = stations;
        this.center = {
          lat: this.stations[0].lat,
          lng: this.stations[0].lon,
        }
      }
    );
  }
  openInfo(station){
    console.log(station);
  }
}
