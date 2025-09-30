const fs = require("fs");
const path = require("path");

const { generateApi } = require("./generateApi");
const { generateComponent } = require("./generateComponent");
const { generatePopup } = require("./generatePopup");
const { generateService } = require("./generateService");
const { toPascalCase } = require("./utils");

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
}

function generate(sql) {
  // 1. Extract table name
  const tableMatch = sql.match(/CREATE TABLE\s+"?(\w+)"?/i);
  if (!tableMatch) throw new Error("Table name not found in SQL");
  const tableName = tableMatch[1];

  // 2. Root output folder
  const rootPath = path.join(__dirname, tableName);
  if (fs.existsSync(rootPath)) {
    fs.rmSync(rootPath, { recursive: true, force: true });
  }

  // 3. Generate contents
  const apiContent = generateApi(sql);
  const componentContent = generateComponent(sql);
  const popupContent = generatePopup(sql);
  const serviceContent = generateService(sql);

  // 4. File paths
  const files = [
    {
      path: path.join(rootPath, `routes/${tableName}/index.js`),
      content: apiContent,
    },
    {
      path: path.join(rootPath, `frontend/src/services/${tableName}.js`),
      content: serviceContent,
    },
    {
      path: path.join(rootPath, `frontend/src/pages/${tableName.slice(0, -1)}/Popup.jsx`),
      content: popupContent,
    },
    {
      path: path.join(
        rootPath,
        `frontend/src/pages/${tableName.slice(0, -1)}/${toPascalCase(tableName.slice(0, -1))}.jsx`
      ),
      content: componentContent,
    },
  ];

  // 5. Write all files
  for (const file of files) {
    ensureDir(file.path);
    fs.writeFileSync(file.path, file.content, "utf-8");
  }

  console.log(`✅ Generated scaffold for table "${tableName}" at ${rootPath}`);
}

// --- Example usage ---
generate(`
CREATE TABLE "synonyms" (
	"id"	TEXT,
	"word"	TEXT NOT NULL CHECK(word <> ''),
	"synomym"	TEXT NOT NULL CHECK(synomym <> ''),
	"note"	TEXT,
	PRIMARY KEY("id")
)
`);
