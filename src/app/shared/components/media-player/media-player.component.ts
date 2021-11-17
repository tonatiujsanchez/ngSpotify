import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {

  mockCover: any = {
    name: 'Will be u?',
    cover: 'https://i.scdn.co/image/ab67706f00000003e4793b7b7a06c3cc64341790',
    album: 'Lofi beats'
  }

  constructor() { }

  ngOnInit(): void {
  }

}
