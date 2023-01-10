import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFillerComponent } from './form-filler/form-filler.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {
    component: FormFillerComponent,
    path: 'filler',
  }
];

@NgModule({
  declarations: [
    FormFillerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class PdfFormsModule { }
