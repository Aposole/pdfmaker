import { HttpClient } from '@angular/common/http';

import { InteractionService } from './../../Services/interaction.service';
import { Component, OnInit } from '@angular/core';
import { FieldSettingsComponent } from 'src/app/field-settings/field-settings.component';
import { MatDialog } from '@angular/material/dialog';
import { JsonFormData } from 'src/app/json-form/json-form.component';
enum TextFieldDefaultValues {
  EMAIL ,
  DATE_OF_BIRTH ,
  FULL_NAME ,
  FIRST_NAME ,
  LAST_NAME ,
  CURRENT_TIME,
  PHONE
}
enum DropdownDefaultValues {
  GENDER ,
  COUNTRIES ,
  WEEKDAYS ,
  MONTHS
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

var FieldsColors  = ["#574AE2","#FFBF00","#E83F6F","#480FB5","#6a8d73","#501537"]
@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css']
})
export class FormGeneratorComponent implements OnInit {
  usedSignature:boolean = false;
  pageNumber: number = 1;
  pageZoom: number = 1;

  pdfSrc = 'http://127.0.0.1:8887/multi.pdf';
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
this.usedSignature = true; // if user uses a signature, every other field gets disabled
console.log('disabled all fields');
  }

  openDialog(def_values,def_validators): void {
    const dialogRef = this.dialog.open(FieldSettingsComponent, {
      data: {defaultValues :def_values,defaultValidators: def_validators },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  addTexField(){
this.openDialog(TextFieldDefaultValues,Default_Validators)
  }
}
