import { Component, Input, OnInit } from '@angular/core';
import { degrees, PDFDocument, rgb } from 'pdf-lib';
@Component({
  selector: 'app-fill-pdf',
  templateUrl: './fill-pdf.component.html',
  styleUrls: ['./fill-pdf.component.css'],
})
export class FillPdfComponent implements OnInit {
  pdfDoc: any;
  src: string = 'http://foersom.com/net/HowTo/data/OoPdfFormExample.pdf';
  pdfBytes: any;
  pdfForm: any;
  pdfZoom:number=1;
  fields

  async ngOnInit() {
    this.src = 'http://foersom.com/net/HowTo/data/OoPdfFormExample.pdf';
    await this.loadPdf(this.src);
    this.pdfForm = await this.loadForm();
    await this.getFields();
    // this.fillTextField('Given Name Text Box', 'GUIRAT');
    this.createTextField(
      'Nom Signataire 1 ',
      '1',
      295.1173828125,
      340.20750000000004,
      248,
      93,
      0);
    this.createTextField('Nom Signataire 2 ', '2', 74.6698828125, 470.88, 526 , 30,0);
    this.createTextField('Nom Signataire 3 ', '3', 415.8148828125, 690.33, 200 , 37,0);

    // this.createTextField('Nom Signataire 2 ', '2', 320, 403.2, 211*0.75 , 25*0.75,0);
    // this.createTextField('Nom Signataire 3 ', '3', 319, 455, 211*0.75 , 25*0.75,0);
    // this.fillCheckBox("test checkbox", "fieldInput")

  }
load(src){
 this.src = src
}
  async loadPdf(src) {
    // These should be Uint8Arrays or ArrayBuffers
    // This data can be obtained in a number of different ways
    // If your running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    const arrayBuffer = await fetch(src).then((res) => res.arrayBuffer());
    this.pdfBytes = arrayBuffer;
    this.pdfDoc = await PDFDocument.load(arrayBuffer);
  }
  async loadForm() {
    const form = await this.pdfDoc.getForm();
    return form;
  }
  async getFields() {
    const fields = await this.pdfForm.getFields();
    this.fields = []
    fields.forEach((field) => {
      const type = field.constructor.name;
      const name = field.getName();
      console.warn(`${type}: ${name}`);
      this.fields.push({type,name})
    });
  }
  fillTextField(fieldName, fieldInput) {
    // Get field in the PDF by name
    var temp = this.pdfForm.getTextField(fieldName);
    console.log(temp);
    // Fill in the basic info fields
    var tempfill = temp.setText(fieldInput);
    console.log(temp);
  }
  fillCheckBox(fieldName, fieldInput) {
    const form = this.pdfDoc.getForm();
    const pages = this.pdfDoc.getPages();
    const checkBox = form.createCheckBox(fieldName)
    const { width, height } =pages[0].getSize();
    checkBox.addToPage(pages[0], {
      x: 50,
      y: 75,
      width: 15,
      height: 15,
      textColor: rgb(0, 0, 0),
      backgroundColor: rgb(0, 1, 0),
      borderColor: rgb(0, 0, 1),
      borderWidth: 1,
      rotate: degrees(0),
    })
  }
  async getPage(pageNum){
    // const [page] = await this.pdfDoc.embedPdf(this.pdfBytes, [pageNum-1])
    // console.log([page]);
    // return page

  }
 async createTextField(fieldName, defaultValue, fromTop, fromLeft, width_, height_,pageNum) {
  const pages = this.pdfDoc.getPages()
   const { width, height } =pages[pageNum].getSize();
    const form = this.pdfDoc.getForm();
    const textField = form.createTextField(fieldName);
    textField.setText(defaultValue);
    textField.enableMultiline();
    const borderWidth = 1;
    textField.addToPage(pages[0], {
      x: fromTop + borderWidth,
      y: height - fromLeft - height_ - borderWidth,
      width: width_,
      height: height_,
      textColor: rgb(0, 0, 0),
      backgroundColor: rgb(1, 1, 1),
      borderColor: rgb(0, 0, 0),
      borderWidth: borderWidth,
      rotate: degrees(0),
    })
    textField.setFontSize(16);

  }
  async savePdf() {
    //  `pdfBytes` can be:
    //   • Written to a file in Node
    //   • Downloaded from the browser
    //   • Rendered in an <iframe>
    // Serialize the PDFDocument to bytes (a Uint8Array)
    this.pdfBytes = await this.pdfDoc.save();
    let file = new Blob([this.pdfBytes], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    this.src = fileURL
    console.log(fileURL);
     this.openFileInNewTab(fileURL);
  }
  openFileInNewTab(fileURL) {
    window.open(fileURL);
  }
async updatePdf(){
  this.pdfBytes = await this.pdfDoc.save();
this.pdfBytes = await this.pdfDoc.save();
let file = new Blob([this.pdfBytes], { type: 'application/pdf' });
var fileURL = URL.createObjectURL(file);
this.src = fileURL
}

getFieldValue(){
this.fields.forEach(element => {
  if(element.type=="PDFTextField"){
    const textField = this.pdfForm.getTextField(element.name)
    const text = textField.getText()
    console.log('Text field contents:', text)
  }
});

}

// Json reading

  // 1 Drag and drop
  // 2 Link fields with users
  // 3 Load PDF + placeholders ( canvas )
  // 4 Render specific fields per user
  // 5 Fill Fields

  // Embed the Mario and emblem images

  // Get the form containing all the fields
  // Get all fields in the PDF by their names
}
// Fill in the basic info fields

// ageField.setText('24 years')
// heightField.setText(`5' 1"`)
// weightField.setText('196 lbs')
// eyesField.setText('blue')
// skinField.setText('white')
// hairField.setText('brown')

// Fill the character image field with our Mario image

// Fill in the allies field
// alliesField.setText(
//   [
//     `Allies:`,
//     `  • Princess Daisy`,
//     `  • Princess Peach`,
//     `  • Rosalina`,
//     `  • Geno`,
//     `  • Luigi`,
//     `  • Donkey Kong`,
//     `  • Yoshi`,
//     `  • Diddy Kong`,
//     ``,
//     `Organizations:`,
//     `  • Italian Plumbers Association`,
//   ].join('\n'),
// )

// Fill in the faction name field
// factionField.setText(`Mario's Emblem`)

// Fill the faction image field with our emblem image
// factionImageField.setImage(emblemImage)

// Fill in the backstory field
// backstoryField.setText(
//   `Mario is a fictional character in the Mario video game franchise, owned by Nintendo and created by Japanese video game designer Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist of the series, Mario has appeared in over 200 video games since his creation. Depicted as a short, pudgy, Italian plumber who resides in the Mushroom Kingdom, his adventures generally center upon rescuing Princess Peach from the Koopa villain Bowser. His younger brother and sidekick is Luigi.`,
// )

// Fill in the traits field
// traitsField.setText(
//   [
//     `Mario can use three basic three power-ups:`,
//     `  • the Super Mushroom, which causes Mario to grow larger`,
//     `  • the Fire Flower, which allows Mario to throw fireballs`,
//     `  • the Starman, which gives Mario temporary invincibility`,
//   ].join('\n'),
// )

// Fill in the treasure field
// treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'))
