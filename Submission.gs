/**
 * Builds a clean submission object from a Google Forms submission.
 */
function buildSubmission(e) {

  if (!e || !e.range) {
    throw new Error(
      "The form submission event does not contain a response-sheet range."
    );
  }

  const sheet =
    e.range.getSheet();

  const row =
    e.range.getRow();

  const lastColumn =
    sheet.getLastColumn();

  const headers =
    sheet
      .getRange(1, 1, 1, lastColumn)
      .getValues()[0];

  const values =
    sheet
      .getRange(row, 1, 1, lastColumn)
      .getValues()[0];

  const submission = {
    submittedAt: values[0] || new Date(),
    studentName: "",
    email: "",
    answers: []
  };

  let nextQuestionNumber = 1;

  for (let i = 0; i < headers.length; i++) {

    const header =
      String(headers[i] || "").trim();

    const value =
      values[i];

    const normalizedHeader =
      header.toLowerCase();

    // Ignore the automatic timestamp column.
    if (
      normalizedHeader === "timestamp" ||
      normalizedHeader === "carimbo de data/hora"
    ) {
      continue;
    }

    // Student name.
    if (
      normalizedHeader === "student name" ||
      normalizedHeader === "nome do aluno" ||
      normalizedHeader === "nome"
    ) {
      submission.studentName = value;
      continue;
    }

    // Collected email.
    if (
      normalizedHeader === "email address" ||
      normalizedHeader === "email" ||
      normalizedHeader === "endereço de e-mail"
    ) {
      submission.email = value;
      continue;
    }

    // Ignore completely blank or unrelated columns.
    if (!header) {
      continue;
    }

    /*
     * If the header begins with a number, use it.
     * Otherwise, assign question numbers according
     * to the order of the Form columns.
     */
    const numberedHeader =
      header.match(/^(\d+)[.)\s:-]*/);

    const questionNumber =
      numberedHeader
        ? Number(numberedHeader[1])
        : nextQuestionNumber;

    submission.answers.push({
      questionNumber: questionNumber,
      prompt: header,
      answer: value === null || value === undefined
        ? ""
        : String(value).trim()
    });

    nextQuestionNumber =
      Math.max(
        nextQuestionNumber + 1,
        questionNumber + 1
      );

  }

  submission.answers.sort(
    (a, b) =>
      Number(a.questionNumber) -
      Number(b.questionNumber)
  );

  if (submission.answers.length === 0) {
    throw new Error(
      "No homework answers were found in the submitted response row."
    );
  }

  return submission;

}