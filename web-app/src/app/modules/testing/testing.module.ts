import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestingMainComponent } from './testing-main/testing-main.component';
import { TestingRoutingModule } from './testing.routing';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { ResultsDialogComponent } from './results-dialog/results-dialog.component';
import { AddTestComponent } from './add-test/add-test.component';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  declarations: [
    TestingMainComponent, 
    SettingsComponent, 
    ResultsDialogComponent, 
    AddTestComponent,
  ],
  imports: [
    CommonModule,
    TestingRoutingModule,
    SharedModule,
    FileUploadModule
  ]
})
export class TestingModule { }
