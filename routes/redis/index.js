const express = require("express");
const { getConnection } = require("../../redis/getConnection")

const router = express.Router();

async function get(req, res, next) {
    try {
        const { key } = req.query;

        if ([null, undefined].includes(key) || key.length == 0) {
            return res.status(400).json({ data: null, error: "Missing key parameter" });
        }

        const client = await getConnection();

        let result = await client.get(key);

        if (key == 'CONSTS') {
            result = JSON.parse(result).map(ele => {
                let value = ele.value;
                try {
                    value = JSON.parse(value)
                } catch (error) {}
                return {
                    ...ele,
                    value: value
                }
            })
        }
       
        res.json({ data: result, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).json({ data: null, error: err.message });
    }
}

router.get("/", get);

module.exports = router;
