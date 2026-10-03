/**
 * Saves all grading results for one student submission.
 */
function saveResults(submission, assessment, results) {

  const sheet =
    getBuilderSpreadsheet()
      .getSheetByName("Results");

  if (!sheet) {
    throw new Error(
      'Results sheet not found. Create a tab named "Results".'
    );
  }

  const settings =
    getSettings();

  const submissionId =
    Utilities.getUuid();

  const rows =
    results.map((gradedItem, index) => {

      const question =
        assessment[index];

      const result =
        gradedItem.result;

      return [

        submissionId,

        submission.submittedAt,

        submission.studentName,

        submission.email,

        settings["Lesson Number"],

        question.questionNumber,

        question.questionType,

        question.prompt,

        question.studentAnswer,

        result.correctedAnswer || "",

        result.correct,

        result.score,

        result.feedbackEnglish || "",

        result.feedbackPortuguese || "",

        result.teacherNotes || ""

      ];

    });

  if (rows.length === 0) {
    return submissionId;
  }

  sheet
    .getRange(
      sheet.getLastRow() + 1,
      1,
      rows.length,
      rows[0].length
    )
    .setValues(rows);

  return submissionId;

}