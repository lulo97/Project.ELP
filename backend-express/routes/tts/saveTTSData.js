const { getRandomId } = require("../../utils/getRandomId.js");
const { execute, executeSelect } = require("../../database/execute.js");

async function getTTSData(text) {
    const sql = "SELECT * FROM tts WHERE text = ?";

    const result = await executeSelect({ sql, params: [text] });

    if (!result || result.length === 0) {
        return null;
    }

    return result[0];
}


async function saveTTSData({ text, audio_base64 }) {
    if (!text || !audio_base64) {
        throw Error("Text or audio_base64 is null!")
    }

    const id = getRandomId();

    const sql = `
      INSERT INTO tts (id, text, audio_base64)
      VALUES (?, ?, ?)
    `;

    const result = await execute({
        sql,
        params: [id, text, audio_base64]
    });

    return result
}

module.exports = {
    saveTTSData, getTTSData
}