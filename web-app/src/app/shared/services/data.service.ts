import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { OperatingSystem } from '../models/system-info-models';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  localStorage: Storage;
  os_str: string | null;
  os: OperatingSystem;

  constructor() {
    this.localStorage = window.localStorage;
  }

  getOS(): any {
    if(this.isLocalStorageSupported)
      this.os_str = this.localStorage.getItem("os");
      if (this.os_str != null) {
        this.os = JSON.parse(this.os_str);
        return this.os;
      }
    
    return null;
  }

  setOS(os: OperatingSystem): boolean {
    if(this.isLocalStorageSupported) {
      this.localStorage.setItem("os", JSON.stringify(os));
      return true;
    }

    return false;
  }

  getOSList(): OperatingSystem[] {
    return [
      { name: 'Windows 10', value: 'windows-10' },
      { name: 'Ubuntu 20.04', value: 'ubuntu-20-04' },
      { name: 'MacOS X 15', value: 'macos-x-15' }
    ]
  }

  /**
   * Checks to see if the current browser supports local storage.
   * Support is common on new browsers, but less common on IE7 and previous
   * browsers.
   */
  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }

}
