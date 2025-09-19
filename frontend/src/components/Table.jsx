import { getLowercaseKeys } from "../utils/getLowercaseKeys";
import { cloneElement } from "react";
import { isObject } from "../utils/isObject";
import { Button } from "./Button";
import { Pagination } from "./Pagination";
import { Fragment } from "react";

export function Table({
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
                  {col.name}
                </th>
              ) : (
                <th key={col} className="px-4 py-3 border-b">
                  {col}
                </th>
              )
            )}
            <th className="px-4 py-3 border-b">Actions</th>
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
            rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {columns.map((col) => {
                  const key = isObject(col) ? col.id : col;
                  const cell = getLowercaseKeys(row)[key.toLowerCase()];
                  const isTruncate = col.truncate != null ? col.truncate : true;

                  return (
                    <td
                      key={key + rowIndex}
                      className={`px-4 py-3 max-w-[200px] ${
                        isTruncate ? "truncate" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}

                <td className="px-4 py-3 space-x-2 flex">
                  <Button
                    text="Edit"
                    onClick={() =>
                      openPopup({ currentRow: row, action: "EDIT" })
                    }
                  />
                  <Button
                    text="Delete"
                    onClick={() =>
                      openPopup({ currentRow: row, action: "DELETE" })
                    }
                  />
                  {additionButtons.map((renderBtn, i) => (
                    <Fragment key={i}>{renderBtn(row)}</Fragment>
                  ))}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination fetchData={fetchData} paginationData={paginationData} />
    </div>
  );
}
