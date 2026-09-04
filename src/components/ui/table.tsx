import type { ReactNode } from "react";

import {
  tableCellStyle,
  tableClickableRowStyle,
  tableContainerStyle,
  tableEmptyCellStyle,
  tableHeaderCellStyle,
  tableHeaderStyle,
  tableRowStyle,
  tableScrollStyle,
  tableStyle,
} from "../../shared/styles/table.styles.js";

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render: (item: T, index: number) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey: (item: T, index: number) => string | number;
  emptyMessage?: string;
  caption?: string;
  onRowClick?: (item: T) => void;
  className?: string;
}

export default function Table<T>({
  columns,
  data,
  getRowKey,
  emptyMessage = "No hay registros para mostrar.",
  caption,
  onRowClick,
  className = "",
}: TableProps<T>) {
  return (
    <div className={`${tableContainerStyle} ${className}`}>
      <div className={tableScrollStyle}>
        <table className={tableStyle}>
          {caption && <caption className="sr-only">{caption}</caption>}

          <thead className={tableHeaderStyle}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`${tableHeaderCellStyle} ${column.headerClassName ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={tableEmptyCellStyle}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr
                  key={getRowKey(item, index)}
                  onClick={onRowClick ? () => onRowClick(item) : undefined}
                  className={`${tableRowStyle} ${onRowClick ? tableClickableRowStyle : ""}`}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`${tableCellStyle} ${column.cellClassName ?? ""}`}
                    >
                      {column.render(item, index)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
