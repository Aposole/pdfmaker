import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
  styleUrls: ['./signature-pad.component.css']
})
export class SignaturePadComponent implements AfterViewInit, OnInit {

  @ViewChild('signatureCanvas', { static: true }) signatureCanvas: ElementRef;
  private signaturePad: SignaturePad;
  ctx: CanvasRenderingContext2D;
  private isDrawing: boolean = false;
  private lastX: number;
  private lastY: number;
  savedSignatureDataUrl: string | null = null;
  constructor(
    public dialogRef: MatDialogRef<SignaturePadComponent>
  ) { }

  ngOnInit() { 
  }

  ngAfterViewInit() {
    const canvas: HTMLCanvasElement = this.signatureCanvas.nativeElement;
    this.ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Configure context styles (line color, width, etc.) if needed
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;

    // Add event listeners
    canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
    canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
    canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));

  }

  clear() {
    this.signaturePad.clear();
  }

  save() {
    const canvas: HTMLCanvasElement = this.signatureCanvas.nativeElement;
    this.savedSignatureDataUrl = canvas.toDataURL();
    console.log('Saved Signature DataURL:', this.savedSignatureDataUrl);
    this.dialogRef.close(this.savedSignatureDataUrl);
  }

  private handleMouseDown(event: MouseEvent) {
    this.isDrawing = true;
    const { offsetX, offsetY } = event;
    this.lastX = offsetX;
    this.lastY = offsetY;
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX, offsetY);
  }

  private handleMouseMove(event: MouseEvent) {
    if (!this.isDrawing) return;
    const { offsetX, offsetY } = event;
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
    this.lastX = offsetX;
    this.lastY = offsetY;
  }

  private handleMouseUp() {
    this.isDrawing = false;
    this.ctx.closePath();
  }
}
