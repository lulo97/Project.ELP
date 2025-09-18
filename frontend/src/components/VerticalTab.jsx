export function VerticalTab({
  tabNames = [
    { id: "tab1", name: "Tab 1" },
    { id: "tab2", name: "Tab 2" },
  ],
  currentTabId = "tab1",
  setCurrentTabId = () => {}
}) {
  return (
    <div style={{ padding: "3px 5px" }}>
      {tabNames.map((ele) => {
        const isActive = ele.id == currentTabId;
        return (
          <div
            style={{
              cursor: "pointer",
              marginBottom: "5px",
              fontWeight: isActive ? "bold" : "normal",
            }}
            key={ele.id}
            onClick={() => setCurrentTabId(ele.id)}
          >
            {ele.name}
          </div>
        );
      })}
    </div>
  );
}
