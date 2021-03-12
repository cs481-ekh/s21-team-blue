import { Component, OnInit } from '@angular/core';
import { IpAddress, OperatingSystem } from 'src/app/shared/models/system-info-models';
import { TestResults, Test } from 'src/app/shared/models/test-models'; 
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-testing-main',
  templateUrl: './testing-main.component.html',
  styleUrls: ['./testing-main.component.scss']
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

  constructor(private _dataService: DataService, private _apiService: ApiService) { }

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
  }

  showModalDialog() {
    this.displayModal = true;
  }

  fillTests(): void {
    this.tests = [
      {
        test_id: '1',
        test_name: 'test1',
        test_description: 'test1 description',
        operating_systems: 'Windows 10',
      },
      {
        test_id: '2',
        test_name: 'test2',
        test_description: 'test2 description',
        operating_systems: 'Any',
      },
      {
        test_id: '3',
        test_name: 'test3',
        test_description: 'test3 description',
        operating_systems: 'Mac OS X 14',
      },
      {
        test_id: '4',
        test_name: 'test4',
        test_description: 'test4 description',
        operating_systems: 'Windows 10',
      },
      {
        test_id: '5',
        test_name: 'test5',
        test_description: 'test5 description',
        operating_systems: 'Any',
      },
      {
        test_id: '6',
        test_name: 'test6',
        test_description: 'test6 description',
        operating_systems: 'Mac OS X 14',
      },
      {
        test_id: '7',
        test_name: 'test7',
        test_description: 'test7 description',
        operating_systems: 'Windows 10',
      },
      {
        test_id: '8',
        test_name: 'test8',
        test_description: 'test8 description',
        operating_systems: 'Any',
      },
      {
        test_id: '9',
        test_name: 'test9',
        test_description: 'test9 description',
        operating_systems: 'Mac OS X 14',
      },
      {
        test_id: '10',
        test_name: 'test10',
        test_description: 'test10 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '11',
        test_name: 'test11',
        test_description: 'test11 description',
        operating_systems: 'Any',

      },
      {
        test_id: '12',
        test_name: 'test12',
        test_description: 'test12 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '13',
        test_name: 'test13',
        test_description: 'test13 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '14',
        test_name: 'test14',
        test_description: 'test14 description',
        operating_systems: 'Any',

      },
      {
        test_id: '15',
        test_name: 'test15',
        test_description: 'test15 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '16',
        test_name: 'test16',
        test_description: 'test16 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '17',
        test_name: 'test17',
        test_description: 'test17 description',
        operating_systems: 'Any',

      },
      {
        test_id: '18',
        test_name: 'test18',
        test_description: 'test18 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '19',
        test_name: 'test19',
        test_description: 'test19 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '20',
        test_name: 'test20',
        test_description: 'test20 description',
        operating_systems: 'Any',

      },
      {
        test_id: '21',
        test_name: 'test21',
        test_description: 'test21 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '22',
        test_name: 'test22',
        test_description: 'test22 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '23',
        test_name: 'test23',
        test_description: 'test23 description',
        operating_systems: 'Any',

      },
      {
        test_id: '24',
        test_name: 'test24',
        test_description: 'test24 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '25',
        test_name: 'test25',
        test_description: 'test25 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '26',
        test_name: 'test26',
        test_description: 'test26 description',
        operating_systems: 'Any',

      },
      {
        test_id: '27',
        test_name: 'test27',
        test_description: 'test27 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '28',
        test_name: 'test28',
        test_description: 'test28 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '29',
        test_name: 'test29',
        test_description: 'test29 description',
        operating_systems: 'Any',

      },
      {
        test_id: '30',
        test_name: 'test30',
        test_description: 'test30 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '31',
        test_name: 'test31',
        test_description: 'test31 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '32',
        test_name: 'test32',
        test_description: 'test32 description',
        operating_systems: 'Any',

      },
      {
        test_id: '33',
        test_name: 'test33',
        test_description: 'test33 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '34',
        test_name: 'test34',
        test_description: 'test34 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '35',
        test_name: 'test35',
        test_description: 'test35 description',
        operating_systems: 'Any',

      },
      {
        test_id: '36',
        test_name: 'test36',
        test_description: 'test36 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '37',
        test_name: 'test37',
        test_description: 'test37 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '38',
        test_name: 'test38',
        test_description: 'test38 description',
        operating_systems: 'Any',

      },
      {
        test_id: '39',
        test_name: 'test39',
        test_description: 'test39 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '40',
        test_name: 'test40',
        test_description: 'test40 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '41',
        test_name: 'test41',
        test_description: 'test41 description',
        operating_systems: 'Any',

      },
      {
        test_id: '42',
        test_name: 'test42',
        test_description: 'test42 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '43',
        test_name: 'test43',
        test_description: 'test43 description',
        operating_systems: 'Windows 10',

      },
      {
        test_id: '44',
        test_name: 'test44',
        test_description: 'test44 description',
        operating_systems: 'Any',

      },
      {
        test_id: '45',
        test_name: 'test45',
        test_description: 'test45 description',
        operating_systems: 'Mac OS X 14',

      },
      {
        test_id: '46',
        test_name: 'test46',
        test_description: 'test46 description',
        operating_systems: 'Any',

      },
      {
        test_id: '47',
        test_name: 'test47',
        test_description: 'test47 description',
        operating_systems: 'Any',

      },
      {
        test_id: '48',
        test_name: 'test48',
        test_description: 'test48 description',
        operating_systems: 'Any',

      },
      {
        test_id: '49',
        test_name: 'test49',
        test_description: 'test49 description',
        operating_systems: 'Any',

      },
      {
        test_id: '50',
        test_name: 'test50',
        test_description: 'test50 description',
        operating_systems: 'Any',

      },
      {
        test_id: '51',
        test_name: 'test51',
        test_description: 'test51 description',
        operating_systems: 'Any',

      }
    ];
  }

  fillTestResults(): void {
    this.testResults = [
      {
        id: '1',
        test_id: '7',
        description: 'result1 description',
        date: '2020-01-07',
        value: 'Failed'
      },
      {
        id: '2',
        test_id: '8',
        description: 'result2 description',
        date: '2020-02-07',
        value: 'Failed'
      },
      {
        id: '3',
        test_id: '31',
        description: 'result3 description',
        date: '2020-02-07',
        value: 'Success'
      }
    ]
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
      this.testResults = response;
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
