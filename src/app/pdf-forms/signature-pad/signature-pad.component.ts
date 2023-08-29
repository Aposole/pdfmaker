import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent implements AfterViewInit {

  @ViewChild('signatureCanvas') canvas : ElementRef;

  signaturePad: SignaturePad;
  ctx: CanvasRenderingContext2D;

  constructor(
    public dialogRef: MatDialogRef<SignaturePadComponent>
  ) {}
  

  ngAfterViewInit() {
    const canvas = this.canvas.nativeElement;
    this.signaturePad = new SignaturePad(canvas); 
  }
  clear() {
    this.signaturePad.clear(); 
  }
  
Save() {
  const data = this.signaturePad.toDataURL();
  this.dialogRef.close(data);
}

@HostListener('mousedown') 
onMouseDown() {
  this.signaturePad.on();
}

@HostListener('mousemove')
onMouseMove() {
  if(!this.signaturePad) {
    return; 
  }

  this.signaturePad.on();
}

@HostListener('mouseup')
onMouseUp() {
  this.signaturePad.off();
}
}
