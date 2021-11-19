import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {

  linksMenu: any[] = [
    {
      name: 'Home',
      icon: 'uil-estate'
    },
    {
      name: 'Buscar',
      icon: 'uil-search'
    }
  ];

  mainMenu: {
    defaultOptions: any[],
    accessLink: any[]
  } = { 
    defaultOptions: [], 
    accessLink: [] 
  };

  customOptions: any[] = [];
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: { hola: 'mundo' }
      }
    ];

    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ];

    this.customOptions = [
      {
        name: 'Mi lista º1',
        router: ['/']
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ];
  }

  goTo( event:PointerEventInit ){
    this.router.navigate( ['/', 'favorites'], {
      queryParams :{
        key1: 'value1',
        key2: 'value1',
        key3: 'value1'
      }
    } );
    console.log(event);
    
  }

}
