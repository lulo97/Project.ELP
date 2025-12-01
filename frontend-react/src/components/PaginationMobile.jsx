import { useState } from "react";
import { getTranslation } from "../utils/getTranslation";

export function PaginationMobile({
  fetchData = () => {},
  paginationData = {
    totalCount: 1,
    totalPages: 1,
    pageSize: 1,
    pageIndex: 1,
  },
}) {
  const [selectedPage, setSelectedPage] = useState(
    paginationData.pageIndex || 1
  );
  const [inputValue, setInputValue] = useState("");

  async function handleChangePage(pageIndex) {
    if (pageIndex < 1 || pageIndex > paginationData.totalPages) return;

    setSelectedPage(pageIndex);
    setInputValue("");

    await fetchData({
      pageIndex,
      pageSize: paginationData.pageSize,
    });
  }

  let start = (selectedPage - 1) * paginationData.pageSize + 1;
  let end = Math.min(
    selectedPage * paginationData.pageSize,
    paginationData.totalCount
  );

  if (paginationData.totalCount === 0) {
    start = 0;
    end = 0;
  }

  function handleInputSubmit(e) {
    e.preventDefault();
    const page = Number(inputValue);

    if (!isNaN(page) && page >= 1 && page <= paginationData.totalPages) {
      handleChangePage(page);
    }

    setInputValue("");
  }

  return (
    <div className="p-4 border-t bg-white shadow-md space-y-3">
      {/* Info Line */}
      <div className="text-center text-sm text-gray-600">
        {getTranslation("PaginationInfo")
          .replace("{start}", start)
          .replace("{end}", end)
          .replace("{totalCount}", paginationData.totalCount)}
      </div>

      {/* Prev / Next */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => handleChangePage(selectedPage - 1)}
          disabled={selectedPage === 1}
          className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          {getTranslation("Prev")}
        </button>

        <span className="text-gray-700 font-medium text-sm">
          {getTranslation("Page")} {selectedPage} / {paginationData.totalPages}
        </span>

        <button
          onClick={() => handleChangePage(selectedPage + 1)}
          disabled={selectedPage === paginationData.totalPages}
          className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          {getTranslation("Next")}
        </button>
      </div>

      {/* Input Jump */}
      <form
        onSubmit={handleInputSubmit}
        className="flex justify-center items-center space-x-2"
      >
        <input
          type="number"
          min={1}
          max={paginationData.totalPages}
          placeholder={getTranslation("Page")}
          className="w-20 text-center px-2 py-1 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-1 w-20 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {getTranslation("Go")}
        </button>
      </form>
    </div>
  );
}
