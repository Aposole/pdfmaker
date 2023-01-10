import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-field-settings',
  templateUrl: './field-settings.component.html',
  styleUrls: ['./field-settings.component.css']
})
export class FieldSettingsComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<FieldSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }
    showUsers:boolean= false;
    showStages:boolean= false;
    inputTypes: string[] = ['email', 'number', 'text', 'date'];
    assignementList: any[] = [
      {'id':0,'name':'Anyone'},
      {'id':1,'name':'Anyone from stage'},
      {'id':2,'name':'Specific user'},
    ];
    users: any[]= [{'email':'aymen@consultim.com','name':'aymen hamadi'},
    {'email':'fathi@consultim.com','name':'fathi dridi'}
  ]
  stages: any[]= [{'id':'0','name':'Sign'},{'id':'1','name':'Review'},{'id':'2','name':'Approve'}
]
  ngOnInit(): void {
    console.log(this.data);

  }

  toggle(id){
   id==2 ? this.showUsers = true : this.showUsers= false;
   id==1 ? this.showStages = true : this.showStages= false;
   console.log(this.showUsers);
  }
}
