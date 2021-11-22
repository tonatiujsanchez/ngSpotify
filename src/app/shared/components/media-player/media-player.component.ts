import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription } from 'rxjs';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  listObservers$: Subscription[] = [];

  mockCover: TrackModel = {
    name: 'Will be u?',
    cover: 'https://i.scdn.co/image/ab67706f00000003e4793b7b7a06c3cc64341790',
    album: 'Lofi beats',
    url: '',
    _id: 1
  }

  constructor(
    private multimediaService: MultimediaService
  ) { }

  ngOnInit(): void {
    const observer1$: Subscription = this.multimediaService.callback.subscribe( (resp: TrackModel)=>{
      console.log(resp);
    });

    this.listObservers$ = [ observer1$ ];
  }

  ngOnDestroy():void{
    this.listObservers$.forEach( observer => observer.unsubscribe() );
  }

}
