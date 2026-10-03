/**
 * Reads the Settings sheet.
 */
function getSettings() {

  const sheet =
    getBuilderSpreadsheet()
      .getSheetByName("Settings");

  const data = sheet.getDataRange().getValues();

  const settings = {};

  for (let i = 1; i < data.length; i++) {

    const key = data[i][0];

    let value = data[i][1];

    if (key === "") continue;

    // Convert integers like 32.0 to 32
    if (typeof value === "number" && Number.isInteger(value)) {
      value = Number(value);
    }

    settings[key] = value;

  }

  return settings;

}