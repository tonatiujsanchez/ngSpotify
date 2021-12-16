import { EventEmitter, Injectable } from '@angular/core';
import { observable, Observable, Observer, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { TrackModel } from '../../core/models/tracks.model';
import { fromEvent } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined);

  public audio!: HTMLAudioElement;

  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('00:00');
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('pause');
  public playerPorcentage$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.audio = new Audio();

    this.trackInfo$.subscribe(
      (respOk)=>{
        this.setAudio( respOk );
      }
    );

    this.listenAllEvents();
  }

  private listenAllEvents():void{

    // Escuchando cundo el reproductos esta reproduciendo
    fromEvent( this.audio, 'timeupdate' ).subscribe(this.calculateTime);
    // Status del reproductor
    fromEvent( this.audio, 'playing' ).subscribe(this.setPlayingStatus);
    fromEvent( this.audio, 'play' ).subscribe(this.setPlayingStatus);
    fromEvent( this.audio, 'pause' ).subscribe(this.setPlayingStatus);
    fromEvent( this.audio, 'ended' ).subscribe(this.setPlayingStatus);

  }

  // Estableciendo el estado del reproductor 
  private setPlayingStatus = ( state: Event )=>{

    switch (state.type) {
      case 'playing':
        this.playerStatus$.next('playing');
        break;
      case 'play':
        this.playerStatus$.next('play');
        break;
      case 'ende':
        this.playerStatus$.next('ended');
        break;
      default:
        this.playerStatus$.next('pause');
        break;
    }
    
  }

  // Calculando el tiempo del repruductor
  private calculateTime = ()=>{
    const { duration, currentTime } = this.audio;
    
    this.setTimeElapsed( currentTime );
    this.setRemaining( duration, currentTime );
    this.setPorcentage( duration, currentTime );
  }

  private setPorcentage( duration:number, currentTime:number ){
    let porcentage = ( currentTime * 100 ) / duration;
    this.playerPorcentage$.next( porcentage );
  } 


  //Calculando el tiempo que lleva la canción 
  private setTimeElapsed( currentTime: number ){

    let seconds = Math.floor( currentTime % 60 );
    let minutes = Math.floor( currentTime / 60 );
        
    const displaySeconds = ( seconds < 10 ) ? `0${ seconds }` : seconds;
    const displayMinutes = ( minutes < 10 ) ? `0${ minutes }` : minutes;
    const displayFormat  = `${ displayMinutes }:${ displaySeconds }`;

    this.timeElapsed$.next( displayFormat );
    
  }

  // Calculando el tiempo restante de la canción
  private setRemaining( duration:number, currentTime:number ){

    const timeLeft = duration - currentTime;


    let secondsRemaining = Math.floor( timeLeft % 60 );
    let minutesRemaining = Math.floor( timeLeft / 60 );

    const displaySecondsRemaining = ( secondsRemaining < 10 ) ? `0${ secondsRemaining }` : secondsRemaining;
    const displayMinutesRemaining = ( minutesRemaining < 10 ) ? `0${ minutesRemaining }` : minutesRemaining;
    const displayFormatRemaining  = `-${ displayMinutesRemaining }:${ displaySecondsRemaining }`;

    this.timeRemaining$.next( displayFormatRemaining )
  }
  
  // Agregando una cancion al reproductor
  public setAudio( track: TrackModel ):void{
    this.audio.src = track?.url;

    this.audio.play()
    .then( respOK => {
      // console.log('Resprociendo...')
    })
    .catch( err => {
      // console.log(' No se encontro la cancion ')
    })
    
  }

  // Pausar o Reprodicir la canción
  public togglePlayer():void{
    ( this.audio.paused ) ? this.audio.play() : this.audio.pause();
  }



}
