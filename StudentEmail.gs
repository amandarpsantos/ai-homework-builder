/**
 * Sends a formatted homework report to the student.
 */
function sendStudentReportEmail(submissionId) {

  const reportData =
    getStudentReportData(submissionId);

  if (!reportData.studentEmail) {
    throw new Error(
      `No student email was found for Submission ID: ${submissionId}`
    );
  }

  const subject =
    reportData.bilingual
      ? `Lesson ${reportData.lessonNumber} Homework Result`
      : `Resultado da Lição ${reportData.lessonNumber}`;

  const htmlBody =
    buildStudentReportHtml(reportData);

  const plainTextBody =
    buildStudentReportPlainText(reportData);

  MailApp.sendEmail({
    to: reportData.studentEmail,
    subject: subject,
    body: plainTextBody,
    htmlBody: htmlBody,
    name: "Homework Builder"
  });

}


/**
 * Reads one submission from the Results sheet
 * and prepares the report data.
 */
function getStudentReportData(submissionId) {

  const spreadsheet =
    getBuilderSpreadsheet();

  const resultsSheet =
    spreadsheet.getSheetByName("Results");

  if (!resultsSheet) {
    throw new Error(
      'The "Results" sheet was not found.'
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
    "Prompt",
    "Student Answer",
    "Corrected Answer",
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
    rows[0][column["Student Name"]] || "Student";

  const studentEmail =
    rows[0][column["Student Email"]] || "";

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

  const bilingual =
    lessonNumber >= 31;

  const questionsToReview =
    rows
      .filter(row =>
        Number(
          row[column["Score"]] || 0
        ) < 1
      )
      .map(row => ({

        questionNumber:
          row[column["Question Number"]],

        prompt:
          row[column["Prompt"]] || "",

        studentAnswer:
          row[column["Student Answer"]] || "",

        correctedAnswer:
          row[column["Corrected Answer"]] || "",

        feedbackEnglish:
          row[column["Feedback English"]] || "",

        feedbackPortuguese:
          row[column["Feedback Portuguese"]] || "",

        score:
          Number(
            row[column["Score"]] || 0
          )

      }));

  return {

    submissionId: submissionId,

    studentName: studentName,

    studentEmail: studentEmail,

    lessonNumber: lessonNumber,

    totalQuestions: totalQuestions,

    totalScore: totalScore,

    percentage: percentage,

    bilingual: bilingual,

    questionsToReview: questionsToReview

  };

}


/**
 * Builds the formatted HTML email.
 */
function buildStudentReportHtml(reportData) {

  const resultMessage =
    getResultMessage(
      reportData.percentage,
      reportData.bilingual
    );

  const reviewCards =
    reportData.questionsToReview.length > 0
      ? reportData.questionsToReview
          .map(question =>
            buildReviewCardHtml(
              question,
              reportData.bilingual
            )
          )
          .join("")
      : buildPerfectScoreHtml(
          reportData.bilingual
        );

  const lessonLabel =
    reportData.bilingual
      ? `Lesson ${reportData.lessonNumber} / Lição ${reportData.lessonNumber}`
      : `Lição ${reportData.lessonNumber}`;

  const resultLabel =
    reportData.bilingual
      ? "Result / Resultado"
      : "Resultado";

  const greeting =
    reportData.bilingual
      ? `Hi ${escapeHtml(reportData.studentName)}! / Olá, ${escapeHtml(reportData.studentName)}!`
      : `Olá, ${escapeHtml(reportData.studentName)}!`;

  const reviewIntro =
    reportData.questionsToReview.length > 0
      ? (
          reportData.bilingual
            ? `
              <div style="
                margin-bottom:16px;
                font-size:16px;
                line-height:1.5;
                color:#243b35;
              ">
                <strong>
                  Let’s review what needs a little more practice.
                </strong>
                <br>
                <strong>
                  Vamos revisar o que precisa de um pouco mais de prática.
                </strong>
              </div>
            `
            : `
              <div style="
                margin-bottom:16px;
                font-size:16px;
                line-height:1.5;
                color:#243b35;
              ">
                <strong>
                  Vamos revisar o que precisa de um pouco mais de prática.
                </strong>
              </div>
            `
        )
      : "";

  const closingMessage =
    reportData.bilingual
      ? `
        <div style="
          background:#f4f8f7;
          border-left:4px solid #6f8f8a;
          border-radius:10px;
          padding:16px;
          margin-top:24px;
          line-height:1.5;
        ">
          <p style="margin:0 0 6px;">
            Practice makes perfect, so keep practicing!
          </p>

          <p style="margin:0;">
            A prática leva à perfeição, então continue praticando!
          </p>
        </div>
      `
      : `
        <div style="
          background:#f4f8f7;
          border-left:4px solid #6f8f8a;
          border-radius:10px;
          padding:16px;
          margin-top:24px;
          line-height:1.5;
        ">
          <p style="margin:0;">
            A prática leva à perfeição, então continue praticando!
          </p>
        </div>
      `;

  return `
<!DOCTYPE html>
<html>
  <body style="
    margin:0;
    padding:0;
    background:#f5f7f6;
    font-family:Arial, Helvetica, sans-serif;
    color:#243b35;
  ">

    <div style="
      max-width:640px;
      margin:0 auto;
      padding:24px 14px;
    ">

      <div style="
        background:#ffffff;
        border-radius:18px;
        overflow:hidden;
        border:1px solid #dde5e2;
      ">

        <div style="
          background:#6f8f8a;
          color:#ffffff;
          padding:28px 24px;
          text-align:center;
        ">

          <div style="
            font-size:12px;
            letter-spacing:2px;
            text-transform:uppercase;
            opacity:0.9;
            margin-bottom:8px;
          ">
            Homework Report
          </div>

          <div style="
            font-size:28px;
            font-weight:bold;
          ">
            ${escapeHtml(lessonLabel)}
          </div>

        </div>

        <div style="padding:26px 24px;">

          <p style="
            margin:0 0 16px;
            font-size:16px;
          ">
            ${greeting}
          </p>

          <div style="
            background:#fcfbf7;
            border:1px solid #eee8da;
            border-radius:14px;
            padding:20px;
            text-align:center;
            margin-bottom:24px;
          ">

            <div style="
              font-size:22px;
              font-weight:bold;
              color:#e9827c;
              margin-bottom:10px;
            ">
              ${escapeHtml(resultMessage)}
            </div>

            <div style="
              font-size:12px;
              text-transform:uppercase;
              letter-spacing:1.5px;
              color:#6f8f8a;
              margin-bottom:8px;
            ">
              ${escapeHtml(resultLabel)}
            </div>

            <div style="
              font-size:40px;
              font-weight:bold;
              color:#243b35;
              line-height:1;
            ">
              ${reportData.percentage}%
            </div>

            <div style="
              margin-top:8px;
              color:#66736f;
              font-size:14px;
            ">
              ${reportData.totalScore} / ${reportData.totalQuestions}
            </div>

          </div>

          ${reviewIntro}

          ${reviewCards}

          ${closingMessage}

        </div>

      </div>

    </div>

  </body>
</html>
`;

}


/**
 * Returns an encouraging message based on the result.
 */
function getResultMessage(percentage, bilingual) {

  let english;
  let portuguese;

  if (percentage === 100) {

    english = "Spectacular!";
    portuguese = "Espetacular!";

  } else if (percentage >= 90) {

    english = "Amazing Job!";
    portuguese = "Trabalho incrível!";

  } else if (percentage >= 70) {

    english = "Great Work!";
    portuguese = "Ótimo trabalho!";

  } else if (percentage >= 50) {

    english = "Nice Job!";
    portuguese = "Bom trabalho!";

  } else if (percentage >= 30) {

    english = "Getting Better!";
    portuguese = "Você está melhorando!";

  } else {

    english = "Keep Practicing!";
    portuguese = "Continue praticando!";

  }

  return bilingual
    ? `${english} / ${portuguese}`
    : portuguese;

}


/**
 * Builds one review card.
 */
function buildReviewCardHtml(question, bilingual) {

  const correctedAnswer =
    question.correctedAnswer
      ? `
        <div style="margin-top:12px;">
          <strong>
            ${bilingual
              ? "Correction / Correção:"
              : "Correção:"
            }
          </strong>
          <br>
          ${escapeHtml(question.correctedAnswer)}
        </div>
      `
      : "";

  const explanationEnglish =
    bilingual && question.feedbackEnglish
      ? `
        <div style="margin-top:12px;">
          <strong>Explanation:</strong>
          <br>
          ${escapeHtml(question.feedbackEnglish)}
        </div>
      `
      : "";

  const explanationPortuguese =
    question.feedbackPortuguese
      ? `
        <div style="margin-top:12px;">
          <strong>Explicação:</strong>
          <br>
          ${escapeHtml(question.feedbackPortuguese)}
        </div>
      `
      : "";

  return `
    <div style="
      border:1px solid #e3e8e6;
      border-radius:14px;
      padding:18px;
      margin-bottom:16px;
      background:#ffffff;
    ">

      <div style="
        font-size:13px;
        font-weight:bold;
        color:#e9827c;
        margin-bottom:12px;
        text-transform:uppercase;
        letter-spacing:0.8px;
      ">
        ${bilingual
          ? `Question ${question.questionNumber} / Questão ${question.questionNumber}`
          : `Questão ${question.questionNumber}`
        }
      </div>

      <div>
        <strong>
          ${bilingual
            ? "Prompt / Atividade:"
            : "Atividade:"
          }
        </strong>
        <br>
        ${escapeHtml(question.prompt)}
      </div>

      <div style="margin-top:12px;">
        <strong>
          ${bilingual
            ? "Your answer / Sua resposta:"
            : "Sua resposta:"
          }
        </strong>
        <br>
        ${escapeHtml(question.studentAnswer)}
      </div>

      ${correctedAnswer}
      ${explanationEnglish}
      ${explanationPortuguese}

    </div>
  `;

}


/**
 * Message shown when all answers are correct.
 */
function buildPerfectScoreHtml(bilingual) {

  return `
    <div style="
      background:#f4f8f7;
      border:1px solid #d8e7e2;
      border-radius:14px;
      padding:20px;
      text-align:center;
      line-height:1.5;
    ">

      <div style="
        font-size:28px;
        margin-bottom:8px;
      ">
        ✓
      </div>

      <strong>
        ${bilingual
          ? "Excellent work! / Excelente trabalho!"
          : "Excelente trabalho!"
        }
      </strong>

    </div>
  `;

}


/**
 * Builds a plain-text fallback email.
 */
function buildStudentReportPlainText(reportData) {

  const lines = [];

  const resultMessage =
    getResultMessage(
      reportData.percentage,
      reportData.bilingual
    );

  if (reportData.bilingual) {

    lines.push(
      `LESSON ${reportData.lessonNumber} / LIÇÃO ${reportData.lessonNumber}`
    );

    lines.push(resultMessage);

    lines.push(
      `RESULT / RESULTADO: ${reportData.percentage}%`
    );

  } else {

    lines.push(
      `LIÇÃO ${reportData.lessonNumber}`
    );

    lines.push(resultMessage);

    lines.push(
      `RESULTADO: ${reportData.percentage}%`
    );

  }

  if (reportData.questionsToReview.length > 0) {

    lines.push("");

    lines.push(
      reportData.bilingual
        ? "Let’s review what needs a little more practice."
        : "Vamos revisar o que precisa de um pouco mais de prática."
    );

  }

  reportData.questionsToReview.forEach(question => {

    lines.push("");

    lines.push(
      reportData.bilingual
        ? `Question ${question.questionNumber} / Questão ${question.questionNumber}`
        : `Questão ${question.questionNumber}`
    );

    lines.push(
      reportData.bilingual
        ? `Prompt / Atividade: ${question.prompt}`
        : `Atividade: ${question.prompt}`
    );

    lines.push(
      reportData.bilingual
        ? `Your answer / Sua resposta: ${question.studentAnswer}`
        : `Sua resposta: ${question.studentAnswer}`
    );

    if (question.correctedAnswer) {

      lines.push(
        reportData.bilingual
          ? `Correction / Correção: ${question.correctedAnswer}`
          : `Correção: ${question.correctedAnswer}`
      );

    }

    if (
      reportData.bilingual &&
      question.feedbackEnglish
    ) {

      lines.push(
        `Explanation: ${question.feedbackEnglish}`
      );

    }

    if (question.feedbackPortuguese) {

      lines.push(
        `Explicação: ${question.feedbackPortuguese}`
      );

    }

  });

  lines.push("");

  if (reportData.bilingual) {

    lines.push(
      "Practice makes perfect, so keep practicing!"
    );

    lines.push(
      "A prática leva à perfeição, então continue praticando!"
    );

  } else {

    lines.push(
      "A prática leva à perfeição, então continue praticando!"
    );

  }

  return lines.join("\n");

}


/**
 * Escapes text before inserting it into HTML.
 */
function escapeHtml(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}


/**
 * Temporary test for the student report email.
 */
function testStudentReportEmail() {

  const submissionId =
    "d93d3934-1f0c-46c4-8b56-2ef22236c168";

  sendStudentReportEmail(
    submissionId
  );

}