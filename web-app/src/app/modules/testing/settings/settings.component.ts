import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { OperatingSystem } from 'src/app/shared/models/system-info-models';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [MessageService]
})
export class SettingsComponent implements OnInit {

  os: OperatingSystem;
  os_list: OperatingSystem[];
  os_text: string = "";
  selectedOS: OperatingSystem;
  showText: boolean = false;

  constructor(private messageService: MessageService, private _dataService: DataService) { }

  ngOnInit(): void {
    this.os = this._dataService.getOS();
    this.os_list = this._dataService.getOSList();
    this.selectedOS = this.os;
  }

  toggleTextBox(): void {
    this.showText = !this.showText;
  }

  submitOSUpdate(os: OperatingSystem): void {
    if(this.showText) {
      os.name = this.os_text;
      os.value = this.os_text;
    }
    this._dataService.setOS(os);
    this.os = this._dataService.getOS();
    this.toastSuccess();
  }

  toastSuccess() {
    this.messageService.add({key: 'tc', severity:'success', summary: 'Success', detail: 'OS successfully updated'});
  }

}
