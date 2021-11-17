import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {

  mockCover: TrackModel = {
    name: 'Will be u?',
    cover: 'https://i.scdn.co/image/ab67706f00000003e4793b7b7a06c3cc64341790',
    album: 'Lofi beats',
    url: '',
    _id: 1
  }

  constructor() { }

  ngOnInit(): void {
  }

}
