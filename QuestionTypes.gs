/**
 * Reads the Question Types sheet.
 */
function getQuestionTypes() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName("Question Types");

  const data = sheet.getDataRange().getValues();

  const questionTypes = {};

  for (let i = 1; i < data.length; i++) {

    const typeId = data[i][0];

    questionTypes[typeId] = {

      displayName: data[i][1],

      section: data[i][2],

      englishInstruction: data[i][3],

      portugueseInstruction: data[i][4],

      studentInstruction: data[i][5]

    };

  }

  return questionTypes;

}