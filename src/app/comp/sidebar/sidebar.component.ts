import { Component, inject, OnInit } from '@angular/core';
import { TreeComponent } from "../tree/tree.component";
import { Node } from '../../directive/tree/showtree.directive';
import { FolderserviceService } from '../../service/folder/folderservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [TreeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  mydata:Node[] = []
  
  folderservice = inject(FolderserviceService)
  activerout = inject(ActivatedRoute)
  ngOnInit(): void {
    this.activerout.url.subscribe((data: any) => {
      let url = ''
      data.forEach((obj: any) => {
        url = url + obj.path + '/';
      });  
      this.folderservice.getfolderStr().subscribe((data:any)=>{
         this.mydata = [data.root]
      })
    })
  }



}
