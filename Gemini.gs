/**
 * Sends one prompt to Gemini and returns the raw text response.
 */
function callGemini(prompt) {

  const settings = getSettings();

  const apiKey = settings["Gemini API Key"];
  const model = settings["Gemini Model"];

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: prompt
          }
        ]
      }
    ]
  };

  const options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response =
    UrlFetchApp.fetch(url, options);

  const responseText =
    response.getContentText();

  const data =
    JSON.parse(responseText);

  if (!data.candidates || !data.candidates[0]) {

    debugLog(
      "Gemini API Error",
      "System",
      {
        responseCode: response.getResponseCode(),
        responseText: responseText
      }
    );

    throw new Error(
      "Gemini did not return a normal response. Check the Debug tab for Gemini API Error."
    );

  }

  return data.candidates[0].content.parts[0].text;

}

/**
 * Parses Gemini's JSON response.
 */
function parseGeminiJson(text) {

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);

}