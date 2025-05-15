import { Directive, ElementRef, HostListener, inject, Input, OnDestroy, OnInit, TemplateRef,  ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PopupService } from '../../service/popup/popup.service';

@Directive({
  selector: '[appPopup]'
})
export class PopupDirective implements OnInit,OnDestroy {
 
  linkurl = ''
  @Input() appPopup = ''
  activerout = inject(ActivatedRoute)
  popUpService = inject(PopupService)
 

  ngOnInit(): void {
    this.activerout.url.subscribe((data:any)=>{
      let url = '' 
      data.forEach((obj:any) => {
        url = url + obj.path + '/';
      });
      this.linkurl = url + this.appPopup;
      
    })
  }
  @HostListener('contextmenu',['$event']) onclick(event:MouseEvent){
    console.log(this.linkurl);
    this.popUpService.popUpPropertysubject.next({
      x:event.screenX,
      y:event.screenY,
      display:true
    })
    this.popUpService.urlsubject.next(this.linkurl)
    event.preventDefault()
  }

  

 
  
  ngOnDestroy(): void {
  }
}
