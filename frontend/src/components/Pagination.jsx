import { useState } from "react";
import { getArrayFromNumber } from "../utils/getArrayFromNumber";

export function Pagination({
  fetchData = () => {},
  paginationData = {
    totalCount: 1,
    totalPages: 1,
    pageSize: 1,
    pageIndex: 1
  },
}) {
  const [selectedPage, setSelectedPage] = useState(1);

  async function handleChangePage(pageIndex) {
    if (pageIndex < 1 || pageIndex > paginationData.totalPages) return;
    setSelectedPage(pageIndex);
    await fetchData({ pageIndex, pageSize: paginationData.pageSize });
  }

  let start = (selectedPage - 1) * paginationData.pageSize + 1;
  let end = Math.min(selectedPage * paginationData.pageSize, paginationData.totalCount);

  if (paginationData.totalCount == 0) {
    start = 0;
    end = 0;
  }

  return (
    <div className="flex justify-between items-center p-4 border-t bg-white">
      {/* Left info */}
      <span className="text-sm text-gray-600">
        Showing {start} to {end} of {paginationData.totalCount} entries
      </span>

      {/* Right pagination controls */}
      <div className="flex items-center space-x-1">
        <button
          onClick={() => handleChangePage(selectedPage - 1)}
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          disabled={selectedPage === 1}
        >
          Prev
        </button>

        {getArrayFromNumber(paginationData.totalPages).map((num, idx) => {
          const isActive = num === selectedPage;
          return (
            <button
              onClick={() => handleChangePage(num)}
              key={idx}
              className={
                "px-3 py-1 border rounded-md " +
                (isActive
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "text-gray-600 hover:bg-gray-100")
              }
            >
              {num}
            </button>
          );
        })}

        <button
          onClick={() => handleChangePage(selectedPage + 1)}
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          disabled={selectedPage === paginationData.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
