import { Component, OnInit, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {

  @Input() track!: TrackModel;
  @Input() mode: 'small' | 'big' = 'big';

  constructor(
    private multimediaService: MultimediaService
  ) { }

  ngOnInit(): void {

  }

  sendPlay( track: TrackModel ):void{    
    this.multimediaService.trackInfo$.next(track);
  }


}
