import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiPrueba, Item, ModelItemDB} from '../models/models';
import {DialogService} from 'primeng/dynamicdialog';
import {DialogEditItemComponent} from '../dialog-edit-item/dialog-edit-item.component';
import {LazyLoadEvent} from 'primeng/api';
import {Table} from 'primeng/table';
import {MessageService} from 'primeng/api';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  providers: [DialogService],
})
export class HomeComponent implements OnInit , AfterViewInit{
  @ViewChild('table', {static: false})
  private datatable: Table;
  url = 'https://datos.gob.es/apidata/catalog/distribution';
  items: Item[] = [];
  itemsKey: ModelItemDB[] = [];

  first = 0;
  rows = 5;
  pk = 0;
  customers: Item[] = [];
  loading = true;
  totalRecords = 0;

  constructor(
    private httpClient: HttpClient,
    public dialogService: DialogService,
    public errordialog: MessageService
  ) {
  }

  ngOnInit(): void {
    this.getData();
  }


  private getData(): void {
    this.httpClient.get(
      this.url,
      {
        headers: new HttpHeaders({
                   Accept: 'application/json',
        })
      },
    ).subscribe(
      (res: ApiPrueba) => {
        this.items = res.result.items;
        this.totalRecords = res.result.items.length;
      },
      (error) => {
        console.log(error);
        this.showError();

      }
    );
  }

  addItem(item: Item): void {
    let key;
    if (item !== undefined) {
      for (const q of this.items) {
        if (q === item) {
          key = this.items.indexOf(item);
        }
      }
    }

    const ref = this.dialogService.open(DialogEditItemComponent, {
      header: 'Editar item',
      closable: true,
      data: {
        item,
      }
    });
    ref.onClose.subscribe((res) => {
      if (res !== undefined) {
        if (key !== undefined) {
          this.items[key] = res;
        } else {
          this.items = [...this.items, res];
          this.totalRecords = this.items.length;
        }
        this.datatable.clear();
      }
    });
  }

  deleteItem(item): void {
    let i = 0;
    while (i < this.items.length) {
      if (this.items[i] === item) {
        this.items.splice(this.items.indexOf(item), 1);
      }
      i++;
    }
    this.datatable.clear();
  }

  loadData(event: LazyLoadEvent): void {
    this.loading = true;
    setTimeout(() => {
      if (this.items) {
        this.customers = this.items.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  showError(): void {
    this.errordialog.add({severity: 'error', summary: 'Error', detail: 'Error De Cabecera'});
  }

  ngAfterViewInit(): void {
    this.showError();
  }
}
