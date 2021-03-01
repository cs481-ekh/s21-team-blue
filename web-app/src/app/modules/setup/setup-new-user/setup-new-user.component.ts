import { Component, OnInit } from '@angular/core'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';
import { IpAddress, OperatingSystem } from 'src/app/shared/models/system-info-models';
import { DataService } from 'src/app/shared/services/data.service';
import { IpAddressValidator } from 'src/app/shared/validators/ip.validator';

@Component({
  selector: 'app-setup-new-user',
  templateUrl: './setup-new-user.component.html',
  styleUrls: ['./setup-new-user.component.scss']
})

export class SetupNewUserComponent implements OnInit {

  constructor(private _dataService: DataService, 
              private deviceDetector: DeviceDetectorService,
              private router: Router) { }

  operatingSystems: OperatingSystem[]; // The set list of Operating Systems that PiRate has assured compatibility for
  selectedOS: OperatingSystem; // The currently-selected OS
  selectedIP: IpAddress; // The currently-selected IPv4 Address
  selectOS: boolean = true; // Toggle for whether or not the OS user-selection view should be shown
  showText: boolean = false; // Toggle for whether or not the OS text box should be shown
  foundOS: boolean = true; // True if the OS was found automatically; false otherwise
  foundIP: boolean = false; // True if the IP was found automatically; false otherwise
  deviceInfo: DeviceInfo; // Finds information about the device (including the OS version)
  os_version: string = ""; // The system-found Operating System version in string form
  os_text: string = ""; // The user-specified Operating System version in string form
  ip_text: string = ""; // The user-specified IPv4 Address in string form
  ipFound: boolean = false; // True if the IP was discovered by the server; false otherwise
  osSelection: boolean = true; // Toggle for whether or not the OS home selection view should be shown; default false
  ipSelection: boolean = false; // Toggle for whether or not the IP selection view should be shown; default false
  ip_form: FormGroup;

  ngOnInit(): void {
    this.operatingSystems = this._dataService.getOSList();
    this.deviceInfo = this.deviceDetector.getDeviceInfo();
    this.ipFound = this._dataService.locateClientIP(); 
    this.os_version = this.deviceInfo.os_version;

    // Determine whether or not the user's
    // Operating System exists in our OS list
    this.operatingSystems.forEach(os => {
      if(os.value == this.os_version) {
        this.selectedOS = os;
        this.selectOS = false;
      }
    });

    // If the OS was not found, give the OS object a default value
    // to avoid 'undefined' errors 
    if(this.selectOS == true) {
      this.foundOS = false;
      this.selectedOS = {
        name: "default",
        value: "default"
      }
    }

    // If the IP address was not found, give the IP object a default value
    // to avoid 'undefined' errors. Otherwise, give the IP object the located value
    if(!this.ipFound) {
      this.selectedIP = {
        ip_address: "default"
      }
    } else {
      var ip = this._dataService.getIP();
      if(ip !== null) {
        this.selectedIP.ip_address = ip.ip_address;
      }
    }

    this.ip_form = new FormGroup({
      ip: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(15), IpAddressValidator()])
    });
  }

  select(): void {
    this.selectOS = true;
  }

  showTextBox(): void {
    this.showText = true;
  }

  backToOSSelection(): void {
    this.showText = false;
    this.ipSelection = false;
    this.osSelection = true;
  }

  /**
   * Verify the OS selection of the user.
   * @param selectedOS - The user's selected OS 
   */
  submitOSChoice(selectedOS: OperatingSystem): void {

    if(this.showText) {
      this.selectedOS.name = this.os_text;
      this.selectedOS.value = this.os_text; // Maybe make this "any"?
      this._dataService.setOS(selectedOS);
      this.router.navigate(['/main']);
      return;
    }

    this._dataService.setOS(selectedOS);
    var validOS: boolean = false;
    this.operatingSystems.forEach(os => {
      if(os.name === selectedOS.name &&
         os.value === selectedOS.value)
         validOS = true;
    });

    this.osSelection = false;
    this.ipSelection = true;
  }
  
  submitIPChoice(selectedIP: IpAddress): void {
    if(this.ip_form.controls['ip'].dirty && this.ip_form.valid) {
      selectedIP.ip_address = this.ip_form.controls['ip'].value;
    } else {
      console.log("Error! Please enter a valid IP Address");
    }

    this._dataService.setIP(selectedIP);
    this.router.navigate(['/main']);
  }

}
