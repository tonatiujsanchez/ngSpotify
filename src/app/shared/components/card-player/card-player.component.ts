import { Component, OnInit, Input } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {

  @Input() track!: TrackModel;
  @Input() mode: 'small' | 'big' = 'big';

  constructor() { }

  ngOnInit(): void {
  }

}
