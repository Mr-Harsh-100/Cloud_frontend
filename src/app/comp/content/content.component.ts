import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WINDOW } from '../../window/window';
import { FolderserviceService } from '../../service/folder/folderservice.service';
import { PopupDirective } from '../../directive/popup/popup.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  imports: [PopupDirective],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit, OnDestroy {
  number = 1
  private window = inject(WINDOW);
  folderservice = inject(FolderserviceService)
  router = inject(Router);
  activerout = inject(ActivatedRoute);
  masterUrl = '';

  sybscriptions: Subscription[] = []

  folderdata = [
    {
      details: {
        type: null,
        size: 0,
        bulkSize: 4096,
        bithDataTime: '2025-03-26T18:49:57.016Z',
        EditTime: '2025-03-26T18:49:57.016Z'
      },
      data: 'myfolder02'
    }
  ]

  ngOnInit(): void {
    let sub1!: Subscription
    this.activerout.url.subscribe((data: any) => {
      let url = ''
      data.forEach((obj: any) => {
        url = url + obj.path + '/';
      });
      this.masterUrl = url
      console.log(url);
      
      sub1 = this.folderservice.getfolderInfo(this.masterUrl).subscribe((data: any) => {        
        this.folderdata = data
      })
    })

    this.sybscriptions.push(sub1)
  }

  redirect(str: string) {
    if (str) {
      this.router.navigate([str], { relativeTo: this.activerout })
    }
  }


  uplodfile(e: any) {
    // e.preventDefault()
    let formdata = new FormData(e);
    let sub1!: Subscription
    this.folderservice.upload(this.masterUrl, formdata).subscribe(
      (response) => {
        // console.log(response);
      },
      (error) => {
        // console.log(error);
        sub1 = this.folderservice.getfolderInfo(this.masterUrl).subscribe((data: any) => {
          this.folderdata = data
        })
      },
      () => {
      }
    );
    this.sybscriptions.push(sub1)
  }


  createFolder() {
    let sub1!: Subscription
    let sub2!: Subscription
    let folderName = prompt("give folder Name");
    if (folderName == null || folderName.includes('.')) {
      folderName = 'newfolder(' + (this.number++) + ')'
    }
    sub2 = this.folderservice.createFolder(this.masterUrl + folderName).subscribe(
      (response) => {
      },
      (error) => {
        console.log(error);
        sub1 = this.folderservice.getfolderInfo(this.masterUrl).subscribe((data: any) => {
          this.folderdata = data
        })
      },
      () => {
      }
    );

    this.sybscriptions.push(sub1,sub2)

  }

  downlod(str:string){
    let url = 'http://localhost:3000/file/downlod/cd/' + this.masterUrl +str
    
    window.open(url,'_blank');
  }

  ngOnDestroy(): void {
    this.sybscriptions.forEach((sub) => {
      sub.unsubscribe()
    })
  }

}
