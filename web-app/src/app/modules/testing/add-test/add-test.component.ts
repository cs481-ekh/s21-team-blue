import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss']
})
export class AddTestComponent implements OnInit {

  constructor() { }

  file: any;

  ngOnInit(): void {
  }

  onUpload(event: any) {
    this.file = event.files[0];
    let fileReader = new FileReader();
    if(this.file) {
      // TODO: Test if the file will return correctly after uploading and calling --list. 
      // If it doesn't, delete it and return an error. 
    }
  }

}
