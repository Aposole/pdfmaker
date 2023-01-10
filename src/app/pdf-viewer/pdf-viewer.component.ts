import {
  Component,
  Input,
  OnInit,
  OnChanges,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';

import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

let PDFJS: any;
function isSSR() {
  return typeof window === 'undefined';
}

if (!isSSR()) {
  // @ts-ignore
  PDFJS = require('pdfjs-dist/build/pdf');
}

interface IPdfDocumentLoad {
  numPages: number;
}

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PDFViewerComponent implements OnInit, OnChanges {
  pdfSrc = 'http://127.0.0.1:8887/OoPdfFormExample.pdf';
  @Input()
  pageNumber = 1;

  @Input()
  zoom = 1.0;

  @Input()
  bgColor = 'rgba(0,0,0,0)'; // Default background color is white

  @Output()
  PdfDocumentLoad = new EventEmitter<IPdfDocumentLoad>();

  public _pdfDocument: any;
  height_;
  width_;
  constructor(private changeDetectorRef: ChangeDetectorRef) {
    if (isSSR()) {
      return;
    }
    PDFJS.GlobalWorkerOptions.workerSrc =
      'https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js';
  }

  getNumPages() {
    this.PdfDocumentLoad.emit(this._pdfDocument._pdfInfo.numPages);
    return this._pdfDocument._pdfInfo.numPages;
  }

  afterPageLoad(): IPdfDocumentLoad {
    const obj = {
      numPages: this.getNumPages(),
    };
    return obj;
  }

  async ngOnInit(): Promise<void> {
    setTimeout(() => {
      this.renderPDF(this.pdfSrc, document.getElementById('holder'));
    }, 2);

    try {
      this._pdfDocument = await this.getDocument();

      this.PdfDocumentLoad.emit(this.afterPageLoad());
      this.PdfDocumentLoad.emit(this.afterPageLoad());
    } catch (error) {
      console.log(error);
    }
  }

  async ngOnChanges(changes) {
    if (!this._pdfDocument) {
      return;
    }
    //this.createRenderTask();
  }

  async ngOnDestroy() {
    if (this._pdfDocument) {
      this._pdfDocument.destroy();
      this._pdfDocument = null;
    }
  }

  isValidPageNumberRequest(requestedPage) {
    return requestedPage > 0 && requestedPage <= this.getNumPages();
  }

  private async getDocument() {
    const loadingTask = PDFJS.getDocument(this.pdfSrc);
    return loadingTask.promise.then(function (pdfDocument) {
      return new Promise((resolve) => resolve(pdfDocument));
    });
  }

  public async getPage(page): Promise<PDFPageProxy> {
    return await this._pdfDocument.getPage(page);
  }

  private getCanvas(viewport): HTMLCanvasElement {
    const canvas: any = document.getElementById('pdfCanvas');

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    return canvas;
  }

  renderPDF(url, canvasContainer) {
    console.log('rendering')
    function renderPage(page) {
        let viewport = page.getViewport();
        var wrapper = document.createElement('div');
        wrapper.className = 'canvas-wrapper';
        wrapper.setAttribute('pageNumber', page.pageNumber);
        wrapper.style.width = page._pageInfo.view[2];
        var canvas = document.createElement('canvas');
        canvas.id = 'pdfCanvas';
        canvas.setAttribute('pageNumber', page.pageNumber);
        canvas.style.display = 'block';
        canvas.style.float = 'right';
        canvas.style.border = '1px solid black';
        canvas.className = 'dropzone';
        canvas.height = page._pageInfo.view[3]*1.33333;
        canvas.width = page._pageInfo.view[2]*1.33333;
        let scale = (canvas.width / page.view[2]);
        viewport = page.getViewport({ scale: scale });
        var ctx = canvas.getContext('2d');
        var renderContext = {
            canvasContext: ctx,
            viewport: viewport,
            scale: scale,
        };

        wrapper.appendChild(canvas);
        viewport = page.getViewport({ scale: scale });
        canvasContainer.appendChild(wrapper);

        page.render(renderContext);
    }

    function renderPages(pdfDoc) {
        for (var num = 1; num <= pdfDoc.numPages; num++)
            pdfDoc.getPage(num).then(renderPage);
    }

    PDFJS.disableWorker = true;
    PDFJS.getDocument(url).promise.then(renderPages);
}

}
