import { Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[SortableTable]',

  host: {
    /* Map the 'asc' or 'desc' depending on the current 'direction' attribute. 
       direction attribute maybe provided, if not it will default to an empty string */
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',

    /* click event will change the 'direction' attribute and emit 'sort' event to the component
      which will contain the name and the current 'direction' of the column clicked */
    '(click)': 'sortColumn()',
  },
})
export class SortableTableDirective {
  @Input() name: string;
  @Input() direction: string;

  @Output() sort = new EventEmitter();
  constructor() {}

  sortColumn() {
    switch (this.direction) {
      case '':
        this.direction = 'asc';
        break;
      case 'asc':
        this.direction = 'desc';
        break;
      default:
        this.direction = 'asc';
        break;
    }

    this.sort.emit({ name: this.name, direction: this.direction });
  }
}
