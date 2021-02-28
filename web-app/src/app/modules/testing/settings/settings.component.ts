import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IpAddress, OperatingSystem } from 'src/app/shared/models/system-info-models';
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
  ip: IpAddress;
  ip_text: string = "";
  osSelection: boolean = false;
  ipSelection: boolean = false;
  selectedOS: OperatingSystem;
  showText: boolean = false;

  constructor(private messageService: MessageService, private _dataService: DataService) { }

  ngOnInit(): void {
    // TODO: Add else conditions here and submit__Change() to throw error if IP and OS couldn't be located/stored

    var possibleOS = this._dataService.getOS();
    if(possibleOS !== null) this.os = possibleOS;

    this.os_list = this._dataService.getOSList();
    
    var possibleIP = this._dataService.getIP();
    if(possibleIP !== null) this.ip = possibleIP;

    this.selectedOS = this.os;
  }

  toggleTextBox(): void {
    this.showText = !this.showText;
  }

  toggleOSView() {
    this.osSelection = !this.osSelection;
  }

  toggleIPView() {
    this.ipSelection = !this.ipSelection;
  }

  submitOSUpdate(os: OperatingSystem): void {
    if(this.showText) {
      os.name = this.os_text;
      os.value = this.os_text;
    }
    this._dataService.setOS(os);
    var possibleOS = this._dataService.getOS();
    if(possibleOS !== null) this.os = possibleOS;
    this.toggleOSView();
    this.toastSuccessOS();
  }

  submitIPUpdate(): void {
    this.ip.ip_address = this.ip_text;
    this._dataService.setIP(this.ip);
    var possibleIP = this._dataService.getIP();
    if(possibleIP !== null) this.ip = possibleIP;
    this.toggleIPView();
    this.toastSuccessIP();
  }

  toastSuccessOS() {
    this.messageService.add({key: 'tc-os', severity:'success', summary: 'Success', detail: 'OS version successfully updated'});
  }

  toastSuccessIP() {
    this.messageService.add({key: 'tc-ip', severity:'success', summary: 'Success', detail: 'IPv4 address successfully updated'});
  }

}
