import { Component, OnInit } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-results-dialog',
  templateUrl: './results-dialog.component.html',
})
export class ResultsDialogComponent implements OnInit {

  description: string = "";

  constructor(public _dataService: DataService, public ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
      this.description = this.config.data.description;
  }

}
