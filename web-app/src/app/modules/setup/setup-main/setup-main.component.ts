import { ParseSourceFile, ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpAddress, OperatingSystem } from 'src/app/shared/models/system-info-models';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-setup-main',
  templateUrl: './setup-main.component.html',
  styleUrls: ['./setup-main.component.scss']
})
export class SetupMainComponent implements OnInit {
  

  constructor(private _dataService: DataService, private router: Router) { }

  file: any;
  fileLines: string[];
  uploadSuccess: boolean = false;

  ngOnInit(): void {
  }

  goToTesting(): void {
    this.router.navigate(['/main']);
  }

  onUpload(event: any) {
    this.file = event.files[0];
    let fileReader = new FileReader();
    if(this.file) {
      fileReader.readAsText(this.file);
      fileReader.onload = () => {
        this.fileLines = (<string>fileReader.result).split(/r\n|\n/); 
        this.parseFile(this.fileLines);
      }
    }
  }

  parseFile(file: string[]) {

    var firstLine = file[0];
    
    // Basic check to make sure the file at least begins to look like a valid test_history.dat file
    if(firstLine != "os-name,os-value,ip") {
      console.log("File Format Error")
      // Throw error: Invalid file format. Your test_history.dat file has been tampered with. Please revert the file to the contents of the original upload, or proceed as a new user..
    }

    var dataLine = file[1];

    var fields: string[] = dataLine.split(",");
    var os_field: string = fields[0].replace(/"/g,""); // Remove all quotation marks from the string
    var os_val_field: string = fields[1].replace(/"/g,""); // Remove all quotation marks from the string
    var ip_field: string = fields[2];

    var os: OperatingSystem = {
      name: os_field,
      value: os_val_field
    };
    this._dataService.setOS(os);
    
    var ip: IpAddress = {
      ip_address: ip_field
    };
    this._dataService.setIP(ip);

    this.uploadSuccess = true;

  }

}
