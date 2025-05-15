import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  popUpProperty = {
    x: 10,
    y: 12,
    display: false
  }

  popUpPropertysubject = new BehaviorSubject(this.popUpProperty)

  urlsubject = new BehaviorSubject('')


}
