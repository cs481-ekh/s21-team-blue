import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IpAddress, OperatingSystem } from '../models/system-info-models';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  localStorage: Storage;
  os_str: string | null;
  ip_str: string | null;
  ip: IpAddress;
  os: OperatingSystem;

  constructor(private http: HttpClient) {
    this.localStorage = window.localStorage;
  }

  getOS(): OperatingSystem | null {
    if(this.isLocalStorageSupported) {
      this.os_str = this.localStorage.getItem("os");
      if (this.os_str != null) {
        this.os = JSON.parse(this.os_str);
        return this.os;
      }
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
   * Get the client IP from the server and store it in local storage
   * Return - true if found, false otherwise
   */
  locateClientIP(): boolean {
    this.http.get<IpAddress>('/api/get-client-ip').subscribe((response: IpAddress) => {
      this.ip_str = response.ip_address;
      if(!this.ip_str.includes("Error")) {
        this.localStorage.setItem("ip", this.ip_str);
        this.ip = JSON.parse(this.ip_str);
        return true;
      } else {
        return false;
      }
    });
    return false;
  }

  setIP(ip: IpAddress): boolean {
    if(this.isLocalStorageSupported) {
      this.localStorage.setItem("ip", JSON.stringify(ip));
      return true;
    }
    return false;
  }

  getIP(): IpAddress | null {
    if(this.isLocalStorageSupported) {
      this.ip_str = this.localStorage.getItem("ip");
      if(this.ip_str !== null && this.ip_str !== "undefined")
      {
        this.ip = JSON.parse(this.ip_str);
        return this.ip;
      }
    }
    return null;
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
