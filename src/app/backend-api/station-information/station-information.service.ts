import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIMeta } from '../api-meta';
import { StationInformationResponse } from './station-information';

@Injectable({
  providedIn: 'root'
})
export class StationInformationService {

  constructor() { }

  public getAll(http: HttpClient, meta: APIMeta): Promise<StationInformationResponse>{
    return new Promise((resolve, reject) => {
      http.get(`${meta.baseUrl}/station_information.json`, {headers: meta.headers}).toPromise().then(
        (res : StationInformationResponse) => {
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
