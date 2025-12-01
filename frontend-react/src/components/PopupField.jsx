import { cloneElement } from "react";
import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";
import { useDeviceType } from "../hooks/useDeviceType";

export function PopupField({
  label = "",
  fieldComponent,
  direction = "horizontal", // default
}) {
  const isTextarea = fieldComponent.type === "textarea";
  const device = useDeviceType();

  let className = [
    "px-3 py-2",
    "border border-gray-300 rounded-md shadow-sm",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    "text-sm text-gray-800",
    "flex-1", // allow growing in horizontal mode
    isTextarea ? "min-h-[200px]" : "",
    fieldComponent.props.className || "", // keep user-provided classes
  ].join(" ");

  if (device == "mobile") {
    className = className + " w-full";
  }

  className = mergeTailwindClasses(className);

  // Apply Ant Design-like Tailwind styles to the fieldComponent
  const styledField = cloneElement(fieldComponent, {
    placeholder: label,
    className: className,
  });

  if (direction === "horizontal" && device != "mobile") {
    return (
      <div className="flex items-center mb-4">
        <label className="w-32 text-sm font-medium text-gray-700">
          {label}
        </label>
        {styledField}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {styledField}
    </div>
  );
}
