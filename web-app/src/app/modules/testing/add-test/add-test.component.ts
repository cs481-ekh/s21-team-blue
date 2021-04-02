import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { MessageService } from 'primeng/api';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.scss'],
  providers: [MessageService]
})
export class AddTestComponent implements OnInit {

  constructor(private _apiService: ApiService, private messageService: MessageService) { }

  public uploader: FileUploader = new FileUploader({
    url: "/api/upload-test",
    itemAlias: 'py'
  });

  file: any;
  fileData: FormData;
  loading: boolean = false;

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      if(!item.isError) {
        this.messageService.add({key: 'tc', severity:'success', summary: 'Success', detail: 'File successfully uploaded. Return to the testing page to view and run your new test, or add another test.'});
        this.loading = false;
      } else {
        this.messageService.add({key: 'tc', severity:'error', summary: 'Error', detail: 'Could not upload the file. Please check your syntax and connection to the Pi before trying again'});
        this.loading = false;
      }
    };
  }

  uploadFile() {
    this.loading = true;
    this.uploader.uploadAll();
  }

  saveTemplateFile() {
    var text: string = 
`"""
Pirate scan for [Short description here]

Created by [Your name here]
"""

# import [add your Python imports here]


class template_file: # class name must match file name (without the '.py', of course)
    name = "" # Short name of the test
    desc = "" # Short description of the test
    oses = "" # Operating Systems this test is compatible with

    # The logic for the scan
    def scan(host_ip):
        return ("", "") # Return a string 2-tuple; 1 - Result (i.e., "Success", "Failure", "Info", etc), and 2 - Long description (i.e., command-line output)
`;
    const blob = new Blob([text], { type: 'text/plain' });
    const fileName = 'template_file.py';
    saveAs(blob, fileName);
  }

}
