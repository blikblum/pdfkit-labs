import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const helveticaFilePath = path.join(import.meta.dirname, '../assets/fonts/Helvetica.ttf');

const outputPath = path.join(import.meta.dirname, 'vertical-align-helvetica-standard.pdf');
const outputPathEmbedded = path.join(import.meta.dirname, 'vertical-align-helvetica-embedded.pdf');

var doc = new PDFDocument();

doc.pipe(fs.createWriteStream(outputPath));

doc.table({
  debug: true,
  rowStyles: [40],
  data: [
    [
      {
        align: { y: 'bottom' },
        text: 'test',
      },
    ],
  ],
});

doc.end();

doc = new PDFDocument();
doc.registerFont('HelveticaEmbedded', helveticaFilePath);

doc.pipe(fs.createWriteStream(outputPathEmbedded));

doc.font('HelveticaEmbedded');
doc.table({
  debug: true,
  rowStyles: [40],
  data: [
    [
      {
        align: { y: 'bottom' },
        text: 'test',
      },
    ],
  ],
});

doc.end();
