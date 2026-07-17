import type { DocumentDto } from "@/lib/types";
import PdfViewer from "./viewers/PdfViewer";
import DocxViewer from "./viewers/DocxViewer";
import XlsxViewer from "./viewers/XlsxViewer";
import TextViewer from "./viewers/TextViewer";
import UnsupportedViewer from "./viewers/UnsupportedViewer";

export default function DocumentViewer({ doc }: { doc: DocumentDto }) {
  const fileType = doc.fileType.toUpperCase();

  switch (fileType) {
    case "PDF":
      return <PdfViewer blobUrl={doc.blobUrl} fileName={doc.fileName} />;
    case "DOCX":
      return <DocxViewer blobUrl={doc.blobUrl} fileName={doc.fileName} />;
    case "XLSX":
      return <XlsxViewer blobUrl={doc.blobUrl} fileName={doc.fileName} />;
    case "TXT":
      return <TextViewer blobUrl={doc.blobUrl} fileName={doc.fileName} />;
    default:
      return (
        <UnsupportedViewer
          fileName={doc.fileName}
          blobUrl={doc.blobUrl}
          message={`Files of type ${doc.fileType} can't be previewed in the browser.`}
        />
      );
  }
}
