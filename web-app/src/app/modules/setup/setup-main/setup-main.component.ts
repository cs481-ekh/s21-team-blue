import { ParseSourceFile, ReadVarExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IpAddress, OperatingSystem } from 'src/app/shared/models/system-info-models';
import { TestResults } from 'src/app/shared/models/test-models';
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
  displayError: boolean = false;
  displayDialog: boolean = false;

  ngOnInit(): void {
    if(this._dataService.getFileError() !== null) {
      this.displayError = true;
      this.displayDialog = true;
    }
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

    try {
      var firstLine = file[0];
     
      var dataLine = file[1]; // file[1] is the line that contains the OS and IP data.    
      var fields: string[] = dataLine.split(","); // Split the data by commas.
      var os_field: string = fields[0].replace(/"/g,""); // Remove all quotation marks from the string
      var os_val_field: string = fields[1].replace(/"/g,""); // Remove all quotation marks from the string
      var ip_field: string = fields[2];

      var os: OperatingSystem = {
        name: os_field,
        value: os_val_field
      };
      var ip: IpAddress = {
        ip_address: ip_field
      };

      if (file.length > 3) { // If there are any TestResults, save them in LocalStorage
        var testResults: TestResults[] = [];
        for(var i: number = 3; i < file.length; i++) {
          var currLine: string = file[i];
          var res_fields = currLine.split(",");
          var idx = i - 3;
          if(res_fields.length == 5) {
            testResults[idx] = {
              id: res_fields[0],
              test_id: res_fields[1],
              description: res_fields[2],
              date: res_fields[3],
              value: res_fields[4]
            };
          } else {
            this.fileFormatError();
            return;
          }
        }
        if(testResults !== null) {
          // Set all of the necessary values in local storage
          this._dataService.setOS(os);
          this._dataService.setIP(ip);
          this._dataService.setTestResultsList(testResults);
          this.displayDialog = false;
          this.displayError = false;
          this.uploadSuccess = true;
        }
      } else {
        this.fileFormatError();
      }
    } catch(e) {
      this.fileFormatError();
    }

  }

  fileFormatError() {
    this._dataService.setFileError("File Errors Found");
    location.reload();
  }

}


