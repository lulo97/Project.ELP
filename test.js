const { fixJson } = require("./routes/ai/utils/fixJson")

async function main() {
  const out = await fixJson({ text: `
{
"corrected": "Return it.", "explanations": [
" 'Return your response' was rephrased to 'Return it' for conciseness and to use the correct verb form ('it' as a 
singular noun).",
"Added a period at the end to properly close the sentence."
]
}    
`})

console.log(out)
}

main();
