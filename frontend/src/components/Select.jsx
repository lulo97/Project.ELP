export function SelectNoStyle({
  disabled = false,
  onChange = () => {},
  options = [], //[{ id, name }]
  value = null,
  className = "",
}) {
  return (
    <select className={className} value={value} disabled={disabled} onChange={onChange}>
      <option value="" selected>
        -- Select an option --
      </option>
      {options.map((ele) => {
        return <option value={ele.id}>{ele.name}</option>;
      })}
    </select>
  );
}
