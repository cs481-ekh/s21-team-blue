import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

/**
 * All modules and components shared between all components across the site
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    TagModule,
    FileUploadModule,
    HttpClientModule,
    InputTextModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    TableModule,
    ProgressSpinnerModule,
    ToastModule, 
    DialogModule
  ]
})
export class SharedModule { }
