import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private readonly url = environment.api;

  constructor( 
    private http: HttpClient 
    ) { }


  searchTracks$( termino:string ): Observable<any>{

    return this.http.get(`${this.url}/tracks?src=${termino}`);
  }



}
