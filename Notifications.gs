/**
 * Emails the teacher when AI grading fails.
 */
function notifyTeacherOfGradingFailure(submission, error) {

  const settings =
    getSettings();

  const teacherEmail =
    settings["Teacher Email"];

  const studentName =
    submission && submission.studentName
      ? submission.studentName
      : "Unknown student";

  const studentEmail =
    submission && submission.email
      ? submission.email
      : "Not available";

  const errorMessage =
    error && error.message
      ? error.message
      : String(error);

  const errorStack =
    error && error.stack
      ? error.stack
      : "No stack trace was available.";

  if (!teacherEmail) {

    debugLog(
      "Notification Error",
      studentName,
      {
        message:
          "Teacher Email is missing from Settings.",
        originalError:
          errorMessage
      }
    );

    return;

  }

  const subject =
    `Homework grading failed — ${studentName}`;

  const body =
`The Homework Builder could not finish grading a submission.

Student: ${studentName}
Student email: ${studentEmail}
Date: ${new Date()}

Error:
${errorMessage}

Technical details:
${errorStack}

No student report was sent.`;

  MailApp.sendEmail({
    to: teacherEmail,
    subject: subject,
    body: body
  });

}