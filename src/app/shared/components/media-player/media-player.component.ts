import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Subscription } from 'rxjs';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {

  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('');
  
  status:string = 'pause';
  
  get IconPlayer():string{
    return ( this.status === 'pause' ? 'uil-play-circle': 'uil-pause-circle' )
  }

  listObservers$: Subscription[] = [];
  
  constructor(
    public multimediaService: MultimediaService
  ) { }

  ngOnInit(): void {

    const observer1 = this.multimediaService.playerStatus$.subscribe(
      (statusPlayer) => {
        this.status = statusPlayer;        
      }
    );
    this.listObservers$ = [observer1];

  }

  ngOnDestroy():void{
    this.listObservers$.forEach( observer => observer.unsubscribe() );
  }

  handlePosition( event: MouseEvent ):void{

    const elNative : HTMLElement = this.progressBar.nativeElement;
    const {clientX} = event;
    const { x, width } = elNative.getBoundingClientRect();

    const clickX = clientX - x;

    const porcentageFromX = ( clickX * 100 ) / width;

    this.multimediaService.seekAudio( porcentageFromX );   
    
  }
}
