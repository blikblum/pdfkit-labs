import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const helveticaFilePath = path.join(import.meta.dirname, '../assets/fonts/Helvetica.ttf');
const outputPath = path.join(import.meta.dirname, 'line-gap.pdf');

var doc = new PDFDocument();
doc.registerFont('HelveticaEmbed', helveticaFilePath);

doc.pipe(fs.createWriteStream(outputPath));

doc.fontSize(16);

doc.moveTo(10, 20);
doc.lineTo(80, 20);
doc.dash(1, { space: 1 }).lineWidth(1).strokeOpacity(0.3);
doc.stroke('blue');
doc.text('test', 10, 20);

console.log(
  `font settings lineGap: ${doc._font.lineGap} ascender: ${doc._font.ascender} descender: ${doc._font.descender}`,
);
let lineHeight = doc.currentLineHeight(false);
console.log('lineHeight (without lineGap):', lineHeight);
let baseline = 20 + lineHeight;
doc.moveTo(10, baseline);
doc.lineTo(50, baseline);
doc.stroke('green');

lineHeight = doc.currentLineHeight(true);
console.log('lineHeight (with lineGap):', lineHeight);
baseline = 20 + lineHeight;
doc.moveTo(10, baseline);
doc.lineTo(50, baseline);
doc.stroke('black');

console.log('Using Helvetica embedded font');
doc.font('HelveticaEmbed');

console.log(
  `font settings lineGap: ${doc._font.lineGap} ascender: ${doc._font.ascender} descender: ${doc._font.descender}`,
);
doc.text('test', 50, 20);
lineHeight = doc.currentLineHeight(false);
console.log('lineHeight (without lineGap):', lineHeight);
lineHeight = doc.currentLineHeight(true);
console.log('lineHeight (with lineGap):', lineHeight);
baseline = 20 + lineHeight;
doc.moveTo(50, baseline);
doc.lineTo(80, baseline);
doc.stroke('red');

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

doc.font('Helvetica');
doc.text(longText, 10, 50, { width: 200, lineGap: 0 });

doc.font('HelveticaEmbed');
doc.text(longText, 250, 50, { width: 200, lineGap: 0});

doc.end();
