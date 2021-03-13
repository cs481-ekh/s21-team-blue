import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IpAddress, OperatingSystem } from '../models/system-info-models';
import { TestResults } from '../models/test-models';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  localStorage: Storage;
  os_str: string | null;
  ip_str: string | null;
  error_str: string | null;
  testResults_str: string | null;
  ip: IpAddress;
  os: OperatingSystem;
  testResults: TestResults[];

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
  locateClientIP(): Observable<IpAddress> {
    return this.http.get<IpAddress>('/api/get-client-ip');
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

  getTestResultsList(): TestResults[] | null {
    if(this.isLocalStorageSupported) {
      this.testResults_str = this.localStorage.getItem("testResults");
      if(this.testResults_str != null && this.ip_str !== "undefined") {
        this.testResults = JSON.parse(this.testResults_str);
        return this.testResults;
      }
    }
    return null;
  }

  setTestResultsList(testResults: TestResults[]): boolean {
    if(this.isLocalStorageSupported) {
      this.localStorage.setItem("testResults", JSON.stringify(testResults));
      return true;
    }
    return false;
  } 

  setFileError(err: string): boolean {
    if(this.isLocalStorageSupported) {
      this.localStorage.setItem("fileErrors", err);
      return true;
    }
    return false;
  }

  getFileError(): string | null {
    if(this.isLocalStorageSupported) {
      this.error_str = this.localStorage.getItem("fileErrors");
      if(this.error_str != null && this.error_str !== "undefined") {
        return this.error_str;
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
