import { PdfGenerateComponent } from './pdf-generate/pdf-generate.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FillPdfComponent } from './fill-pdf/fill-pdf.component';

const routes: Routes = [
  {
    component: PdfGenerateComponent,
    path: 'pdf-generate',
  },
  {
    component: FillPdfComponent,
    path: 'pdf-fill',
  },
  {path: "pdf", loadChildren: () => import("../app/pdf-forms/pdf-forms.module").then(m => m.PdfFormsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
