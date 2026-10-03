/**
 * Deletes the previous Form and Response Spreadsheet.
 */
function deletePreviousBuild() {

  try {
    const formId = getSystemValue("Form ID");

    if (formId) {
      DriveApp.getFileById(formId).setTrashed(true);
    }
  } catch (e) {
    Logger.log("No previous form to delete.");
  }

  try {
    const spreadsheetId = getSystemValue("Response Spreadsheet ID");

    if (spreadsheetId) {
      DriveApp.getFileById(spreadsheetId).setTrashed(true);
    }
  } catch (e) {
    Logger.log("No previous response spreadsheet to delete.");
  }

}