import { Button } from "./Button";
import { Input } from "./Input";
import { useState } from "react";

export function SearchTable({ searchValues, setSearchValues, fetchRows }) {
  return (
    <div className="flex flex-row gap-3 mb-3">
      {searchValues.map((data) => {
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
          fetchRows();
        }}
      />
    </div>
  );
}
