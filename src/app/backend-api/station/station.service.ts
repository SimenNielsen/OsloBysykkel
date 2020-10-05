import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { APIMeta } from '../api-meta';
import { StationInformationResponse } from '../station-information/station-information';
import { StationInformationService } from '../station-information/station-information.service';
import { StationStatusResponse } from '../station-status/station-status';
import { StationStatusService } from '../station-status/station-status.service';
import { Station } from './station';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  stations : BehaviorSubject<Station[]>;

  stationInformationResponseSubject : BehaviorSubject<StationInformationResponse> = new BehaviorSubject(null);
  stationStatusResponseSubject : BehaviorSubject<StationStatusResponse> = new BehaviorSubject(null);

  subscriptions : Subscription;
  constructor(
    private stationInformationService : StationInformationService,
    private stationStatusService: StationStatusService
  )
  {
    this.subscriptions.add(
      this.stationInformationResponseSubject.subscribe(
        (value : StationInformationResponse) => this.updateStations
      )
    );
    this.subscriptions.add(
      this.stationInformationResponseSubject.subscribe(
        (value : StationInformationResponse) => this.updateStations
      )
    );
  }
  updateStations(){
    if(!this.stationInformationResponseSubject.value || !this.stationStatusResponseSubject.value) return;
    let stations : Station[];
    let infoStations = this.stationInformationResponseSubject.value.data.stations;
    let statusStations = this.stationStatusResponseSubject.value.data.stations;
    infoStations.forEach(infoStation => {
      for(let i = 0; i < statusStations.length; i++){
        if(statusStations[i].station_id === infoStation.station_id){
          stations.push(new Station(statusStations[i], infoStation))
          stations.splice(i, 1);
          break;
        }
      }
    })
    this.stations.next(stations);
  }
  getStations(http: HttpClient, meta : APIMeta): Promise<Station[]>{
    this.stationInformationService.getAll(http, meta).then(
      (value: StationInformationResponse) => {
        this.stationInformationResponseSubject.next(value);
      }
    )
    this.stationStatusService.getAll(http, meta).then(
      (value: StationStatusResponse) => {
        this.stationStatusResponseSubject.next(value);
      }
    )
    return this.stations.toPromise();
  }
}
