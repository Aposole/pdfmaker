import { HttpClient } from '@angular/common/http';

import { InteractionService } from './../../Services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { FieldSettingsComponent } from 'src/app/field-settings/field-settings.component';
import { MatDialog } from '@angular/material/dialog';
import { JsonFormData } from 'src/app/json-form/json-form.component';
import { SignaturePadComponent } from '../signature-pad/signature-pad.component';
enum TextFieldDefaultValues {
  EMAIL ,
  DATE_OF_BIRTH ,
  FULL_NAME ,
  FIRST_NAME ,
  LAST_NAME ,
  CURRENT_TIME,
  PHONE
}
enum Default_Validators {
  MIN,
  MAX,
  REQUIRED,
  REQUIRED_TRUE,
  EMAIL,
  MIN_LENGTH,
  MAX_LENGTH,
  PATTERN,
}

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css']
})
export class FormGeneratorComponent implements OnInit {
  usedSignature:boolean = false;
  pageNumber: number = 1;
  pageZoom: number = 1;

  

  pdfSrc = 'http://foersom.com/net/HowTo/data/OoPdfFormExample.pdf';
  fields = [
    {
      id: 1,
      fieldName: 'Field 1 ',
      fieldType: 'Input',
      fromTop: '0',
      fromLeft: '1',
      pageNumber: '0',
      assignedTo: 'anyone',

    },
    {
      id: 2,
      fromTop: 'Field 2',
      fromLeft: 'Input',
      X: '0',
      Y: '1',
      pageNumber: '0',
      assignedTo: 'anyone',
    },
    {
      id: 3,
      fieldName: 'Field 3',
      fieldType: 'Input',
      X: '0',
      Y: '1',
      pageNumber: '0',
      assignedTo: 'anyone',
    },
  ];
  Coords: any[];
  formData: JsonFormData;
  constructor(
    private interactService: InteractionService,
    public dialog: MatDialog,
    private http:HttpClient

    ) { }

    onAddField(fieldConfig: any) {
      // Add the new field to the fields array
      this.fields.push({
        id: this.fields.length + 1,
        fieldName: fieldConfig.fieldName,
        fieldType: fieldConfig.fieldType,
        X: fieldConfig.X,
        Y: fieldConfig.Y,
        pageNumber: fieldConfig.pageNumber,
        assignedTo: fieldConfig.assignedTo,
      });
    }

  ngOnInit(): void {
    this.interactService.init();
    this.http.get('/assets/my-form.json').subscribe((FormData:JsonFormData)=>{
      this.formData = FormData
    })
  }
  getCord(){
    let draggedElements = this.interactService.showCoordinates()
    console.log(draggedElements);
    this.Coords  = draggedElements

  }
  signatureField(){
    const dialogRef = this.dialog.open(SignaturePadComponent, {
      width: '500px', // You can adjust the dialog width and height as needed
      height: '400px',
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'save') {
        // Handle the saved signature here if needed.
      } else {
        // Handle cancel or other actions.
      }
    });
  }

  openDialog(def_values, def_validators): void {
    const dialogRef = this.dialog.open(FieldSettingsComponent, {
      data: { defaultValues: def_values, defaultValidators: def_validators },
    });

    // Listen for the addFieldEvent emitted from FieldSettingsComponent
    dialogRef.componentInstance.addFieldEvent.subscribe((fieldConfig: any) => {
      // Handle the emitted field configuration
      this.onAddField(fieldConfig);
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  openSignaturePad() {
    
  }


  
  addTexField(){
this.openDialog(TextFieldDefaultValues,Default_Validators)
  }
}
