import { useDeviceType } from "../hooks/useDeviceType";
import { getTranslation } from "../utils/getTranslation";
import { Button } from "./Button";
import { Input } from "./Input";
import { SearchTableMobile } from "./SearchTableMobile";

export function SearchTable({ searchValues, setSearchValues, fetchRows }) {
  if (useDeviceType() === "mobile") {
    return (
      <SearchTableMobile
        searchValues={searchValues}
        setSearchValues={setSearchValues}
        fetchRows={fetchRows}
      />
    );
  }

  return (
    <div className="flex flex-row gap-3 mb-3">
      {searchValues.map((data) => {
        return (
          <div key={data.id} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              {data.label}
            </label>
            <Input
              id={"search_by_" + data.id}
              value={data.value}
              onChange={(event) => {
                const newSearchValues = searchValues.map((ele) =>
                  ele.id === data.id
                    ? { ...ele, value: event.target.value }
                    : ele
                );
                setSearchValues(newSearchValues);
              }}
              placeholder={getTranslation("SearchBy").replace(
                "{label}",
                data.label
              )}
            />
          </div>
        );
      })}
      <div className="flex items-end">
        <Button
          id="btn_search"
          text={getTranslation("Search")}
          onClick={() => {
            fetchRows();
          }}
        />
      </div>
    </div>
  );
}
