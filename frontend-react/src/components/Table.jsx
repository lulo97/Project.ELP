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
  showActionColumn = true,
  showEditButton = true,
  showDeleteButton = true,
  additionButtons = [],
  fetchData = () => {},
  paginationData = {},
}) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full border-collapse bg-white text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 text-sm font-medium border-b">
          <tr>
            {columns.map((col) => (
              <th
                key={isObject(col) ? col.id : col}
                className="px-4 py-3 border-b"
              >
                {isObject(col) ? col.name : col}
              </th>
            ))}
            {showActionColumn && (
              <th className="px-4 py-3 border-b">
                {getTranslation("Actions")}
              </th>
            )}
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
                    const isTruncate =
                      col.truncate != null ? col.truncate : true;

                    const key = isObject(col) ? col.id : col;

                    //Trying to map any column name to UI declared column id
                    //Example: database column = nAmE vs UI column id = NaMe still matched
                    let cell = getLowercaseKeys(row)[key.toLowerCase()];

                    //If cell value is boolean then render special
                    if (
                      typeof cell === "boolean" ||
                      ["true", "false"].includes(String(cell))
                    ) {
                      return (
                        <td
                          key={key + rowIndex}
                          className="px-4 py-3 h-[48px] flex items-center justify-center"
                        >
                          <input
                            type="checkbox"
                            checked={cell === true || cell === "true"}
                            className="flex-none"
                          />
                        </td>
                      );
                    }

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

                  {showActionColumn && (
                    <td className="px-4 py-3 space-x-2 h-[48px]">
                      <div className="flex h-full items-center space-x-2">
                        {showEditButton && (
                          <Button
                            className="py-0 h-full"
                            text={getTranslation("Edit")}
                            onClick={() =>
                              openPopup({ currentRow: row, action: "EDIT" })
                            }
                          />
                        )}
                        {showDeleteButton && (
                          <Button
                            className="py-0 h-full"
                            text={getTranslation("Delete")}
                            onClick={() =>
                              openPopup({ currentRow: row, action: "DELETE" })
                            }
                          />
                        )}
                        {additionButtons.map((renderBtn, i) => (
                          <Fragment key={i}>{renderBtn(row)}</Fragment>
                        ))}
                      </div>
                    </td>
                  )}
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
