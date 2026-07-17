import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { useDocumentBlob } from "@/hooks/useDocumentBlob";
import ViewerSkeleton from "./ViewerSkeleton";
import UnsupportedViewer from "./UnsupportedViewer";
import { cn } from "@/lib/utils";

export default function XlsxViewer({
  blobUrl,
  fileName,
}: {
  blobUrl: string;
  fileName: string;
}) {
  const { data, isLoading, isError } = useDocumentBlob(blobUrl);
  const [activeSheet, setActiveSheet] = useState(0);

  const workbook = useMemo(() => {
    if (!data) return null;
    try {
      return XLSX.read(data, { type: "array" });
    } catch (err) {
      console.error(err);
      return null;
    }
  }, [data]);

  if (isLoading) return <ViewerSkeleton />;
  if (isError || !data || !workbook)
    return <UnsupportedViewer fileName={fileName} blobUrl={blobUrl} />;

  const sheetName = workbook.SheetNames[activeSheet];
  const sheet = workbook.Sheets[sheetName];
  const rows: unknown[][] = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    blankrows: false,
  });

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {workbook.SheetNames.length > 1 && (
        <div className="flex gap-1 overflow-x-auto border-b border-border bg-surface-container-lowest px-4 py-2">
          {workbook.SheetNames.map((name, i) => (
            <button
              key={name}
              onClick={() => setActiveSheet(i)}
              className={cn(
                "shrink-0 rounded px-3 py-1.5 text-xs font-medium transition-colors",
                i === activeSheet
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface-container-high"
              )}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-auto px-4 py-4">
        <table className="border-collapse text-sm">
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className="border border-border px-3 py-1.5 whitespace-nowrap text-foreground"
                  >
                    {cell === undefined || cell === null ? "" : String(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
