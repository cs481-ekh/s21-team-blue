import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { OperatingSystem } from 'src/app/shared/models/system-info-models';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-setup-new-user',
  templateUrl: './setup-new-user.component.html',
  styleUrls: ['./setup-new-user.component.scss']
})

export class SetupNewUserComponent implements OnInit {

  constructor(private _dataService: DataService, 
              private deviceDetector: DeviceDetectorService,
              private router: Router) { }

  operatingSystems: OperatingSystem[];
  selectedOS: OperatingSystem;
  selectOS: boolean = true;
  found: boolean = true;
  deviceInfo: DeviceInfo;
  os_version: string = "";

  ngOnInit(): void {
    this.operatingSystems = this._dataService.getOSList();
    this.deviceInfo = this.deviceDetector.getDeviceInfo();
    this.os_version = this.deviceInfo.os_version;

    this.operatingSystems.forEach(os => {
      if(os.value == this.os_version) {
        this.selectedOS = os;
        this.selectOS = false;
      }
    });
    if(this.selectOS == true) {
      this.found = false;
    }
  }

  select(): void {
    this.selectOS = true;
  }

  /**
   * Verify the OS selection of the user.
   * @param selectedOS - The user's selected OS 
   */
  submitOSChoice(selectedOS: OperatingSystem): void {
    this._dataService.setOS(selectedOS);
    if(this.operatingSystems.find(os => {
      os.name === selectedOS.name &&
      os.value === selectedOS.value;}) || 
    (!this.found && selectedOS !== null))
    { 
      this.router.parseUrl('/main');
    }
    else {
      console.log("Error! Please choose a valid Operating System from the listed options");
    }
  }

}
