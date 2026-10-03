/**
 * Writes a debug entry.
 */
function debugLog(stage, student, data) {

  const sheet =
    getBuilderSpreadsheet()
      .getSheetByName("Debug");

  if (!sheet) {
    throw new Error("Debug sheet not found in Builder spreadsheet.");
  }

  sheet.appendRow([
    new Date(),
    stage,
    student,
    JSON.stringify(data)
  ]);

}