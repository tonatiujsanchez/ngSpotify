import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() callbackData: EventEmitter <string> = new EventEmitter();

  src: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  callSearch(termino:string){
    if( termino.length >= 3 ){
      this.callbackData.emit( termino );
    }
    
  }

}
