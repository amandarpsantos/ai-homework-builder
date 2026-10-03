/**
 * Adds the Homework Builder menu whenever the spreadsheet opens.
 */
function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu("Homework Builder")
    .addItem("Build Homework Form", "buildHomeworkFromMenu")
    .addSeparator()
    .addItem("Open Current Form", "openCurrentForm")
    .addItem("Open Response Spreadsheet", "openResponseSpreadsheet")
    .addSeparator()
    .addItem("Open Results Sheet", "openResultsSheet")
    .addItem("Open Debug Sheet", "openDebugSheet")
    .addSeparator()
    .addItem(
      "Generate Student Report",
      "generateStudentReportFromMenu"
    )
    .addToUi();

}


/**
 * Runs the main Homework Builder workflow from the spreadsheet menu.
 */
function buildHomeworkFromMenu() {

  const ui =
    SpreadsheetApp.getUi();

  try {

    ui.alert(
      "Homework Builder",
      "The homework form is being created. This may take a few moments.",
      ui.ButtonSet.OK
    );

    main();

    const formUrl =
      getSystemValue("Form URL");

    ui.alert(
      "Homework created",
      formUrl
        ? "The homework form was created successfully."
        : "The process finished, but no Form URL was found in the System sheet.",
      ui.ButtonSet.OK
    );

  } catch (error) {

    ui.alert(
      "Homework Builder Error",
      error.message || String(error),
      ui.ButtonSet.OK
    );

    throw error;

  }

}


/**
 * Opens the current student-facing Google Form.
 */
function openCurrentForm() {

  const url =
    getSystemValue("Form URL");

  showLinkDialog(
    "Current Homework Form",
    url,
    "Open Form"
  );

}


/**
 * Opens the current linked response spreadsheet.
 */
function openResponseSpreadsheet() {

  const url =
    getSystemValue("Response Spreadsheet URL");

  showLinkDialog(
    "Response Spreadsheet",
    url,
    "Open Responses"
  );

}


/**
 * Opens the Results tab in the Homework Builder spreadsheet.
 */
function openResultsSheet() {

  activateBuilderSheet("Results");

}


/**
 * Opens the Debug tab in the Homework Builder spreadsheet.
 */
function openDebugSheet() {

  activateBuilderSheet("Debug");

}


/**
 * Activates and displays a sheet in the Homework Builder spreadsheet.
 */
function activateBuilderSheet(sheetName) {

  const spreadsheet =
    getBuilderSpreadsheet();

  const sheet =
    spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error(
      `The "${sheetName}" sheet was not found.`
    );
  }

  if (sheet.isSheetHidden()) {
    sheet.showSheet();
  }

  spreadsheet.setActiveSheet(sheet);

}


/**
 * Displays a clickable link in a small dialog.
 */
function showLinkDialog(title, url, buttonText) {

  const ui =
    SpreadsheetApp.getUi();

  if (!url) {

    ui.alert(
      title,
      "No saved URL was found. Build the homework form first.",
      ui.ButtonSet.OK
    );

    return;

  }

  const safeUrl =
    String(url)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const html =
    HtmlService
      .createHtmlOutput(
        `
        <div style="
          font-family: Arial, sans-serif;
          padding: 20px;
          text-align: center;
        ">
          <p style="margin-bottom: 20px;">
            Click below to continue.
          </p>

          <a
            href="${safeUrl}"
            target="_blank"
            style="
              display: inline-block;
              padding: 10px 18px;
              background: #1a73e8;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
            "
          >
            ${buttonText}
          </a>
        </div>
        `
      )
      .setWidth(330)
      .setHeight(170);

  ui.showModalDialog(
    html,
    title
  );

}

/**
 * Asks for a Submission ID and generates its student report.
 */
function generateStudentReportFromMenu() {

  const ui =
    SpreadsheetApp.getUi();

  const response =
    ui.prompt(
      "Generate Student Report",
      "Enter the Submission ID from the Results sheet:",
      ui.ButtonSet.OK_CANCEL
    );

  if (
    response.getSelectedButton() !==
    ui.Button.OK
  ) {
    return;
  }

  const submissionId =
    response.getResponseText().trim();

  if (!submissionId) {

    ui.alert(
      "Please enter a Submission ID."
    );

    return;

  }

  try {

    createStudentReport(
      submissionId
    );

    ui.alert(
      "Student report created successfully in the Student Reports sheet."
    );

  } catch (error) {

    ui.alert(
      "Student Report Error",
      error.message || String(error),
      ui.ButtonSet.OK
    );

  }

}