At the times of pdfkit 0.18 the lineGap of standard fonts differs from embedded fonts.

Standard fonts have a lineGap > 0, while embedded fonts have lineGap = 0. This causes the line height to be different when using standard vs embedded fonts.

Pdfkit derives a synthetic line gap from AFM metrics, because AFM does not provide a native LineGap field, treating:

the font bbox as the full vertical extent
ascender/descender as the typographic content box
the leftover space as lineGap

## Issues

- Table cell vertical alignment is affected by the line gap: https://github.com/foliojs/pdfkit/issues/1620

## Test programs


### `line-gap.js`

Compares PDFKit's built-in Helvetica standard font with the embedded
`assets/fonts/Helvetica.ttf`.

The program:

- logs each font's `lineGap`, `ascender`, and `descender`
- logs `currentLineHeight(false)` and `currentLineHeight(true)` to show the
  effect of including the font line gap
- draws guides around short text rendered with both fonts
- renders the same wrapped text with each font and `lineGap: 0` so their
  default line heights can be compared

Output: `line-gap/line-gap.pdf`

### `vertical-align.js`

Creates one debug table row with three bottom-aligned cells intended to use:

- PDFKit's standard Helvetica
- embedded `assets/fonts/Helvetica.ttf`
- embedded `assets/fonts/Roboto-Regular.ttf`

The first two cells render identically, while Roboto has different text bounds.
This does not mean the cell `font.src` option is ignored. The generated PDF
contains embedded Helvetica and Roboto, but not standard Helvetica.

The embedded Helvetica font has the internal name `Helvetica`. Once PDFKit
loads it for the second cell, it replaces the cached standard-font entry with
the same name. The first cell therefore also renders with embedded Helvetica
when the row is rendered. In version 0.18, this program demonstrates the font-cache name
collision and resulting table render-order dependence; it does not directly
compare standard and embedded Helvetica alignment. The font name collision is already fixed but not released

Output: `line-gap/vertical-align.pdf`

### `vertical-align-helvetica.js`

Creates two separate debug table PDFs containing the same 40-point-high,
bottom-aligned cell:

- `vertical-align-helvetica-standard.pdf` uses PDFKit's standard Helvetica
- `vertical-align-helvetica-embedded.pdf` uses `assets/fonts/Helvetica.ttf`

The separate documents isolate how the standard and embedded versions of
Helvetica affect bottom alignment.
