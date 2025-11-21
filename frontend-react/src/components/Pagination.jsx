import { useState } from "react";
import { getTranslation } from "../utils/getTranslation";

function getPageNumbers(totalPages, currentPage) {
  const pages = [];

  if (totalPages <= 7) {
    // Show all pages if total small
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    // Always show first page
    pages.push(1);

    let left = currentPage - 1;
    let right = currentPage + 1;

    if (left <= 2) {
      // shift window if near start
      left = 2;
      right = 4;
    }
    if (right >= totalPages - 1) {
      // shift window if near end
      left = totalPages - 3;
      right = totalPages - 1;
    }

    // Add left ellipsis if needed
    if (left > 2) {
      pages.push("left-ellipsis");
    }

    // Add page numbers between left and right
    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    // Add right ellipsis if needed
    if (right < totalPages - 1) {
      pages.push("right-ellipsis");
    }

    // Always show last page
    pages.push(totalPages);
  }

  return pages;
}

export function Pagination({
  fetchData = () => {},
  paginationData = {
    totalCount: 1,
    totalPages: 1,
    pageSize: 1,
    pageIndex: 1,
  },
}) {
  const [selectedPage, setSelectedPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  async function handleChangePage(pageIndex) {
    if (pageIndex < 1 || pageIndex > paginationData.totalPages) return;
    setSelectedPage(pageIndex);
    setInputValue("");
    await fetchData({ pageIndex, pageSize: paginationData.pageSize });
  }

  const pages = getPageNumbers(paginationData.totalPages, selectedPage);

  let start = (selectedPage - 1) * paginationData.pageSize + 1;
  let end = Math.min(
    selectedPage * paginationData.pageSize,
    paginationData.totalCount
  );

  if (paginationData.totalCount === 0) {
    start = 0;
    end = 0;
  }

  // Handle input submit (jump to page)
  function handleInputSubmit(e) {
    e.preventDefault();
    const page = Number(inputValue);
    if (!isNaN(page) && page >= 1 && page <= paginationData.totalPages) {
      handleChangePage(page);
    } else {
      // Invalid input - optionally reset or show error
      setInputValue("");
    }
  }

  return (
    <div className="flex justify-between items-center p-4 border-t bg-white flex-wrap gap-3">
      {/* Left info */}
      <span className="text-sm text-gray-600">
        {getTranslation("PaginationInfo")
          .replace("{start}", start)
          .replace("{end}", end)
          .replace("{totalCount}", paginationData.totalCount)}
      </span>

      {/* Right pagination controls */}
      <div className="flex items-center space-x-1 flex-wrap gap-1">
        <button
          onClick={() => handleChangePage(selectedPage - 1)}
          className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          disabled={selectedPage === 1}
        >
          {getTranslation("Prev")}
        </button>

        {pages.map((num, idx) => {
          if (num === "left-ellipsis" || num === "right-ellipsis") {
            return (
              <span key={idx} className="px-2 select-none text-gray-500">
                &hellip;
              </span>
            );
          }
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
          {getTranslation("Next")}
        </button>

        {/* Input for direct page jump */}
        <form
          onSubmit={handleInputSubmit}
          className="ml-2 flex items-center space-x-1"
        >
          <input
            type="number"
            min={1}
            max={paginationData.totalPages}
            placeholder={getTranslation("Page")}
            className="text-center px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {getTranslation("Go")}
          </button>
        </form>
      </div>
    </div>
  );
}
