import { Component, Input } from '@angular/core';
import { Node } from '../../directive/tree/showtree.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree',
  imports: [CommonModule],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent  {
 

 constructor(){
    
 }

  @Input() childs:Node[] = []

  haschilde(node:Node):boolean{
    return node.childern.length > 0
  }
}
