import { Component, OnInit } from '@angular/core';
import { OperatingSystem } from 'src/app/shared/models/system-info-models';
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
  test_ids: string[];
  selectedTests: Test[];
  testResults: TestResults[];
  testsView: boolean = true;
  resultsView: boolean = false;
  testsRun: boolean = false;
  loadingView: boolean = false;
  os: OperatingSystem;
  displayModal: boolean = false;

  singleTestResult: TestResults;

  constructor(private _dataService: DataService, private _apiService: ApiService) { }

  ngOnInit(): void {
    this.fillTests();
    this.fillTestResults();
    var possibleOS = this._dataService.getOS();
    if(possibleOS !== null) this.os = possibleOS;
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
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-1-path'
      },
      {
        test_id: '2',
        test_name: 'test2',
        test_description: 'test2 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-2-path'
      },
      {
        test_id: '3',
        test_name: 'test3',
        test_description: 'test3 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-3-path'
      },
      {
        test_id: '4',
        test_name: 'test4',
        test_description: 'test4 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-4-path'
      },
      {
        test_id: '5',
        test_name: 'test5',
        test_description: 'test5 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-5-path'
      },
      {
        test_id: '6',
        test_name: 'test6',
        test_description: 'test6 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-6-path'
      },
      {
        test_id: '7',
        test_name: 'test7',
        test_description: 'test7 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-7-path'
      },
      {
        test_id: '8',
        test_name: 'test8',
        test_description: 'test8 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-8-path'
      },
      {
        test_id: '9',
        test_name: 'test9',
        test_description: 'test9 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-9-path'
      },
      {
        test_id: '10',
        test_name: 'test10',
        test_description: 'test10 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-10-path'
      },
      {
        test_id: '11',
        test_name: 'test11',
        test_description: 'test11 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-11-path'
      },
      {
        test_id: '12',
        test_name: 'test12',
        test_description: 'test12 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-12-path'
      },
      {
        test_id: '13',
        test_name: 'test13',
        test_description: 'test13 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-13-path'
      },
      {
        test_id: '14',
        test_name: 'test14',
        test_description: 'test14 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-14-path'
      },
      {
        test_id: '15',
        test_name: 'test15',
        test_description: 'test15 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-15-path'
      },
      {
        test_id: '16',
        test_name: 'test16',
        test_description: 'test16 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-16-path'
      },
      {
        test_id: '17',
        test_name: 'test17',
        test_description: 'test17 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-17-path'
      },
      {
        test_id: '18',
        test_name: 'test18',
        test_description: 'test18 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-18-path'
      },
      {
        test_id: '19',
        test_name: 'test19',
        test_description: 'test19 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-19-path'
      },
      {
        test_id: '20',
        test_name: 'test20',
        test_description: 'test20 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-20-path'
      },
      {
        test_id: '21',
        test_name: 'test21',
        test_description: 'test21 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-21-path'
      },
      {
        test_id: '22',
        test_name: 'test22',
        test_description: 'test22 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-22-path'
      },
      {
        test_id: '23',
        test_name: 'test23',
        test_description: 'test23 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-23-path'
      },
      {
        test_id: '24',
        test_name: 'test24',
        test_description: 'test24 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-24-path'
      },
      {
        test_id: '25',
        test_name: 'test25',
        test_description: 'test25 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-25-path'
      },
      {
        test_id: '26',
        test_name: 'test26',
        test_description: 'test26 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-26-path'
      },
      {
        test_id: '27',
        test_name: 'test27',
        test_description: 'test27 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-27-path'
      },
      {
        test_id: '28',
        test_name: 'test28',
        test_description: 'test28 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-28-path'
      },
      {
        test_id: '29',
        test_name: 'test29',
        test_description: 'test29 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-29-path'
      },
      {
        test_id: '30',
        test_name: 'test30',
        test_description: 'test30 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-30-path'
      },
      {
        test_id: '31',
        test_name: 'test31',
        test_description: 'test31 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-33-path'
      },
      {
        test_id: '32',
        test_name: 'test32',
        test_description: 'test32 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-32-path'
      },
      {
        test_id: '33',
        test_name: 'test33',
        test_description: 'test33 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-33-path'
      },
      {
        test_id: '34',
        test_name: 'test34',
        test_description: 'test34 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-34-path'
      },
      {
        test_id: '35',
        test_name: 'test35',
        test_description: 'test35 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-35-path'
      },
      {
        test_id: '36',
        test_name: 'test36',
        test_description: 'test36 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-36-path'
      },
      {
        test_id: '37',
        test_name: 'test37',
        test_description: 'test37 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-37-path'
      },
      {
        test_id: '38',
        test_name: 'test38',
        test_description: 'test38 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-38-path'
      },
      {
        test_id: '39',
        test_name: 'test39',
        test_description: 'test39 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-39-path'
      },
      {
        test_id: '40',
        test_name: 'test40',
        test_description: 'test40 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-40-path'
      },
      {
        test_id: '41',
        test_name: 'test41',
        test_description: 'test41 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-41-path'
      },
      {
        test_id: '42',
        test_name: 'test42',
        test_description: 'test42 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-42-path'
      },
      {
        test_id: '43',
        test_name: 'test43',
        test_description: 'test43 description',
        test_history: [],
        operating_systems: 'Windows 10',
        api_path: 'test-43-path'
      },
      {
        test_id: '44',
        test_name: 'test44',
        test_description: 'test44 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-44-path'
      },
      {
        test_id: '45',
        test_name: 'test45',
        test_description: 'test45 description',
        test_history: [],
        operating_systems: 'Mac OS X 14',
        api_path: 'test-45-path'
      },
      {
        test_id: '46',
        test_name: 'test46',
        test_description: 'test46 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-46-path'
      },
      {
        test_id: '47',
        test_name: 'test47',
        test_description: 'test47 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-47-path'
      },
      {
        test_id: '48',
        test_name: 'test48',
        test_description: 'test48 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-48-path'
      },
      {
        test_id: '49',
        test_name: 'test49',
        test_description: 'test49 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-49-path'
      },
      {
        test_id: '50',
        test_name: 'test50',
        test_description: 'test50 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-50-path'
      },
      {
        test_id: '51',
        test_name: 'test51',
        test_description: 'test51 description',
        test_history: [],
        operating_systems: 'Any',
        api_path: 'test-51-path'
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

    var testIds: string[] = [];

    this.selectedTests.forEach(function(test) {
      testIds.push(test.test_id);
    });

    this._apiService.runSingleTest(testIds).subscribe((response: TestResults[]) => {
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
