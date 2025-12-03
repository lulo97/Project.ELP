import { getTranslation } from "../utils/getTranslation";

export function SelectNoStyle({
  disabled = false,
  onChange = () => {},
  options = [], //[{ id, name }]
  value = null,
  className = "",
}) {
  return (
    <select
      className={`border border-gray-300 ${className}`}
      value={value}
      disabled={disabled}
      onChange={onChange}
    >
      <option value="" selected>
        {getTranslation("SelectAnOption")}
      </option>
      {options.map((ele) => {
        return <option value={ele.id}>{ele.name}</option>;
      })}
    </select>
  );
}
