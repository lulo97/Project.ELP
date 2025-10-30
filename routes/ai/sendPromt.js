const PARAMS = {
  DETERMINISTIC: {
    temperature: 0.2, // lower randomness
    top_p: 0.85, // focus on high-probability tokens
  },
  CREATIVE: {
    temperature: 0.8, // higher randomness
    top_p: 0.95,
    top_k: 50, // allow more token options per step
  },
  DETAILED: {
    temperature: 0.5,
    top_p: 0.9,
    max_tokens: 300,
  },
};

const PROMPT_PREFIX = `Before answering, work through this step-by-step:

1. UNDERSTAND: What is the core question being asked?
2. ANALYZE: What are the key factors/components involved?
3. REASON: What logical connections can I make?
4. SYNTHESIZE: How do these elements combine?
5. CONCLUDE: What is the most accurate/helpful response?

Now answer:`

async function sendPrompt(prompt, params = {}) {
  const url = process.env.AI_HOST + "/v1/chat/completions";

  // Default parameters
  const defaultBody = {
    messages: [{ role: "user", content: PROMPT_PREFIX + prompt }],
    stream: false,
    reasoning_format: "auto",
    temperature: 0.8,
    max_tokens: -1,
    dynatemp_range: 0,
    dynatemp_exponent: 1,
    top_k: 40,
    top_p: 0.95,
    min_p: 0.05,
    xtc_probability: 0,
    xtc_threshold: 0.1,
    typ_p: 1,
    repeat_last_n: 64,
    repeat_penalty: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
    dry_multiplier: 0,
    dry_base: 1.75,
    dry_allowed_length: 2,
    dry_penalty_last_n: 4096,
    samplers: [
      "penalties",
      "dry",
      "top_n_sigma",
      "top_k",
      "typ_p",
      "top_p",
      "min_p",
      "xtc",
      "temperature",
    ],
    timings_per_token: true,
  };

  // Merge user-supplied params with defaults (params take precedence)
  const body = { ...defaultBody, ...params };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    const output = data.choices[0].message.content;
    return output;
  } catch (err) {
    console.error("Error calling API:", err.message);
    throw Error(err);
  }
}

module.exports = { sendPrompt, PARAMS };
