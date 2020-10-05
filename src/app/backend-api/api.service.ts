import { Injectable } from '@angular/core';
import { Station } from './station/station';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { StationService } from './station/station.service';
import { APIMeta } from './api-meta';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  meta : APIMeta;
  constructor(
    private http : HttpClient, 
    private stationService: StationService
  ) 
  {
    this.meta = {
      baseUrl: "https://gbfs.urbansharing.com/oslobysykkel.no",
      headers: new HttpHeaders({"Client-Identifier": "SimenNielsen"})
    }
  }

  public getStations() : Promise<Station[]>{
    return this.stationService.getStations(this.http, this.meta);
  }
}
