import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IpAddress, OperatingSystem } from 'src/app/shared/models/system-info-models';
import { DataService } from 'src/app/shared/services/data.service';
import { IpAddressValidator } from 'src/app/shared/validators/ip.validator';

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
  ip_form: FormGroup;

  constructor(private messageService: MessageService, private _dataService: DataService) { }

  ngOnInit(): void {
    // TODO: Add else conditions here and submit__Change() to throw error if IP and OS couldn't be located/stored

    var possibleOS = this._dataService.getOS();
    if(possibleOS !== null) this.os = possibleOS;

    this.os_list = this._dataService.getOSList();
    
    var possibleIP = this._dataService.getIP();
    if(possibleIP !== null) this.ip = possibleIP;

    this.selectedOS = this.os;

    this.ip_form = new FormGroup({
      ip: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15), IpAddressValidator()])
    });
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
    this.ip.ip_address = this.ip_form.controls['ip'].value;
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
