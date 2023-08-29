import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignatureService } from '../Services/signature.service';

@Component({
  selector: 'app-field-settings',
  templateUrl: './field-settings.component.html',
  styleUrls: ['./field-settings.component.css'],
})
export class FieldSettingsComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FieldSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private signatureService: SignatureService
  ) {}
  showUsers: boolean = false;
  showStages: boolean = false;
  inputTypes: string[] = ['number', 'text'];
  signatureImage: string = '';

  @Output() addFieldEvent = new EventEmitter<any>();

  assignementList: any[] = [
    { id: 0, name: 'Anyone' },
    { id: 1, name: 'Anyone from stage' },
    { id: 2, name: 'Specific user' },
  ];
  users: any[] = [
    { email: 'aymen@consultim.com', name: 'aymen hamadi' },
    { email: 'fathi@consultim.com', name: 'fathi dridi' },
  ];
  stages: any[] = [
    { id: '0', name: 'Sign' },
    { id: '1', name: 'Review' },
    { id: '2', name: 'Approve' },
  ];
  ngOnInit(): void {
    console.log(this.data,"msg data");
  }

  toggle(id) {
    id == 2 ? (this.showUsers = true) : (this.showUsers = false);
    id == 1 ? (this.showStages = true) : (this.showStages = false);
    console.log(this.showUsers);
  }
  selectedType;
  showSelectedType(e) {
    console.log(e);
  }
  is_Required: boolean = false;
  accept_multiple_input: boolean = false;
  has_max_length: boolean = false;
  has_default_value: boolean = false;
  has_min_value: boolean = false;
  has_max_value: boolean = false;
  toggleRequired() {
    console.log(this.is_Required);
  }
  toggleMultipleInput() {
    console.log(this.is_Required);
  }

  setDefaultValue() {
    if (this.has_default_value) {
      // this.is_Required = false;
      this.accept_multiple_input = false;
    }
  }
  fieldName: string = undefined;
  defVal: number = undefined;
  submit() {
    // Generate a unique signature image URL (you can use a timestamp or a unique identifier)
    const uniqueImageUrl = this.signatureService.generateUniqueImageUrl();
    
    // Save the URL to the service
    this.signatureService.saveSignatureImageUrl(uniqueImageUrl);
  
    // Set the signatureImage property to display the image on the page
    this.signatureImage = uniqueImageUrl;
  
    // Emit the field configuration
    const field = {
      fieldName: this.fieldName,
      fieldType: this.selectedType,
      X: '0',
      Y: '0',
      assignedTo: 'anyone',
      validators: {},
    };
  
    const validatorsToAdd = [];
  
    if (this.is_Required) {
      validatorsToAdd.push(Validators.required);
    }
  
    if (this.defVal == 0) {
      validatorsToAdd.push(Validators.email);
    }
  
    field.validators = validatorsToAdd;
    this.addFieldEvent.emit(field);
  }
  
  minL:Number = 0;
  maxL:Number = 0;
}

