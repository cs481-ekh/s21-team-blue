import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

interface OperatingSystem {
  name: string,
  value: string
}

@Component({
  selector: 'app-setup-new-user',
  templateUrl: './setup-new-user.component.html',
  styleUrls: ['./setup-new-user.component.scss']
})



export class SetupNewUserComponent implements OnInit {

  operatingSystems: OperatingSystem[] = [
    { name: 'Windows 10', value: 'windows-10' },
    { name: 'Ubuntu 20.04', value: 'ubuntu-20-04' },
    { name: 'MacOS Big Sur', value: 'mac-big-sur' }
  ]

  selectedOS: OperatingSystem;

  deviceInfo: DeviceInfo;
  
  os_version: string = "";

  constructor(private deviceDetector: DeviceDetectorService) { }

  ngOnInit(): void {
    this.deviceInfo = this.deviceDetector.getDeviceInfo();
    this.os_version = this.deviceInfo.os_version;
 
    this.operatingSystems.forEach(os => {
      if(os.value == this.os_version) {
        this.selectedOS = os;
      }
    })

    if(this.os_version == this.operatingSystems[0].value) 
    {

    }
  }
}
