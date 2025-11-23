const fs = require('fs');
const path = require('path');

async function concatFiles() {
    const dir = path.join(__dirname, 'src', 'Features', 'Words');
    const outputFile = path.join(__dirname, 'concat.txt');

    try {
        const files = await fs.promises.readdir(dir);

        // Filter only *.cs files (optional)
        const csFiles = files.filter(f => f.endsWith('.cs'));

        let output = '';

        for (const file of csFiles) {
            const filePath = path.join(dir, file);
            const content = await fs.promises.readFile(filePath, 'utf8');

            // Append to output string in requested format
            output += `${file}\n${content}\n\n`;
        }

        await fs.promises.writeFile(outputFile, output, 'utf8');

        console.log(`concat.txt created with ${csFiles.length} files.`);
    } catch (err) {
        console.error('Error:', err);
    }
}

concatFiles();
