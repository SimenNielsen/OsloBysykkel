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
  constructor(private api : ApiService){
  }
  ngOnInit(){
    this.api.getStations().then(
      (stations : Station[]) => {
        console.log(stations)
      }
    );
  }
}
