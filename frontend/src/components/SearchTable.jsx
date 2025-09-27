import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "react";

/**

searchData = [
    { id: "word", placeholder: "Search by word" },

]

*/
export function SearchTable({ fetchRows, searchData }) {
  const [searchValues, setSearchValues] = useState(
    searchData.map((ele) => {
      return { id: ele.id, value: "" };
    })
  );

  return (
    <div className="flex flex-row gap-3 mb-3">
      {JSON.stringify(searchValues)}
      {searchData.map((data) => {
        return (
          <Input
            key={data.id}
            value={searchValues.value}
            onChange={(event) => {
              const newSearchValues = searchValues.map((ele) =>
                ele.id === data.id ? { ...ele, value: event.target.value } : ele
              );
              setSearchValues(newSearchValues);
            }}
            placeholder={data.placeholder}
          />
        );
      })}
      <Button
        text={"Search"}
        onClick={() => {
          const params = searchValues.reduce((acc, ele) => {
            acc[ele.id] = ele.value;
            return acc;
          }, {});

          fetchRows(params);
        }}
      />
    </div>
  );
}
