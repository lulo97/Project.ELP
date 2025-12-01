import { getLowercaseKeys } from "../utils/getLowercaseKeys";
import { isObject } from "../utils/isObject";
import { Fragment } from "react";
import { Button } from "./Button";
import { Pagination } from "./Pagination";
import { getTranslation } from "../utils/getTranslation";

export function TableMobile({
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
    <div className="space-y-4">
      {rows.length === 0 ? (
        <div className="text-center text-gray-500 py-6 border rounded-lg bg-white">
          {getTranslation("NoData")}
        </div>
      ) : (
        <>
          {rows.map((row, rowIndex) => {
            const lowercasedRow = getLowercaseKeys(row);

            return (
              <div
                key={rowIndex}
                className="rounded-lg border bg-white p-4 shadow-sm space-y-4"
              >
                {columns.map((col) => {
                  const key = isObject(col) ? col.id : col;
                  const label = isObject(col) ? col.name : col;
                  const isTruncate = col.truncate != null ? col.truncate : true;

                  let cell = lowercasedRow[key.toLowerCase()];

                  // Boolean as checkbox
                  if (
                    typeof cell === "boolean" ||
                    ["true", "false"].includes(String(cell))
                  ) {
                    return (
                      <div
                        key={key}
                        className="grid grid-cols-[100px_1fr] items-center"
                      >
                        <span className="text-gray-700 font-medium">
                          {label}:
                        </span>
                        <input
                          type="checkbox"
                          checked={cell === true || cell === "true"}
                          className="flex-none"
                        />
                      </div>
                    );
                  }

                  return (
                    <div
                      key={key}
                      className="grid grid-cols-[100px_1fr] items-start"
                    >
                      <span className="text-gray-700 font-medium">{label}:</span>
                      <span
                        className={`text-gray-900 ${
                          isTruncate ? "truncate" : "whitespace-pre-line"
                        }`}
                      >
                        {cell}
                      </span>
                    </div>
                  );
                })}

                {/* Action buttons */}
                {showActionColumn && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {showEditButton && (
                      <Button
                        className="py-1"
                        text={getTranslation("Edit")}
                        onClick={() =>
                          openPopup({ currentRow: row, action: "EDIT" })
                        }
                      />
                    )}

                    {showDeleteButton && (
                      <Button
                        className="py-1"
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
                )}
              </div>
            );
          })}

          {/* Maintain height */}
          {/* {paginationData.pageSize &&
            rows.length < paginationData.pageSize &&
            Array.from({
              length: paginationData.pageSize - rows.length,
            }).map((_, i) => (
              <div
                key={"empty-" + i}
                className="rounded-lg border bg-white h-[48px]"
              ></div>
            ))} */}
        </>
      )}

      <Pagination fetchData={fetchData} paginationData={paginationData} />
    </div>
  );
}

