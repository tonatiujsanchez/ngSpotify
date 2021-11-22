import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription } from 'rxjs';

import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {

  tracksTrending: TrackModel[] = [];
  tracksRandom: TrackModel[] = [];

  listObservers$: Subscription[] =[];

  constructor(
    private trackService: TrackService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData():void{
    const observableAll$ = this.trackService.getAllTracks$().subscribe(
      (data)=>{ this.tracksTrending = data }
    );
  
    const observableRandom$ = this.trackService.getRamdomTracks$().subscribe(
      (data)=>{ this.tracksRandom = data }
    );
  
    this.listObservers$ = [ observableAll$, observableRandom$ ];
  }



  ngOnDestroy():void{
    this.listObservers$.forEach( observable => observable.unsubscribe() );
  }

}
