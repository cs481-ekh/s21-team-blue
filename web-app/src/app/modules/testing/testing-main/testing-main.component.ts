import { Component, OnInit } from '@angular/core';
import { IpAddress, OperatingSystem } from 'src/app/shared/models/system-info-models';
import { TestResults, Test } from 'src/app/shared/models/test-models'; 
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';
import { saveAs } from 'file-saver';
import { DialogService } from 'primeng/dynamicdialog';
import { ResultsDialogComponent } from '../results-dialog/results-dialog.component';

@Component({
  selector: 'app-testing-main',
  templateUrl: './testing-main.component.html',
  styleUrls: ['./testing-main.component.scss'],
  providers: [DialogService]
})
export class TestingMainComponent implements OnInit {

  tests: Test[];
  selectedTests: Test[];
  testResults: TestResults[];
  testsView: boolean = true;
  resultsView: boolean = false;
  testsRun: boolean = false;
  loadingView: boolean = false;
  os: OperatingSystem;
  ip: IpAddress;
  displayModal: boolean = false;
  displayTestArea: boolean = false;

  singleTestResult: TestResults;

  constructor(private _dataService: DataService, private _apiService: ApiService, private dialogService: DialogService) { }

  ngOnInit(): void {
    // Get a list of available tests
    this._apiService.getTestList().subscribe((response: Test[]) => {
      this.tests = response;
      this.displayTestArea = true;
    });

    var possibleOS = this._dataService.getOS();
    if(possibleOS !== null) this.os = possibleOS;
    if(this._dataService.getTestResultsList() !== null) {
      var tr = this._dataService.getTestResultsList();
      if(tr !== null) {
        this.testResults = tr;
        this.testsRun = true;
      }
    }
    if(this.testResults == null) this.testResults = [];
  }

  showModalDialog(desc: string, val: string) {
    this.displayModal = true;
    this.dialogService.open(ResultsDialogComponent, {
      data: {
        description: desc
      },
      header: val,
      width: '50%'
    });
  }

  /** 
   * Execute the selected tests
   */
  runTests(): void {    
    // Flip the screen to show results
    this.testsView = false;
    this.loadingView = true;

    var request: string[] = [];

    var possibleIP = this._dataService.getIP();
    if(possibleIP !== null) this.ip = possibleIP;

    request.push(this.ip.ip_address); // Add the IP address as the first index in the string array.

    this.selectedTests.forEach(function(test) {
      request.push(test.test_id);
    });

    this._apiService.runTests(request).subscribe((response: TestResults[]) => {
      
      // Append new test results to the testResults variable
      response.forEach(res => {
        this.testResults.push(res);
      });
      this._dataService.setTestResultsList(this.testResults);
      this.testsRun = true;
      this.resultView();
    }); 

  }

  /**
   * Return from the test results view to
   * the test selection view
   */
  testView(): void {
    this.resultsView = false;
    this.testsView = true;
  }

  /**
   * Return from the test selection view to
   * the test results view
   * 
   */
  resultView(): void {
    this.testsView = false;
    this.loadingView = false;
    this.resultsView = true;
  }

  generateFileText(): string {
    var t = '';
    t = 'os-name,os-value,ip\n';
    t += '"' + this.os.name + '","' + this.os.value + '",' + this.ip.ip_address + '\n';
    this.testResults.forEach(res => {
      var desc = res.description.split(',').join('$cm$'); // Avoid comma parsing issues
      t += '\n';
      t += res.id + ',' + res.test_id + ',' + desc + ',' + res.date + ',' + res.value;
    });
    return t;
  }

  saveFile(): void {
    var text: string = this.generateFileText();
    const blob = new Blob([text], { type: 'text/plain' });
    const fileName = 'test_history.dat';
    saveAs(blob, fileName);
  }

  /**
   * Display a more detailed description of the selected
   * test results in the form of a popup
   * @param res - the result to display
   */
  resultPopup(res: TestResults) {
  }

  /**
   * Test method; used to display loading bar.
   */
  doneLoadingTest(): void {
    this.loadingView = false;
    this.resultsView = true;
    this.testsRun = true;
  }

}


