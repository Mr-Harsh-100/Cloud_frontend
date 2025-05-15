import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FolderserviceService {
  http = inject(HttpClient);
 
  constructor() { }
  getfolderInfo(url:string){
    let httpUrl = 'http://localhost:3000/folder/info/cd/' + url 
    return this.http.get(httpUrl)
  }
  getfolderStr(){
    let httpUrl = 'http://localhost:3000/folder/str/' 
    return this.http.get(httpUrl)
  }
  upload(url:string,formdata:FormData){
    let httpUrl = 'http://localhost:3000/file/create/cd/' + url 
    
    return this.http.post(httpUrl, formdata);
  }

  deleteFolder(url:string){
    let httpUrl = 'http://localhost:3000/folder/delete/cd/' + url 
    console.log(httpUrl);
    
    return this.http.get(httpUrl);
  }

  createFolder(url:string){
    let httpUrl = 'http://localhost:3000/folder/create/cd/' + url 
    
    return this.http.get(httpUrl);
  }
  downlodfile(url:string){
    let httpUrl = 'http://localhost:3000/file/downlod/cd/' + url 
     
    return this.http.get(httpUrl);
  }
}
