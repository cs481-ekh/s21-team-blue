import { Component, OnInit } from '@angular/core';
import { IpAddress, OperatingSystem } from 'src/app/shared/models/system-info-models';
import { TestResults, Test } from 'src/app/shared/models/test-models'; 
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';
import { saveAs } from 'file-saver';
import { DialogService } from 'primeng/dynamicdialog';
import { ResultsDialogComponent } from '../results-dialog/results-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-testing-main',
  templateUrl: './testing-main.component.html',
  styleUrls: ['./testing-main.component.scss'],
  providers: [DialogService, ConfirmationService,MessageService]
})
export class TestingMainComponent implements OnInit {

  tests: Test[];
  selectedTests: Test[];
  testResults: TestResults[];
  deleteResults: TestResults[];
  testsView: boolean = true;
  resultsView: boolean = false;
  testsRun: boolean = false;
  loadingView: boolean = false;
  os: OperatingSystem;
  ip: IpAddress;
  displayModal: boolean = false;
  displayTestArea: boolean = false;
  testCols: { header: string; width: string; }[];
  resCols: { header: string; width: string; }[];
  currId: number = 0;
  msg: Message[] = [];

  singleTestResult: TestResults;
  displayDialog: boolean = false;
  testListError: boolean = false;
  testExecutionError: boolean = false;
  noTests: boolean = false;
  errorMessage: string = "";
  errorLong: string = "";
  failedExec: boolean = false;

  constructor(private _dataService: DataService, private _apiService: ApiService, private dialogService: DialogService, 
    private confirmationService: ConfirmationService) { 
    this.testCols = [
      { header: ' ', width: '5%' },
      { header: 'Name', width: '30%' },
      { header: 'Description', width: '35%' },
      { header: 'Operating Systems', width: '30%' }
    ];

    this.resCols = [
      { header: ' ', width: '5%' },
      { header: 'Name', width: '35%' },
      { header: 'Date Executed', width: '35%' },
      { header: 'Result', width: '30%' },
    ];
  }

  ngOnInit(): void {
    // Get a list of available tests
    this._apiService.getTestList().subscribe((response: Test[]) => {
      this.tests = response;
      this.displayTestArea = true;
    },
    (error) => {
      this.errorMessage = error.message;
      this.errorLong = error.error;
      this.testListError = true;
      this.noTests = true;
      return;
    });

    var possibleOS = this._dataService.getOS();
    if(possibleOS !== null) this.os = possibleOS;
    if(this._dataService.getTestResultsList() !== null) {
      var tr = this._dataService.getTestResultsList();
      if(tr !== null) {
        this.testResults = tr;
        if(tr.length > 0)
          this.currId = tr.length;
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

  confirmDeletion() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete this test/set of tests? Deleted tests cannot be restored.',
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteTestResults();
          this.msg = [{severity:'info', summary:'Confirmed', detail:'Selected tests have been deleted'}];
        }
    });
  }

  /** 
   * Execute the selected tests
   */
  runTests(): void {    
    if(this.selectedTests.length + this.currId > 500) {
      this.displayDialog = true;
      return;
    }

    // Flip the screen to show loading screen
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
        res.id = String(this.currId);
        this.currId++;
        this.testResults.push(res);
      });
      this._dataService.setTestResultsList(this.testResults);
      this.testsRun = true;
      this.resultView();
    },
    (error) => {
      this.errorMessage = error.message;
      this.errorLong = error.error;
      this.testExecutionError = true;
      this.failedExec = true;
    }); 

  }

  /**
   * Return from the test results view to
   * the test selection view
   */
  testView(): void {
    this.resultsView = false;
    this.loadingView = false;
    this.testExecutionError = false;
    this.testsView = true;
    this.msg = [];
  }

  /**
   * Return from the test selection view to
   * the test results view
   * 
   */
  resultView(): void {
    this.testsView = false;
    this.loadingView = false;
    this.testListError = false;
    this.testExecutionError = false;
    this.resultsView = true;
    this.msg = [];
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

  deleteTestResults(): void {
    var newResultsList: TestResults[] = [];
    this.testResults.forEach(t => {
      if(!this.deleteResults.includes(t)) {
        newResultsList.push(t);
      } else {
      }
    });
    this._dataService.setTestResultsList(newResultsList);
    if(this._dataService.getTestResultsList() !== null) {
      var tr = this._dataService.getTestResultsList();
      if(tr !== null) {
        this.testResults = tr;
        this.currId = this.testResults.length;
      }
    } else {
      this.testResults = [];
      this.currId = 0;
    }
    this.deleteResults = [];
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


