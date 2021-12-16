import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {

  listResults$: Observable<any> = of([]);

  constructor(
    private searchSvc: SearchService
  ) { }

  ngOnInit(): void {
  }
  
  receiveData( termino:string ){
    console.log( 'History page -->', termino );
    this.listResults$ = this.searchSvc.searchTracks$( termino )
    .pipe(
      map( resp => resp.data )
    );
  }

}
