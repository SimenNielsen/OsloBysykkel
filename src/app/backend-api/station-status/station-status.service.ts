import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIMeta } from '../api-meta';
import { StationStatusResponse } from './station-status';

@Injectable({
  providedIn: 'root'
})
export class StationStatusService {

  constructor() { }

  public getAll(http: HttpClient, meta: APIMeta): Promise<StationStatusResponse>{
    return new Promise((resolve, reject) => {
      http.get(`${meta.baseUrl}/station_status.json`, {headers: meta.headers}).toPromise().then(
        (res : StationStatusResponse) => {
          resolve(res)
        },
        (err: HttpErrorResponse) => {
          console.error(err);
          reject();
        }
      )
    })
  }
}
