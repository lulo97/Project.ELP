import { useState } from "react";
import { getTranslation } from "../utils/getTranslation";

export function SelectWithInput({
  disabled = false,
  onChange = () => {},
  options = [], // [{ id, name }]
  value = "",
  className = "",
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const [open, setOpen] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    onChange(e); // notify parent
    setOpen(true);
  };

  const handleSelect = (item) => {
    setInputValue(item.name);
    onChange({ target: { value: item.name } });
    setOpen(false);
  };

  return (
    <div className="relative flex-1">
      <input
        className={`${className} w-full`}
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        disabled={disabled}
        placeholder={getTranslation("SelectAnOption")}
        autoComplete="off"
      />

      {open && (
        <ul
          className="absolute bg-white border w-full max-h-40 overflow-auto z-50 mt-1 rounded-md shadow-lg"
          onMouseDown={(e) => e.preventDefault()} // prevent input blur
        >
          {options.map((ele) => (
            <li
              key={ele.id}
              className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(ele)}
            >
              {ele.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
