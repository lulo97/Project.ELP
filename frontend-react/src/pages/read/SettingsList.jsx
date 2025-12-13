export function SettingsList({
  settings = [
    { id: "darkMode", label: "Enable Dark Mode" },
    { id: "notifications", label: "Show Notifications" },
    { id: "autoSave", label: "Auto Save Drafts" },
    { id: "beta", label: "Join Beta Features" },
  ],
}) {
  return (
    <div className="space-y-3">
      {settings.map((s) => (
        <label
          key={s.id}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="text-gray-700">{s.label}</span>
          <input
            checked={s.checked}
            onClick={() => s.onClick()}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        </label>
      ))}
    </div>
  );
}
