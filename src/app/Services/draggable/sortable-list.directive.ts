import { ContentChildren, Directive, QueryList } from '@angular/core';
import { DraggableDirective } from './draggable.directive';

@Directive({
  selector: '[appSortableList]'
})
export class SortableListDirective {

  @ContentChildren(DraggableDirective) sortables!:QueryList<DraggableDirective>

  ngAfterContentInit(){
    console.log(`Got ${this.sortables.length} sortables items.`)
  
    }
  

}
