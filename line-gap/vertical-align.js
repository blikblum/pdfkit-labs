import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const robotoFilePath = path.join(import.meta.dirname, '../assets/fonts/Roboto-Regular.ttf');
const helveticaFilePath = path.join(import.meta.dirname, '../assets/fonts/Helvetica.ttf');

const outputPath = path.join(import.meta.dirname, 'vertical-align.pdf');

var doc = new PDFDocument();
doc.registerFont('Roboto', robotoFilePath);
doc.registerFont('HelveticaEmbedded', helveticaFilePath);

doc.pipe(fs.createWriteStream(outputPath));

doc.fontSize(12);
doc.table({
  debug: true,
  rowStyles: [40],
  data: [
    [
      {
        align: { y: 'bottom' },
        text: 'test',
      },
      {
        align: { y: 'bottom' },
        text: 'test',
        font: { src: 'HelveticaEmbedded' },
      },
      {
        align: { y: 'bottom' },
        text: 'test',
        font: { src: 'Roboto' },
      },
    ],
  ],
});

doc.end();
