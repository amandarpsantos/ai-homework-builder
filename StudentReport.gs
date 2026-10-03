/**
 * Creates and saves a student-friendly report
 * for one graded homework submission.
 */
function createStudentReport(submissionId) {

  const spreadsheet =
    getBuilderSpreadsheet();

  const resultsSheet =
    spreadsheet.getSheetByName("Results");

  const reportsSheet =
    spreadsheet.getSheetByName("Student Reports");

  if (!resultsSheet) {
    throw new Error(
      'The "Results" sheet was not found.'
    );
  }

  if (!reportsSheet) {
    throw new Error(
      'The "Student Reports" sheet was not found.'
    );
  }

  const data =
    resultsSheet
      .getDataRange()
      .getValues();

  if (data.length < 2) {
    throw new Error(
      "The Results sheet does not contain any graded submissions."
    );
  }

  const headers =
    data[0].map(header =>
      String(header).trim()
    );

  const column = {};

  headers.forEach((header, index) => {
    column[header] = index;
  });

  const requiredHeaders = [
    "Submission ID",
    "Student Name",
    "Student Email",
    "Lesson Number",
    "Question Number",
    "Question Type",
    "Prompt",
    "Student Answer",
    "Corrected Answer",
    "Correct",
    "Score",
    "Feedback English",
    "Feedback Portuguese"
  ];

  for (const header of requiredHeaders) {

    if (column[header] === undefined) {
      throw new Error(
        `The Results sheet is missing the column "${header}".`
      );
    }

  }

  const rows =
    data
      .slice(1)
      .filter(row =>
        String(
          row[column["Submission ID"]]
        ).trim() === String(submissionId).trim()
      );

  if (rows.length === 0) {
    throw new Error(
      `No Results rows were found for Submission ID: ${submissionId}`
    );
  }

  const studentName =
    rows[0][column["Student Name"]];

  const studentEmail =
    rows[0][column["Student Email"]];

  const lessonNumber =
    Number(
      rows[0][column["Lesson Number"]]
    );

  const totalQuestions =
    rows.length;

  const totalScore =
    rows.reduce(
      (sum, row) =>
        sum +
        Number(
          row[column["Score"]] || 0
        ),
      0
    );

  const percentage =
    totalQuestions > 0
      ? Math.round(
          (totalScore / totalQuestions) * 100
        )
      : 0;

  // Lessons 1–30: Portuguese only.
  // Lessons 31–60: Portuguese and English.
  const bilingual =
    lessonNumber >= 31;

  const reportLines = [];

  if (bilingual) {

    reportLines.push(
      `LESSON ${lessonNumber} / LIÇÃO ${lessonNumber}`
    );

    reportLines.push("");

    reportLines.push(
      `RESULT / RESULTADO: ${percentage}%`
    );

    reportLines.push("");

    reportLines.push(
      "Practice makes perfect, so keep practicing!"
    );

    reportLines.push(
      "A prática leva à perfeição, então continue praticando!"
    );

  } else {

    reportLines.push(
      `LIÇÃO ${lessonNumber}`
    );

    reportLines.push("");

    reportLines.push(
      `RESULTADO: ${percentage}%`
    );

    reportLines.push("");

    reportLines.push(
      "A prática leva à perfeição, então continue praticando!"
    );

  }

  const questionsToReview =
    rows.filter(row =>
      Number(
        row[column["Score"]] || 0
      ) < 1
    );

  if (questionsToReview.length > 0) {

    reportLines.push("");

    reportLines.push(
      bilingual
        ? "REVIEW / REVISÃO"
        : "REVISÃO"
    );

    reportLines.push("");

    questionsToReview.forEach(row => {

      const questionNumber =
        row[column["Question Number"]];

      const prompt =
        row[column["Prompt"]];

      const studentAnswer =
        row[column["Student Answer"]];

      const correctedAnswer =
        row[column["Corrected Answer"]] || "";

      const feedbackEnglish =
        row[column["Feedback English"]] || "";

      const feedbackPortuguese =
        row[column["Feedback Portuguese"]] || "";

      if (bilingual) {

        reportLines.push(
          `Question ${questionNumber} / Questão ${questionNumber}`
        );

        reportLines.push(
          `Prompt: ${prompt}`
        );

        reportLines.push(
          `Your answer / Sua resposta: ${studentAnswer}`
        );

        if (correctedAnswer) {
          reportLines.push(
            `Correction / Correção: ${correctedAnswer}`
          );
        }

        if (feedbackEnglish) {
          reportLines.push(
            `Explanation: ${feedbackEnglish}`
          );
        }

        if (feedbackPortuguese) {
          reportLines.push(
            `Explicação: ${feedbackPortuguese}`
          );
        }

      } else {

        reportLines.push(
          `Questão ${questionNumber}`
        );

        reportLines.push(
          `Atividade: ${prompt}`
        );

        reportLines.push(
          `Sua resposta: ${studentAnswer}`
        );

        if (correctedAnswer) {
          reportLines.push(
            `Correção: ${correctedAnswer}`
          );
        }

        if (feedbackPortuguese) {
          reportLines.push(
            `Explicação: ${feedbackPortuguese}`
          );
        }

      }

      reportLines.push("");

    });

  }

  const report =
    reportLines.join("\n");

  reportsSheet.appendRow([
    submissionId,
    new Date(),
    studentName,
    studentEmail,
    lessonNumber,
    totalQuestions,
    totalScore,
    percentage,
    report
  ]);

  return report;

}