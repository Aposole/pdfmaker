import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css'],
})
export class SignaturePadComponent {
  @ViewChild('signatureCanvas') signatureCanvas: ElementRef;
private ctx: CanvasRenderingContext2D;
  private isDrawing: boolean = false;

  constructor() {}

  ngAfterViewInit() {
    this.ctx = this.signatureCanvas.nativeElement.getContext('2d');
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = '#000';
  }

  clearSignature() {
    this.ctx.clearRect(0, 0, this.signatureCanvas.nativeElement.width, this.signatureCanvas.nativeElement.height);
  }

  saveSignature() {
    const signatureDataUrl = this.signatureCanvas.nativeElement.toDataURL(); // Get the signature as a data URL
    // You can now send the signatureDataUrl to your server or process it as needed.
    console.log(signatureDataUrl);
  }

  @HostListener('mousedown', ['$event'])
onMouseDown(event: MouseEvent) {
  this.isDrawing = true;
  this.ctx.beginPath();
  // Set starting point for drawing.
}

@HostListener('mousemove', ['$event'])
onMouseMove(event: MouseEvent) {
  if (!this.isDrawing) return;
  // Implement drawing logic here.
}

@HostListener('mouseup', ['$event'])
onMouseUp(event: MouseEvent) {
  this.isDrawing = false;
  this.ctx.closePath();
}
}
