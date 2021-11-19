import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() customImg:string = '../../../../assets/angular-no-image.png';

  @HostListener('error') handleError(): void{
    this.elHost.nativeElement.src = "../../../../assets/no-image.png";
    this.elHost.nativeElement.src = this.customImg;
  } 

  constructor(
    private elHost: ElementRef
  ) { }

}
