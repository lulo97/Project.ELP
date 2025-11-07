import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "react";

export function SearchTable({ searchValues, setSearchValues, fetchRows }) {
  return (
    <div className="flex flex-row gap-3 mb-3">
      {searchValues.map((data) => {
        return (
          <div key={data.id} className="flex flex-col">
            <label className="mb-1 text-sm font-medium text-gray-700">
              {data.label || data.placeholder}
            </label>
            <Input
              value={data.value}
              onChange={(event) => {
                const newSearchValues = searchValues.map((ele) =>
                  ele.id === data.id
                    ? { ...ele, value: event.target.value }
                    : ele
                );
                setSearchValues(newSearchValues);
              }}
              placeholder={data.placeholder}
            />
          </div>
        );
      })}
      <div className="flex items-end">
        <Button
          text="Search"
          onClick={() => {
            fetchRows();
          }}
        />
      </div>
    </div>
  );
}
