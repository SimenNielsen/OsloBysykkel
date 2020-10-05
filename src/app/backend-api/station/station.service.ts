import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
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
  // stations : Subject<Station[]> = new Subject();

  // stationInformationResponseSubject : BehaviorSubject<StationInformationResponse> = new BehaviorSubject(null);
  // stationStatusResponseSubject : BehaviorSubject<StationStatusResponse> = new BehaviorSubject(null);

  // subscriptions : Subscription = new Subscription();
  constructor(
    private stationInformationService : StationInformationService,
    private stationStatusService: StationStatusService
  )
  {
    // this.subscriptions.add(
    //   this.stationInformationResponseSubject.subscribe(
    //     (value : StationInformationResponse) => this.updateStations
    //   )
    // );
    // this.subscriptions.add(
    //   this.stationInformationResponseSubject.subscribe(
    //     (value : StationInformationResponse) => this.updateStations
    //   )
    // );
  }
  linkStations(infoResponse : StationInformationResponse, stationResponse : StationStatusResponse) : Station[]{
    let stations : Station[] = [];
    let infoStations = infoResponse.data.stations;
    let statusStations = stationResponse.data.stations;
    infoStations.forEach(infoStation => {
      for(let i = 0; i < statusStations.length; i++){
        if(statusStations[i].station_id === infoStation.station_id){
          stations.push(new Station(statusStations[i], infoStation))
          stations.splice(i, 1);
          break;
        }
      }
    })
    return stations;
  }
  getStations(http: HttpClient, meta : APIMeta): Promise<Station[]>{
    return new Promise((resolve, reject) => {
      this.stationInformationService.getAll(http, meta).then(
      (infoResponse: StationInformationResponse) => {
        this.stationStatusService.getAll(http, meta).then(
          (statusResponse: StationStatusResponse) => {
            resolve(this.linkStations(infoResponse, statusResponse))
          },
          (err:any) => {
            reject();
          }
        )
      },
      (err:any) => {
        reject();
      })
    })
  }
}
