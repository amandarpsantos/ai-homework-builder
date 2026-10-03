/**
 * Creates the Homework Submission trigger.
 */
function createSubmissionTrigger() {
  

  // Delete any old triggers first
  deleteSubmissionTrigger();

  // Get the response spreadsheet
  const spreadsheet = SpreadsheetApp.openById(
    getSystemValue("Response Spreadsheet ID")
  );

  // Create the trigger
  ScriptApp.newTrigger("onHomeworkSubmit")
    .forSpreadsheet(spreadsheet)
    .onFormSubmit()
    .create();

}

/**
 * Removes old submission triggers.
 */
function deleteSubmissionTrigger() {

  const triggers =
    ScriptApp.getProjectTriggers();

  for (const trigger of triggers) {

    if (
      trigger.getHandlerFunction() ===
      "onHomeworkSubmit"
    ) {

      ScriptApp.deleteTrigger(trigger);

    }

  }

}

/**
 * Runs every time a student submits homework.
 */
function onHomeworkSubmit(e) {

  let submission = null;

  try {

    submission =
      buildSubmission(e);

    const lesson =
      getLesson();

    const assessment =
      buildAssessment(
        lesson,
        submission
      );

    const results = [];

    for (const question of assessment) {

      const prompt =
        buildQuestionPrompt(question);

      const geminiResponse =
        callGemini(prompt);

      const result =
        parseGeminiJson(geminiResponse);

      results.push({

        questionNumber:
          question.questionNumber,

        prompt:
          question.prompt,

        studentAnswer:
          question.studentAnswer,

        result:
          result

      });

    }

    const submissionId =
      saveResults(
        submission,
        assessment,
        results
      );

    // Send the student report only after
    // all questions were graded and saved.
    sendStudentReportEmail(
      submissionId
    );

    debugLog(
      "Full Results",
      submission.studentName,
      {
        submissionId:
          submissionId,

        results:
          results,

        studentEmailSent:
          true
      }
    );

  } catch (error) {

    const studentName =
      submission &&
      submission.studentName
        ? submission.studentName
        : "Unknown Student";

    debugLog(
      "Grading Failed",
      studentName,
      {
        message:
          error.message ||
          String(error),

        stack:
          error.stack || "",

        studentEmailSent:
          false
      }
    );

    notifyTeacherOfGradingFailure(
      submission,
      error
    );

    throw error;

  }

}