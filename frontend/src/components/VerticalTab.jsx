export function VerticalTab({
  tabNames = [
    { id: "tab1", name: "Tab 1" },
    { id: "tab2", name: "Tab 2" },
  ],
  currentTabId = "tab1",
  setCurrentTabId = () => {},
}) {
  return (
    <div className="flex flex-col border-r border-gray-200 bg-white p-2 w-40">
      {tabNames.map((ele) => {
        const isActive = ele.id === currentTabId;
        return (
          <div
            key={ele.id}
            onClick={() => setCurrentTabId(ele.id)}
            className={`cursor-pointer px-3 py-2 rounded-md mb-1 transition-all
              ${
                isActive
                  ? "bg-blue-50 text-blue-600 font-medium border-r-4 border-blue-500"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
          >
            {ele.name}
          </div>
        );
      })}
    </div>
  );
}
