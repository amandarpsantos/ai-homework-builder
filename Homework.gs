/**
 * Reads the Homework sheet.
 */
function getHomework() {

  const sheet =
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("Homework");

  const data =
    sheet.getDataRange().getValues();

  const homework = [];

  for (let i = 1; i < data.length; i++) {

    // Skip blank rows
    if (data[i][0] === "") continue;

    homework.push({

      questionNumber: Number(data[i][0]),

      questionType: data[i][1],

      patternModel: data[i][2],

      prompt: data[i][3],

      targetWords: data[i][4]
        ? data[i][4]
            .split(";")
            .map(word => word.trim())
            .filter(word => word !== "")
        : []

    });

  }

  return homework;

}