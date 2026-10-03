/**
 * Initializes the Homework Builder.
 * Run this ONCE after copying the project.
 */
function initializeSystem() {

  const properties =
    PropertiesService.getScriptProperties();

  properties.setProperty(
    "BuilderSpreadsheetId",
    SpreadsheetApp.getActiveSpreadsheet().getId()
  );

}


/**
 * Opens the Homework Builder spreadsheet.
 */
function getBuilderSpreadsheet() {

  const properties =
    PropertiesService.getScriptProperties();

  const spreadsheetId =
    properties.getProperty("BuilderSpreadsheetId");

  if (!spreadsheetId) {

    throw new Error(
      "Builder Spreadsheet ID has not been initialized.\n\n" +
      "Run initializeSystem() once."
    );

  }

  return SpreadsheetApp.openById(spreadsheetId);

}


/**
 * Saves a value in the System sheet.
 */
function saveSystemValue(key, value) {

  const sheet =
    getBuilderSpreadsheet()
      .getSheetByName("System");

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === key) {

      sheet.getRange(i + 1, 2).setValue(value);

      return;

    }

  }

}


/**
 * Reads a value from the System sheet.
 */
function getSystemValue(key) {

  const sheet =
    getBuilderSpreadsheet()
      .getSheetByName("System");

  const data =
    sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {

    if (data[i][0] === key) {

      return data[i][1];

    }

  }

  return null;

}


/**
 * Extracts a Google Drive folder ID from its URL.
 */
function extractFolderId(url) {

  const match =
    url.match(/[-\w]{25,}/);

  if (!match) {

    throw new Error(
      "Invalid Google Drive folder URL."
    );

  }

  return match[0];

}