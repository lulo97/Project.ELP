import { getLowercaseKeys } from "../utils/getLowercaseKeys";
import { cloneElement } from "react";
import { isObject } from "../utils/isObject";
import { Button } from "./Button";
import { Pagination } from "./Pagination";
import { Fragment } from "react";
import { getTranslation } from "../utils/getTranslation";

export function Table({
  translation = {},
  columns = [],
  rows = [],
  openPopup = () => {},
  additionButtons = [],
  fetchData = () => {},
  paginationData = {},
}) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full border-collapse bg-white text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 text-sm font-medium border-b">
          <tr>
            {columns.map((col) =>
              isObject(col) ? (
                <th key={col.id} className="px-4 py-3 border-b">
                  {col.name != "Id" && getTranslation(col.name, translation)}
                  {col.name == "Id" && getTranslation(col.name)}
                </th>
              ) : (
                <th key={col} className="px-4 py-3 border-b">
                  {col != "Id" && getTranslation(col, translation)}
                  {col == "Id" && getTranslation(col)}
                </th>
              )
            )}
            <th className="px-4 py-3 border-b">{getTranslation("Actions")}</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-6 text-center text-gray-500"
              >
                No data
              </td>
            </tr>
          ) : (
            <>
              {rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((col) => {
                    const key = isObject(col) ? col.id : col;
                    const cell = getLowercaseKeys(row)[key.toLowerCase()];
                    const isTruncate =
                      col.truncate != null ? col.truncate : true;

                    return (
                      <td
                        key={key + rowIndex}
                        className={`px-4 py-3 max-w-[200px] h-[48px] ${
                          isTruncate ? "truncate" : "whitespace-pre-line"
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}

                  {/* 
                    <tr> = control height
                    <td> = height strech to <tr> height auto
                    Wrapping cell inside <td> by a <div> and <div> style = h-full
                  */}
                  <td className="px-4 py-3 space-x-2 h-[48px]">
                    <div className="flex h-full items-center space-x-2">
                      <Button
                        className="py-0 h-full"
                        text={getTranslation("Edit")}
                        onClick={() =>
                          openPopup({ currentRow: row, action: "EDIT" })
                        }
                      />
                      <Button
                        className="py-0 h-full"
                        text={getTranslation("Delete")}
                        onClick={() =>
                          openPopup({ currentRow: row, action: "DELETE" })
                        }
                      />
                      {additionButtons.map((renderBtn, i) => (
                        <Fragment key={i}>{renderBtn(row)}</Fragment>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}

              {/* Add empty rows to keep table height consistent */}
              {paginationData.pageSize &&
                rows.length < paginationData.pageSize &&
                Array.from({
                  length: paginationData.pageSize - rows.length,
                }).map((_, i) => (
                  <tr key={"empty-" + i} className="h-[48px]">
                    {" "}
                    {/* approximate row height */}
                    <td colSpan={columns.length + 1} />
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>

      <Pagination fetchData={fetchData} paginationData={paginationData} />
    </div>
  );
}
