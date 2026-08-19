import JSZip from "./node_modules/.pnpm/jszip@3.10.1/node_modules/jszip/lib/index.js";
import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";

const outDir = path.resolve(
  "/Users/lansa18/Desktop/archiva-labs/archiva-frontend/public/test-docs"
);
fs.mkdirSync(outDir, { recursive: true });

// --- TXT ---
fs.writeFileSync(
  path.join(outDir, "sample.txt"),
  "Smoke test TXT file.\nLine two of the sample document.\nLine three — checking whitespace and scroll.\n"
);

// --- XLSX ---
const wb = XLSX.utils.book_new();
const ws1 = XLSX.utils.aoa_to_sheet([
  ["Name", "Role", "Score"],
  ["Alice", "Admin", 92],
  ["Bob", "User", 81],
]);
const ws2 = XLSX.utils.aoa_to_sheet([
  ["Sheet2 header"],
  ["second sheet works"],
]);
XLSX.utils.book_append_sheet(wb, ws1, "Sheet1");
XLSX.utils.book_append_sheet(wb, ws2, "Sheet2");
XLSX.writeFile(wb, path.join(outDir, "sample.xlsx"));

// --- DOCX (minimal valid OOXML) ---
const zip = new JSZip();
zip.file(
  "[Content_Types].xml",
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`
);
zip.folder("_rels").file(
  ".rels",
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
);
zip.folder("word").file(
  "document.xml",
  `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <w:p><w:r><w:t>Smoke test DOCX document.</w:t></w:r></w:p>
    <w:p><w:r><w:t>Second paragraph to check rendering.</w:t></w:r></w:p>
  </w:body>
</w:document>`
);
const docxBuffer = await zip.generateAsync({ type: "nodebuffer" });
fs.writeFileSync(path.join(outDir, "sample.docx"), docxBuffer);

// --- PDF (minimal hand-built single page PDF) ---
const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 200 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 60 >>
stream
BT /F1 18 Tf 20 100 Td (Smoke test PDF file) Tj ET
endstream
endobj
xref
0 6
0000000000 65535 f
trailer
<< /Size 6 /Root 1 0 R >>
startxref
0
%%EOF`;
fs.writeFileSync(path.join(outDir, "sample.pdf"), pdf);

console.log("Generated test docs in", outDir);
console.log(fs.readdirSync(outDir));
