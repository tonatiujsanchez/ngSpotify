import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { TrackModel } from '@core/models/tracks.model';
import { environment } from '../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor( 
    private http: HttpClient
   ) { }


   getAllTracks$(): Observable<any>{

    return this.http.get(`${ this.URL }/tracks`)
      .pipe(
        map( ({data}:any) =>  data ),
        catchError( (error)=> {
          console.log('⚠ Hubo un error en la conexión de allTracks. ⚠', error);
          return of([]);
        })
      )
   }


   getRamdomTracks$(): Observable<any>{

    return this.http.get(`${ this.URL }/tracks`)
      .pipe(
        map( ({data}:any) =>  data.reverse() ),
        map( (data:TrackModel[]) =>  data.filter( track => track.name !== 'Bésame💋' ) ),
        catchError( (error)=> {
          console.log('⚠ Hubo un error en la conexión de randomTracks. ⚠', error);
          return of([]);
        })
      )
   }

}
