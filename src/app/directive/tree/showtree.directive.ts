import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export type Node = {
  type:string,
  data:string,
  childern:Node[]
} 

@Directive({
  selector: '[appShowtree]'
})
export class ShowtreeDirective {

  templet = inject(TemplateRef)
  container = inject(ViewContainerRef)
  @Input() tree!: Node[]
  constructor() { }

  showtree(){
    this.container.clear()
    this.tree.forEach((node)=>{
      this.container.createEmbeddedView(this.templet,{
        data : node.data
      })
    })
  }

}
