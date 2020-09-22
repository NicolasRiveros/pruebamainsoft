import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Item} from '../models/models';

@Component({
  selector: 'app-dialog-edit-item',
  templateUrl: './dialog-edit-item.component.html',
  styleUrls: ['./dialog-edit-item.component.sass']
})
export class DialogEditItemComponent implements OnInit {

  item: Item;
  about: any;
  title: any;
  accessURL: any;

  constructor(
    public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) {
    this.item = this.config.data['item'] as Item;
    if (this.item) {
      this.accessURL = this.item.accessURL;
      this.about = this.item._about;
      this.title = this.item.title;
    }
  }

  ngOnInit(): void {
  }

  saveItem(item: Item): void {
    item = {
      _about: this.about,
      accessURL: this.accessURL,
      byteSize: this.item ? this.item.byteSize : null,
      format: this.item ? this.item.format : null,
      title: this.title,
      type: this.item ? this.item.type : null,
    };
    this.ref.close(item);
    console.log(item);
  }
}
