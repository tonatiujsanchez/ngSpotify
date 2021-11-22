import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  public callback: EventEmitter<any> = new EventEmitter();

  constructor() { }
}
