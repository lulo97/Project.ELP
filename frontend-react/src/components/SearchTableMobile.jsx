import { getTranslation } from "../utils/getTranslation";
import { Button } from "./Button";
import { Input } from "./Input";

export function SearchTableMobile({ searchValues, setSearchValues, fetchRows }) {
  return (
    <div className="space-y-3 mb-4">
      {searchValues.map((data) => {
        return (
          <div key={data.id} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              {data.label}
            </label>

            <Input
              className="w-full"
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

      <div className="flex justify-end">
        <Button
            className="w-full"
          text={getTranslation("Search")}
          onClick={() => {
            fetchRows();
          }}
        />
      </div>
    </div>
  );
}
