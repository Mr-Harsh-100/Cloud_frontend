import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { PopupService } from '../../service/popup/popup.service';
import { Subscription } from 'rxjs';
import { FolderserviceService } from '../../service/folder/folderservice.service';

@Component({
  selector: 'app-popup',
  imports: [CommonModule],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent implements OnInit,OnDestroy {
  folderservice = inject(FolderserviceService)
  popupservice = inject(PopupService)
  subscription!: Subscription
  style = {
    'top': `0px`,
    'left': `0px`,
    'visibility': 'hidden' // hidden,visible
  }
  ngOnInit(): void {
    this.subscription = this.popupservice.popUpPropertysubject.subscribe((data) => {
      this.style = {
        'top': `${data.y-80}px`,
        'left': `${data.x}px`,
        'visibility': data.display?'visible':'hidden' // hidden,visible
      }
    })
  }

  @HostListener('document:click', ['$event']) onClickOut(event:MouseEvent){
    this.popupservice.popUpPropertysubject.next({
      x:0,
      y:0,
      display:false
    })
  }
  deletefolder(){
    this.popupservice.urlsubject.subscribe((url:any)=>{
      console.log(url);
      
      this.folderservice.deleteFolder(url).subscribe((res)=>{
        console.log(res);
      },(err)=>{
        console.log(err);
        window.location.reload();
      },()=>{
        
      })
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  
}
