/**
 * Saves the built lesson into the Lesson sheet.
 */
function saveLesson(lesson) {

  const sheet =
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName("Lesson");

  // Remove old lesson
    sheet
      .getRange(
        2,
        1,
        Math.max(sheet.getMaxRows() - 1, 1),
        10
      )
      .clearContent();

  const rows = lesson.map(question => [

    question.questionNumber,
    question.questionType,
    question.displayName,
    question.section,
    question.englishInstruction,
    question.portugueseInstruction,
    question.studentInstruction,
    question.patternModel,

    Array.isArray(question.targetWords)
    ? question.targetWords.join("; ")
    : question.targetWords || "",

    question.prompt

  ]);

  if (rows.length > 0) {

    sheet
      .getRange(2, 1, rows.length, rows[0].length)
      .setValues(rows);

  }

}

/**
 * Reads the generated Lesson sheet.
 */
function getLesson() {

  const sheet =
    getBuilderSpreadsheet()
      .getSheetByName("Lesson");

  if (!sheet) {
    throw new Error(
      'The "Lesson" sheet was not found.'
    );
  }

  const data =
    sheet.getDataRange().getValues();

  const lesson = [];

  for (let i = 1; i < data.length; i++) {

    // Skip completely blank rows.
    if (
      data[i].every(value =>
        String(value).trim() === ""
      )
    ) {
      continue;
    }

    lesson.push({

      questionNumber: data[i][0],

      questionType: data[i][1],

      displayName: data[i][2],

      section: data[i][3],

      englishInstruction: data[i][4],

      portugueseInstruction: data[i][5],

      studentInstruction: data[i][6],

      patternModel: data[i][7],

      targetWords: data[i][8],

      prompt: data[i][9]

    });

  }

  if (lesson.length === 0) {
    throw new Error(
      'The "Lesson" sheet does not contain any questions.'
    );
  }

  return lesson;

}